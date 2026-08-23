import {
  legalVersionBundle,
  memberLegalBundle,
  supplierLegalBundle,
  type LegalDocumentKey,
} from "@/config/legal";

/**
 * PREVIEW EVIDENCE ONLY.
 *
 * Production auth and the production database are not live yet, so acceptance
 * events are written to browser storage. This is NOT an audit store: it can be
 * cleared by the user, is per-device and is not tamper-evident.
 *
 * When production auth is enabled, `recordAcceptance` should additionally POST
 * the identical `LegalAcceptanceRecord` shape to a server function that writes
 * it against the authenticated identity. The field names below are chosen so
 * that migration is a straight mapping.
 */

export const ACCEPTANCE_STORAGE_KEY = "montvelle:legal-acceptance-preview";
export const ACCEPTANCE_STORAGE_LIMIT = 50;

export type AcceptanceEventType =
  | "checkout_acceptance"
  | "signin_acceptance"
  | "supplier_acceptance";

export type AcceptanceRole = "member" | "supplier" | "checkout";

export type LegalAcceptanceRecord = {
  eventType: AcceptanceEventType;
  role: AcceptanceRole;
  legalVersionBundle: string;
  documentKeys: LegalDocumentKey[];
  timestamp: string;
  identityReference: string | null;
  /** True while records live only in browser storage. */
  previewEvidenceOnly: true;
};

export function buildAcceptanceRecord(input: {
  eventType: AcceptanceEventType;
  role: AcceptanceRole;
  documentKeys: LegalDocumentKey[];
  identityReference?: string | null;
}): LegalAcceptanceRecord {
  return {
    eventType: input.eventType,
    role: input.role,
    legalVersionBundle: legalVersionBundle(input.documentKeys),
    documentKeys: input.documentKeys,
    timestamp: new Date().toISOString(),
    identityReference: input.identityReference ?? null,
    previewEvidenceOnly: true,
  };
}

export function recordAcceptance(input: {
  eventType: AcceptanceEventType;
  role: AcceptanceRole;
  documentKeys: LegalDocumentKey[];
  identityReference?: string | null;
}): LegalAcceptanceRecord {
  const record = buildAcceptanceRecord(input);
  if (typeof window === "undefined") return record;
  try {
    const existing = readAcceptanceRecords();
    const next = [record, ...existing].slice(0, ACCEPTANCE_STORAGE_LIMIT);
    window.localStorage.setItem(ACCEPTANCE_STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Storage can be unavailable (private mode, quota). Never block the flow.
  }
  return record;
}

export function readAcceptanceRecords(): LegalAcceptanceRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ACCEPTANCE_STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as LegalAcceptanceRecord[]) : [];
  } catch {
    return [];
  }
}

export function recordMemberSignInAcceptance(identityReference?: string | null) {
  return recordAcceptance({
    eventType: "signin_acceptance",
    role: "member",
    documentKeys: memberLegalBundle,
    identityReference: identityReference ?? null,
  });
}

export function recordSupplierAcceptance(identityReference?: string | null) {
  return recordAcceptance({
    eventType: "supplier_acceptance",
    role: "supplier",
    documentKeys: supplierLegalBundle,
    identityReference: identityReference ?? null,
  });
}

export function recordCheckoutAcceptance(identityReference?: string | null) {
  return recordAcceptance({
    eventType: "checkout_acceptance",
    role: "checkout",
    documentKeys: memberLegalBundle,
    identityReference: identityReference ?? null,
  });
}
