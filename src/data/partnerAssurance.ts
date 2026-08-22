export type PartnerAssurance = {
  partnerId: string;
  dueDiligence: "Current" | "Review due" | "Restricted";
  lastReview: string;
  nextReview: string;
  jurisdictions: string[];
  regulatoryNote: string;
  conflicts: string;
  referralDisclosure: string;
  service: {
    responsiveness: number;
    clarity: number;
    expertise: number;
    followThrough: number;
  };
  completedBriefs: number;
  memberFeedbackCount: number;
};

export const partnerAssurance: PartnerAssurance[] = [
  {
    partnerId: "partner-01",
    dueDiligence: "Current",
    lastReview: "2026-07-15",
    nextReview: "2027-01-15",
    jurisdictions: ["England & Wales", "Switzerland — coordinated local counsel"],
    regulatoryNote: "Illustrative private-client legal provider. Members confirm the individual professional and jurisdiction appropriate to their matter before instruction.",
    conflicts: "Conflicts checked before each formal instruction.",
    referralDisclosure: "No referral payment shown in this member record.",
    service: { responsiveness: 4.7, clarity: 4.8, expertise: 4.8, followThrough: 4.6 },
    completedBriefs: 8,
    memberFeedbackCount: 6,
  },
  {
    partnerId: "partner-02",
    dueDiligence: "Current",
    lastReview: "2026-06-20",
    nextReview: "2026-12-20",
    jurisdictions: ["United Kingdom", "UAE", "Portugal"],
    regulatoryNote: "Residence-planning coordination; formal immigration and tax advice routed to appropriately authorised professionals in the relevant jurisdiction.",
    conflicts: "Provider relationships disclosed where a recommended route generates third-party fees.",
    referralDisclosure: "No undisclosed commission permitted.",
    service: { responsiveness: 4.9, clarity: 4.5, expertise: 4.6, followThrough: 4.7 },
    completedBriefs: 11,
    memberFeedbackCount: 8,
  },
  {
    partnerId: "partner-03",
    dueDiligence: "Current",
    lastReview: "2026-08-01",
    nextReview: "2027-02-01",
    jurisdictions: ["United Kingdom", "International school search"],
    regulatoryNote: "Education advisory service. School admissions decisions remain with the relevant school and family.",
    conflicts: "Any school referral relationship must be disclosed before a recommendation is treated as independent.",
    referralDisclosure: "Member benefit recorded separately from any school-side commercial arrangement.",
    service: { responsiveness: 4.9, clarity: 4.9, expertise: 4.8, followThrough: 4.9 },
    completedBriefs: 15,
    memberFeedbackCount: 12,
  },
  {
    partnerId: "partner-04",
    dueDiligence: "Current",
    lastReview: "2026-07-10",
    nextReview: "2027-01-10",
    jurisdictions: ["UK", "EU", "Remote"],
    regulatoryNote: "Cyber and privacy services; scope and data-handling terms confirmed before access to member systems.",
    conflicts: "Product resale or managed-service incentives disclosed before recommendation.",
    referralDisclosure: "No referral payment shown in this member record.",
    service: { responsiveness: 4.6, clarity: 4.7, expertise: 4.9, followThrough: 4.5 },
    completedBriefs: 6,
    memberFeedbackCount: 5,
  },
  {
    partnerId: "partner-05",
    dueDiligence: "Review due",
    lastReview: "2026-02-12",
    nextReview: "2026-08-12",
    jurisdictions: ["United Kingdom", "France", "UAE"],
    regulatoryNote: "Recruitment and staffing provider; reference, right-to-work and role-specific screening processes vary by placement and jurisdiction.",
    conflicts: "Placement fee structure disclosed before member instruction.",
    referralDisclosure: "No additional Project Table referral fee shown.",
    service: { responsiveness: 4.5, clarity: 4.4, expertise: 4.6, followThrough: 4.3 },
    completedBriefs: 9,
    memberFeedbackCount: 7,
  },
  {
    partnerId: "partner-06",
    dueDiligence: "Current",
    lastReview: "2026-07-28",
    nextReview: "2027-01-28",
    jurisdictions: ["United Kingdom", "International coordination"],
    regulatoryNote: "Navigation and coordination only; clinical advice and treatment remain with appropriately qualified healthcare professionals.",
    conflicts: "Provider or referral relationships disclosed where relevant to a recommendation.",
    referralDisclosure: "No referral payment shown in this member record.",
    service: { responsiveness: 4.9, clarity: 4.7, expertise: 4.6, followThrough: 4.8 },
    completedBriefs: 7,
    memberFeedbackCount: 6,
  },
];

export const getPartnerAssurance = (partnerId: string) => partnerAssurance.find((item) => item.partnerId === partnerId);
