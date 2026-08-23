export type PartnerStatus = "Member Recommended" | "Vetted Partner" | "Strategic Partner";

export const partnerCategories = [
  "Legal & Tax",
  "Trust & Fiduciary",
  "Residence & Citizenship",
  "Banking & FX",
  "Insurance",
  "Property",
  "Education",
  "Health & Wellbeing",
  "Security & Privacy",
  "Technology & Cyber",
  "Recruitment & Household",
  "Travel & Concierge",
  "Philanthropy & Impact",
  "Art & Collections",
  "Clubs & Hospitality",
] as const;

/**
 * DEMO ONLY — internal admin/supplier QA fixtures.
 * These organisations are not real Montvelle relationships and must never be
 * rendered in any member-facing surface. Member-facing partner listings read
 * `approvedMemberFacingPartners` below, which stays empty until a provider has
 * genuinely completed references and assurance.
 */
export const trustedPartners = [
  {
    id: "partner-01",
    name: "North & Vale Private Client",
    category: "Legal & Tax",
    status: "Member Recommended" as PartnerStatus,
    locations: ["London", "Geneva"],
    focus: "Cross-border private client coordination, family governance and succession planning.",
    recommendedBy: 3,
    benefit: "Initial scoping call reserved for members.",
    responseTime: "Usually within 1 business day",
  },
  {
    id: "partner-02",
    name: "Atlas Residence Advisory",
    category: "Residence & Citizenship",
    status: "Vetted Partner" as PartnerStatus,
    locations: ["London", "Dubai", "Lisbon"],
    focus: "Multi-jurisdiction residence planning and family relocation coordination.",
    recommendedBy: 2,
    benefit: "Member case triage before formal instruction.",
    responseTime: "Usually within 4 hours",
  },
  {
    id: "partner-03",
    name: "Elm House Education",
    category: "Education",
    status: "Strategic Partner" as PartnerStatus,
    locations: ["London", "Global"],
    focus: "School search, international transitions, tutoring and bespoke family learning plans.",
    recommendedBy: 5,
    benefit: "Priority education planning clinic each month.",
    responseTime: "Same day",
  },
  {
    id: "partner-04",
    name: "Signal Family Cyber",
    category: "Technology & Cyber",
    status: "Vetted Partner" as PartnerStatus,
    locations: ["UK", "EU", "Remote"],
    focus:
      "Family cyber hygiene, device security, privacy reviews and household digital resilience.",
    recommendedBy: 2,
    benefit: "Annual family security baseline review.",
    responseTime: "Usually within 1 business day",
  },
  {
    id: "partner-05",
    name: "Morrow Family Staffing",
    category: "Recruitment & Household",
    status: "Member Recommended" as PartnerStatus,
    locations: ["London", "Paris", "Dubai"],
    focus:
      "Household, family office and executive support recruitment with reference-led screening.",
    recommendedBy: 4,
    benefit: "Priority shortlist for urgent member briefs.",
    responseTime: "Usually within 1 business day",
  },
  {
    id: "partner-06",
    name: "Orchard Health Navigation",
    category: "Health & Wellbeing",
    status: "Vetted Partner" as PartnerStatus,
    locations: ["London", "International"],
    focus: "Private health navigation, specialist coordination and family wellbeing planning.",
    recommendedBy: 2,
    benefit: "Member health-navigation intake line.",
    responseTime: "Same day",
  },
] as const;

export type MemberFacingPartner = {
  id: string;
  name: string;
  category: string;
  focus: string;
};

/**
 * Real, approved, member-facing advisers and providers.
 * Intentionally empty: a record is added here only once the provider has been
 * used on a real matter, given two references and cleared assurance.
 */
export const approvedMemberFacingPartners: MemberFacingPartner[] = [];

export const partnerValue = [
  {
    title: "Qualified demand, not a mailing list",
    body: "Receive consent-led briefs from members who have a real need. Partners never receive a downloadable member database or permission to cold prospect.",
  },
  {
    title: "Credibility earned through contribution",
    body: "Build trust through useful work, member recommendations, expert sessions, practical guides and consistent service rather than paid visibility alone.",
  },
  {
    title: "Insight into emerging family needs",
    body: "See anonymised themes across mobility, education, governance, privacy and lifestyle so your firm can improve how it serves globally mobile families.",
  },
  {
    title: "A peer network of serious advisers",
    body: "Meet non-competing specialists, share practice insight and create high-quality mutual referrals around complex multi-adviser cases.",
  },
  {
    title: "A place to create genuine member benefits",
    body: "Offer priority access, member clinics, preferred terms or specialist support that is useful enough to strengthen the membership itself.",
  },
  {
    title: "Thought leadership with standards",
    body: "Publish practical guidance or teach a session when it solves a member problem. Content is educational first and commercial second.",
  },
] as const;

