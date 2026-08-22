export const APPLICATION_STORAGE_KEY = "project-table:applications";

export type ApplicationStatus = "New" | "Review" | "Conversation" | "Accepted" | "Declined";

export type MembershipApplication = {
  id: string;
  submittedAt: string;
  status: ApplicationStatus;
  name: string;
  email: string;
  location: string;
  profile: string;
  membership: "Individual" | "Family" | "Trusted Partner";
  building: string;
  complicated: string;
  contribution: string;
  referral: string;
};

export const starterApplications: MembershipApplication[] = [
  {
    id: "PT-FOUND-017",
    submittedAt: "2026-08-18T11:20:00.000Z",
    status: "Conversation",
    name: "Amelia Hart",
    email: "amelia@example.com",
    location: "London / Geneva",
    profile: "Founder-led family enterprise",
    membership: "Family",
    building: "A consumer business moving into its second generation of ownership.",
    complicated: "We are trying to make residence, school decisions, family governance and the business timetable work as one plan.",
    contribution: "Experience scaling a family-owned brand across Europe and a willingness to mentor younger founders.",
    referral: "Introduced by a founding member",
  },
];

export function loadApplications(): MembershipApplication[] {
  if (typeof window === "undefined") return starterApplications;
  try {
    const raw = window.localStorage.getItem(APPLICATION_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MembershipApplication[]) : starterApplications;
  } catch {
    return starterApplications;
  }
}

export function saveApplications(applications: MembershipApplication[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(APPLICATION_STORAGE_KEY, JSON.stringify(applications));
}
