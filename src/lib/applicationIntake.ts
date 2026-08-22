import type { MembershipApplication } from "@/data/applicationStore";
import type { PartnerApplication } from "@/data/partnerApplicationStore";

const env = import.meta.env as Record<string, string | undefined>;
const intakeUrl = env.VITE_APPLICATION_INTAKE_URL?.trim();

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

export async function submitMembershipIntake(
  input: MembershipInput,
  turnstileToken: string,
  previewSave: (application: MembershipApplication) => void,
): Promise<IntakeResult> {
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
  });
  return { reference, mode: "preview" };
}

export async function submitPartnerIntake(
  input: PartnerInput,
  turnstileToken: string,
  previewSave: (application: PartnerApplication) => void,
): Promise<IntakeResult> {
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
    conflicts: input.conflicts,
  });
  return { reference, mode: "preview" };
}

export function applicationIntakeEnabled() { return Boolean(intakeUrl); }
