/**
 * Member-facing sourcing requests.
 *
 * Montvelle is demand-led: there is no standing supplier catalogue. A member
 * describes what they need, the desk goes and searches the market, and only a
 * small number of checked options come back. Nothing in this module implies an
 * existing network, and no provider name reaches a member until the desk has
 * actually spoken to that provider.
 *
 * Preview persistence is localStorage; the shapes mirror the tables prepared in
 * supabase/planned/sourcing_desk.sql.
 */

export type MemberRequestStatus =
  | "Received"
  | "Searching"
  | "Options being checked"
  | "Options ready"
  | "Arranged"
  | "Closed";

export const memberRequestStatuses: MemberRequestStatus[] = [
  "Received",
  "Searching",
  "Options being checked",
  "Options ready",
  "Arranged",
  "Closed",
];

export const memberStatusNote: Record<MemberRequestStatus, string> = {
  Received: "We have your request and will confirm the brief before approaching anyone.",
  Searching: "We are searching the market and making enquiries on your behalf.",
  "Options being checked": "Responses are in. We are checking suitability, terms and availability.",
  "Options ready": "A small number of options are ready for you to consider.",
  Arranged: "Arranged. We will stay with it until the day itself.",
  Closed: "Closed.",
};

export type MemberOptionStatus = "Proposed" | "Chosen" | "Set aside";

export type MemberSourcingOption = {
  id: string;
  label: string;
  note: string;
  indicative: string;
  availability: string;
  status: MemberOptionStatus;
};

export type MemberSourcingUpdate = { id: string; at: string; note: string };

export type MemberSourcingRequest = {
  id: string;
  /** Neutral title. Never a provider or supplier name. */
  title: string;
  need: string;
  city: string;
  timeframe: string;
  logistics: string;
  preferences: string;
  budget: string;
  /** The member has asked Montvelle to handle the whole thing end to end. */
  fullHandling: boolean;
  status: MemberRequestStatus;
  opened: string;
  updates: MemberSourcingUpdate[];
  options: MemberSourcingOption[];
};

const REQUEST_KEY = "montvelle:member-sourcing:v1";

/** Neutral demo requests. No provider names, no invented relationships. */
export const seedMemberRequests: MemberSourcingRequest[] = [
  {
    id: "MSR-2101",
    title: "A private room for six working lunches in London",
    need: "A discreet central-London room for small working lunches through September. Six occasions, four to six people, weekday lunchtimes.",
    city: "London",
    timeframe: "September 2026",
    logistics: "Four to six people. Separate entrance preferred.",
    preferences: "Quiet, no photography, unobtrusive service.",
    budget: "Not stated",
    fullHandling: true,
    status: "Searching",
    opened: "2026-08-14",
    updates: [
      { id: "u-1", at: "2026-08-14", note: "Brief confirmed with you before any enquiry was made." },
      { id: "u-2", at: "2026-08-16", note: "Enquiries out to a handful of rooms that fit the brief. Awaiting replies." },
    ],
    options: [],
  },
  {
    id: "MSR-2098",
    title: "A short-notice car and driver in Paris",
    need: "A car and driver for two days around a family arrival, with luggage capacity and a driver who is comfortable waiting.",
    city: "Paris",
    timeframe: "14–16 September 2026",
    logistics: "Two adults, four cases.",
    preferences: "Discretion above all. No branding on the vehicle.",
    budget: "Up to €1,200 for the two days",
    fullHandling: false,
    status: "Options ready",
    opened: "2026-08-09",
    updates: [
      { id: "u-3", at: "2026-08-09", note: "Received." },
      { id: "u-4", at: "2026-08-11", note: "Six enquiries made. Three replied within the timeframe." },
      { id: "u-5", at: "2026-08-13", note: "Two checked and ready for you." },
    ],
    options: [
      {
        id: "opt-a",
        label: "Option A",
        note: "Independent operator, English and French speaking, has held a similar standing arrangement for another private client office. Insurance and licence confirmed by us.",
        indicative: "€980 for the two days, waiting time included",
        availability: "Confirmed for both days",
        status: "Proposed",
      },
      {
        id: "opt-b",
        label: "Option B",
        note: "Small firm with two vehicles. Slightly higher, but able to hold a second car on standby.",
        indicative: "€1,240 for the two days",
        availability: "Confirmed, second car provisional",
        status: "Proposed",
      },
    ],
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

export const openMemberRequests = (requests: MemberSourcingRequest[]) =>
  requests.filter((request) => request.status !== "Closed" && request.status !== "Arranged");

/** A neutral, member-safe title derived from the need, never a provider name. */
export function neutralTitle(need: string, city: string) {
  const trimmed = need.trim().replace(/\s+/g, " ");
  const short = trimmed.length > 74 ? `${trimmed.slice(0, 74).trimEnd()}…` : trimmed;
  return city && !short.toLowerCase().includes(city.toLowerCase()) ? `${short} · ${city}` : short;
}
