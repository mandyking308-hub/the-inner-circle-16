/**
 * Montvelle Sourcing Desk — preview data layer.
 *
 * Two lanes sit behind every concierge enquiry marked `Needs sourcing`:
 *   1. Bench lane — search the approved Private Services / Trusted Partner bench.
 *   2. External lane — record prospective suppliers, venues and private members
 *      clubs discovered outside the network, so the research survives the enquiry.
 *
 * Nothing here approves a supplier. External organisations stay prospects until
 * assurance and references are complete and they have come through the existing
 * partner-application path.
 *
 * There is no live external search integration in the app. Search runs are
 * recorded by hand, and every sourcing case carries an explicit research state
 * so the desk can see what has genuinely been looked at.
 *
 * Persisted to localStorage for the internal preview. Shapes mirror the prepared
 * migration supabase/migrations/20260823T1600_sourcing_desk.sql (not applied).
 */

import { serviceOfferings, supplierOrgs, type BookingMode, type ServiceCategory } from "@/data/privateServices";

export type ResearchState = "Research required" | "Research in progress" | "Research complete";

export type SourcingStage =
  | "Open"
  | "Bench review"
  | "External research"
  | "Awaiting replies"
  | "Assurance"
  | "Added to network"
  | "Closed";

export const sourcingStages: SourcingStage[] = [
  "Open",
  "Bench review",
  "External research",
  "Awaiting replies",
  "Assurance",
  "Added to network",
  "Closed",
];

export type ResponseStatus = "Not contacted" | "Brief sent" | "Replied" | "Awaiting reply" | "No reply" | "Declined";
export type DueDiligenceStatus = "Not started" | "In progress" | "Complete" | "Concern raised";
export type ProspectReferenceStatus = "Not started" | "Requested" | "Complete" | "Concern raised";
export type RelationshipStatus =
  | "Prospect"
  | "In conversation"
  | "Invited to apply"
  | "Application received"
  | "Approved bench"
  | "Not suitable";

/** Consent governs how much of the member's own context may leave the house. */
export type BriefConsent = "neutral" | "extended";

export type ShortlistItem = {
  id: string;
  kind: "bench" | "prospect";
  refId: string;
  title: string;
  note: string;
  /** Only curated items reach the member. Raw prospect research never does. */
  sharedWithMember: boolean;
};

export type SourcingCase = {
  id: string;
  caseId: string;
  member: string;
  category: ServiceCategory;
  cities: string[];
  need: string;
  preferredMode: BookingMode;
  /** Member-private. Never leaves the desk. */
  memberContext: string;
  /** The only text a prospect may receive unless consent is extended. */
  neutralBrief: string;
  consent: BriefConsent;
  stage: SourcingStage;
  research: ResearchState;
  benchReviewed: boolean;
  owner: string;
  opened: string;
  shortlist: ShortlistItem[];
};

export type SearchRun = {
  id: string;
  sourcingId: string;
  at: string;
  by: string;
  method: "Bench search" | "Manual research" | "Relationship enquiry" | "Member suggestion";
  query: string;
  outcome: string;
};

export type SupplierProspect = {
  id: string;
  name: string;
  category: ServiceCategory;
  locations: string[];
  website: string;
  contactRoute: string;
  sourceNotes: string;
  whyRelevant: string;
  sourcingId?: string | undefined;
  caseId?: string | undefined;
  lastContacted?: string | undefined;
  response: ResponseStatus;
  indicativeTerms: string;
  availability: string;
  dueDiligence: DueDiligenceStatus;
  references: ProspectReferenceStatus;
  relationship: RelationshipStatus;
  invitedToApply: boolean;
  /** Set when the prospect enters the existing partner-application path. */
  partnerApplicationRef?: string | undefined;
  addedAt: string;
};

const SOURCING_KEY = "montvelle:sourcing-cases:v1";
const PROSPECT_KEY = "montvelle:sourcing-prospects:v1";
const SEARCH_KEY = "montvelle:sourcing-runs:v1";

