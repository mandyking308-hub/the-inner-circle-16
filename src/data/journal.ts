export type JournalSection = { heading: string; body: string };

export type JournalArticle = {
  slug: string;
  category: string;
  title: string;
  deck: string;
  readTime: string;
  date: string;
  image: "jet" | "table" | "command" | "learning";
  introduction: string;
  sections: JournalSection[];
};

export const journalArticles: JournalArticle[] = [
  {
    slug: "the-life-after-success",
    category: "Family enterprise",
    title: "The life after success is an operating problem nobody warns you about",
    deck: "The second country, the school decision, the advisers, the structures and the family questions are not side issues. Together they become a new system to run.",
    readTime: "7 min",
    date: "August 2026",
    image: "jet",
    introduction:
      "Success rarely arrives as one neat event. It accumulates. A business grows. Opportunities move across borders. A family needs more privacy, more advisers and more deliberate decisions. Each problem usually has an expert, while nobody is responsible for the whole picture.",
    sections: [
      {
        heading: "Complexity is often the hidden cost of progress",
        body: "A founder may still be running the company while becoming the person who must coordinate schools, property, tax counsel, accountants, trustees, insurance, travel, family expectations and a dozen deadlines that did not exist five years earlier. The answer is not necessarily another adviser. It is an operating layer that makes the dependencies visible.",
      },
      {
        heading: "The principal still owns the decision",
        body: "Good specialists should make a family safer, not more passive. The principal needs enough context to understand the trade-offs, know which professional owns which question and recognise when two pieces of advice do not fit together.",
      },
      {
        heading: "Time becomes the scarce asset",
        body: "At a certain point the premium service is not more information. It is fewer repeated explanations, fewer cold searches, fewer dropped hand-offs and fewer decisions sitting unresolved because nobody has been given the job of closing them.",
      },
    ],
  },
  {
    slug: "a-move-is-never-just-a-visa",
    category: "Global life",
    title: "A move is never just a visa",
    deck: "Residence, tax, schools, property, banking, companies and family life should be modelled as one decision before implementation begins.",
    readTime: "8 min",
    date: "August 2026",
    image: "jet",
    introduction:
      "Country comparisons become dangerous when one attractive feature is allowed to stand in for the whole life. A tax regime can be compelling and the school logistics impossible. A residence route can be straightforward while company control, banking or family routines become much harder.",
    sections: [
      {
        heading: "Start with the family brief",
        body: "Before asking which country is best, decide what the family is trying to optimise: business access, education, tax, lifestyle, healthcare, proximity to relatives, long-term rights, travel or optionality. Rank the priorities before advisers begin answering different versions of the question.",
      },
      {
        heading: "Sequence matters",
        body: "Housing may depend on banking. Banking may depend on residence documents. Schools may need an address. Tax advice may change the timing of a company decision. A move room should identify those dependencies before deposits are paid and deadlines are missed.",
      },
      {
        heading: "Advice still needs reconciliation",
        body: "Immigration counsel can be correct about immigration while tax counsel is correct about tax and the combined plan still does not work. Someone must hold the shared timeline and push contradictory assumptions back into the room until they are resolved.",
      },
    ],
  },
  {
    slug: "skill-is-not-execution",
    category: "Next generation",
    title: "Skill is not execution",
    deck: "Knowing how to use a tool is different from being handed a messy problem and delivering something useful for another person.",
    readTime: "6 min",
    date: "August 2026",
    image: "learning",
    introduction:
      "Education can produce a young person who understands many things and still feels lost when the brief is vague, the deadline is real and somebody else is relying on the outcome. Execution is a separate capability. It can be taught deliberately.",
    sections: [
      {
        heading: "Move from exercises to briefs",
        body: "A real brief has constraints, an audience, trade-offs and consequences. Plan a trip, run a small venture, organise an event, interview a professional, automate a household task or research a charitable decision. Academic knowledge becomes more durable when it has to survive contact with reality.",
      },
      {
        heading: "Teach the loop",
        body: "Know the subject. Apply it in context. Deliver for someone else. Review what happened. That loop trains judgement, communication, resilience and the habit of finishing — capabilities that cannot be reduced to one mark on one test.",
      },
      {
        heading: "Evidence changes the conversation",
        body: "Over time a learner can build a portfolio of projects, presentations, ventures, references, service, code, writing and feedback. The question becomes less ‘what grade did you get?’ and more ‘what can you now do independently?’",
      },
    ],
  },
  {
    slug: "when-do-you-need-a-family-office",
    category: "Family office",
    title: "When do you actually need a family office?",
    deck: "Usually before you need the building, the title or the full headcount. The first need is coordination, continuity and decision ownership.",
    readTime: "7 min",
    date: "August 2026",
    image: "command",
    introduction:
      "Families often imagine a family office as a staffed institution that arrives after enormous wealth. In practice the useful question is simpler: has the complexity become too important to live inside one person’s inbox and memory?",
    sections: [
      {
        heading: "Start with functions, not headcount",
        body: "Cash oversight, entity administration, adviser coordination, property, insurance, document control, family governance, philanthropy and key dates all need ownership. Some can stay outsourced. What matters is that the operating model makes responsibility obvious.",
      },
      {
        heading: "Build for absence",
        body: "A good test is to imagine the principal unavailable for ninety days. Which bills stop? Which renewals disappear? Which adviser has the only copy of a critical document? Which decisions cannot be made? The answers reveal where an operating system is needed.",
      },
      {
        heading: "The dashboard should reduce questions",
        body: "The family should be able to see what it owns, what needs attention, who is responsible and which decisions remain open without asking five different people for five different spreadsheets.",
      },
    ],
  },
  {
    slug: "preparing-children-for-ownership",
    category: "Stewardship",
    title: "Prepare children for ownership before ownership arrives",
    deck: "The transfer of assets is a legal event. The transfer of judgement takes years.",
    readTime: "7 min",
    date: "August 2026",
    image: "learning",
    introduction:
      "Families can spend decades creating assets and surprisingly little time preparing the people who may one day be responsible for them. The solution is not to burden children with adult anxiety. It is to increase exposure and responsibility gradually.",
    sections: [
      {
        heading: "Separate information from authority",
        body: "A young person can learn how a business works long before they have decision rights. They can observe a charitable decision before managing a budget. They can meet advisers before being expected to choose one. Staged exposure makes responsibility less abrupt.",
      },
      {
        heading: "Let them build something of their own",
        body: "Enterprise is easier to understand after creating value for a real customer, managing a small budget, handling a mistake and finishing a project. Capability should not depend on the family already owning the answer.",
      },
      {
        heading: "Stewardship includes service",
        body: "Philanthropy and contribution give the next generation somewhere to practise judgement that is not purely about private consumption. They also make the purpose of resources a family conversation rather than an inheritance surprise.",
      },
    ],
  },
  {
    slug: "how-to-coordinate-advisers-across-borders",
    category: "Advisers",
    title: "How to coordinate advisers across borders without becoming the unpaid project manager",
    deck: "Excellent specialists can still produce a fragmented plan. The family needs a shared question register, dependencies, owners and a decision log.",
    readTime: "8 min",
    date: "August 2026",
    image: "command",
    introduction:
      "Cross-border work becomes exhausting when every professional receives a slightly different brief. The family then becomes responsible for translating between lawyers, accountants, tax counsel, immigration specialists, bankers and trustees while each one understandably focuses on their own mandate.",
    sections: [
      {
        heading: "Write one version of the problem",
        body: "Start with the outcome, the current facts, the target timing and the questions that need professional answers. Give every adviser the same underlying timeline so assumptions can be compared rather than discovered months later.",
      },
      {
        heading: "Track unresolved contradictions",
        body: "Do not silently choose between conflicting advice. Record the contradiction, identify which advisers need to speak and assign someone to close it. An unresolved dependency is a task, not background noise.",
      },
      {
        heading: "Keep a decision log",
        body: "Record the decision, the professional inputs relied on, the date, the owner and any follow-up control. It creates continuity when advisers change and makes future reviews far easier.",
      },
    ],
  },
];

export const findJournalArticle = (slug: string) =>
  journalArticles.find((article) => article.slug === slug);
