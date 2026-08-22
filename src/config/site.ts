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

/** Keep the public header disciplined; deeper capabilities are revealed contextually. */
export const navItems = [
  { to: "/the-table", label: "The Table" },
  { to: "/decision-room", label: "Decision Room" },
  { to: "/global-life", label: "Global Life" },
  { to: "/family-learning", label: "Families" },
  { to: "/concierge", label: "Concierge" },
  { to: "/membership", label: "Membership" },
] as const;
