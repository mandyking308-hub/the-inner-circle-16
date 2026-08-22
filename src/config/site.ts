export const site = {
  name: "Project Table",
  shortName: "Table",
  location: "London",
  positioning: "A private world around the life you've built.",
  supportingLine: "Belong. Move. Live. Raise. Connect. Pass it on.",
  ctaLabel: "Request a seat",
  description:
    "A private membership for founders, family enterprises and globally minded families — bringing together trusted people, beautiful gatherings, global life, family learning, discreet concierge and a private office behind it all.",
} as const;

/** Public navigation sells the life first; the operating system is revealed inside the story. */
export const navItems = [
  { to: "/the-table", label: "Belong" },
  { to: "/global-life", label: "The World" },
  { to: "/gatherings", label: "Gatherings" },
  { to: "/family-learning", label: "Families" },
  { to: "/concierge", label: "Private Office" },
  { to: "/membership", label: "Membership" },
] as const;
