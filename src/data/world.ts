export type WorldNodeStatus = "London base" | "Member intelligence" | "Relationship building";

export type WorldNode = {
  city: string;
  region: string;
  status: WorldNodeStatus;
  line: string;
  usefulFor: string[];
  note: string;
};

export const worldNodes: WorldNode[] = [
  {
    city: "London",
    region: "United Kingdom",
    status: "London base",
    line: "The home table: family enterprise, advisers, education, culture and capital in one city.",
    usefulFor: ["Family enterprise", "Education", "Private client advisers", "Culture & access"],
    note: "The founding community is London-first. Named venues and formal benefits are only shown when an actual relationship exists.",
  },
  {
    city: "Dubai",
    region: "United Arab Emirates",
    status: "Relationship building",
    line: "A major node for founders, family enterprises, residence planning and businesses spanning Europe, Asia and the Gulf.",
    usefulFor: ["Residence", "Business setup", "Banking", "Schools"],
    note: "The network records verified specialists and relationships as they are established; it does not imply blanket local coverage.",
  },
  {
    city: "Geneva",
    region: "Switzerland",
    status: "Member intelligence",
    line: "Private wealth, philanthropy, international institutions and multigenerational family questions.",
    usefulFor: ["Private wealth", "Governance", "Philanthropy", "International families"],
    note: "City intelligence combines member experience with independently instructed professional advice where required.",
  },
  {
    city: "Lisbon",
    region: "Portugal",
    status: "Member intelligence",
    line: "A recurring consideration for internationally mobile families balancing residence, lifestyle and education.",
    usefulFor: ["Residence", "Education", "Property", "Family life"],
    note: "Jurisdiction information is decision support, not immigration or tax advice.",
  },
  {
    city: "New York",
    region: "United States",
    status: "Relationship building",
    line: "A natural bridge into US capital, professional networks, philanthropy and family-enterprise opportunity.",
    usefulFor: ["Capital", "Professional networks", "Philanthropy", "Education"],
    note: "US legal, tax and regulated matters are always routed to appropriately qualified professionals.",
  },
  {
    city: "Singapore",
    region: "Singapore",
    status: "Relationship building",
    line: "A strategic Asian node for family offices, regional business, education and cross-border structuring questions.",
    usefulFor: ["Asia expansion", "Family office", "Education", "Residence"],
    note: "The platform distinguishes between community intelligence and formal professional advice.",
  },
  {
    city: "Monaco",
    region: "Monaco",
    status: "Member intelligence",
    line: "A compact private-wealth ecosystem where residence, property, family logistics and trusted local relationships matter.",
    usefulFor: ["Residence", "Property", "Private wealth", "Lifestyle"],
    note: "Access and benefits are never promised until a relationship is verified and recorded.",
  },
  {
    city: "Paris",
    region: "France",
    status: "Member intelligence",
    line: "Close enough to London to be part of ordinary family and business life, different enough to need local judgement.",
    usefulFor: ["Business", "Property", "Culture", "Education"],
    note: "Local nuance is captured through trusted people rather than generic city lists.",
  },
];

export const worldPrinciples = [
  {
    title: "No pretend footprint",
    body: "A city appears because members are considering it, living there or the community is deliberately building useful intelligence. We never imply an office, partner or reciprocal benefit that does not exist.",
  },
  {
    title: "One family, several jurisdictions",
    body: "The point is not to collect country guides. It is to see how residence, entities, schools, property, banking, insurance and family routines affect one another across borders.",
  },
  {
    title: "Local expertise stays local",
    body: "Legal, tax, immigration, fiduciary and other regulated questions are handled by appropriately qualified professionals. The platform coordinates the family question around them.",
  },
  {
    title: "Relationships become infrastructure",
    body: "When a local provider, venue, club, school adviser or concierge relationship proves genuinely useful, it can be recorded, reviewed and reused by the community with consent.",
  },
] as const;