/**
 * DEMO ONLY — internal queue fixtures for admin QA. No real members, no
 * existing providers. Never rendered in any member-facing surface.
 */
export const conciergeRequests = [
  {
    id: "REQ-2048",
    member: "DEMO household A",
    category: "Education",
    title: "Compare two international-school pathways before an October move",
    status: "Researching",
    urgency: "This week",
    owner: "Sofia",
    nextStep: "External enquiries underway; checked options due Monday",
  },
  {
    id: "REQ-2041",
    member: "DEMO household B",
    category: "Residence & Citizenship",
    title: "Coordinate residence, tax and schooling questions for a two-country shortlist",
    status: "Awaiting member",
    urgency: "14 days",
    owner: "Daniel",
    nextStep: "Awaiting consent before any external approach",
  },
  {
    id: "REQ-2033",
    member: "DEMO household C",
    category: "Clubs & Hospitality",
    title: "Find a quiet London base for six working lunches in September",
    status: "Options prepared",
    urgency: "Normal",
    owner: "Maya",
    nextStep: "Member deciding between the checked options",
  },
] as const;

export const conciergeCategories = [
  [
    "Global moves",
    "Residence, citizenship, relocation, schools, property, banking and the practical pieces that need to happen in the right order.",
  ],
  [
    "Education",
    "School search, tutoring, alternative education, university planning, curriculum design and specialist learning support.",
  ],
  [
    "Property & household",
    "Buying, renting, managing homes, staffing, moves, household projects and trusted local specialists.",
  ],
  [
    "Travel & access",
    "Complex itineraries, member benefits, cultural access, private events and relationship-led recommendations.",
  ],
  [
    "Family administration",
    "The awkward jobs that sit between advisers: documents, renewals, coordination, key dates, research and follow-through.",
  ],
  [
    "Health, privacy & security",
    "Navigation to appropriate professionals for health, security, cyber, reputation and family wellbeing needs.",
  ],
] as const;

export const globalLifeWorkstreams = [
  {
    name: "Jurisdictions",
    status: "2 shortlisted",
    note: "Compare legal residence, day-count practicality, education continuity and long-term optionality.",
  },
  {
    name: "Residence & immigration",
    status: "Questions prepared",
    note: "Map family eligibility, documentation, timing and dependencies before instructing counsel.",
  },
  {
    name: "Tax & legal",
    status: "Expert input required",
    note: "Keep one coordinated question list so advice from separate jurisdictions can be reconciled.",
  },
  {
    name: "Entities & trusts",
    status: "Structure review",
    note: "Identify companies, trusts, charities, ownership and governance decisions affected by the move.",
  },
  {
    name: "Banking, FX & insurance",
    status: "Not started",
    note: "Bank accounts, payment rails, currency exposure and protection often become urgent too late.",
  },
  {
    name: "Education & family life",
    status: "School calendar mapped",
    note: "Treat school, housing, travel days, work and family routines as one decision rather than separate searches.",
  },
] as const;

export const familyArchitecture = [
  { layer: "Family", items: ["Roles", "Guardianship", "Decision rights", "Rising generation"] },
  {
    layer: "Ownership",
    items: ["Operating companies", "Holding structures", "Property", "Investments"],
  },
  { layer: "Protection", items: ["Insurance", "Wills", "Trusts", "Contingency"] },
  {
    layer: "Purpose",
    items: ["Philanthropy", "Foundation / charity", "Family values", "Legacy projects"],
  },
  {
    layer: "Advisers",
    items: ["Legal", "Tax", "Accounting", "Investment", "Immigration", "Education"],
  },
] as const;

