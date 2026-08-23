import glLondon from "@/assets/gl-london.jpg";
import glDubai from "@/assets/gl-dubai.jpg";
import glGeneva from "@/assets/gl-geneva.jpg";
import glLisbon from "@/assets/gl-lisbon.jpg";
import glNewYork from "@/assets/gl-newyork.jpg";
import glSingapore from "@/assets/gl-singapore.jpg";
import glMonaco from "@/assets/gl-monaco.jpg";
import glParis from "@/assets/gl-paris.jpg";

export type GlobalLifePlace = {
  city: string;
  country: string;
  theme: string;
  line: string;
  image: string;
  alt: string;
};

/** Each place uses its own unique photograph; no asset here is used anywhere else. */
export const globalLifePlaces: GlobalLifePlace[] = [
  {
    city: "London",
    country: "United Kingdom",
    theme: "Home & Family",
    line: "Home, school, advisers, culture and capital can all sit within one familiar rhythm.",
    image: glLondon,
    alt: "A quiet London garden square framed by Georgian townhouses",
  },
  {
    city: "Dubai",
    country: "United Arab Emirates",
    theme: "Business & Residence",
    line: "A place for business, family, residence and regional connections — with the right local people around you.",
    image: glDubai,
    alt: "A calm Dubai waterfront lined with palms at golden hour",
  },
  {
    city: "Geneva",
    country: "Switzerland",
    theme: "Health & Family Office",
    line: "Private health, philanthropy, family-office relationships and trusted advisers, coordinated with discretion.",
    image: glGeneva,
    alt: "Lake Geneva at dawn with soft alpine hills beyond",
  },
  {
    city: "Lisbon",
    country: "Portugal",
    theme: "Residence & Lifestyle",
    line: "A gentler base for residence and family life, with support around property, education and settling in.",
    image: glLisbon,
    alt: "Lisbon rooftops and pastel facades in late afternoon light",
  },
  {
    city: "New York",
    country: "United States",
    theme: "Business & Culture",
    line: "For business, education, culture and relationships — with the right introductions when they matter.",
    image: glNewYork,
    alt: "A tree-lined New York townhouse street in autumn light",
  },
  {
    city: "Singapore",
    country: "Singapore",
    theme: "Asia & Family Office",
    line: "A thoughtful base for Asia, connecting family office, education, residence and trusted local expertise.",
    image: glSingapore,
    alt: "A green Singapore courtyard beside white colonial architecture",
  },
  {
    city: "Monaco",
    country: "Monaco",
    theme: "Residence & Lifestyle",
    line: "A compact world of residence, property and private relationships, handled with care and privacy.",
    image: glMonaco,
    alt: "The Monaco coastline and terraced hillside residences at dusk",
  },
  {
    city: "Paris",
    country: "France",
    theme: "Culture & Family",
    line: "Close enough to feel familiar, different enough to open another world of culture, education and everyday life.",
    image: glParis,
    alt: "A quiet Parisian street of Haussmann facades in morning light",
  },
];

export const globalLifeFeelings = [
  {
    title: "One family, one view",
    body: "The important thing is not how many places you move between, but whether the decisions around them still make sense together.",
  },
  {
    title: "Local expertise, when it matters",
    body: "The right people remain close to the place and the issue. We help you find them, understand the context and keep everything connected.",
  },
  {
    title: "Continuity across borders",
    body: "Schools, homes, advisers, travel, health and family plans do not live in separate boxes. We help you see how one decision affects another.",
  },
  {
    title: "Relationships that stay with you",
    body: "Over time, trusted local relationships become part of the fabric of how your family moves through the world.",
  },
] as const;
