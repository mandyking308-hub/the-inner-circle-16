import { z } from "zod";

export const checkoutInput = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  country: z.string().trim().min(2).max(80).optional(),
  /** Legal clickwrap — the server accepts nothing but an explicit true. */
  acceptedTerms: z.literal(true),
  /** Acknowledgement that payment does not override admission/compliance checks. */
  acknowledgedAdmissionChecks: z.literal(true),
  /**
   * Kept deliberately separate from legal acceptance: this is the consumer's
   * request for service to begin during any statutory cancellation period and
   * may legitimately be false.
   */
  requestedImmediateService: z.boolean(),
  /** Version bundle of the documents displayed at the moment of acceptance. */
  legalVersionBundle: z.string().trim().min(3).max(400),
  /** Client-side acceptance timestamp (ISO 8601). */
  acceptedAt: z.string().trim().min(10).max(40),
});

export type CheckoutInput = z.infer<typeof checkoutInput>;

export const checkoutResponse = z.object({
  checkout_url: z.string().url(),
  session_id: z.string().optional(),
});

export function dodoApiBaseUrl() {
  const environment = process.env["DODO_PAYMENTS_ENVIRONMENT"]?.trim();
  return environment === "live_mode" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";
}
