import type { MembershipApplication } from "@/data/applicationStore";
import type { PartnerApplication } from "@/data/partnerApplicationStore";
import { referenceConsentSchema, referencePairSchema } from "@/lib/applicationReferences";

const env = import.meta.env as Record<string, string | undefined>;
const intakeUrl = env['VITE_APPLICATION_INTAKE_URL']?.trim();

export type IntakeResult = { reference: string; mode: "production" | "preview" };

type MembershipInput = Omit<MembershipApplication, "id" | "submittedAt" | "status"> & { website?: string };
type PartnerInput = Omit<PartnerApplication, "id" | "submittedAt" | "status"> & { websiteUrl?: string; website?: string };

async function postIntake(payload: Record<string, unknown>, turnstileToken: string): Promise<string> {
  if (!intakeUrl) throw new Error("NO_INTAKE_URL");
  if (!turnstileToken) throw new Error("SECURITY_CHECK_REQUIRED");

  const response = await fetch(intakeUrl, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...payload, turnstileToken }),
  });

  const result = await response.json().catch(() => ({})) as { reference?: string; error?: string };
  if (!response.ok || !result.reference) {
    const error = new Error(result.error || "SUBMISSION_FAILED");
    error.name = "ApplicationIntakeError";
    throw error;
  }
  return result.reference;
}

function assertReferences(input: { references: unknown; referenceConsent: unknown }) {
  if (!referencePairSchema.safeParse(input.references).success) throw new Error("REFERENCES_REQUIRED");
  if (!referenceConsentSchema.safeParse(input.referenceConsent).success) throw new Error("REFERENCE_CONSENT_REQUIRED");
}

export async function submitMembershipIntake(
  input: MembershipInput,
  turnstileToken: string,
  previewSave: (application: MembershipApplication) => void,
): Promise<IntakeResult> {
  assertReferences(input);
  if (intakeUrl) {
    const reference = await postIntake({
      kind: "membership",
      name: input.name,
      email: input.email,
      location: input.location,
      profile: input.profile,
      membership: input.membership,
      building: input.building,
      complicated: input.complicated,
      contribution: input.contribution,
      referral: input.referral,
      references: input.references,
      referenceConsent: input.referenceConsent,
      website: input.website,
    }, turnstileToken);
    return { reference, mode: "production" };
  }

  const reference = `PT-${Date.now().toString().slice(-8)}`;
  previewSave({
    id: reference,
    submittedAt: new Date().toISOString(),
    status: "New",
    name: input.name,
    email: input.email,
    location: input.location,
    profile: input.profile,
    membership: input.membership,
    building: input.building,
    complicated: input.complicated,
    contribution: input.contribution,
    referral: input.referral,
    references: input.references,
    referenceConsent: input.referenceConsent,
  });
  return { reference, mode: "preview" };
}

export async function submitPartnerIntake(
  input: PartnerInput,
  turnstileToken: string,
  previewSave: (application: PartnerApplication) => void,
): Promise<IntakeResult> {
  assertReferences(input);
  if (intakeUrl) {
    const reference = await postIntake({
      kind: "partner",
      contactName: input.contactName,
      email: input.email,
      firm: input.firm,
      websiteUrl: input.websiteUrl,
      category: input.category,
      locations: input.locations,
      regulatoryStatus: input.regulatoryStatus,
      familyExperience: input.familyExperience,
      whyRelevant: input.whyRelevant,
      memberBenefit: input.memberBenefit,
      references: input.references,
      referenceConsent: input.referenceConsent,
      conflicts: input.conflicts,
      website: input.website,
    }, turnstileToken);
    return { reference, mode: "production" };
  }

  const reference = `PP-${Date.now().toString().slice(-8)}`;
  previewSave({
    id: reference,
    submittedAt: new Date().toISOString(),
    status: "New",
    contactName: input.contactName,
    email: input.email,
    firm: input.firm,
    category: input.category,
    locations: input.locations,
    regulatoryStatus: input.regulatoryStatus,
    familyExperience: input.familyExperience,
    whyRelevant: input.whyRelevant,
    memberBenefit: input.memberBenefit,
    references: input.references,
    referenceConsent: input.referenceConsent,
    conflicts: input.conflicts,
  });
  return { reference, mode: "preview" };
}

export function applicationIntakeEnabled() { return Boolean(intakeUrl); }

export const CONTACT_PREVIEW_KEY = "montvelle:contact-messages-preview";

export type ContactCategory =
  | "Membership"
  | "Privacy / data request"
  | "Legal / formal notice"
  | "Cancellation"
  | "Supplier / partner"
  | "Accessibility"
  | "Other";

export type ContactMessage = {
  id: string;
  submittedAt: string;
  category: ContactCategory;
  name: string;
  contact: string;
  country: string;
  message: string;
  acknowledgedPrivacy: boolean;
};

type ContactInput = Omit<ContactMessage, "id" | "submittedAt"> & { website?: string };

/**
 * Preview mode stores the message in browser storage only. Nothing is delivered
 * until the production intake endpoint (VITE_APPLICATION_INTAKE_URL) is set.
 */
export async function submitContactIntake(
  input: ContactInput,
  turnstileToken: string,
): Promise<IntakeResult> {
  if (intakeUrl) {
    const reference = await postIntake({
      kind: "contact",
      category: input.category,
      name: input.name,
      contact: input.contact,
      country: input.country,
      message: input.message,
      acknowledgedPrivacy: input.acknowledgedPrivacy,
      website: input.website,
    }, turnstileToken);
    return { reference, mode: "production" };
  }

  const reference = `MC-${Date.now().toString().slice(-8)}`;
  if (typeof window !== "undefined") {
    try {
      const raw = window.localStorage.getItem(CONTACT_PREVIEW_KEY);
      const existing = raw ? (JSON.parse(raw) as ContactMessage[]) : [];
      const record: ContactMessage = {
        id: reference,
        submittedAt: new Date().toISOString(),
        category: input.category,
        name: input.name,
        contact: input.contact,
        country: input.country,
        message: input.message,
        acknowledgedPrivacy: input.acknowledgedPrivacy,
      };
      window.localStorage.setItem(CONTACT_PREVIEW_KEY, JSON.stringify([record, ...existing].slice(0, 50)));
    } catch {
      // Storage unavailable — do not block the submission acknowledgement.
    }
  }
  return { reference, mode: "preview" };
}
