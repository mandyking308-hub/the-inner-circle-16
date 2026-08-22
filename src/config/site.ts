/**
 * Single source of truth for public brand copy.
 * Project Table remains a working name until naming / trademark work is complete.
 */
export const site = {
  name: "Project Table",
  shortName: "Table",
  location: "London",
  positioning: "Success creates complexity. Nobody hands you the map.",
  supportingLine: "A private operating system for family enterprise.",
  ctaLabel: "Request a seat",
  description:
    "A private London-based community and operating layer for founders, family enterprises and globally mobile families — combining peer judgement, trusted specialists, concierge execution, family learning and multigenerational stewardship.",
} as const;

/**
 * The main navigation is intentionally selective. The ecosystem contains more
 * capability than the header should expose at once; secondary routes live in
 * the ecosystem page and footer.
 */
export const navItems = [
  { to: "/the-table", label: "The Table" },
  { to: "/decision-room", label: "Decision Room" },
  { to: "/family-learning", label: "Families" },
  { to: "/partners", label: "Trusted Partners" },
  { to: "/concierge", label: "Concierge" },
  { to: "/membership", label: "Membership" },
] as const;
