/**
 * Single source of truth for brand copy.
 * The public brand name is deliberately provisional while naming/IP work is done.
 */
export const site = {
  name: "Project Table",
  shortName: "Table",
  location: "London",
  positioning: "A private room for people building what outlives them.",
  supportingLine: "Build. Protect. Govern. Pass it on.",
  ctaLabel: "Request a seat",
  description:
    "A private, invitation-only London community for founders, family enterprises, investors, trusted advisers and philanthropists — built around small peer Tables, discreet gatherings, trusted introductions and multigenerational stewardship.",
} as const;

export const navItems = [
  { to: "/about", label: "About" },
  { to: "/the-table", label: "The Table" },
  { to: "/gatherings", label: "Gatherings" },
  { to: "/legacy", label: "Legacy" },
  { to: "/next-gen", label: "Next Gen" },
  { to: "/impact", label: "Impact" },
  { to: "/membership", label: "Membership" },
  { to: "/auth", label: "Sign in" },
] as const;
