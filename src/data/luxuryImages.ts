const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

export const luxuryImages = {
  // Bright coastal editorial direction: life first, luxury inferred.
  hero: "https://images.pexels.com/photos/37286907/pexels-photo-37286907.jpeg?auto=compress&cs=tinysrgb&w=2400",
  world: "https://images.pexels.com/photos/19990858/pexels-photo-19990858.jpeg?auto=compress&cs=tinysrgb&w=2200",
  table: "https://images.pexels.com/photos/37286899/pexels-photo-37286899.jpeg?auto=compress&cs=tinysrgb&w=2200",
  service: "https://images.pexels.com/photos/5378707/pexels-photo-5378707.jpeg?auto=compress&cs=tinysrgb&w=2200",
  family: "https://images.pexels.com/photos/8623321/pexels-photo-8623321.jpeg?auto=compress&cs=tinysrgb&w=2200",
  culture: "https://images.pexels.com/photos/16529659/pexels-photo-16529659.jpeg?auto=compress&cs=tinysrgb&w=2200",
  office: "https://images.pexels.com/photos/29681694/pexels-photo-29681694.jpeg?auto=compress&cs=tinysrgb&w=2200",

  // Backwards-compatible aliases used by the existing public pages.
  jet: "https://images.pexels.com/photos/28077099/pexels-photo-28077099.jpeg?auto=compress&cs=tinysrgb&w=2200",
  command: "https://images.pexels.com/photos/29681694/pexels-photo-29681694.jpeg?auto=compress&cs=tinysrgb&w=2200",
  learning: "https://images.pexels.com/photos/8623321/pexels-photo-8623321.jpeg?auto=compress&cs=tinysrgb&w=2200",
} as const;

export const destinationImages = {
  paris: unsplash("1502602898657-3e91760cbb34", 900),
  courchevel: unsplash("1517299321609-52687d1bc55a", 900),
  london: unsplash("1513635269975-59663e0ac1ad", 700),
  dubai: unsplash("1512453979798-5ea266f8880c", 700),
  geneva: unsplash("1531366936337-7c912a4589a7", 700),
  newYork: unsplash("1496442226666-8d4d0e62e6e9", 700),
} as const;
