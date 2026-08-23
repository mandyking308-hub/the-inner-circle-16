import type { ApplicationReference } from "@/lib/applicationReferences";

export const PARTNER_APPLICATION_STORAGE_KEY = "project-table:partner-applications";

export type PartnerApplicationStatus =
  "New" | "Screening" | "References" | "Conversation" | "Approved" | "Declined";

export type PartnerApplication = {
  id: string;
  submittedAt: string;
  status: PartnerApplicationStatus;
  contactName: string;
  email: string;
  firm: string;
  category: string;
  locations: string;
  regulatoryStatus: string;
  familyExperience: string;
  whyRelevant: string;
  memberBenefit: string;
  /** Private assurance-review data. Never expose in member/supplier/public views. */
  references: [ApplicationReference, ApplicationReference];
  referenceConsent: boolean;
  conflicts: string;
};

export const starterPartnerApplications: PartnerApplication[] = [
  {
    id: "PP-FOUND-004",
    submittedAt: "2026-08-20T09:15:00.000Z",
    status: "References",
    contactName: "Eleanor March",
    email: "eleanor@example.com",
    firm: "March Private Client Advisory",
    category: "Legal & Tax",
    locations: "London / Geneva",
    regulatoryStatus:
      "Private-client legal practice; jurisdiction-specific advice handled by appropriately qualified lawyers.",
    familyExperience:
      "Cross-border founder and family-enterprise work involving ownership, succession and adviser coordination.",
    whyRelevant:
      "We are strongest where the family has several advisers and needs the legal work to fit a broader implementation plan.",
    memberBenefit: "Priority initial triage for complex cross-border briefs.",
    references: [
      {
        name: "Helena Voss",
        organisation: "Voss Family Office — Principal",
        email: "helena@example.com",
        relationship: "Instructed us on a cross-border succession matter over three years.",
        phone: "",
      },
      {
        name: "DEMO Partner Contact",
        organisation: "Okoye Trust Company — Director",
        email: "daniel@example.com",
        relationship: "Co-adviser on several shared family mandates.",
        phone: "",
      },
    ],
    referenceConsent: true,
    conflicts:
      "No referral payments requested. Any future commercial arrangement to be disclosed before member introductions.",
  },
];

export function loadPartnerApplications(): PartnerApplication[] {
  if (typeof window === "undefined") return starterPartnerApplications;
  try {
    const raw = window.localStorage.getItem(PARTNER_APPLICATION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as PartnerApplication[]) : starterPartnerApplications;
  } catch {
    return starterPartnerApplications;
  }
}

export function savePartnerApplications(applications: PartnerApplication[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(PARTNER_APPLICATION_STORAGE_KEY, JSON.stringify(applications));
}
