/**
 * Single source of truth for brand copy.
 * The public brand name is deliberately provisional while naming/IP work is done.
 */
export const site = {
  name: "Project Table",
  shortName: "Table",
  location: "London",
  positioning: "Success creates complexity. Nobody hands you the map.",
  supportingLine: "People. Structure. Execution. Legacy.",
  ctaLabel: "Request a seat",
  description:
    "A private, invitation-only community and operating layer for founders, family enterprises and globally mobile families — combining trusted peers, coordinated experts, family learning, concierge execution and multigenerational stewardship.",
} as const;

export const navItems = [
  { to: "/about", label: "About" },
  { to: "/the-table", label: "The Table" },
  { to: "/global-life", label: "Global Life" },
  { to: "/family-learning", label: "Learning" },
  { to: "/partners", label: "Partners" },
  { to: "/concierge", label: "Concierge" },
  { to: "/membership", label: "Membership" },
  { to: "/auth", label: "Sign in" },
] as const;
