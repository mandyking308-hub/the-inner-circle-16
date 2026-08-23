export const memberQualification = [
  {
    key: "responsibility",
    label: "Responsibility",
    question:
      "Is this person genuinely responsible for consequential business, family-enterprise, capital or institutional decisions?",
  },
  {
    key: "complexity",
    label: "Complexity",
    question:
      "Are they dealing with the kind of multi-adviser, multigenerational or cross-border complexity the community is built to help with?",
  },
  {
    key: "contribution",
    label: "Contribution",
    question:
      "Will their judgement, experience, curiosity, relationships or willingness to help make other members better?",
  },
  {
    key: "character",
    label: "Character",
    question:
      "Can other members speak plainly around them without worrying about confidentiality, status games or extraction?",
  },
  {
    key: "participation",
    label: "Participation",
    question:
      "Are they willing and realistically able to show up often enough for a permanent Table to compound in value?",
  },
  {
    key: "roomFit",
    label: "Room fit",
    question:
      "Does this person improve the current Table mix rather than merely increase its prestige or size?",
  },
] as const;

export const partnerQualification = [
  {
    key: "expertise",
    label: "Expertise",
    question: "Is the firm demonstrably excellent in a category members genuinely need?",
  },
  {
    key: "references",
    label: "References",
    question:
      "Can relevant clients or professional peers speak to service quality, judgement and integrity?",
  },
  {
    key: "collaboration",
    label: "Collaboration",
    question:
      "Can the firm work well alongside other advisers without trying to own the entire client relationship?",
  },
  {
    key: "response",
    label: "Responsiveness",
    question:
      "Does the service standard match the urgency and discretion expected by globally mobile families?",
  },
  {
    key: "conflicts",
    label: "Conflicts & disclosure",
    question:
      "Are commercial incentives, referral arrangements, regulatory status and conflicts clear enough for a member to make an informed choice?",
  },
  {
    key: "culture",
    label: "Culture",
    question:
      "Will the firm respect the no-solicitation firewall and earn trust through useful work rather than access-seeking?",
  },
] as const;

export type ReviewScore = 1 | 2 | 3 | 4 | 5;

export const scoreMeaning: Record<ReviewScore, string> = {
  1: "Clear concern",
  2: "Weak / uncertain",
  3: "Potential fit",
  4: "Strong fit",
  5: "Exceptional fit",
};
