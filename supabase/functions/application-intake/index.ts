import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

type MembershipPayload = {
  kind: "membership";
  name: string;
  email: string;
  location?: string;
  profile?: string;
  membership: "Individual" | "Family";
  building: string;
  complicated: string;
  contribution: string;
  referral?: string;
  website?: string;
  turnstileToken?: string;
};

type PartnerPayload = {
  kind: "partner";
  contactName: string;
  email: string;
  firm: string;
  websiteUrl?: string;
  category: string;
  locations: string;
  regulatoryStatus?: string;
  familyExperience: string;
  whyRelevant: string;
  memberBenefit?: string;
  references: string;
  conflicts?: string;
  website?: string;
  turnstileToken?: string;
};

type IntakePayload = MembershipPayload | PartnerPayload;

const json = (body: unknown, status = 200, extraHeaders: HeadersInit = {}) => new Response(JSON.stringify(body), {
  status,
  headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extraHeaders },
});

const text = (value: unknown, max = 4000) => String(value ?? "").trim().slice(0, max);
const emailOk = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;

const allowedOrigins = () => (Deno.env.get("PUBLIC_SITE_ORIGINS") ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

async function verifyTurnstile(token: string, remoteIp: string | null) {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) throw new Error("TURNSTILE_NOT_CONFIGURED");
  if (!token) return false;

  const form = new FormData();
  form.set("secret", secret);
  form.set("response", token);
  if (remoteIp) form.set("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body: form });
  if (!response.ok) return false;
  const result = await response.json() as { success?: boolean; hostname?: string };
  return result.success === true;
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin") ?? "";
  const origins = allowedOrigins();
  const cors = origin && origins.includes(origin)
    ? { "access-control-allow-origin": origin, "vary": "Origin", "access-control-allow-headers": "content-type", "access-control-allow-methods": "POST, OPTIONS" }
    : {};

  if (request.method === "OPTIONS") {
    if (!origin || !origins.includes(origin)) return new Response(null, { status: 403 });
    return new Response(null, { status: 204, headers: cors });
  }

  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, cors);
  if (!origin || !origins.includes(origin)) return json({ error: "origin_not_allowed" }, 403, cors);
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) return json({ error: "json_required" }, 415, cors);

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > 32_000) return json({ error: "payload_too_large" }, 413, cors);

  let payload: IntakePayload;
  try {
    payload = await request.json() as IntakePayload;
  } catch {
    return json({ error: "invalid_json" }, 400, cors);
  }

  // Honeypot: real people never see this field.
  if (text(payload.website, 200)) return json({ ok: true, reference: "received" }, 202, cors);

  try {
    const turnstileOk = await verifyTurnstile(text(payload.turnstileToken, 3000), request.headers.get("cf-connecting-ip"));
    if (!turnstileOk) return json({ error: "human_verification_failed" }, 400, cors);
  } catch (error) {
    if (error instanceof Error && error.message === "TURNSTILE_NOT_CONFIGURED") {
      // Fail closed. A public intake endpoint should not quietly lose its abuse control.
      return json({ error: "intake_not_ready" }, 503, cors);
    }
    return json({ error: "human_verification_unavailable" }, 503, cors);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return json({ error: "intake_not_ready" }, 503, cors);
  const supabase = createClient(supabaseUrl, serviceRoleKey, { auth: { persistSession: false, autoRefreshToken: false } });

  if (payload.kind === "membership") {
    const name = text(payload.name, 140);
    const email = text(payload.email, 254).toLowerCase();
    const building = text(payload.building);
    const complicated = text(payload.complicated);
    const contribution = text(payload.contribution);
    if (!name || !emailOk(email) || !building || !complicated || !contribution || !["Individual", "Family"].includes(payload.membership)) {
      return json({ error: "invalid_application" }, 400, cors);
    }

    const { data, error } = await supabase.from("membership_applications").insert({
      application_kind: payload.membership.toLowerCase(),
      name,
      email,
      location: text(payload.location, 240) || null,
      profile: text(payload.profile, 240) || null,
      building,
      complicated,
      contribution,
      referral: text(payload.referral, 500) || null,
      status: "applicant",
    }).select("id").single();

    if (error) {
      console.error("membership intake failed", { code: error.code, message: error.message });
      return json({ error: "submission_failed" }, 500, cors);
    }
    return json({ ok: true, reference: `PT-${String(data.id).slice(0, 8).toUpperCase()}` }, 201, cors);
  }

  const contactName = text(payload.contactName, 140);
  const email = text(payload.email, 254).toLowerCase();
  const firm = text(payload.firm, 220);
  const category = text(payload.category, 160);
  const whyRelevant = text(payload.whyRelevant);
  const familyExperience = text(payload.familyExperience);
  const references = text(payload.references);
  if (!contactName || !emailOk(email) || !firm || !category || !whyRelevant || !familyExperience || !references) {
    return json({ error: "invalid_application" }, 400, cors);
  }

  const jurisdictions = text(payload.locations, 1000).split(/[,/;]+/).map((value) => value.trim()).filter(Boolean).slice(0, 20);
  const { data, error } = await supabase.from("partner_applications").insert({
    firm_name: firm,
    contact_name: contactName,
    contact_email: email,
    website: text(payload.websiteUrl, 400) || null,
    category,
    jurisdictions,
    why_relevant: `${familyExperience}\n\n${whyRelevant}`.slice(0, 8000),
    member_value: text(payload.memberBenefit) || "Not specified",
    professional_regulation: text(payload.regulatoryStatus, 2000) || null,
    conflicts_note: text(payload.conflicts, 3000) || null,
    references_note: references,
    status: "new",
  }).select("id").single();

  if (error) {
    console.error("partner intake failed", { code: error.code, message: error.message });
    return json({ error: "submission_failed" }, 500, cors);
  }
  return json({ ok: true, reference: `PP-${String(data.id).slice(0, 8).toUpperCase()}` }, 201, cors);
});
