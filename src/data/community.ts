export type Member = {
  id: string;
  name: string;
  initials: string;
  role: string;
  organisation: string;
  city: string;
  sector: string;
  expertise: string[];
  interests: string[];
  contribution: string;
  seeking: string;
  tableRole: "Peer" | "Pathfinder" | "Perspective";
};

export type Gathering = {
  id: string;
  type: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: "Open" | "Approval required" | "Waitlist";
  description: string;
  seats: string;
};

export type AskOffer = {
  id: string;
  type: "Need" | "Offer" | "Introduction";
  title: string;
  author: string;
  category: string;
  urgency: "This week" | "This month" | "Whenever useful";
  body: string;
};

export type KnowledgeItem = {
  id: string;
  category: string;
  title: string;
  summary: string;
  format: string;
  readTime: string;
};

export const members: Member[] = [
  {
    id: "amelia-hart",
    name: "DEMO Member A",
    initials: "AH",
    role: "Founder & CEO",
    organisation: "DEMO Technology Enterprise",
    city: "London",
    sector: "Technology",
    expertise: ["AI", "Scaling", "Enterprise sales"],
    interests: ["Succession", "Education", "Impact"],
    contribution: "Building enterprise technology teams and scaling internationally.",
    seeking: "Thinking through ownership, governance and a longer-term family structure.",
    tableRole: "Peer",
  },
  {
    id: "daniel-okafor",
    name: "DEMO Member B",
    initials: "DO",
    role: "Principal",
    organisation: "DEMO Family Enterprise",
    city: "London",
    sector: "Family enterprise",
    expertise: ["Governance", "Property", "Family business"],
    interests: ["Next generation", "Philanthropy", "Africa"],
    contribution: "Second-generation experience across operating businesses and property.",
    seeking: "Preparing the third generation without creating entitlement.",
    tableRole: "Pathfinder",
  },
  {
    id: "sophia-chen",
    name: "DEMO Member C",
    initials: "SC",
    role: "Investment Director",
    organisation: "DEMO Investment Firm",
    city: "London",
    sector: "Investment",
    expertise: ["Private markets", "Capital allocation", "Risk"],
    interests: ["AI", "Climate", "Family governance"],
    contribution: "Institutional investment discipline and private-market evaluation.",
    seeking: "A better view of founder-led opportunities and long-duration capital.",
    tableRole: "Perspective",
  },
  {
    id: "james-whitmore",
    name: "DEMO Member D",
    initials: "JW",
    role: "Managing Partner",
    organisation: "DEMO Legal Practice",
    city: "London",
    sector: "Professional services",
    expertise: ["Succession", "Trusts", "Governance"],
    interests: ["Family enterprise", "Reputation", "Education"],
    contribution: "Two decades advising entrepreneurial families through transition.",
    seeking: "Understanding how AI is changing the operating model of family offices.",
    tableRole: "Pathfinder",
  },
  {
    id: "layla-rahman",
    name: "DEMO Member E",
    initials: "LR",
    role: "Founder",
    organisation: "DEMO Health Enterprise",
    city: "London",
    sector: "Health",
    expertise: ["Healthcare", "Operations", "Regulation"],
    interests: ["Impact", "AI", "Women founders"],
    contribution: "Building regulated services with strong operational controls.",
    seeking: "Expanding internationally without losing culture or quality.",
    tableRole: "Peer",
  },
  {
    id: "marcus-vella",
    name: "DEMO Member F",
    initials: "MV",
    role: "Chair",
    organisation: "DEMO Consumer Group",
    city: "London",
    sector: "Consumer",
    expertise: ["Boards", "Brand", "M&A"],
    interests: ["Next generation", "Legacy", "Art"],
    contribution: "Founder-to-chair transition and acquisition integration.",
    seeking: "Creating meaningful roles for adult children without forcing them into the company.",
    tableRole: "Pathfinder",
  },
  {
    id: "maya-patel",
    name: "DEMO Member G",
    initials: "MP",
    role: "Founder",
    organisation: "DEMO Education Enterprise",
    city: "London",
    sector: "Education",
    expertise: ["Education", "Community", "Product"],
    interests: ["Children", "Entrepreneurship", "Technology"],
    contribution: "Designing learning environments and parent communities.",
    seeking: "Building a durable institution beyond the founder.",
    tableRole: "Perspective",
  },
  {
    id: "oliver-reed",
    name: "DEMO Member H",
    initials: "OR",
    role: "Partner",
    organisation: "DEMO Advisory Practice",
    city: "London",
    sector: "Advisory",
    expertise: ["Tax", "Structuring", "International mobility"],
    interests: ["Family office", "Entrepreneurs", "Policy"],
    contribution: "Cross-border structuring for founders and families.",
    seeking: "Better understanding founder priorities before liquidity events.",
    tableRole: "Perspective",
  },
  {
    id: "nina-brooks",
    name: "DEMO Member I",
    initials: "NB",
    role: "Executive Director",
    organisation: "DEMO Foundation",
    city: "London",
    sector: "Philanthropy",
    expertise: ["Grantmaking", "Impact", "Partnerships"],
    interests: ["Health", "Education", "Systems change"],
    contribution: "Turning family philanthropy into measurable long-term programmes.",
    seeking: "Connecting commercial skills with charitable delivery.",
    tableRole: "Peer",
  },
  {
    id: "theo-morgan",
    name: "DEMO Member J",
    initials: "TM",
    role: "Founder",
    organisation: "DEMO Manufacturing Enterprise",
    city: "Cambridge",
    sector: "Advanced manufacturing",
    expertise: ["Manufacturing", "Export", "Hiring"],
    interests: ["Capital", "Succession", "Technology"],
    contribution: "Building physical businesses and international supply chains.",
    seeking: "Creating management independence from the founder.",
    tableRole: "Peer",
  },
  {
    id: "elena-rossi",
    name: "DEMO Member K",
    initials: "ER",
    role: "Principal",
    organisation: "DEMO Family Office",
    city: "Milan",
    sector: "Family office",
    expertise: ["Family office", "Hospitality", "Investment"],
    interests: ["Next generation", "Art", "Impact"],
    contribution: "European family-office perspective and multigenerational governance.",
    seeking: "Modernising systems without losing family culture.",
    tableRole: "Pathfinder",
  },
  {
    id: "idris-khan",
    name: "DEMO Member L",
    initials: "IK",
    role: "Co-Founder",
    organisation: "DEMO Security Enterprise",
    city: "London",
    sector: "Technology",
    expertise: ["Cybersecurity", "Data", "Product"],
    interests: ["Privacy", "AI", "Capital"],
    contribution: "Security-by-design thinking for modern organisations.",
    seeking: "Learning how family enterprises make long-horizon technology decisions.",
    tableRole: "Perspective",
  },
];

