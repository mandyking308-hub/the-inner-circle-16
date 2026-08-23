import { trustedPartners } from "@/data/infrastructure";

export type BookingMode = "book" | "request" | "introduction";

export const bookingModeLabel: Record<BookingMode, string> = {
  book: "Book now",
  request: "Request availability",
  introduction: "Private introduction",
};

export const bookingModeNote: Record<BookingMode, string> = {
  book: "Confirmed directly with the provider. Montvelle stays in the background.",
  request: "We hold the request with the provider and come back to you with times.",
  introduction: "Made personally, with your consent, once the brief is clear.",
};

export type ServiceCategory =
  | "Travel & transfer"
  | "Household"
  | "Education"
  | "Wellbeing"
  | "Dining & venues"
  | "Property"
  | "Security"
  | "Cultural access"
  | "Professional advice";

export const serviceCategories: ServiceCategory[] = [
  "Travel & transfer",
  "Household",
  "Education",
  "Wellbeing",
  "Dining & venues",
  "Property",
  "Security",
  "Cultural access",
  "Professional advice",
];

export type ServiceOffering = {
  id: string;
  supplierId: string;
  supplier: string;
  category: ServiceCategory;
  title: string;
  summary: string;
  cities: string[];
  mode: BookingMode;
  standard: string;
  benefit: string;
  indicative: string;
  terms: string;
  whyTrusted: string;
  needs: string[];
};

/** Supplier organisations. Existing Trusted Partners are reused as the professional bench. */
export type SupplierOrg = {
  id: string;
  name: string;
  category: ServiceCategory;
  status: "Member Recommended" | "Vetted Partner" | "Strategic Partner";
  locations: string[];
  focus: string;
  responseTime: string;
  benefit: string;
  partnerId?: string;
};

const professionalBench: SupplierOrg[] = trustedPartners.map((partner) => ({
  id: partner.id,
  name: partner.name,
  category: "Professional advice",
  status: partner.status,
  locations: [...partner.locations],
  focus: partner.focus,
  responseTime: partner.responseTime,
  benefit: partner.benefit,
  partnerId: partner.id,
}));

const lifestyleSuppliers: SupplierOrg[] = [
  {
    id: "sup-drive",
    name: "Ashford Private Drive",
    category: "Travel & transfer",
    status: "Vetted Partner",
    locations: ["London", "Paris", "Geneva"],
    focus: "Discreet chauffeur and airport transfer with the same small team of drivers.",
    responseTime: "Usually within 1 hour",
    benefit: "Same driver held for the household wherever possible.",
  },
  {
    id: "sup-house",
    name: "Lindow House Management",
    category: "Household",
    status: "Strategic Partner",
    locations: ["London", "Cotswolds", "Lisbon"],
    focus: "House opening, seasonal preparation and quiet supervision of residences between stays.",
    responseTime: "Same day",
    benefit: "Arrival preparation included on the first visit of each season.",
  },
  {
    id: "sup-wellbeing",
    name: "Cadogan Wellbeing",
    category: "Wellbeing",
    status: "Vetted Partner",
    locations: ["London", "Geneva", "Remote"],
    focus: "Private physiotherapy, restorative training and travel-recovery routines at home.",
    responseTime: "Usually within 4 hours",
    benefit: "Priority scheduling around travel weeks.",
  },
  {
    id: "sup-table",
    name: "Maison Verrier",
    category: "Dining & venues",
    status: "Strategic Partner",
    locations: ["Paris", "London", "Monaco"],
    focus: "Private dining rooms, chef residencies and unlisted tables for small gatherings.",
    responseTime: "Same day",
    benefit: "Two held tables each month for members.",
  },
  {
    id: "sup-property",
    name: "Warren & Field Property",
    category: "Property",
    status: "Vetted Partner",
    locations: ["London", "Lisbon", "New York"],
    focus: "Quiet acquisition, off-market search and long-lease negotiation for private residences.",
    responseTime: "Usually within 1 business day",
    benefit: "Search brief prepared before any viewing.",
  },
  {
    id: "sup-security",
    name: "Northgate Family Security",
    category: "Security",
    status: "Vetted Partner",
    locations: ["London", "Dubai", "Global"],
    focus: "Residential security review, travel risk notes and discreet close protection.",
    responseTime: "Usually within 2 hours",
    benefit: "Annual residence review at member rate.",
  },
  {
    id: "sup-culture",
    name: "Aperture Cultural",
    category: "Cultural access",
    status: "Member Recommended",
    locations: ["London", "Paris", "Venice"],
    focus: "Private views, curator-led visits and access to closed collections.",
    responseTime: "Usually within 1 business day",
    benefit: "Two curator-led visits each season.",
  },
];

export const supplierOrgs: SupplierOrg[] = [...lifestyleSuppliers, ...professionalBench];

export const getSupplier = (id: string) => supplierOrgs.find((supplier) => supplier.id === id);

