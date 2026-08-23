/**
 * Member knowledge library.
 *
 * Every entry here has real, readable content behind it. Nothing in the member
 * Knowledge index may link to an entry that does not exist in this file.
 *
 * These are practical working notes written for members. They are not legal,
 * tax, investment, medical or immigration advice, and they do not replace a
 * qualified professional engaged for your circumstances.
 */

export type KnowledgeSection = {
  heading: string;
  body?: string;
  items?: readonly string[];
};

export type KnowledgeDoc = {
  id: string;
  type: "Briefing" | "Playbook";
  category: string;
  title: string;
  summary: string;
  readTime: string;
  sections: readonly KnowledgeSection[];
  /** Suggested Decision Room name when the member wants to run this properly. */
  decisionRoom?: string;
  /** Suggested opening line for a Montvelle Request. */
  requestPrompt?: string;
  /** Shown wherever the subject touches regulated professional advice. */
  boundary?: string;
};

const ADVICE_BOUNDARY =
  "Montvelle coordinates and prepares. It does not provide legal, tax, immigration, investment or medical advice. Where this note touches those areas, it is written to help you brief and question a qualified adviser properly — not to replace one.";

/* ------------------------------------------------------------------ */
/* Briefings                                                           */
/* ------------------------------------------------------------------ */