export const tableMembers = members.slice(0, 10);

export const gatherings: Gathering[] = [
  {
    id: "table-september",
    type: "Private Table",
    title: "The founder after the founder",
    date: "17 Sep 2026",
    time: "18:30–21:30",
    location: "Mayfair · venue released on approval",
    status: "Approval required",
    description: "A confidential working session on succession, management independence and identity after operating leadership.",
    seats: "10 seats · Table members",
  },
  {
    id: "ai-salon",
    type: "Salon",
    title: "AI inside the family enterprise",
    date: "24 Sep 2026",
    time: "18:00–20:00",
    location: "St James's · venue released on approval",
    status: "Open",
    description: "Practical discussion on private AI infrastructure, governance, security and where automation genuinely helps.",
    seats: "24 seats",
  },
  {
    id: "breakfast-governance",
    type: "Breakfast Table",
    title: "Governance before you need it",
    date: "8 Oct 2026",
    time: "08:00–09:45",
    location: "Green Park · venue released on approval",
    status: "Open",
    description: "A small breakfast for founders moving from personal decision-making to boards, family councils and documented principles.",
    seats: "12 seats",
  },
  {
    id: "impact-visit",
    type: "Impact Visit",
    title: "From cheque-writing to useful capital",
    date: "22 Oct 2026",
    time: "16:00–19:00",
    location: "Central London · details after confirmation",
    status: "Waitlist",
    description: "Meet an operating charity team and examine where expertise, introductions and unrestricted capital can change delivery.",
    seats: "16 seats",
  },
];