export const seedSourcingCases: SourcingCase[] = [
  {
    id: "SRC-101",
    caseId: "REQ-2033",
    member: "Nina Shah",
    category: "Clubs & access",
    cities: ["London"],
    need: "A quiet London base for six working lunches through September",
    preferredMode: "request",
    memberContext:
      "Meetings relate to a sale process the member does not want visible. Two guests are known faces. Prefers no photography and a separate entrance.",
    neutralBrief:
      "A private member seeks a discreet central-London room for small working lunches over September. Six occasions, four to six people, weekday lunchtimes. Privacy and a quiet room matter more than menu.",
    consent: "neutral",
    stage: "External research",
    research: "Research in progress",
    benchReviewed: true,
    owner: "Maya",
    opened: "2026-08-14",
    shortlist: [
      {
        id: "SL-1",
        kind: "bench",
        refId: "sup-table",
        title: "Maison Verrier — private room",
        note: "Known room, tested discretion. Available three of the six dates.",
        sharedWithMember: true,
      },
      {
        id: "SL-2",
        kind: "prospect",
        refId: "PRO-201",
        title: "A members' house in St James's",
        note: "Separate entrance and a room that seats six. Terms being confirmed.",
        sharedWithMember: true,
      },
    ],
  },
  {
    id: "SRC-102",
    caseId: "REQ-2048",
    member: "Amelia Hart",
    category: "Education",
    cities: ["London"],
    need: "An education adviser who can hold curriculum continuity and relocation timing together",
    preferredMode: "introduction",
    memberContext:
      "Move is contingent on a residence decision that is not yet public. One child has a specific learning-support requirement the family has not disclosed widely.",
    neutralBrief:
      "A family relocating to London before October seeks an education adviser able to consider curriculum continuity alongside the timing of a move. Introduction only.",
    consent: "neutral",
    stage: "Bench review",
    research: "Research complete",
    benchReviewed: true,
    owner: "Sofia",
    opened: "2026-08-20",
    shortlist: [
      {
        id: "SL-3",
        kind: "bench",
        refId: "partner-03",
        title: "Education adviser — bench",
        note: "Fifteen completed briefs, strongest follow-through score on the bench.",
        sharedWithMember: true,
      },
    ],
  },
  {
    id: "SRC-103",
    caseId: "REQ-2041",
    member: "Julian Mercer",
    category: "Property",
    cities: ["Lisbon", "Dubai"],
    need: "Off-market residential search in two cities on the same shortlist",
    preferredMode: "introduction",
    memberContext: "Household would prefer neither market to know the other is being considered.",
    neutralBrief:
      "A private client seeks quiet, off-market residential search support in one European and one Gulf city. No listing exposure. Introduction only.",
    consent: "neutral",
    stage: "Open",
    research: "Research required",
    benchReviewed: false,
    owner: "Daniel",
    opened: "2026-08-22",
    shortlist: [],
  },
];