export const briefings: readonly KnowledgeDoc[] = [
  {
    id: "k-1",
    type: "Briefing",
    category: "Governance",
    title: "The minimum viable family governance system",
    summary:
      "The decisions worth documenting before complexity, liquidity or conflict makes them urgent.",
    readTime: "8 min",
    decisionRoom: "Family governance baseline",
    requestPrompt:
      "We would like help preparing a first family governance baseline and coordinating the advisers involved.",
    boundary: ADVICE_BOUNDARY,
    sections: [
      {
        heading: "The point",
        body: "Most families do not fail for lack of a constitution. They fail because nobody wrote down who decides what, and the answer only becomes contested at the worst possible moment — an illness, an offer, a divorce, a death. A minimum viable system is four short documents that a capable outsider could read in an hour and understand how the family works.",
      },
      {
        heading: "The four documents",
        items: [
          "A one-page ownership map: who legally owns what, through which entity, in which jurisdiction.",
          "A decision rights note: which decisions belong to the owner, which to the board or trustees, which to the family as a whole, and what the threshold is for each.",
          "A continuity note: what happens in the first fourteen days if the principal is incapacitated or dies — who is called, who signs, who speaks.",
          "A meeting rhythm: when the family meets, who attends, and what is on the agenda each time.",
        ],
      },
      {
        heading: "Questions to answer before you draft anything",
        items: [
          "What decision, taken badly next year, would cost the most?",
          "Who currently holds knowledge that exists in no document?",
          "Which adviser would have to be called first, and do they have current instructions?",
          "Which family members expect a say, and have they ever been told what say they actually have?",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Starting with a fifty-page family charter nobody reads or updates.",
          "Confusing ownership with management — writing rules about the business while the shares sit unaddressed.",
          "Documenting the structure without documenting who is told what, and when.",
          "Treating governance as a legal project rather than a family conversation with legal outputs.",
        ],
      },
      {
        heading: "What belongs in a Decision Room",
        body: "Open one room, not four. Hold the ownership map, the adviser list, the open questions and the meeting dates in the same place, with one owner per open item and a date against each. The room is finished when a stranger could follow it.",
      },
    ],
  },
  {
    id: "k-2",
    type: "Briefing",
    category: "Next Generation",
    title: "Education by exposure, not inheritance by surprise",
    summary:
      "A staged framework for teaching ownership, responsibility and judgement without making money the centre of childhood.",
    readTime: "12 min",
    decisionRoom: "Rising generation readiness",
    requestPrompt:
      "We would like help designing a staged programme of exposure and responsibility for our children.",
    sections: [
      {
        heading: "The principle",
        body: "Children who are told nothing and then handed everything tend to experience wealth as an event rather than a responsibility. Exposure works better than disclosure: give responsibility in proportion to age, and let understanding arrive through practice rather than a single conversation.",
      },
      {
        heading: "A staged sequence",
        items: [
          "Under 12 — money as work and choice: earning, saving, giving, and the fact that the family works.",
          "12 to 16 — the shape of things: what the family does, why it exists, who is involved, and how decisions get made. No balance sheets.",
          "16 to 21 — practice: a small budget they genuinely control, a giving allocation they must defend, a summer inside the operating business or a wholly unrelated job.",
          "21 to 28 — participation: observer at family meetings, a defined role with real accountability, and honest conversation about what ownership will and will not mean.",
          "28+ — ownership: rights, obligations, and the option to be a good owner without being an employee.",
        ],
      },
      {
        heading: "Questions to answer",
        items: [
          "What do we want them to be able to do at twenty-five, not to know?",
          "What is the first real decision we are prepared to let them get wrong?",
          "Who — other than a parent — will tell them the truth?",
          "What have we already told them by accident?",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Delaying every conversation until a liquidity event forces all of them at once.",
          "Making the family enterprise the only respectable path.",
          "Measuring readiness by qualifications rather than judgement under pressure.",
        ],
      },
    ],
  },
  {
    id: "k-3",
    type: "Briefing",
    category: "AI & Technology",
    title: "Private AI: what family enterprises should keep inside the walls",
    summary:
      "A practical map of data, model and workflow decisions for families adopting AI without spraying sensitive information across tools.",
    readTime: "10 min",
    decisionRoom: "Family technology and data baseline",
    requestPrompt: "We would like help reviewing how our household and office use AI tools with sensitive material.",
    sections: [
      {
        heading: "The real risk",
        body: "The risk is rarely the model. It is the habit: a family office assistant pasting a share purchase agreement into a consumer tool, a household manager uploading a passport scan, a next-generation member using a personal account for family work. Policy beats procurement.",
      },
      {
        heading: "Three tiers of material",
        items: [
          "Open — public documents, general research, travel ideas. Any reputable tool is acceptable.",
          "Restricted — commercial terms, unpublished plans, employee matters, most correspondence. Business-tier tools only, with training on your data disabled and named accounts.",
          "Closed — ownership structures, medical, security, children, valuations, anything identifying the family. No third-party AI tool without a specific, documented decision.",
        ],
      },
      {
        heading: "Questions to answer before adopting anything",
        items: [
          "Who in the household or office currently uses which tools, on which accounts?",
          "Where does the output go, and who can see it afterwards?",
          "What happens to the account when that person leaves?",
          "Would we be comfortable if this material appeared in a subject access request or a court bundle?",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Writing a policy nobody in the household ever reads.",
          "Banning tools outright, which pushes usage onto personal accounts.",
          "Confusing an enterprise contract with actual configuration.",
        ],
      },
      {
        heading: "Honest limits",
        body: "No arrangement makes material uploaded to a third-party service private again. Classification and habit are the controls that matter.",
      },
    ],
  },
  {
    id: "k-4",
    type: "Briefing",
    category: "Philanthropy",
    title: "When philanthropy becomes family infrastructure",
    summary:
      "How shared purpose can create useful work across generations while improving charitable decision-making.",
    readTime: "7 min",
    decisionRoom: "Giving purpose and structure",
    requestPrompt: "We would like help shaping our giving around a long-term purpose and coordinating the structure.",
    boundary: ADVICE_BOUNDARY,
    sections: [
      {
        heading: "Why it works",
        body: "Giving is often the only arena where a family can practise governance with low commercial stakes and high moral clarity. Decisions are real, disagreements are survivable, and the rising generation can hold genuine responsibility years before they would be given it elsewhere.",
      },
      {
        heading: "How to set it up so it does something",
        items: [
          "One purpose statement, under forty words, agreed by the family rather than drafted by an adviser.",
          "A committed multi-year budget, however modest — annual improvisation teaches nothing.",
          "A named decision process: who proposes, who diligences, who decides, who reports back.",
          "One measure per grant agreed in advance with the recipient, in their language, not yours.",
        ],
      },
      {
        heading: "Questions to answer",
        items: [
          "Are we trying to give money away well, or to build something the family runs together? Both are valid; they are different designs.",
          "Which family members want to be involved, and in what role?",
          "What are we prepared to say no to, publicly?",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "A structure built before a purpose exists.",
          "Reactive giving that fragments across dozens of small requests.",
          "Using philanthropy as a substitute for a conversation the family is avoiding.",
        ],
      },
    ],
  },
  {
    id: "k-5",
    type: "Briefing",
    category: "Risk",
    title: "The family risk register nobody wants to write",
    summary:
      "Key-person dependency, cyber exposure, incapacity, reputation, adviser concentration and undocumented control.",
    readTime: "6 min",
    decisionRoom: "Family risk register",
    requestPrompt: "We would like help building and pressure-testing a family risk register.",
    boundary: ADVICE_BOUNDARY,
    sections: [
      {
        heading: "How to run it",
        body: "One page, six categories, three columns: what could happen, what would happen in the first week, and who owns reducing it. Review it twice a year. A register that is comfortable to read is not finished.",
      },
      {
        heading: "The six categories",
        items: [
          "Key person — what stops if one individual is unavailable for three months.",
          "Incapacity and succession — powers of attorney, signatories, access to accounts and devices.",
          "Cyber and identity — email compromise, payment fraud, household device hygiene, staff access.",
          "Reputation and privacy — who could publish what, and who speaks for the family.",
          "Adviser concentration — how much sits with a single firm or a single relationship.",
          "Undocumented control — arrangements that exist only as understandings between two people.",
        ],
      },
      {
        heading: "Questions to answer",
        items: [
          "If the principal were unreachable tomorrow, who could pay staff on Friday?",
          "Which single email account, if compromised, would be most damaging?",
          "Which adviser has never been reviewed?",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Scoring risks elaborately instead of assigning owners.",
          "Treating cyber as an IT purchase rather than a household habit.",
          "Never testing the plan — a continuity note that has not been walked through is a draft.",
        ],
      },
    ],
  },
  {
    id: "k-6",
    type: "Briefing",
    category: "Succession",
    title: "Founder, owner, chair: three jobs that should eventually separate",
    summary:
      "A transition map for leaders who need the enterprise to work when they are no longer in every decision.",
    readTime: "9 min",
    decisionRoom: "Founder transition",
    requestPrompt: "We would like help sequencing a founder transition and coordinating the advisers involved.",
    sections: [
      {
        heading: "The three jobs",
        items: [
          "Operator — runs the business day to day and is accountable for performance.",
          "Owner — holds the shares, sets risk appetite, decides on capital and sale.",
          "Chair — governs the operator, sets the agenda, and holds the board to account.",
        ],
      },
      {
        heading: "A workable sequence",
        items: [
          "Name the three jobs out loud and write down who does each today.",
          "Separate operator from chair first; it is the least emotionally loaded step.",
          "Install a real reporting rhythm before you step back, not after.",
          "Give the successor a decision domain with genuine authority and visible consequences.",
          "Move ownership questions last, and never in the same quarter as an operating change.",
        ],
      },
      {
        heading: "Questions to answer",
        items: [
          "What decisions currently require the founder that should not?",
          "What would the successor need to have done before the family would trust them with it?",
          "What is the founder's next role, in specific terms? A transition without a destination stalls.",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Announcing a date without changing any decision rights.",
          "Appointing a family successor into an organisation that has never had a boss other than the founder.",
          "Confusing stepping back with disappearing — the first year needs the founder visible and quiet.",
        ],
      },
    ],
  },
] as const;

