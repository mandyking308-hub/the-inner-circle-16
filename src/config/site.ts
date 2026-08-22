/**
 * Single source of truth for public brand copy.
 * Project Table remains a working name until naming / trademark work is complete.
 */
export const site = {
  name: "Project Table",
  shortName: "Table",
  location: "London",
  positioning: "Your life got complicated because it worked.",
  supportingLine: "Private membership for the life behind the success.",
  ctaLabel: "Request a seat",
  description:
    "A private London membership for founders, family enterprises and globally mobile families who want trusted people, better decisions, expert help, concierge execution and a stronger next generation around the same table.",
} as const;

/** The header stays selective; the deeper operating system lives inside membership. */
export const navItems = [
  { to: "/the-table", label: "The Table" },
  { to: "/decision-room", label: "Decision Room" },
  { to: "/family-learning", label: "Families" },
  { to: "/partners", label: "Trusted Partners" },
  { to: "/concierge", label: "Concierge" },
  { to: "/membership", label: "Membership" },
] as const;
