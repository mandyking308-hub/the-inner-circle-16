/**
 * Montvelle member requests — the single service model.
 *
 * Montvelle has no supplier base. Members do not browse anything: they make a
 * request, we acknowledge it immediately and commit to coming back with a
 * meaningful response within 24 hours. Everything external happens behind the
 * scenes, and no provider becomes a Montvelle supplier until they have actually
 * been useful, been invited, and completed assurance with two references.
 *
 * This module holds both sides of that: the member-facing request, and the
 * internal sourcing job attached to it. Only the member-facing fields are ever
 * rendered inside Montvelle World.
 *
 * Preview persistence is localStorage; shapes mirror supabase/planned/sourcing_desk.sql.
 */

/* ------------------------------------------------------------------ member */

export type MemberRequestStatus = "Received" | "In hand" | "Checking options" | "Ready for you" | "Arranged" | "Closed";

export const memberRequestStatuses: MemberRequestStatus[] = [
  "Received",
  "In hand",
  "Checking options",
  "Ready for you",
  "Arranged",
  "Closed",
];

export const memberStatusNote: Record<MemberRequestStatus, string> = {
  Received: "We have this. You will hear from us within 24 hours.",
  "In hand": "Someone at Montvelle is on it and making enquiries for you.",
  "Checking options": "Replies are coming back. We are checking suitability, terms and availability.",
  "Ready for you": "A small number of checked options are ready for you to consider.",
  Arranged: "Arranged. We stay with it until the day itself.",
  Closed: "Closed.",
};

export type MemberOptionStatus = "Proposed" | "Chosen" | "Set aside";

/** An option only exists once we have actually spoken to whoever is behind it. */
export type MemberSourcingOption = {
  id: string;
  label: string;
  note: string;
  indicative: string;
  availability: string;
  status: MemberOptionStatus;
};

export type MemberSourcingUpdate = { id: string; at: string; note: string };

/* ---------------------------------------------------------------- internal */

export type InternalStage =
  | "New request"
  | "Researching"
  | "Contacting"
  | "Responses received"
  | "Options prepared"
  | "Member decision"
  | "Arranged"
  | "Closed";

export const internalStages: InternalStage[] = [
  "New request",
  "Researching",
  "Contacting",
  "Responses received",
  "Options prepared",
  "Member decision",
  "Arranged",
  "Closed",
];

/** Internal-only. A member never sees any of this. */
export type ProspectStatus =
  | "Found"
  | "Contacted"
  | "Responded"
  | "Shortlisted"
  | "Used"
  | "Invite considered"
  | "Invited"
  | "Assurance"
  | "Approved"
  | "Declined";

export const prospectLifecycle: ProspectStatus[] = [
  "Found",
  "Contacted",
  "Responded",
  "Shortlisted",
  "Used",
  "Invite considered",
  "Invited",
  "Assurance",
  "Approved",
  "Declined",
];

export type Prospect = {
  id: string;
  requestId: string;
  name: string;
  contactRoute: string;
  website: string;
  category: string;
  location: string;
  whySuitable: string;
  contactedAt?: string;
  response: string;
  availability: string;
  indicativeTerms: string;
  shortlisted: boolean;
  used: boolean;
  outcome: string;
  considerForNetwork: boolean;
  status: ProspectStatus;
  addedAt: string;
  /** Internal QA fixture flag. Never rendered to a member. */
  demo?: boolean;
};

export type MemberSourcingRequest = {
  id: string;
  /** Neutral title. Never a provider name. */
  title: string;
  need: string;
  city: string;
  timeframe: string;
  logistics: string;
  preferences: string;
  budget: string;
  fullHandling: boolean;
  status: MemberRequestStatus;
  /** ISO timestamp the request arrived — the 24-hour clock starts here. */
  receivedAt: string;
  /** Set when the first meaningful member response has gone out. */
  respondedAt?: string;
  /** Short member-facing line: what happens next and roughly when. */
  nextUpdate: string;
  updates: MemberSourcingUpdate[];
  options: MemberSourcingOption[];
  /* internal */
  internalStage: InternalStage;
  owner: string;
  /** The minimum-necessary text an external provider may be given. */
  neutralBrief: string;
};

const REQUEST_KEY = "montvelle:member-requests:v3";
const PROSPECT_KEY = "montvelle:sourcing-prospects:v3";

const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3600_000).toISOString();
const day = (iso: string) => iso.slice(0, 10);

