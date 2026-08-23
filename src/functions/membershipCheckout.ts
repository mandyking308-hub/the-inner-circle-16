import { createServerFn } from "@tanstack/react-start";

import { membershipPricing } from "@/config/membershipPricing";
import { checkoutInput, checkoutResponse, dodoApiBaseUrl } from "@/functions/membershipCheckout.server";

/**
 * The annual product is intentionally configured as a one-time 12-month
 * membership purchase rather than an auto-renewing subscription. This keeps
 * renewal pricing explicit while Montvelle follows a rising annual price
 * strategy. The joining product is a separate one-time fee. Both are placed in
 * the same hosted Dodo Checkout Session.
 *
 * Dodo Payments may act as merchant of record for the transaction where
 * configured; GSM operates and performs the membership itself.
 */
export const createMembershipCheckoutFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => checkoutInput.parse(input))
  .handler(async ({ data }): Promise<{ checkoutUrl: string }> => {
    const apiKey = process.env["DODO_PAYMENTS_API_KEY"]?.trim();
    const annualProductId = process.env["DODO_MONTVELLE_ANNUAL_PRODUCT_ID"]?.trim();
    const joiningProductId = process.env["DODO_MONTVELLE_JOINING_PRODUCT_ID"]?.trim();
    const publicUrl = (process.env["MONTVELLE_PUBLIC_URL"]?.trim() || "https://montvelle.com").replace(/\/$/, "");

    if (!apiKey || !annualProductId || !joiningProductId) {
      throw new Error("Secure Montvelle checkout is being configured. Please try again shortly.");
    }

    const response = await fetch(`${dodoApiBaseUrl()}/checkouts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_cart: [
          { product_id: annualProductId, quantity: 1 },
          { product_id: joiningProductId, quantity: 1 },
        ],
        customer: {
          email: data.email,
          name: data.name,
        },
        return_url: `${publicUrl}/membership/complete`,
        cancel_url: `${publicUrl}/membership`,
        metadata: {
          brand: "montvelle",
          operator: "Global Solutions Management LLC",
          offer: `founding_membership_${membershipPricing.pricingYear}`,
          annual_fee_pence: String(membershipPricing.annualPence),
          joining_fee_pence: String(membershipPricing.joiningPence),
          country_of_residence: data.country ?? "not_provided",
          legal_version_bundle: data.legalVersionBundle,
          terms_accepted_at: data.acceptedAt,
          terms_acknowledged: String(data.acceptedTerms),
          admission_checks_acknowledged: String(data.acknowledgedAdmissionChecks),
          immediate_service_requested: String(data.requestedImmediateService),
        },
      }),
    });

    if (!response.ok) {
      const diagnostic = await response.text().catch(() => "");
      console.error("[Montvelle checkout] Dodo session creation failed", response.status, diagnostic.slice(0, 500));
      throw new Error("Secure checkout could not be started. Please try again shortly.");
    }

    const parsed = checkoutResponse.safeParse(await response.json());
    if (!parsed.success) {
      throw new Error("The payment provider returned an invalid checkout response.");
    }

    return { checkoutUrl: parsed.data.checkout_url };
  });
