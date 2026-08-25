import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

type ContactCategory =
  | "Membership"
  | "Privacy / data request"
  | "Legal / formal notice"
  | "Cancellation"
  | "Supplier / partner"
  | "Accessibility"
  | "Other";

type ContactPayload = {
  category?: ContactCategory;
  name?: string;
  contact?: string;
  country?: string;
  message?: string;
  acknowledgedPrivacy?: boolean;
  website?: string;
  turnstileToken?: string;
};

const CATEGORIES = new Set<ContactCategory>([
  "Membership",
  "Privacy / data request",
  "Legal / formal notice",
  "Cancellation",
  "Supplier / partner",
  "Accessibility",
  "Other",
]);

const DEFAULT_ORIGINS = new Set([
  "https://montvelle.lovable.app",
  "http://localhost:8080",
  "http://localhost:3000",
]);

const configuredOrigins = () => (Deno.env.get("PUBLIC_SITE_ORIGINS") ?? "")
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

function originAllowed(origin: string) {
  if (!origin) return false;
  if (DEFAULT_ORIGINS.has(origin) || configuredOrigins().includes(origin)) return true;
  return /^https:\/\/id-preview--[a-z0-9-]+\.lovable\.app$/i.test(origin);
}

const text = (value: unknown, max: number) => String(value ?? "").trim().slice(0, max);

const json = (body: unknown, status = 200, cors: HeadersInit = {}) => new Response(JSON.stringify(body), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
    ...cors,
  },
});

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function verifyTurnstile(token: string, remoteIp: string | null, expectedHost: string) {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY")?.trim();
  if (!secret) return true; // Rate-limit + origin + honeypot remain active when Turnstile is not configured.
  if (!token) return false;

  const form = new FormData();
  form.set("secret", secret);
  form.set("response", token);
  if (remoteIp) form.set("remoteip", remoteIp);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: form,
  });
  if (!response.ok) return false;

  const result = await response.json() as { success?: boolean; hostname?: string; action?: string };
  return result.success === true
    && (!result.action || result.action === "contact")
    && (!result.hostname || result.hostname === expectedHost);
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin") ?? "";
  const cors = originAllowed(origin)
    ? {
        "access-control-allow-origin": origin,
        "access-control-allow-headers": "content-type",
        "access-control-allow-methods": "POST, OPTIONS",
        "vary": "Origin",
      }
    : {};

  if (request.method === "OPTIONS") {
    if (!originAllowed(origin)) return new Response(null, { status: 403 });
    return new Response(null, { status: 204, headers: cors });
  }
  if (request.method !== "POST") return json({ error: "method_not_allowed" }, 405, cors);
  if (!originAllowed(origin)) return json({ error: "origin_not_allowed" }, 403, cors);
  if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
    return json({ error: "json_required" }, 415, cors);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? "0");
  if (declaredLength > 16_000) return json({ error: "payload_too_large" }, 413, cors);

  let payload: ContactPayload;
  try {
    payload = await request.json() as ContactPayload;
  } catch {
    return json({ error: "invalid_json" }, 400, cors);
  }

  // Honeypot: do not reveal bot detection behaviour.
  if (text(payload.website, 200)) return json({ ok: true, reference: "received" }, 202, cors);

  const category = text(payload.category, 80) as ContactCategory;
  const name = text(payload.name, 140);
  const contact = text(payload.contact, 320);
  const country = text(payload.country, 120);
  const message = text(payload.message, 8000);

  if (!CATEGORIES.has(category) || name.length < 1 || contact.length < 3 || country.length < 1 || message.length < 1 || payload.acknowledgedPrivacy !== true) {
    return json({ error: "invalid_contact_message" }, 400, cors);
  }

  const remoteIp = request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? null;
  const expectedHost = new URL(origin).hostname;
  const turnstileOk = await verifyTurnstile(text(payload.turnstileToken, 3000), remoteIp, expectedHost);
  if (!turnstileOk) return json({ error: "human_verification_failed" }, 400, cors);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) return json({ error: "intake_not_ready" }, 503, cors);

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const sourceHash = remoteIp ? await sha256(`montvelle-contact-v1:${remoteIp}`) : null;
  if (sourceHash) {
    const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const { count, error: countError } = await supabase
      .from("contact_messages")
      .select("id", { head: true, count: "exact" })
      .eq("source_hash", sourceHash)
      .gte("created_at", since);
    if (countError) {
      console.error("contact rate-limit check failed", { code: countError.code, message: countError.message });
      return json({ error: "intake_not_ready" }, 503, cors);
    }
    if ((count ?? 0) >= 5) return json({ error: "rate_limited" }, 429, cors);
  }

  const { data, error } = await supabase.from("contact_messages").insert({
    category,
    name,
    contact,
    country,
    message,
    acknowledged_privacy: true,
    source_hash: sourceHash,
    user_agent: text(request.headers.get("user-agent"), 500) || null,
    status: "new",
  }).select("id").single();

  if (error) {
    console.error("contact intake failed", { code: error.code, message: error.message });
    return json({ error: "submission_failed" }, 500, cors);
  }

  return json({ ok: true, reference: `MC-${String(data.id).slice(0, 8).toUpperCase()}` }, 201, cors);
});