/** Neutral demo requests. No provider names, no invented relationships. */
export const seedMemberRequests: MemberSourcingRequest[] = [
  {
    id: "MR-2101",
    title: "A private room for six working lunches in London",
    need: "A discreet central-London room for small working lunches through September. Six occasions, four to six people, weekday lunchtimes.",
    city: "London",
    timeframe: "September 2026",
    logistics: "Four to six people. Separate entrance preferred.",
    preferences: "Quiet, no photography, unobtrusive service.",
    budget: "Not stated",
    fullHandling: true,
    status: "In hand",
    receivedAt: hoursAgo(30),
    respondedAt: hoursAgo(26),
    nextUpdate: "We will come back to you with rooms we have actually seen or spoken to by Thursday.",
    updates: [
      { id: "u-1", at: day(hoursAgo(30)), note: "Received. We will come back to you within 24 hours." },
      { id: "u-2", at: day(hoursAgo(26)), note: "In hand. Enquiries are going out today; nothing about you leaves this desk." },
    ],
    options: [],
    internalStage: "Contacting",
    owner: "Maya",
    neutralBrief:
      "A private client office seeks a discreet central-London room for small working lunches over September. Six occasions, four to six people, weekday lunchtimes. Privacy matters more than menu.",
  },
  {
    id: "MR-2098",
    title: "A car and driver in Paris for two days",
    need: "A car and driver for two days around a family arrival, with luggage capacity and a driver comfortable waiting.",
    city: "Paris",
    timeframe: "14–16 September 2026",
    logistics: "Two adults, four cases.",
    preferences: "Discretion above all. No branding on the vehicle.",
    budget: "Up to €1,200 for the two days",
    fullHandling: false,
    status: "Ready for you",
    receivedAt: hoursAgo(96),
    respondedAt: hoursAgo(88),
    nextUpdate: "Two checked options are with you. Tell us which one and we will arrange it.",
    updates: [
      { id: "u-3", at: day(hoursAgo(96)), note: "Received. We will come back to you within 24 hours." },
      { id: "u-4", at: day(hoursAgo(88)), note: "In hand. Enquiries made on your behalf." },
      { id: "u-5", at: day(hoursAgo(40)), note: "Two options checked for licence, insurance and availability, and ready for you." },
    ],
    options: [
      {
        id: "opt-a",
        label: "Option A",
        note: "Independent operator, English and French speaking. Licence and insurance confirmed by us in writing.",
        indicative: "€980 for the two days, waiting time included",
        availability: "Confirmed for both days",
        status: "Proposed",
      },
      {
        id: "opt-b",
        label: "Option B",
        note: "Small operator with two vehicles. Slightly higher, but able to hold a second car on standby.",
        indicative: "€1,240 for the two days",
        availability: "Confirmed, second car provisional",
        status: "Proposed",
      },
    ],
    internalStage: "Member decision",
    owner: "Sofia",
    neutralBrief:
      "A private client office requires a car and driver in Paris for two days in mid-September. Two passengers, four cases, waiting time expected. Discretion required.",
  },
  {
    id: "MR-2104",
    title: "A quiet house in the Cotswolds for a family weekend",
    need: "A private house for a family weekend in late October, walkable countryside, room for eight, no shared grounds.",
    city: "Cotswolds",
    timeframe: "Late October 2026",
    logistics: "Eight adults across four rooms.",
    preferences: "Somewhere unhurried. No staff presence beyond arrival.",
    budget: "Not stated",
    fullHandling: true,
    status: "Received",
    receivedAt: hoursAgo(6),
    nextUpdate: "We will come back to you within 24 hours.",
    updates: [{ id: "u-6", at: day(hoursAgo(6)), note: "Received. We will come back to you within 24 hours." }],
    options: [],
    internalStage: "New request",
    owner: "Unassigned",
    neutralBrief:
      "A private client office seeks a whole-house private let in the Cotswolds for a weekend in late October. Eight adults, four bedrooms, no shared grounds.",
  },
];

