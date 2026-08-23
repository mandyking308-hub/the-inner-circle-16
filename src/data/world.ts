export type WorldPlace = {
  city: string;
  country: string;
  theme: string;
  line: string;
};

export const worldNodes: WorldPlace[] = [
  {
    city: "London",
    country: "United Kingdom",
    theme: "Home & Family",
    line: "Home, school, advisers, culture and capital can all sit within one familiar rhythm.",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    theme: "Business & Residence",
    line: "A place for business, family, residence and regional connections — with the right local people around you.",
  },
  {
    city: "Geneva",
    country: "Switzerland",
    theme: "Health & Family Office",
    line: "Private health, philanthropy, family-office relationships and trusted advisers, coordinated with discretion.",
  },
  {
    city: "Lisbon",
    country: "Portugal",
    theme: "Residence & Lifestyle",
    line: "A gentler base for residence and family life, with support around property, education and settling in.",
  },
  {
    city: "New York",
    country: "United States",
    theme: "Business & Culture",
    line: "For business, education, culture and relationships — with the right introductions when they matter.",
  },
  {
    city: "Singapore",
    country: "Singapore",
    theme: "Asia & Family Office",
    line: "A thoughtful base for Asia, connecting family office, education, residence and trusted local expertise.",
  },
  {
    city: "Monaco",
    country: "Monaco",
    theme: "Residence & Lifestyle",
    line: "A compact world of residence, property and private relationships, handled with care and privacy.",
  },
  {
    city: "Paris",
    country: "France",
    theme: "Culture & Family",
    line: "Close enough to feel familiar, different enough to open another world of culture, education and everyday life.",
  },
];

export const worldPrinciples = [
  {
    title: "Local knowledge, personally useful",
    body: "The value is not in knowing everything about a city. It is knowing what matters to you, your family and the decision in front of you.",
  },
  {
    title: "The right people, at the right moment",
    body: "A trusted introduction can change how a place feels. We help bring the right relationships closer when they are genuinely useful.",
  },
  {
    title: "One life across many places",
    body: "Homes, schools, advisers, travel, health and family plans all affect one another. We help you keep sight of the whole.",
  },
  {
    title: "A world that grows with you",
    body: "As your life changes, new places and relationships can become part of it — without starting again each time.",
  },
] as const;
