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
