/**
 * Single source of truth for brand copy.
 * Renaming the community later = change `name` here.
 */
export const site = {
  name: "Project Table",
  shortName: "Table",
  location: "London",
  positioning: "A private room for people building what outlives them.",
  supportingLine: "Build. Protect. Govern. Pass it on.",
  ctaLabel: "Request a seat",
  description:
    "A private, invitation-only London membership community for founders, family enterprises, investors, trusted advisers and philanthropists.",
} as const;

export const navItems = [
  { to: "/apply", label: "Apply" },
  { to: "/member", label: "Member" },
  { to: "/admin", label: "Admin" },
] as const;
