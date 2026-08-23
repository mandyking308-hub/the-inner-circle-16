export const site = {
  name: "Montvelle",
  shortName: "Montvelle",
  location: "London · Global",
  domain: "montvelle.com",
  url: "https://montvelle.com",
  operator: "Global Solutions Management LLC",
  operatorJurisdiction: "Delaware, United States",
  positioning: "A private world around the life you've built.",
  supportingLine: "Belong. Move. Live. Raise. Connect. Gather. Give. Pass it on.",
  ctaLabel: "Request membership",
  description:
    "Montvelle is a private membership for founders, family enterprises and globally minded families — bringing together trusted people, beautiful gatherings, global life, family learning, discreet private service and a serious private office behind it all.",
  legalNotice:
    "Montvelle is operated by Global Solutions Management LLC, a Delaware limited liability company.",
} as const;

/** Public navigation sells the life first; the operating system is revealed inside the story. */
export const navItems = [
  { to: "/world", label: "The World" },
  { to: "/membership", label: "Membership" },
  { to: "/concierge", label: "Private Office" },
  { to: "/family-learning", label: "Family" },
  { to: "/gatherings", label: "Gatherings" },
  { to: "/global-life", label: "Global Life" },
  { to: "/impact", label: "Giving" },
  { to: "/montvelle-world", label: "Montvelle World" },
] as const;
