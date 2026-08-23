/**
 * Montvelle World preview data layer.
 *
 * Everything here is seeded, non-real demo content persisted to localStorage so
 * the private rooms are fully usable in the internal preview. The shapes mirror
 * the Supabase tables added in 20260823T1200_montvelle_world.sql, so the same
 * screens can read from the database once accounts are live.
 */

import type { BookingMode } from "@/data/privateServices";

export type BookingStatus = "awaiting" | "upcoming" | "in_progress" | "past" | "cancelled";
export type PaymentRecord = "not_required" | "quote_pending" | "recorded" | "settled";

export const bookingStatusLabel: Record<BookingStatus, string> = {
  awaiting: "Awaiting confirmation",
  upcoming: "Upcoming",
  in_progress: "In progress",
  past: "Past",
  cancelled: "Cancelled",
};

export const bookingStatusOrder: BookingStatus[] = ["upcoming", "awaiting", "in_progress", "past", "cancelled"];

export type Booking = {
  id: string;
  serviceId: string;
  serviceTitle: string;
  supplierId: string;
  supplier: string;
  mode: BookingMode;
  city: string;
  when: string;
  party?: string | undefined;
  household: string;
  sharedContext: string[];
  quote: string;
  payment: PaymentRecord;
  cancellation: string;
  arrival: string;
  status: BookingStatus;
  conciergeOwner?: string | undefined;
  threadId: string;
  createdAt: string;
};

export type ThreadKind = "concierge" | "booking" | "partner" | "montvelle" | "gathering";
export type ThreadState = "needs_reply" | "waiting" | "active" | "closed";

export const threadStateLabel: Record<ThreadState, string> = {
  needs_reply: "Needs reply",
  waiting: "Waiting on someone else",
  active: "Confirmed / active",
  closed: "Closed",
};

export type ThreadMessage = {
  id: string;
  author: string;
  role: "member" | "concierge" | "supplier";
  body: string;
  at: string;
};

export type Thread = {
  id: string;
  kind: ThreadKind;
  subject: string;
  context: string;
  participants: string[];
  supplierId?: string | undefined;
  bookingId?: string | undefined;
  caseId?: string | undefined;
  state: ThreadState;
  messages: ThreadMessage[];
};

export type Preferences = {
  travel: string;
  dining: string;
  household: string;
  family: string;
  wellbeing: string;
  communications: string;
  favourites: string;
  avoid: string;
  defaultBooking: string;
};

const BOOKINGS_KEY = "montvelle:bookings:v1";
const THREADS_KEY = "montvelle:threads:v1";
const PREFERENCES_KEY = "montvelle:preferences:v1";

