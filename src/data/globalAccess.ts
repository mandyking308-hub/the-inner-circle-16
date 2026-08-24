/**
 * Global access — the two sides of what Montvelle can arrange.
 *
 * Montvelle does not operate a provider directory. Members never browse and
 * never contact an organisation themselves: they tell us the outcome, and the
 * Private Office finds the route, makes the enquiries and arranges the step.
 *
 * This module holds the category-level proposition (always shown) and a
 * scaffold for verified, publishable organisation names (populated later by
 * the separate database work). Nothing here is seeded with invented names.
 *
 * Public rendering rules — non-negotiable:
 *  - only records with `publicDisplay: true` may ever render;
 *  - never render contact details, websites, booking links or logos;
 *  - never render `agreedBenefit` unless the relationship is `benefit` or
 *    `formal` AND the benefit has actually been agreed with the organisation;
 *  - never render internal fields;
 *  - if no publishable records exist, render categories only — no empty grid,
 *    no "coming soon".
 */

export type AccessAudience = "personal" | "business";

/**
 * How Montvelle actually relates to an organisation.
 *  sourced     — we can arrange through ordinary booking/contact routes.
 *  introduced  — we have introduced members and hold a working relationship.
 *  benefit     — an agreed member privilege exists, confirmed in writing.
 *  formal      — a contracted partner-supplier with deeper integration.
 * Only `benefit` and `formal` may ever be described as a partnership.
 */
export type RelationshipStatus = "sourced" | "introduced" | "benefit" | "formal";

export type AccessCategory = {
  id: string;
  label: string;
  note: string;
};

export type AccessOrganisation = {
  id: string;
  audience: AccessAudience;
  /** Verified legal or trading name. Never a placeholder. */
  name: string;
  category: string;
  /** City, country or region — descriptive only. */
  geography: string;
  /** Master switch: false means the name never appears on the public site. */
  publicDisplay: boolean;
  relationshipStatus: RelationshipStatus;
  /** Only meaningful when status is `benefit` or `formal`, and verified. */
  agreedBenefit?: string;
  /** Internal only. Never rendered. */
  internalNote?: string;
  /** Internal only. Never rendered. */
  verifiedAt?: string;
};

export const personalCategories: AccessCategory[] = [
  { id: "travel", label: "Travel & hotels", note: "Journeys, stays and the arrangements around them." },
  { id: "hospitality", label: "Restaurants & hospitality", note: "Tables, private rooms and occasions that matter." },
  { id: "clubs", label: "Private clubs", note: "Introductions and arrangements where membership allows." },
  { id: "property", label: "Property & relocation", note: "Homes, moves and settling a household somewhere new." },
  { id: "education", label: "Education", note: "Schools, tutors, applications and the timing around them." },
  { id: "health", label: "Health & wellbeing", note: "Medical opinion, recovery, longevity and quiet care." },
  { id: "household", label: "Household services", note: "Staff, maintenance, security and the running of a home." },
  { id: "culture", label: "Culture & experiences", note: "Art, sport, music and moments arranged properly." },
];

export const businessCategories: AccessCategory[] = [
  { id: "legal", label: "Legal & tax", note: "Counsel in the jurisdictions a life and business touch." },
  { id: "banking", label: "Banking & finance", note: "Banking relationships, credit and treasury introductions." },
  { id: "insurance", label: "Insurance", note: "Cover for homes, art, travel, health and liability." },
  { id: "familyoffice", label: "Family office & fiduciary", note: "Structures, trustees and administration." },
  { id: "corporate", label: "Corporate services", note: "Entities, governance and cross-border administration." },
  { id: "transactions", label: "Transactions & M&A", note: "Advisers for a sale, a purchase or a transition." },
  { id: "search", label: "Executive search", note: "Leadership, principals' offices and household leadership." },
  { id: "cyber", label: "Cyber security", note: "Digital privacy, resilience and family protection." },
  { id: "philanthropy", label: "Philanthropy & advisory", note: "Giving structures, diligence and long-term intent." },
];

export const accessCategories = (audience: AccessAudience): AccessCategory[] =>
  audience === "personal" ? personalCategories : businessCategories;

/**
 * Verified publishable organisations. Intentionally empty: names are added
 * only once verified and cleared for public display by the Private Office.
 */
export const accessOrganisations: AccessOrganisation[] = [];

/** The only accessor public surfaces may use. */
export const publicOrganisations = (audience: AccessAudience): AccessOrganisation[] =>
  accessOrganisations.filter((org) => org.publicDisplay && org.audience === audience);

/** A benefit may only be shown when it is agreed and the relationship supports it. */
export const displayableBenefit = (org: AccessOrganisation): string | null =>
  (org.relationshipStatus === "benefit" || org.relationshipStatus === "formal") && org.agreedBenefit
    ? org.agreedBenefit
    : null;

export const accessQualifier =
  "Selected organisations may be shown as examples of routes Montvelle can arrange. Access is arranged through the Private Office, and inclusion does not itself imply a formal partnership or endorsement.";