/* ------------------------------------------------------------------ */
/* Playbooks                                                           */
/* ------------------------------------------------------------------ */

export const playbookDocs: readonly KnowledgeDoc[] = [
  {
    id: "pb-moving-country",
    type: "Playbook",
    category: "Global Life",
    title: "Moving country with children",
    summary:
      "Sequencing residence, schooling, housing and the household so a family move does not become twelve separate emergencies.",
    readTime: "11 min",
    decisionRoom: "Relocation",
    requestPrompt: "We are considering a move and would like Montvelle to coordinate it.",
    boundary: ADVICE_BOUNDARY,
    sections: [
      {
        heading: "What this is for",
        body: "A cross-border family move has one hard constraint — the school year — and several slow ones: immigration, housing supply and tax residence. This playbook exists to get those in the right order before anyone books a viewing.",
      },
      {
        heading: "Questions to answer before acting",
        items: [
          "What is the real reason for the move, and would a twelve-month trial satisfy it?",
          "Which school year are we targeting, and what is the application deadline for it?",
          "Which family member's immigration position is the constraint?",
          "Which country will we be tax resident in during the year of the move, and who has confirmed that?",
          "What happens to the current home, staff and school places if we return?",
        ],
      },
      {
        heading: "Sequence and dependencies",
        items: [
          "1. Immigration eligibility and route confirmed by a qualified adviser — everything else depends on this.",
          "2. Tax residence position for the transition year reviewed in both jurisdictions before any date is fixed.",
          "3. School shortlist and applications; places drive the move date more often than anything else.",
          "4. Housing search in the catchment or commute the school actually implies.",
          "5. Banking, healthcare registration, insurance and driving licences.",
          "6. Household: staff status, pets, shipping, storage, and what stays behind.",
          "7. Exit admin in the departing country, and the arrival week itself.",
        ],
      },
      {
        heading: "Checklist",
        items: [
          "Immigration route confirmed in writing",
          "Tax position reviewed both sides",
          "School offers held",
          "Housing secured with an escape clause",
          "Healthcare and insurance live from day one",
          "Banking able to receive funds before arrival",
          "Household staff arrangements documented",
          "Arrival fortnight planned hour by hour",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Choosing the house before the school.",
          "Signing a long lease before immigration is confirmed.",
          "Arriving mid-tax-year without advice, then discovering it was avoidable.",
          "Underestimating the second six months, when the novelty ends and the children's view of the move matters most.",
        ],
      },
      {
        heading: "What should go into a Decision Room",
        body: "The move brief, the immigration and tax constraints, the school deadlines, the housing shortlist and one owner for each. Every date in the room should be a real external deadline, not an aspiration.",
      },
      {
        heading: "When to make a Montvelle Request",
        body: "When you want the enquiries made rather than made by you: school visits arranged, housing viewed and filtered, advisers convened and the arrival week held together.",
      },
    ],
  },
  {
    id: "pb-private-client-advisers",
    type: "Playbook",
    category: "Structure",
    title: "Choosing and coordinating private-client advisers",
    summary:
      "How to appoint lawyers, accountants and structuring advisers who work as one team rather than five parallel opinions.",
    readTime: "9 min",
    decisionRoom: "Adviser review",
    requestPrompt: "We would like help selecting and coordinating our private-client advisers.",
    boundary: ADVICE_BOUNDARY,
    sections: [
      {
        heading: "What this is for",
        body: "Most families do not have an adviser problem. They have a coordination problem: competent people working from different versions of the facts, none of whom owns the whole picture.",
      },
      {
        heading: "Questions to answer before acting",
        items: [
          "What decision do we actually need advice on, in one sentence?",
          "Who currently holds the full picture, and are they paid to?",
          "Where is the conflict — is the same firm advising the company, the trust and the individuals?",
          "What are we paying now, across all firms, and for what output?",
        ],
      },
      {
        heading: "Sequence",
        items: [
          "1. Write the fact pattern once: entities, jurisdictions, family members, timelines. Everything else is derived from this document.",
          "2. Define the lead role — one adviser or one internal person who holds the whole picture.",
          "3. Brief two or three firms on the same written question; compare approach, not charm.",
          "4. Agree scope, fee basis and reporting in writing before work starts.",
          "5. Set a coordination rhythm — a short quarterly call with all advisers present beats twelve separate emails.",
        ],
      },
      {
        heading: "Checklist",
        items: [
          "Single written fact pattern maintained and dated",
          "Named lead adviser or internal owner",
          "Conflicts identified and accepted or separated",
          "Scope and fees agreed in writing",
          "Annual review of every retained relationship",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Appointing on personal referral without testing the specific expertise needed.",
          "Letting the most responsive adviser become the de facto lead on everything.",
          "Never reviewing a long relationship because the review feels disloyal.",
        ],
      },
      {
        heading: "What should go into a Decision Room",
        body: "The fact pattern, the adviser map with roles and fees, open questions and their owners, and the date of the next coordination call.",
      },
    ],
  },
  {
    id: "pb-family-office-lite",
    type: "Playbook",
    category: "Operating model",
    title: "Creating a family-office-lite operating model",
    summary:
      "Getting the coordination benefits of a family office without building an institution you then have to run.",
    readTime: "10 min",
    decisionRoom: "Operating model",
    requestPrompt: "We would like help designing a light operating model for the family's affairs.",
    sections: [
      {
        heading: "What this is for",
        body: "Below a certain complexity, a full family office costs more than it saves and creates a management job nobody wanted. Family-office-lite means defining the functions, then deciding for each one whether it is done by a person, a firm or a system.",
      },
      {
        heading: "The functions to name",
        items: [
          "Cash and payments — who approves, who executes, what the limits are.",
          "Reporting — one consolidated view, however simple, on a fixed date each quarter.",
          "Adviser coordination — one owner, as above.",
          "Household and property — staff, maintenance, insurance, calendars.",
          "Records — where documents live and who can find them at midnight.",
          "Risk and continuity — the register, reviewed twice a year.",
        ],
      },
      {
        heading: "Questions to answer before acting",
        items: [
          "Which of these functions currently sits, undeclared, with the principal or their assistant?",
          "What is the smallest team that could cover them — often one excellent person plus outsourced specialists?",
          "What must never be outsourced for privacy reasons?",
          "What is the honest annual budget, including the cost of managing the people you hire?",
        ],
      },
      {
        heading: "Checklist",
        items: [
          "Function list written and owners assigned",
          "Approval limits documented",
          "Quarterly reporting pack defined, however short",
          "Document repository with controlled access",
          "Cover arranged for every single point of failure",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Hiring a head of family office before deciding what the office does.",
          "Building reporting nobody reads.",
          "Letting the principal remain the approval bottleneck for small payments.",
        ],
      },
    ],
  },
  {
    id: "pb-structure-map",
    type: "Playbook",
    category: "Structure",
    title: "Mapping companies, trusts, property and protection",
    summary: "Producing one page that shows what the family owns, through what, and who controls it.",
    readTime: "8 min",
    decisionRoom: "Ownership map",
    requestPrompt: "We would like help assembling a current ownership and protection map.",
    boundary: ADVICE_BOUNDARY,
    sections: [
      {
        heading: "What this is for",
        body: "Almost every serious structuring conversation stalls in the first hour because nobody can produce a current picture. This is the artefact that unblocks it.",
      },
      {
        heading: "Sequence",
        items: [
          "1. List every legal entity: name, jurisdiction, date, purpose, registered agent.",
          "2. Draw ownership lines with percentages; mark anything held personally.",
          "3. Layer control on top: directors, trustees, protectors, signatories, powers of attorney.",
          "4. Add property with title-holder and mortgage position.",
          "5. Add protection: life cover, key-person, liability, art and property policies, with renewal dates.",
          "6. Mark every item you could not evidence within an hour.",
        ],
      },
      {
        heading: "Questions to answer",
        items: [
          "Where does legal ownership differ from who thinks they own it?",
          "Which entity has no current purpose and is only generating filings?",
          "Who could sign a binding document tomorrow without anyone else knowing?",
          "Which policy renews next, and is the cover still right?",
        ],
      },
      {
        heading: "Checklist",
        items: [
          "Entity list complete with jurisdictions",
          "Ownership percentages verified against registers",
          "Control roles named per entity",
          "Property titles confirmed",
          "Insurance schedule with renewal dates",
          "Dormant entities flagged for decision",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Relying on memory rather than filed documents.",
          "Mapping ownership but not control.",
          "Producing it once and never dating or updating it.",
        ],
      },
    ],
  },
  {
    id: "pb-international-schools",
    type: "Playbook",
    category: "Family",
    title: "Choosing international schools without losing family logistics",
    summary: "Balancing curriculum, admission timing and the daily reality of where the family will actually live.",
    readTime: "9 min",
    decisionRoom: "Schooling",
    requestPrompt: "We would like help shortlisting schools and arranging visits and applications.",
    sections: [
      {
        heading: "What this is for",
        body: "Schools are chosen for prospectus reasons and lived with for logistical ones. The right answer balances curriculum continuity, admission timing and a commute the family can sustain for a decade.",
      },
      {
        heading: "Questions to answer before acting",
        items: [
          "Which curriculum keeps the most doors open given where we might be in five years?",
          "What are the actual application and assessment dates, and which have already passed?",
          "How long is the door-to-door journey at 8am, not on a map?",
          "What does each child need that has nothing to do with academics?",
          "What is the plan if only one child receives an offer?",
        ],
      },
      {
        heading: "Sequence",
        items: [
          "1. Curriculum decision first — it constrains the list more than anything else.",
          "2. Deadline audit across the shortlist; work backwards from the earliest.",
          "3. Visits, ideally on an ordinary day rather than an open morning.",
          "4. Applications, references and assessments.",
          "5. Housing decision only once offers are in hand.",
        ],
      },
      {
        heading: "Checklist",
        items: [
          "Curriculum agreed",
          "Deadline calendar built",
          "Visits completed and notes recorded",
          "References requested early",
          "Offers compared against commute and sibling places",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Applying only to first choices.",
          "Ignoring the wait-list reality of the most sought-after schools.",
          "Choosing a school that suits one child and merely accommodates the other.",
        ],
      },
    ],
  },
  {
    id: "pb-family-curriculum",
    type: "Playbook",
    category: "Family",
    title: "Building a supplementary family curriculum",
    summary: "The things school will not teach: money, negotiation, ownership, privacy and judgement.",
    readTime: "8 min",
    decisionRoom: "Family curriculum",
    requestPrompt: "We would like help building a supplementary learning programme for our children.",
    sections: [
      {
        heading: "What this is for",
        body: "A supplementary curriculum is not extra tutoring. It is a short list of capabilities the family believes each generation should have, taught deliberately over years rather than mentioned occasionally.",
      },
      {
        heading: "A workable syllabus",
        items: [
          "Money mechanics — accounts, budgets, credit, tax basics, how a business actually earns.",
          "Ownership — what a share is, what a trust is, what a beneficiary can and cannot do.",
          "Negotiation and difficult conversation.",
          "Privacy and digital footprint, including what strangers can find.",
          "Public conduct — how the family behaves in rooms, and why.",
          "Work — a real job with a real boss who is not a family friend.",
        ],
      },
      {
        heading: "Questions to answer",
        items: [
          "Who teaches each item, and is a parent the right teacher for it?",
          "How will we know it landed?",
          "What does the child get to decide about their own programme?",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Turning it into a compliance exercise the child resents.",
          "Teaching structures before teaching earning.",
          "One intense weekend instead of years of small exposure.",
        ],
      },
    ],
  },
  {
    id: "pb-rising-generation-ownership",
    type: "Playbook",
    category: "Succession",
    title: "Preparing the rising generation for ownership",
    summary: "Moving from being told about the family's affairs to being accountable for part of them.",
    readTime: "10 min",
    decisionRoom: "Rising generation readiness",
    requestPrompt: "We would like help preparing the next generation for ownership responsibilities.",
    sections: [
      {
        heading: "What this is for",
        body: "Ownership is a job with obligations: reading, asking, voting, holding management to account and behaving well in public. This playbook turns that into something a young adult can practise.",
      },
      {
        heading: "Sequence",
        items: [
          "1. Explain the structure honestly, once, with a document they can keep.",
          "2. Observer status at a real meeting, with a briefing before and a debrief after.",
          "3. A defined responsibility with a budget and a report-back date.",
          "4. Exposure to the advisers, so the relationships are not inherited cold.",
          "5. A written statement of what ownership will mean for them — rights, income expectations, restrictions.",
        ],
      },
      {
        heading: "Questions to answer",
        items: [
          "Do they want this, and have they been given a dignified way to say no?",
          "What are the non-negotiables — confidentiality, conduct, prenuptial arrangements — and when will they be raised?",
          "Who mentors them who is not a parent?",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Confusing employment in the business with readiness to own it.",
          "Raising restrictions for the first time weeks before a wedding.",
          "Assuming siblings want the same role.",
        ],
      },
    ],
  },
  {
    id: "pb-family-meeting",
    type: "Playbook",
    category: "Governance",
    title: "Running a family meeting about money and responsibility",
    summary: "An agenda, a chair and a set of rules that make the conversation survivable and useful.",
    readTime: "7 min",
    decisionRoom: "Family meeting",
    requestPrompt: "We would like help preparing and facilitating a family meeting.",
    sections: [
      {
        heading: "What this is for",
        body: "The meeting fails when it is really an announcement, or when it is really an argument that has been waiting years. Structure protects both the message and the relationships.",
      },
      {
        heading: "Before the meeting",
        items: [
          "Agree the purpose in one sentence and share it in advance.",
          "Circulate any document people will be asked to react to, at least a week early.",
          "Decide whether an independent facilitator chairs it. If any subject is contested, the answer is usually yes.",
          "Agree who is in the room — spouses, in-laws, children over a certain age — and tell everyone why.",
        ],
      },
      {
        heading: "The agenda",
        items: [
          "Purpose and ground rules (5 minutes).",
          "Where things stand — facts, not intentions (20 minutes).",
          "The question we are here to discuss (40 minutes).",
          "What we are deciding today, and what we are not (15 minutes).",
          "Actions, owners, dates, next meeting (10 minutes).",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "The principal talking for the first forty minutes.",
          "No written record, so everyone leaves with a different version.",
          "Deciding something significant at the first meeting on a subject.",
        ],
      },
      {
        heading: "What should go into a Decision Room",
        body: "The purpose statement, the pre-reading, the actions and owners agreed, and the date of the next meeting.",
      },
    ],
  },
  {
    id: "pb-household-hiring",
    type: "Playbook",
    category: "Household",
    title: "Hiring household or family-office support",
    summary: "Defining the role, testing judgement and protecting privacy when someone joins the family's inner working life.",
    readTime: "9 min",
    decisionRoom: "Household hire",
    requestPrompt: "We would like help defining and running a discreet search for a household or office role.",
    boundary: ADVICE_BOUNDARY,
    sections: [
      {
        heading: "What this is for",
        body: "These hires fail on judgement and discretion far more often than on skill. The process should test both, and the paperwork should assume the relationship will one day end.",
      },
      {
        heading: "Sequence",
        items: [
          "1. Write the role as a list of decisions the person will make, not tasks they will perform.",
          "2. Decide the privacy boundary: what they will see, and what they must never see.",
          "3. Source discreetly — a specialist search, or a trusted referral, never a public listing that names the family.",
          "4. Interview for judgement with real scenarios drawn from the last twelve months.",
          "5. Reference properly, by telephone, with the previous principal where possible.",
          "6. Background checks and right-to-work, handled by a professional provider.",
          "7. Contract, confidentiality terms and a documented probation with written feedback.",
        ],
      },
      {
        heading: "Checklist",
        items: [
          "Role defined by decisions and boundaries",
          "Discreet sourcing route agreed",
          "Scenario-based interview prepared",
          "Telephone references completed",
          "Checks run by a professional provider",
          "Confidentiality and IT access terms in the contract",
          "Offboarding steps written before day one",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Hiring a friend's departing staff member without a process.",
          "Granting full calendar, email and payment access on the first week.",
          "No written expectations, then dissatisfaction that cannot be evidenced.",
        ],
      },
    ],
  },
  {
    id: "pb-cyber-privacy",
    type: "Playbook",
    category: "Risk",
    title: "Cyber and privacy baseline for a family",
    summary: "The small number of controls that prevent most real incidents in private households.",
    readTime: "8 min",
    decisionRoom: "Cyber and privacy baseline",
    requestPrompt: "We would like a review of our household's cyber and privacy baseline.",
    sections: [
      {
        heading: "What this is for",
        body: "Household incidents are rarely sophisticated. They are a reused password, an intercepted payment instruction, an unlocked home network or a public social post. A baseline handles the overwhelming majority.",
      },
      {
        heading: "The baseline",
        items: [
          "A password manager for every adult in the household, and hardware keys or app-based two-factor on email, banking and cloud storage.",
          "Payment verification by voice call to a known number for any change of bank details, without exception.",
          "Separate accounts for staff, with access removed the day they leave.",
          "Home network segmentation: family devices, staff devices, and everything else apart.",
          "Devices encrypted, updated and remotely wipeable.",
          "An annual search of what is publicly findable about each family member.",
          "A written first-hour plan: who is called if an account is compromised.",
        ],
      },
      {
        heading: "Questions to answer",
        items: [
          "Which single email account is the recovery route for everything else?",
          "Who else has access to the principal's calendar and travel plans?",
          "What do the children post, and from where?",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Buying tools without changing habits.",
          "Protecting the principal but not the assistant, who is the actual target.",
          "No plan for the first hour after an incident.",
        ],
      },
      {
        heading: "Honest limits",
        body: "No baseline eliminates risk, and no provider can promise that. The goal is to make your household a harder and slower target than the alternative, and to shorten the response when something does happen.",
      },
    ],
  },
  {
    id: "pb-philanthropy-structure",
    type: "Playbook",
    category: "Philanthropy",
    title: "Structuring philanthropy around a long-term family purpose",
    summary: "Choosing a vehicle after the purpose is clear, and building a grant process the family can actually run.",
    readTime: "9 min",
    decisionRoom: "Giving purpose and structure",
    requestPrompt: "We would like help structuring our giving and coordinating the advisers involved.",
    boundary: ADVICE_BOUNDARY,
    sections: [
      {
        heading: "What this is for",
        body: "Vehicle first is the standard mistake. Purpose, budget and decision process determine which vehicle is appropriate — not the other way round.",
      },
      {
        heading: "Sequence",
        items: [
          "1. Purpose statement agreed by the family, under forty words.",
          "2. Budget and time horizon: annual amount, and how many years it is committed for.",
          "3. Decision process: who proposes, diligences, decides and reports.",
          "4. Only then, vehicle selection with a qualified adviser — direct giving, a donor-advised fund, a foundation, or a mix.",
          "5. Grant template with one agreed measure per grant.",
          "6. Annual review against purpose, published to the family.",
        ],
      },
      {
        heading: "Questions to answer",
        items: [
          "Are we funding organisations or outcomes?",
          "Do we want the family's name attached?",
          "Who inherits this in twenty years, and would they recognise the purpose?",
          "What administrative burden are we genuinely willing to carry?",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "A foundation established for reasons of prestige, then run by nobody.",
          "Unrestricted giving with no feedback loop, so nothing is learned.",
          "Purpose statements written by advisers rather than the family.",
        ],
      },
    ],
  },
  {
    id: "pb-unfamiliar-problem",
    type: "Playbook",
    category: "Method",
    title: "Turning an unfamiliar problem into an executable plan",
    summary: "The general method Montvelle uses when a request has no obvious category.",
    readTime: "7 min",
    decisionRoom: "New problem",
    requestPrompt: "We have an unusual problem and would like help turning it into a plan.",
    sections: [
      {
        heading: "What this is for",
        body: "Most difficult requests are not difficult because they are technical. They are difficult because the question has not yet been written down properly.",
      },
      {
        heading: "The method",
        items: [
          "1. State the outcome in one sentence, in plain language, with the date it must be true by.",
          "2. Separate constraints that cannot move from preferences that can.",
          "3. Identify the single hardest dependency and test it first — usually a person, a permission or a deadline.",
          "4. Find who has solved a version of this before, and ask them what they would do differently.",
          "5. Write the sequence with owners and dates. Anything without an owner is not part of the plan.",
          "6. Decide the review point: when will we know this is going wrong?",
        ],
      },
      {
        heading: "Questions to answer",
        items: [
          "What would make this unnecessary?",
          "What are we assuming that we have not checked?",
          "What is the cost of being one month late?",
          "Who must not be surprised by this?",
        ],
      },
      {
        heading: "Common mistakes",
        items: [
          "Solving the version of the problem that is easiest to describe.",
          "Running everything in parallel and discovering the blocking dependency last.",
          "Building a plan around a person who has not yet agreed.",
        ],
      },
      {
        heading: "When to make a Montvelle Request",
        body: "As soon as the outcome sentence exists. You do not need the plan first — that is the part we can do with you.",
      },
    ],
  },
] as const;

export const knowledgeLibrary: readonly KnowledgeDoc[] = [...briefings, ...playbookDocs];

export function findKnowledgeDoc(id: string): KnowledgeDoc | undefined {
  return knowledgeLibrary.find((doc) => doc.id === id);
}
