export type DecisionLane = "DECIDE" | "EXPERT" | "EXECUTE" | "EVIDENCE";
export type DecisionIcon = "globe" | "landmark" | "learning" | "shield";

export type DecisionWorkItem = {
  id: string;
  title: string;
  detail: string;
  lane: DecisionLane;
  owner: string;
  dependency?: string;
};

export type DecisionRoomTemplate = {
  id: string;
  label: string;
  icon: DecisionIcon;
  headline: string;
  question: string;
  outcome: string;
  experts: string[];
  questions: string[];
  items: DecisionWorkItem[];
};

export const decisionRooms: DecisionRoomTemplate[] = [
  {
    id: "move-country",
    label: "Move country",
    icon: "globe",
    headline: "Relocate the family without breaking everything around the move",
    question: "Which country works for the whole family — legally, financially, educationally and practically?",
    outcome: "A reconciled move plan with the jurisdiction agreed, professional advice aligned, school and housing sequence clear, documents ready and key dates owned.",
    experts: ["Residence & Citizenship", "Legal & Tax", "Education", "Property", "Banking & FX", "Insurance"],
    questions: [
      "What are we actually optimising for?",
      "Which family constraints genuinely cannot move?",
      "What has to happen before another decision becomes safe?",
      "What would make us regret the move six months later?",
    ],
    items: [
      { id: "move-brief", title: "Write the family brief", detail: "Rank education, tax, travel, work, healthcare, family support and lifestyle before comparing countries.", lane: "DECIDE", owner: "Family" },
      { id: "move-shortlist", title: "Reduce to two realistic jurisdictions", detail: "Compare the whole life, not one attractive headline.", lane: "DECIDE", owner: "Family + Table", dependency: "Family brief" },
      { id: "move-reconcile", title: "Reconcile immigration and tax advice", detail: "Give specialists the same assumptions and resolve contradictions before implementation.", lane: "EXPERT", owner: "Qualified advisers", dependency: "Jurisdiction shortlist" },
      { id: "move-education", title: "Secure the education path", detail: "Check school entry, curriculum continuity, location and deadlines against the real move window.", lane: "EXECUTE", owner: "Education + Concierge", dependency: "Likely location" },
      { id: "move-sequence", title: "Sequence home, banking and insurance", detail: "Work out what requires an address, permit, bank account or another prerequisite first.", lane: "EXECUTE", owner: "Concierge" },
      { id: "move-calendar", title: "Create the key-date calendar", detail: "Arrival, departure, renewals, school deadlines and review dates with named ownership.", lane: "EVIDENCE", owner: "Family Office" },
    ],
  },
  {
    id: "family-office",
    label: "Build family office",
    icon: "landmark",
    headline: "Turn a collection of assets and advisers into one operating system",
    question: "What belongs in the centre, what stays outsourced and who owns each decision?",
    outcome: "A family-office-lite architecture with ownership, roles, adviser map, reporting rhythm, risks, continuity and a clear view of open decisions.",
    experts: ["Legal & Tax", "Trust & Fiduciary", "Banking & FX", "Insurance", "Cyber", "Recruitment"],
    questions: [
      "What complexity are we genuinely trying to remove?",
      "Which decisions belong to family, board, adviser or operator?",
      "What should be visible every month without asking five people?",
      "What must still work if the founder disappears for 90 days?",
    ],
    items: [
      { id: "fo-inventory", title: "Inventory the system", detail: "Family roles, companies, property, investments, charities, insurance, advisers and recurring obligations.", lane: "DECIDE", owner: "Family" },
      { id: "fo-rights", title: "Define decision rights", detail: "Who decides, approves, signs, advises and simply needs to know?", lane: "DECIDE", owner: "Family" },
      { id: "fo-architecture", title: "Test the legal and tax architecture", detail: "Have qualified advisers confirm where ownership, trust, estate and residence structures need alignment.", lane: "EXPERT", owner: "Legal / tax / fiduciary" },
      { id: "fo-dashboard", title: "Build the monthly family dashboard", detail: "Cash, entities, property, protection, deadlines, open decisions and adviser actions in one view.", lane: "EXECUTE", owner: "Family Office" },
      { id: "fo-rhythm", title: "Create the adviser rhythm", detail: "Review cadence, question register, escalation and ownership of documents and decisions.", lane: "EXECUTE", owner: "Family Office" },
      { id: "fo-continuity", title: "Write the continuity playbook", detail: "What happens if the principal is unavailable, incapacitated or simply wants time away?", lane: "EVIDENCE", owner: "Family + advisers" },
    ],
  },
  {
    id: "education-reset",
    label: "Rethink education",
    icon: "learning",
    headline: "Design education around the child and the life they are growing into",
    question: "What should this young person be able to know, do, deliver and navigate by the time education ends?",
    outcome: "A personal learning architecture combining academic mastery, execution, real work, mentors, culture, independence and an evidence portfolio.",
    experts: ["Education", "Learning support", "Technology", "Wellbeing"],
    questions: [
      "What is school doing well that we should preserve?",
      "Where is knowledge not becoming independence?",
      "Which environments make this child curious and productive?",
      "What evidence of capability should exist at 16, 18 and 21?",
    ],
    items: [
      { id: "ed-profile", title: "Write the graduate profile", detail: "What should this young person know, do, communicate, manage and contribute by 18?", lane: "DECIDE", owner: "Family + learner" },
      { id: "ed-audit", title: "Audit the current education", detail: "Strengths, gaps, pressure, duplication and opportunities outside school.", lane: "DECIDE", owner: "Family" },
      { id: "ed-options", title: "Check lawful education routes", detail: "School, hybrid, home education, qualifications and safeguarding where relevant.", lane: "EXPERT", owner: "Education specialist" },
      { id: "ed-curriculum", title: "Build the capability curriculum", detail: "Academics plus communication, money, enterprise, AI, culture, service and practical independence.", lane: "EXECUTE", owner: "Learning Studio" },
      { id: "ed-quests", title: "Add real quests and mentors", detail: "Budgets, deadlines, audiences, project briefs, shadowing and age-appropriate exposure to real work.", lane: "EXECUTE", owner: "Family + network" },
      { id: "ed-evidence", title: "Build the evidence portfolio", detail: "Projects, presentations, ventures, service, feedback and references that prove capability.", lane: "EVIDENCE", owner: "Learner" },
    ],
  },
  {
    id: "succession",
    label: "Plan succession",
    icon: "shield",
    headline: "Prepare the people, not only the paperwork",
    question: "If responsibility arrived earlier than planned, would the next generation know what exists, why it exists and how to make a decision?",
    outcome: "A continuity and succession plan covering ownership, protection, governance, staged responsibility, capability and family communication.",
    experts: ["Legal & Tax", "Trust & Fiduciary", "Insurance", "Education", "Philanthropy"],
    questions: [
      "What are we trying to preserve beyond money?",
      "Who needs information now and who does not yet need authority?",
      "Which capabilities must exist before control can transfer?",
      "What family assumptions are currently being avoided?",
    ],
    items: [
      { id: "su-map", title: "Map ownership and control", detail: "Legal ownership, voting, trustees, directors and practical influence in one picture.", lane: "DECIDE", owner: "Family + advisers" },
      { id: "su-stages", title: "Define staged responsibility", detail: "Exposure, learning, participation, recommendation, approval and authority by readiness.", lane: "DECIDE", owner: "Family council" },
      { id: "su-docs", title: "Align estate and trust documents", detail: "Qualified advisers confirm that wills, trusts, insurance and company arrangements support the intended plan.", lane: "EXPERT", owner: "Legal / fiduciary" },
      { id: "su-learning", title: "Build the next-gen pathway", detail: "Projects, mentors, financial literacy, governance exposure and real responsibility before control transfers.", lane: "EXECUTE", owner: "Learning Studio" },
      { id: "su-meetings", title: "Create a family meeting rhythm", detail: "Age-appropriate conversations about purpose, decisions, stewardship and what the family is building.", lane: "EXECUTE", owner: "Family" },
      { id: "su-rehearse", title: "Run an annual succession rehearsal", detail: "Test a realistic scenario and record what fails before it matters.", lane: "EVIDENCE", owner: "Family council" },
    ],
  },
];