export const serviceOfferings: ServiceOffering[] = [
  {
    id: "svc-driver-city",
    supplierId: "sup-drive",
    supplier: "Ashford Private Drive",
    category: "Travel & transfer",
    title: "Driver for the day",
    summary: "One driver and car held for the household for a full day in the city.",
    cities: ["London", "Paris", "Geneva"],
    mode: "book",
    standard: "Confirmed within the hour. Driver briefed before arrival.",
    benefit: "Same driver retained for the household where possible.",
    indicative: "From £680 per day",
    terms: "Free cancellation up to 24 hours before the first pick-up.",
    whyTrusted: "Used by three households over two years with no service failure recorded.",
    needs: ["Airport transfer", "A car for the day", "School run cover"],
  },
  {
    id: "svc-airport",
    supplierId: "sup-drive",
    supplier: "Ashford Private Drive",
    category: "Travel & transfer",
    title: "Airport arrival and transfer",
    summary: "Meet on arrival, luggage handled, straight to the residence.",
    cities: ["London", "Paris", "Geneva"],
    mode: "book",
    standard: "Flight monitored. Waiting time included for 90 minutes.",
    benefit: "No surcharge for delayed arrivals.",
    indicative: "From £240",
    terms: "Cancellation free up to 12 hours before the flight lands.",
    whyTrusted: "Consistent arrivals record across four cities.",
    needs: ["Airport transfer", "Arriving late at night"],
  },
  {
    id: "svc-house-open",
    supplierId: "sup-house",
    supplier: "Lindow House Management",
    category: "Household",
    title: "Open the house before arrival",
    summary: "Residence prepared, kitchen stocked to your preferences, rooms aired and heating set.",
    cities: ["London", "Cotswolds", "Lisbon"],
    mode: "request",
    standard: "Preparation completed the day before arrival, with photographs sent.",
    benefit: "First seasonal preparation included.",
    indicative: "From £450 per visit",
    terms: "48 hours notice preferred; shorter notice usually possible.",
    whyTrusted: "Long-standing relationship, staff known personally to the concierge desk.",
    needs: ["Opening a second home", "Preparing for family arrival"],
  },
  {
    id: "svc-house-watch",
    supplierId: "sup-house",
    supplier: "Lindow House Management",
    category: "Household",
    title: "Quiet supervision between stays",
    summary: "Weekly checks, garden and maintenance oversight while the residence is empty.",
    cities: ["Cotswolds", "Lisbon"],
    mode: "request",
    standard: "Weekly written note; anything urgent raised the same day.",
    benefit: "Single point of contact across residences.",
    indicative: "Quote required",
    terms: "Monthly rolling; one month notice.",
    whyTrusted: "Handles three member residences under continuous supervision.",
    needs: ["Looking after an empty house", "Coordinating suppliers"],
  },
  {
    id: "svc-recovery",
    supplierId: "sup-wellbeing",
    supplier: "Cadogan Wellbeing",
    category: "Wellbeing",
    title: "Recovery session at home",
    summary: "Physiotherapy and restorative work at the residence after long travel.",
    cities: ["London", "Geneva"],
    mode: "request",
    standard: "Same practitioner retained wherever possible.",
    benefit: "Priority scheduling in travel weeks.",
    indicative: "From £260 per session",
    terms: "Cancellation free up to 24 hours before.",
    whyTrusted: "Clinically qualified team; scope confirmed before each engagement.",
    needs: ["Recovering after travel", "Keeping a routine while away"],
  },
  {
    id: "svc-medical-route",
    supplierId: "sup-wellbeing",
    supplier: "Cadogan Wellbeing",
    category: "Wellbeing",
    title: "Specialist routing",
    summary: "A considered route to the right specialist, arranged privately.",
    cities: ["London", "Geneva", "Remote"],
    mode: "introduction",
    standard: "Introduction only after the brief is understood and consent is given.",
    benefit: "No detail shared beyond what the introduction requires.",
    indicative: "Quote required",
    terms: "Clinical decisions remain between the family and the practitioner.",
    whyTrusted: "Routed personally rather than by directory search.",
    needs: ["Finding the right specialist"],
  },
  {
    id: "svc-private-table",
    supplierId: "sup-table",
    supplier: "Maison Verrier",
    category: "Dining & venues",
    title: "Private table for six to twelve",
    summary: "An unlisted room, a considered menu and no attention.",
    cities: ["Paris", "London", "Monaco"],
    mode: "request",
    standard: "Proposal within the day, including menu and room photographs.",
    benefit: "Two held tables each month for members.",
    indicative: "From €180 per person",
    terms: "Deposit returned if cancelled more than 72 hours before.",
    whyTrusted: "Discretion tested repeatedly with sensitive guest lists.",
    needs: ["Hosting a private dinner", "A quiet room for a conversation"],
  },
  {
    id: "svc-chef",
    supplierId: "sup-table",
    supplier: "Maison Verrier",
    category: "Dining & venues",
    title: "Chef at the residence",
    summary: "A chef and one assistant for an evening at home.",
    cities: ["Paris", "London"],
    mode: "request",
    standard: "Menu agreed in advance against household dietary notes.",
    benefit: "Menu planning included.",
    indicative: "From €1,400 per evening",
    terms: "Cancellation free up to five days before.",
    whyTrusted: "Familiar with member households and their preferences.",
    needs: ["Hosting a private dinner", "Family gathering at home"],
  },
  {
    id: "svc-search",
    supplierId: "sup-property",
    supplier: "Warren & Field Property",
    category: "Property",
    title: "Off-market residence search",
    summary: "A quiet search brief, then a small number of genuinely suitable homes.",
    cities: ["London", "Lisbon", "New York"],
    mode: "introduction",
    standard: "Brief written first; nothing shown until it is agreed.",
    benefit: "No viewings without a considered brief.",
    indicative: "Quote required",
    terms: "Engagement terms confirmed in writing before any search begins.",
    whyTrusted: "Handles searches without the household name entering the market.",
    needs: ["Buying or leasing a home", "Moving country"],
  },
  {
    id: "svc-security-review",
    supplierId: "sup-security",
    supplier: "Northgate Family Security",
    category: "Security",
    title: "Residence security review",
    summary: "A calm assessment of the home, its routines and its people.",
    cities: ["London", "Dubai"],
    mode: "introduction",
    standard: "Findings delivered privately, never stored in shared systems.",
    benefit: "Annual review at member rate.",
    indicative: "From £2,200",
    terms: "Scope and data handling agreed before any site visit.",
    whyTrusted: "Screened team; no subcontracting without disclosure.",
    needs: ["Feeling safer at home", "Travelling somewhere unfamiliar"],
  },
  {
    id: "svc-travel-risk",
    supplierId: "sup-security",
    supplier: "Northgate Family Security",
    category: "Security",
    title: "Travel notes before a trip",
    summary: "A short private briefing on a destination, written for the family travelling.",
    cities: ["Global"],
    mode: "request",
    standard: "Delivered 48 hours before departure.",
    benefit: "Included for members twice a year.",
    indicative: "Included",
    terms: "Advisory only; the family makes its own decisions.",
    whyTrusted: "Judgement over alarm. No unnecessary escalation.",
    needs: ["Travelling somewhere unfamiliar"],
  },
  {
    id: "svc-curator",
    supplierId: "sup-culture",
    supplier: "Aperture Cultural",
    category: "Cultural access",
    title: "Curator-led private view",
    summary: "An hour in a closed gallery with the person who knows the work.",
    cities: ["London", "Paris", "Venice"],
    mode: "request",
    standard: "Two date options offered within 48 hours.",
    benefit: "Two curator-led visits each season.",
    indicative: "From £400",
    terms: "Cancellation free up to 72 hours before.",
    whyTrusted: "Relationships held with institutions rather than agencies.",
    needs: ["A weekend worth remembering", "Opening a young person's world"],
  },
  {
    id: "svc-education",
    supplierId: "partner-03",
    supplier: "Elm House Education",
    category: "Education",
    title: "School transition advice",
    summary: "Guidance on schools, timing and continuity when the family moves.",
    cities: ["London", "Global"],
    mode: "introduction",
    standard: "Introduction made after the brief is agreed with the concierge desk.",
    benefit: "Priority education planning clinic each month.",
    indicative: "Quote required",
    terms: "Admissions decisions remain with the school and the family.",
    whyTrusted: "Strategic Partner. Fifteen completed member briefs.",
    needs: ["Moving country", "Choosing a school"],
  },
  {
    id: "svc-legal",
    supplierId: "partner-01",
    supplier: "North & Vale Private Client",
    category: "Professional advice",
    title: "Private client legal introduction",
    summary: "Succession, governance and cross-border private client matters.",
    cities: ["London", "Geneva"],
    mode: "introduction",
    standard: "Conflicts checked before any formal instruction.",
    benefit: "Initial scoping call reserved for members.",
    indicative: "Quote required",
    terms: "Engagement and fees agreed directly with the firm.",
    whyTrusted: "Member Recommended. Reviewed July 2026.",
    needs: ["Succession and governance", "Cross-border affairs"],
  },
  {
    id: "svc-residence",
    supplierId: "partner-02",
    supplier: "Atlas Residence Advisory",
    category: "Professional advice",
    title: "Residence planning introduction",
    summary: "Multi-jurisdiction residence planning and relocation sequencing.",
    cities: ["London", "Dubai", "Lisbon"],
    mode: "introduction",
    standard: "Case triaged before formal instruction.",
    benefit: "Member case triage included.",
    indicative: "Quote required",
    terms: "Formal tax and immigration advice routed to authorised professionals.",
    whyTrusted: "Vetted Partner. Eleven completed briefs.",
    needs: ["Moving country", "Cross-border affairs"],
  },
];

/** The default entry point: start with the need, not a directory. */
export const serviceNeeds = [
  "Airport transfer",
  "A car for the day",
  "Opening a second home",
  "Hosting a private dinner",
  "Moving country",
  "Choosing a school",
  "Recovering after travel",
  "Travelling somewhere unfamiliar",
  "Buying or leasing a home",
  "A weekend worth remembering",
] as const;

export const getService = (id: string) => serviceOfferings.find((service) => service.id === id);
