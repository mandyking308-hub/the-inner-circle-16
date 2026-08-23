export const membershipPricing = {
  currency: "GBP",
  annualPence: 3_500_000,
  annualDisplay: "£35,000",
  joiningPence: 750_000,
  joiningDisplay: "£7,500",
  firstYearPence: 4_250_000,
  firstYearDisplay: "£42,500",
  termMonths: 12,
  pricingYear: 2026,
} as const;

/**
 * Family membership is the same Montvelle standard, held as a household
 * relationship rather than a wider or better tier. The published figure is a
 * "from" price only: the final annual fee, the approved household composition
 * and any admission/onboarding amount are recorded in the Membership Schedule
 * after review. There is no per-seat menu and no published family joining fee.
 */
export const familyMembershipPricing = {
  currency: "GBP",
  fromAnnualPence: 5_500_000,
  fromAnnualDisplay: "from £55,000",
  fromAnnualAmountDisplay: "£55,000",
  termMonths: 12,
  pricingYear: 2026,
} as const;

/**
 * Commercial policy for internal planning (not a promise to members):
 * target new-member annual pricing rises by £10,000 for each new pricing year
 * as Montvelle grows. Existing and renewing memberships are governed by the
 * fee stated in the applicable Membership Schedule / renewal invitation.
 */
export const newMemberPricingPlan = [
  { pricingYear: 2026, annualPence: 3_500_000, annualDisplay: "£35,000" },
  { pricingYear: 2027, annualPence: 4_500_000, annualDisplay: "£45,000" },
  { pricingYear: 2028, annualPence: 5_500_000, annualDisplay: "£55,000" },
  { pricingYear: 2029, annualPence: 6_500_000, annualDisplay: "£65,000" },
] as const;
