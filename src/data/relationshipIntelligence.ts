export type RelationshipContext = {
  memberId: string;
  metAt?: string;
  mutualConnections: string[];
  sharedContexts: string[];
  languages: string[];
  otherCities: string[];
  whyRelevant: string;
  relationship: "Your Table" | "Known member" | "Not yet met";
};

export const relationshipIntelligence: RelationshipContext[] = [
  { memberId: "amelia-hart", metAt: "London Table 01", mutualConnections: [], sharedContexts: ["Technology", "Family enterprise"], languages: ["English"], otherCities: ["Geneva"], whyRelevant: "Shared interest in technology, governance and building a family operating layer around a founder-led company.", relationship: "Your Table" },
  { memberId: "daniel-okafor", metAt: "London Table 01", mutualConnections: ["DEMO Member F"], sharedContexts: ["Succession", "Next generation"], languages: ["English"], otherCities: ["Lagos"], whyRelevant: "Second-generation operator with direct experience preparing a third generation while keeping operating discipline.", relationship: "Your Table" },
  { memberId: "sophia-chen", metAt: "AI Salon", mutualConnections: ["DEMO Member L"], sharedContexts: ["AI", "Risk"], languages: ["English", "Mandarin"], otherCities: ["Singapore"], whyRelevant: "Useful perspective when a family decision touches institutional capital allocation, private markets or risk discipline.", relationship: "Your Table" },
  { memberId: "james-whitmore", metAt: "Governance breakfast", mutualConnections: ["DEMO Member B"], sharedContexts: ["Trusts", "Governance", "Succession"], languages: ["English"], otherCities: ["Geneva"], whyRelevant: "Has lived through several founder-to-next-generation transitions and can help frame the questions before formal instruction.", relationship: "Your Table" },
  { memberId: "layla-rahman", metAt: "London Table 01", mutualConnections: ["DEMO Member I"], sharedContexts: ["Health", "International growth"], languages: ["English", "Arabic"], otherCities: ["Dubai"], whyRelevant: "Operator perspective on growing regulated services internationally without losing standards or culture.", relationship: "Your Table" },
  { memberId: "marcus-vella", metAt: "London Table 01", mutualConnections: ["DEMO Member B"], sharedContexts: ["Boards", "Next generation"], languages: ["English", "Italian"], otherCities: ["Milan"], whyRelevant: "Founder-to-chair experience and practical judgement around meaningful roles for adult children outside forced succession.", relationship: "Your Table" },
  { memberId: "maya-patel", metAt: "Family Learning salon", mutualConnections: ["DEMO Member A"], sharedContexts: ["Education", "Community"], languages: ["English", "Gujarati"], otherCities: ["London"], whyRelevant: "Strong learning-design and parent-community perspective for families rethinking what education should produce.", relationship: "Your Table" },
  { memberId: "oliver-reed", metAt: "Global Life breakfast", mutualConnections: ["DEMO Member D"], sharedContexts: ["Tax", "Mobility"], languages: ["English"], otherCities: ["Lisbon", "Dubai"], whyRelevant: "Useful when a founder needs to understand which cross-border questions belong with tax counsel before implementation begins.", relationship: "Your Table" },
  { memberId: "nina-brooks", metAt: "Impact visit", mutualConnections: ["DEMO Member E"], sharedContexts: ["Impact", "Health", "Education"], languages: ["English"], otherCities: ["New York"], whyRelevant: "Can help distinguish performative giving from long-term programme design and measurable charitable delivery.", relationship: "Your Table" },
  { memberId: "theo-morgan", metAt: "London Table 01", mutualConnections: ["DEMO Member F"], sharedContexts: ["Hiring", "Founder independence"], languages: ["English"], otherCities: ["Cambridge"], whyRelevant: "Physical-business operator with experience building management independence and international supply chains.", relationship: "Your Table" },
  { memberId: "elena-rossi", metAt: "European families dinner", mutualConnections: ["DEMO Member F"], sharedContexts: ["Family office", "Next generation"], languages: ["Italian", "English", "French"], otherCities: ["Milan", "Geneva"], whyRelevant: "A multigenerational family-office perspective on modernising systems without turning the family into an institution it no longer recognises.", relationship: "Known member" },
  { memberId: "idris-khan", metAt: "AI Salon", mutualConnections: ["DEMO Member C"], sharedContexts: ["Cybersecurity", "AI", "Privacy"], languages: ["English"], otherCities: ["London"], whyRelevant: "Security-by-design perspective when family technology, privacy and AI decisions need more rigour than consumer defaults.", relationship: "Known member" },
];

export const getRelationshipContext = (memberId: string) => relationshipIntelligence.find((item) => item.memberId === memberId);