/** DEMO ONLY — internal QA fixtures for the sourcing desk. Never member-facing. */
export const seedProspects: Prospect[] = [
  {
    id: "PR-301",
    requestId: "MR-2101",
    name: "Demo venue prospect A",
    contactRoute: "General manager, direct line",
    website: "Held by the desk",
    category: "Dining & venues",
    location: "London",
    whySuitable: "Separate entrance, small upstairs room, used to private groups.",
    contactedAt: day(hoursAgo(24)),
    response: "Replied, asked for dates",
    availability: "Three weekday rooms per week in September",
    indicativeTerms: "Per-occasion room charge, minimum spend waived midweek",
    shortlisted: false,
    used: false,
    outcome: "",
    considerForNetwork: false,
    status: "Responded",
    addedAt: day(hoursAgo(28)),
    demo: true,
  },
  {
    id: "PR-302",
    requestId: "MR-2098",
    name: "Demo transport prospect B",
    contactRoute: "Direct email",
    website: "Held by the desk",
    category: "Ground transport",
    location: "Paris",
    whySuitable: "Bilingual, comfortable waiting, insurance evidenced.",
    contactedAt: day(hoursAgo(80)),
    response: "Replied with terms and availability",
    availability: "Confirmed for both days",
    indicativeTerms: "€980 for two days",
    shortlisted: true,
    used: false,
    outcome: "",
    considerForNetwork: false,
    status: "Shortlisted",
    addedAt: day(hoursAgo(84)),
    demo: true,
  },
];

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Preview persistence is best effort.
  }
}

export const readMemberRequests = () => read<MemberSourcingRequest[]>(REQUEST_KEY, seedMemberRequests);
export const writeMemberRequests = (requests: MemberSourcingRequest[]) => write(REQUEST_KEY, requests);
export const readProspects = () => read<Prospect[]>(PROSPECT_KEY, seedProspects);
export const writeProspects = (prospects: Prospect[]) => write(PROSPECT_KEY, prospects);

export const openMemberRequests = (requests: MemberSourcingRequest[]) =>
  requests.filter((request) => request.status !== "Closed" && request.status !== "Arranged");

/* --------------------------------------------------------- 24-hour standard */

export const RESPONSE_HOURS = 24;

export const responseDueAt = (request: MemberSourcingRequest) =>
  new Date(new Date(request.receivedAt).getTime() + RESPONSE_HOURS * 3600_000);

export type SlaState = { label: string; tone: "met" | "due" | "overdue"; hours: number };

/**
 * Operational SLA for the first meaningful member response — not a promise that
 * the request itself is resolved within 24 hours.
 */
export function responseSla(request: MemberSourcingRequest, now = Date.now()): SlaState {
  const due = responseDueAt(request).getTime();
  if (request.respondedAt) {
    return { label: "Responded", tone: "met", hours: 0 };
  }
  const hours = Math.round(((due - now) / 3600_000) * 10) / 10;
  if (hours < 0) return { label: `Overdue by ${Math.abs(hours)}h`, tone: "overdue", hours };
  return { label: `${hours}h remaining`, tone: hours <= 6 ? "overdue" : "due", hours };
}

export const formatReceived = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });

/** A neutral, member-safe title derived from the need, never a provider name. */
export function neutralTitle(need: string, city: string) {
  const trimmed = need.trim().replace(/\s+/g, " ");
  const short = trimmed.length > 74 ? `${trimmed.slice(0, 74).trimEnd()}…` : trimmed;
  return city && !short.toLowerCase().includes(city.toLowerCase()) ? `${short} · ${city}` : short;
}

/** The only text that may leave the house without the member's explicit consent. */
export function neutralBriefFor(request: Pick<MemberSourcingRequest, "need" | "city" | "timeframe" | "logistics">) {
  return [
    "A private client office is making an enquiry on behalf of a client.",
    request.need,
    request.city && request.city !== "Not stated" ? `Location: ${request.city}.` : "",
    request.timeframe && request.timeframe !== "Not stated" ? `Timing: ${request.timeframe}.` : "",
    request.logistics && request.logistics !== "Not stated" ? `Practicalities: ${request.logistics}.` : "",
    "No client details will be shared at this stage.",
  ]
    .filter(Boolean)
    .join(" ");
}

/** Member-safe options only. Raw prospect research never reaches a member. */
export const memberOptions = (request: MemberSourcingRequest) => request.options;

export const inviteDraft = (prospect: Prospect) =>
  [
    `Dear ${prospect.name},`,
    "",
    "I write privately on behalf of Montvelle, a small London membership community of families and their private office.",
    "We recently worked with you on a client arrangement, and it went well. On that basis we would like to invite you to apply to work with our members again on a more regular footing.",
    "",
    "The process is short: a conversation, our standard assurance, and two references. Nothing about our members is shared before that is complete.",
    "",
    "With kind regards,",
    "Montvelle",
  ].join("\n");