export const seedBookings: Booking[] = [
  {
    id: "BKG-4021",
    serviceId: "svc-airport",
    serviceTitle: "Airport arrival and transfer",
    supplierId: "sup-drive",
    supplier: "Provider sourced for this booking",
    mode: "book",
    city: "Paris",
    when: "14 September 2026 · 18:40",
    party: "2 adults, 3 cases",
    household: "DEMO Household",
    sharedContext: ["Arrival time and terminal", "Residence address", "Quiet car preferred"],
    quote: "€290",
    payment: "recorded",
    cancellation: "Free until 12 hours before landing.",
    arrival: "Driver meets at arrivals, name card not used. Message on landing.",
    status: "upcoming",
    threadId: "THR-01",
    createdAt: "2026-08-18",
  },
  {
    id: "BKG-4022",
    serviceId: "svc-house-open",
    serviceTitle: "Open the house before arrival",
    supplierId: "sup-house",
    supplier: "Provider sourced for this booking",
    mode: "request",
    city: "Lisbon",
    when: "Requested for 2 October 2026",
    household: "DEMO Household",
    sharedContext: ["Arrival date", "Kitchen list", "Heating and airing preferences"],
    quote: "Quote pending",
    payment: "quote_pending",
    cancellation: "48 hours notice preferred.",
    arrival: "Photographs to be sent the evening before arrival.",
    status: "awaiting",
    conciergeOwner: "Sofia",
    threadId: "THR-02",
    createdAt: "2026-08-21",
  },
  {
    id: "BKG-4023",
    serviceId: "svc-private-table",
    serviceTitle: "Private table for six to twelve",
    supplierId: "sup-table",
    supplier: "Provider sourced for this booking",
    mode: "request",
    city: "London",
    when: "3 September 2026 · 20:00",
    party: "8 guests",
    household: "DEMO Household",
    sharedContext: ["Guest number", "Two dietary requirements", "No photography"],
    quote: "£1,860 estimated",
    payment: "recorded",
    cancellation: "Deposit returned if cancelled more than 72 hours before.",
    arrival: "Side entrance on Bruton Place. Ask for Élise.",
    status: "in_progress",
    conciergeOwner: "Sofia",
    threadId: "THR-03",
    createdAt: "2026-08-11",
  },
  {
    id: "BKG-4009",
    serviceId: "svc-curator",
    serviceTitle: "Curator-led private view",
    supplierId: "sup-culture",
    supplier: "Provider sourced for this booking",
    mode: "request",
    city: "London",
    when: "12 July 2026 · 09:30",
    party: "3 guests",
    household: "DEMO Household",
    sharedContext: ["Guest number", "Interest in early modernism"],
    quote: "£1,200",
    payment: "settled",
    cancellation: "Completed.",
    arrival: "Staff entrance, Burlington Gardens.",
    status: "past",
    threadId: "THR-04",
    createdAt: "2026-06-28",
  },
  {
    id: "BKG-3994",
    serviceId: "svc-recovery",
    serviceTitle: "Recovery session at home",
    supplierId: "sup-wellbeing",
    supplier: "Provider sourced for this booking",
    mode: "request",
    city: "London",
    when: "22 June 2026 · 07:00",
    household: "DEMO Household",
    sharedContext: ["Residence address", "Preferred practitioner"],
    quote: "£260",
    payment: "not_required",
    cancellation: "Cancelled by the household, no charge.",
    arrival: "—",
    status: "cancelled",
    threadId: "THR-05",
    createdAt: "2026-06-14",
  },
];