export const curriculumDomains = [
  {
    title: "Core mastery",
    description:
      "Reading, writing, mathematics, science and disciplined research — mastered rather than merely covered.",
  },
  {
    title: "Communication",
    description:
      "Clear writing, public speaking, listening, negotiation, persuasion and the confidence to ask useful questions.",
  },
  {
    title: "Money & enterprise",
    description:
      "Pricing, budgeting, accounting, sales, customers, ownership, investing and how a real organisation works.",
  },
  {
    title: "AI, data & technology",
    description:
      "Use modern tools to research, build, automate and create — with judgement, privacy awareness and verification.",
  },
  {
    title: "Practical independence",
    description:
      "Planning travel, booking appointments, cooking, documents, deadlines, correspondence, household systems and solving unfamiliar problems.",
  },
  {
    title: "World & citizenship",
    description:
      "History, geopolitics, cultures, institutions, law, ethics and understanding how countries and societies actually function.",
  },
  {
    title: "Character & execution",
    description:
      "Grit, reliability, judgement, self-management, teamwork, recovery from mistakes and finishing what was started.",
  },
  {
    title: "Stewardship & service",
    description:
      "Philanthropy, volunteering, responsibility to others and learning how resources can create lasting public value.",
  },
] as const;

export const executionFramework = [
  {
    step: "KNOW",
    title: "Learn the thing",
    body: "Acquire enough knowledge to understand the problem, the vocabulary and the available tools.",
  },
  {
    step: "APPLY",
    title: "Use it in context",
    body: "Complete a real task where the learner must choose how and when to use the skill.",
  },
  {
    step: "DELIVER",
    title: "Finish for somebody else",
    body: "Work to a deadline, budget, customer, audience or standard. The output has consequences beyond a worksheet.",
  },
  {
    step: "REVIEW",
    title: "Show evidence and improve",
    body: "Present the work, collect feedback, identify what failed and document the next version.",
  },
] as const;

export const sampleQuests = [
  {
    title: "Run a £100 micro-venture",
    ages: "11–15",
    domains: ["Money & enterprise", "Communication", "Execution"],
    outcome:
      "Research a need, create an offer, price it, sell to real customers, keep accounts and present the result.",
  },
  {
    title: "Plan a family city weekend",
    ages: "9–13",
    domains: ["Practical independence", "Maths", "World"],
    outcome:
      "Build the itinerary, compare transport, manage a budget, book one activity and produce a contingency plan.",
  },
  {
    title: "Automate a boring household task",
    ages: "12–17",
    domains: ["AI & technology", "Problem solving", "Execution"],
    outcome:
      "Find a repeated task, map the workflow, build a safe automation, test it and explain what could go wrong.",
  },
  {
    title: "Design a giving project",
    ages: "10–17",
    domains: ["Stewardship", "Research", "Communication"],
    outcome:
      "Choose an issue, assess organisations, set a small budget, make a recommendation and report on expected impact.",
  },
] as const;

export const alumniOpportunities = [
  {
    type: "Founder shadow",
    title: "One day inside a founder-led consumer business",
    age: "16+",
    location: "London",
    skills: ["Operations", "Commercial judgement"],
  },
  {
    type: "Project brief",
    title: "Research how three cities support young entrepreneurs",
    age: "16+",
    location: "Remote",
    skills: ["Research", "Writing", "Presentation"],
  },
  {
    type: "Apprenticeship",
    title: "Six-week summer placement with a family-office operations team",
    age: "18+",
    location: "London",
    skills: ["Operations", "Finance", "Professional communication"],
  },
  {
    type: "Mentor office hours",
    title: "Building confidence in rooms where everyone is older than you",
    age: "16+",
    location: "Online",
    skills: ["Communication", "Professional judgement"],
  },
] as const;

export const playbooks = [
  "Moving country with children",
  "Choosing and coordinating private-client advisers",
  "Creating a family-office-lite operating model",
  "Mapping companies, trusts, property and protection",
  "Choosing international schools without losing family logistics",
  "Building a supplementary family curriculum",
  "Preparing the rising generation for ownership",
  "Running a family meeting about money and responsibility",
  "Hiring household or family-office support",
  "Cyber and privacy baseline for a family",
  "Structuring philanthropy around a long-term family purpose",
  "Turning an unfamiliar problem into an executable plan",
] as const;

export const reciprocalPlaces = [
  {
    city: "London",
    name: "Mayfair Working Salon",
    type: "Private dining / meetings",
    status: "Member benefit proposed",
  },
  {
    city: "Paris",
    name: "Rive Droite Partner House",
    type: "Workspace / hosting",
    status: "Relationship building",
  },
  {
    city: "Dubai",
    name: "DIFC Partner Lounge",
    type: "Meetings / member events",
    status: "Relationship building",
  },
  {
    city: "Lisbon",
    name: "Príncipe Real Residence Club",
    type: "Workspace / local introductions",
    status: "Researching",
  },
] as const;