export const seedProspects: SupplierProspect[] = [
  {
    id: "PRO-201",
    name: "St James's House (members' club)",
    category: "Clubs & access",
    locations: ["London"],
    website: "Held by the desk",
    contactRoute: "Membership secretary, introduced through an existing member",
    sourceNotes: "Suggested by a Montvelle relationship rather than a directory. Not publicly marketed.",
    whyRelevant: "Separate entrance, three small rooms, no photography policy already in place.",
    sourcingId: "SRC-101",
    caseId: "REQ-2033",
    lastContacted: "2026-08-19",
    response: "Replied",
    indicativeTerms: "Room held on a per-occasion basis. Guest policy confirmed in writing.",
    availability: "Three weekday rooms per week through September",
    dueDiligence: "In progress",
    references: "Requested",
    relationship: "In conversation",
    invitedToApply: false,
    addedAt: "2026-08-16",
  },
  {
    id: "PRO-202",
    name: "Trelawney Rooms",
    category: "Dining & venues",
    locations: ["London"],
    website: "Held by the desk",
    contactRoute: "General manager, direct line",
    sourceNotes: "Manual research. Two rooms visited by the desk in August.",
    whyRelevant: "Unlisted upstairs room, good acoustic separation, used to private groups.",
    sourcingId: "SRC-101",
    caseId: "REQ-2033",
    lastContacted: "2026-08-18",
    response: "Awaiting reply",
    indicativeTerms: "Not yet quoted",
    availability: "Not yet confirmed",
    dueDiligence: "Not started",
    references: "Not started",
    relationship: "Prospect",
    invitedToApply: false,
    addedAt: "2026-08-17",
  },
  {
    id: "PRO-203",
    name: "Quinta & Co Property",
    category: "Property",
    locations: ["Lisbon"],
    website: "Held by the desk",
    contactRoute: "Founding partner, introduced by an existing partner firm",
    sourceNotes: "Relationship enquiry through the legal bench. No cold approach made.",
    whyRelevant: "Works almost entirely off-market; no listing exposure at any stage.",
    lastContacted: "2026-08-12",
    response: "Replied",
    indicativeTerms: "Retained search fee, quoted per brief",
    availability: "Capacity from September",
    dueDiligence: "Complete",
    references: "Complete",
    relationship: "Invited to apply",
    invitedToApply: true,
    partnerApplicationRef: "Awaiting submission",
    addedAt: "2026-08-05",
  },
];

export const seedSearchRuns: SearchRun[] = [
  {
    id: "RUN-01",
    sourcingId: "SRC-101",
    at: "2026-08-15",
    by: "Maya",
    method: "Bench search",
    query: "Clubs & access + Dining & venues · London · private room, six covers",
    outcome: "One bench match (Maison Verrier). Bench judged insufficient for six separate dates.",
  },
  {
    id: "RUN-02",
    sourcingId: "SRC-101",
    at: "2026-08-16",
    by: "Maya",
    method: "Relationship enquiry",
    query: "Asked two members and one partner firm for discreet St James's / Mayfair rooms",
    outcome: "Two prospects recorded. No member context shared beyond the neutral brief.",
  },
  {
    id: "RUN-03",
    sourcingId: "SRC-102",
    at: "2026-08-21",
    by: "Sofia",
    method: "Bench search",
    query: "Education · London · relocation timing",
    outcome: "Bench sufficient. No external lane opened.",
  },
];

const read = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const write = (key: string, value: unknown) => {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* preview persistence is best-effort */
  }
};

export const readSourcingCases = () => read<SourcingCase[]>(SOURCING_KEY, seedSourcingCases);
export const writeSourcingCases = (cases: SourcingCase[]) => write(SOURCING_KEY, cases);
export const readProspects = () => read<SupplierProspect[]>(PROSPECT_KEY, seedProspects);
export const writeProspects = (prospects: SupplierProspect[]) => write(PROSPECT_KEY, prospects);
export const readSearchRuns = () => read<SearchRun[]>(SEARCH_KEY, seedSearchRuns);
export const writeSearchRuns = (runs: SearchRun[]) => write(SEARCH_KEY, runs);

export type BenchMatch = {
  supplierId: string;
  supplier: string;
  category: ServiceCategory;
  locations: string[];
  offeringId?: string;
  offering?: string;
  mode?: BookingMode;
  score: number;
  reason: string[];
};

/**
 * Bench-first matching over the approved Private Services / Trusted Partner bench.
 * Deterministic and local — this is a search of what Montvelle already trusts,
 * not an external lookup.
 */