export const seedThreads: Thread[] = [
  {
    id: "THR-01",
    kind: "booking",
    subject: "Paris · Driver · 14 September · Airport → residence",
    context: "Ashford Private Drive holds the arrival. Flight monitored; quiet car noted.",
    participants: ["You", "Ashford Private Drive"],
    supplierId: "sup-drive",
    bookingId: "BKG-4021",
    state: "active",
    messages: [
      { id: "m1", author: "Ashford Private Drive", role: "supplier", body: "Confirmed for the 18:40 arrival. We will follow the flight and message when the car is in position.", at: "2026-08-19" },
      { id: "m2", author: "You", role: "member", body: "Thank you. No name card at arrivals, please.", at: "2026-08-19" },
    ],
  },
  {
    id: "THR-02",
    kind: "booking",
    subject: "Lisbon · House opening · Requested for 2 October",
    context: "Awaiting a quote and confirmation from Lindow House Management.",
    participants: ["You", "Sofia (Concierge)", "Lindow House Management"],
    supplierId: "sup-house",
    bookingId: "BKG-4022",
    state: "waiting",
    messages: [
      { id: "m1", author: "Sofia (Concierge)", role: "concierge", body: "Request placed with the kitchen list as you left it in May. I will come back with a quote by Tuesday.", at: "2026-08-21" },
    ],
  },
  {
    id: "THR-03",
    kind: "booking",
    subject: "London · Private dinner · 3 September · Eight guests",
    context: "Maison Verrier has proposed two rooms and a draft menu.",
    participants: ["You", "Sofia (Concierge)", "Maison Verrier"],
    supplierId: "sup-table",
    bookingId: "BKG-4023",
    state: "needs_reply",
    messages: [
      { id: "m1", author: "Maison Verrier", role: "supplier", body: "Two rooms are free that evening. The smaller one is quieter but seats eight only. Menu draft attached in the folio.", at: "2026-08-20" },
      { id: "m2", author: "Sofia (Concierge)", role: "concierge", body: "I would take the smaller room. Shall I confirm?", at: "2026-08-21" },
    ],
  },
  {
    id: "THR-06",
    kind: "concierge",
    subject: "Education adviser · London school transition",
    context: "Concierge case REQ-2048. Two advisers shortlisted; an introduction awaits your consent.",
    participants: ["You", "Sofia (Concierge)"],
    caseId: "REQ-2048",
    state: "needs_reply",
    messages: [
      { id: "m1", author: "Sofia (Concierge)", role: "concierge", body: "Both advisers can hold curriculum continuity and the move timing together. Would you like me to introduce the first?", at: "2026-08-21" },
    ],
  },
  {
    id: "THR-07",
    kind: "gathering",
    subject: "The founder after the founder · 17 September · London",
    context: "An invitation is open. Response requested by 1 September.",
    participants: ["You", "Montvelle"],
    state: "needs_reply",
    messages: [
      { id: "m1", author: "Montvelle", role: "concierge", body: "We have kept a place for you. Dietary notes will carry across from your preferences if you accept.", at: "2026-08-15" },
    ],
  },
  {
    id: "THR-04",
    kind: "booking",
    subject: "London · Private view · 12 July · Completed",
    context: "Closed after the visit. Feedback recorded privately.",
    participants: ["You", "Aperture Cultural"],
    supplierId: "sup-culture",
    bookingId: "BKG-4009",
    state: "closed",
    messages: [
      { id: "m1", author: "Aperture Cultural", role: "supplier", body: "Delighted it was worthwhile. We can hold something similar in Venice in the autumn.", at: "2026-07-13" },
    ],
  },
  {
    id: "THR-05",
    kind: "booking",
    subject: "London · Recovery session · Cancelled",
    context: "Cancelled by the household. No charge recorded.",
    participants: ["You", "Cadogan Wellbeing"],
    supplierId: "sup-wellbeing",
    bookingId: "BKG-3994",
    state: "closed",
    messages: [],
  },
];

export const defaultPreferences: Preferences = {
  travel:
    "British Airways or Swiss where possible. Aisle seat, row 1–4. Prefer a residence over a hotel for stays longer than three nights. Same driver where the city allows it.",
  dining:
    "One shellfish allergy in the household. No tasting menus longer than five courses. A corner table, away from the room, is always preferred.",
  household:
    "Kitchen stocked to the standing list before arrival. Housekeeping in the morning only. Flowers: greenery, nothing scented.",
  family:
    "Arrivals kept calm and unhurried; no welcome parties. Routine matters more than schedule. Children are never named to suppliers.",
  wellbeing:
    "Route wellbeing requests through Cadogan first. Keep clinical detail out of Montvelle — share only what a booking requires.",
  communications:
    "Message rather than call between 07:00 and 20:00 London time. Anything urgent, call. Nothing to the household line before 09:00.",
  favourites: "Ashford Private Drive · Lindow House Management · Maison Verrier (Paris room)",
  avoid: "No open-plan hotel lobbies for meetings. Do not suggest venues with press relationships.",
  defaultBooking: "Ask before confirming anything above £2,000. Private introduction preferred for advisers.",
};

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

export const readBookings = () => read<Booking[]>(BOOKINGS_KEY, seedBookings);
export const writeBookings = (bookings: Booking[]) => write(BOOKINGS_KEY, bookings);
export const readThreads = () => read<Thread[]>(THREADS_KEY, seedThreads);
export const writeThreads = (threads: Thread[]) => write(THREADS_KEY, threads);
export const readPreferences = () => read<Preferences>(PREFERENCES_KEY, defaultPreferences);
export const writePreferences = (preferences: Preferences) => write(PREFERENCES_KEY, preferences);

export const needsReplyCount = (threads: Thread[]) => threads.filter((thread) => thread.state === "needs_reply").length;