export const asksOffers: AskOffer[] = [
  {
    id: "ao-1",
    type: "Need",
    title: "Independent chair with regulated-services experience",
    author: "DEMO Member E",
    category: "Governance",
    urgency: "This month",
    body: "Looking for someone who has chaired a founder-led regulated business through the £20m–£50m revenue stage. Warm experience only, please.",
  },
  {
    id: "ao-2",
    type: "Offer",
    title: "Happy to review a first family constitution",
    author: "DEMO Member D",
    category: "Succession",
    urgency: "Whenever useful",
    body: "I can spend an hour with one member this month pressure-testing the questions a first family constitution should answer before lawyers draft it.",
  },
  {
    id: "ao-3",
    type: "Introduction",
    title: "Operator who has opened healthcare services in the Gulf",
    author: "DEMO Member A",
    category: "International expansion",
    urgency: "This month",
    body: "Seeking a founder or operator who has personally navigated licensing, hiring and launch in UAE healthcare — not a sales intermediary.",
  },
  {
    id: "ao-4",
    type: "Offer",
    title: "Cybersecurity tabletop for a family office",
    author: "DEMO Member L",
    category: "Security",
    urgency: "This week",
    body: "I have one spare workshop slot and can run a 60-minute simulated incident for a member family office to expose weak handoffs and permissions.",
  },
];

export const knowledge: KnowledgeItem[] = [
  {
    id: "k-1",
    category: "Governance",
    title: "The minimum viable family governance system",
    summary: "The decisions worth documenting before complexity, liquidity or conflict makes them urgent.",
    format: "Briefing",
    readTime: "8 min",
  },
  {
    id: "k-2",
    category: "Next Generation",
    title: "Education by exposure, not inheritance by surprise",
    summary: "A staged framework for teaching ownership, responsibility and judgement without making money the centre of childhood.",
    format: "Guide",
    readTime: "12 min",
  },
  {
    id: "k-3",
    category: "AI & Technology",
    title: "Private AI: what family enterprises should keep inside the walls",
    summary: "A practical map of data, model and workflow decisions for families adopting AI without spraying sensitive information across tools.",
    format: "Research note",
    readTime: "10 min",
  },
  {
    id: "k-4",
    category: "Philanthropy",
    title: "When philanthropy becomes family infrastructure",
    summary: "How shared purpose can create useful work across generations while improving charitable decision-making.",
    format: "Case discussion",
    readTime: "7 min",
  },
  {
    id: "k-5",
    category: "Risk",
    title: "The family risk register nobody wants to write",
    summary: "Key-person dependency, cyber exposure, incapacity, reputation, adviser concentration and undocumented control.",
    format: "Checklist",
    readTime: "6 min",
  },
  {
    id: "k-6",
    category: "Succession",
    title: "Founder, owner, chair: three jobs that should eventually separate",
    summary: "A transition map for leaders who need the enterprise to work when they are no longer in every decision.",
    format: "Masterclass notes",
    readTime: "9 min",
  },
];

export const expertCouncils = [
  "Governance & Succession",
  "AI, Data & Technology",
  "Tax, Trusts & Structuring",
  "Investment & Capital",
  "People & Family Dynamics",
  "Philanthropy & Impact",
  "Education & Next Generation",
  "Security, Privacy & Reputation",
];

export const impactProjects = [
  {
    title: "Health navigation pilot",
    theme: "Health inequalities",
    need: "Operations expertise, introductions and unrestricted pilot support",
    description: "A community health-access pilot testing practical navigation support for people struggling to move through fragmented services.",
  },
  {
    title: "Young builders studio",
    theme: "Education",
    need: "Mentors, workspace and technology partners",
    description: "A small programme giving young people structured exposure to entrepreneurship, technology, money and social impact.",
  },
  {
    title: "Founder skills bank",
    theme: "Philanthropy",
    need: "Volunteer expertise",
    description: "Match experienced operators with charities that need short, high-value interventions rather than another committee.",
  },
];

export const applicationStages = [
  { stage: "Applied", count: 14 },
  { stage: "Screening", count: 8 },
  { stage: "Interview", count: 5 },
  { stage: "References", count: 3 },
  { stage: "Approved", count: 4 },
  { stage: "Invited", count: 2 },
  { stage: "Active", count: 28 },
];