export function matchBench(sourcing: Pick<SourcingCase, "category" | "cities" | "need" | "preferredMode">): BenchMatch[] {
  const words = sourcing.need.toLowerCase().split(/[^a-z]+/).filter((word) => word.length > 4);
  const matches: BenchMatch[] = [];

  for (const supplier of supplierOrgs) {
    const reason: string[] = [];
    let score = 0;

    if (supplier.category === sourcing.category) {
      score += 4;
      reason.push("Category match");
    }
    const cityHits = supplier.locations.filter((location) =>
      sourcing.cities.some((city) => location.toLowerCase() === city.toLowerCase() || location === "Global"),
    );
    if (cityHits.length) {
      score += 3;
      reason.push(`Present in ${cityHits.join(", ")}`);
    }
    if (words.some((word) => supplier.focus.toLowerCase().includes(word))) {
      score += 2;
      reason.push("Focus language overlaps the need");
    }

    const offering = serviceOfferings.find(
      (service) =>
        service.supplierId === supplier.id &&
        (service.cities.some((city) => sourcing.cities.includes(city)) || service.category === sourcing.category),
    );
    if (offering) {
      score += 1;
      reason.push("Published offering available");
      if (offering.mode === sourcing.preferredMode) {
        score += 1;
        reason.push("Booking route matches the request");
      }
    }

    if (score < 4) continue;
    matches.push({
      supplierId: supplier.id,
      supplier: supplier.name,
      category: supplier.category,
      locations: supplier.locations,
      ...(offering ? { offeringId: offering.id, offering: offering.title, mode: offering.mode } : {}),
      score,
      reason,
    });
  }

  return matches.sort((a, b) => b.score - a.score);
}

export const prospectsForCase = (prospects: SupplierProspect[], sourcingId: string) =>
  prospects.filter((prospect) => prospect.sourcingId === sourcingId);

export const runsForCase = (runs: SearchRun[], sourcingId: string) =>
  runs.filter((run) => run.sourcingId === sourcingId);

/** Only the curated, explicitly shared shortlist is ever readable by a member. */
export const memberShortlist = (cases: SourcingCase[], conciergeCaseId: string) =>
  cases
    .filter((item) => item.caseId === conciergeCaseId)
    .flatMap((item) => item.shortlist.filter((entry) => entry.sharedWithMember));

/** A prospect may only reach the bench once assurance and references are clean. */
export const readyForBench = (prospect: SupplierProspect) =>
  prospect.dueDiligence === "Complete" && prospect.references === "Complete" && prospect.invitedToApply;

export const briefFor = (sourcing: SourcingCase) =>
  sourcing.consent === "extended"
    ? `${sourcing.neutralBrief}\n\nAdditional context released with the member's explicit consent:\n${sourcing.memberContext}`
    : sourcing.neutralBrief;

export const draftInvitation = (prospect: SupplierProspect, sourcing?: SourcingCase) =>
  [
    `Dear ${prospect.name},`,
    "",
    "I write privately on behalf of Montvelle, a small London membership community of families and their private office.",
    sourcing
      ? `We are working on a request where your work may be relevant: ${briefFor(sourcing)}`
      : "We are building a small bench of organisations our members' households can rely on.",
    "",
    "We do not publish our members, and nothing about them is shared beyond what you have read above. If this is of interest, we would begin with a short conversation, followed by our standard assurance and two references before any member work is discussed.",
    "",
    "With kind regards,",
    "The Montvelle Private Office",
  ].join("\n");

export const stageCounts = (cases: SourcingCase[]) =>
  sourcingStages.reduce<Record<SourcingStage, number>>((accumulator, stage) => {
    accumulator[stage] = cases.filter((item) => item.stage === stage).length;
    return accumulator;
  }, {} as Record<SourcingStage, number>);

export const readReadyState = (prospect: SupplierProspect) => {
  const outstanding: string[] = [];
  if (prospect.dueDiligence !== "Complete") outstanding.push("due diligence");
  if (prospect.references !== "Complete") outstanding.push("references");
  if (!prospect.invitedToApply) outstanding.push("an invitation to apply");
  if (!outstanding.length) return "Ready for the approved bench.";
  return `Outstanding before the bench: ${outstanding.join(", ")}.`;
};
