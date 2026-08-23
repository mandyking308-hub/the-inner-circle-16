import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { membershipPricing } from "@/config/membershipPricing";

const checkoutInput = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  country: z.string().trim().min(2).max(80).optional(),
  acceptedTerms: z.literal(true),
  requestedImmediateService: z.literal(true),
});

const checkoutResponse = z.object({
  checkout_url: z.string().url(),
  session_id: z.string().optional(),
});

function dodoApiBaseUrl() {
  const environment = process.env["DODO_PAYMENTS_ENVIRONMENT"]?.trim();
  return environment === "live_mode" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";
}

/**
 * The annual product is intentionally configured as a one-time 12-month
 * membership purchase rather than an auto-renewing subscription. This keeps
 * renewal pricing explicit while Montvelle follows a rising annual price
 * strategy. The joining product is a separate one-time fee. Both are placed in
 * the same hosted Dodo Checkout Session.
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
          country: data.country ?? "not_provided",
          terms_acknowledged: "true",
          immediate_service_requested: "true",
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
