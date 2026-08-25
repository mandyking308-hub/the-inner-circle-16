/**
 * Central legal document versioning.
 *
 * INTERNAL NOTE — this pack has NOT been reviewed by external counsel. It is a
 * good-faith internal draft and requires review for UK/EU/US (Delaware)
 * consumer, distance-selling and privacy law before live trading, then local
 * addenda as member geographies expand. Acceptance evidence recorded in the
 * browser is preview evidence only; it is not a production audit store.
 *
 * Every clickwrap surface (member sign-in, supplier sign-in) records
 * the bundle version below alongside a timestamp. When production auth and the
 * database are enabled, the same `legalVersionBundle` string should be written
 * server-side against the authenticated identity.
 */

export type LegalDocumentKey =
  | "membershipAgreement"
  | "websiteTerms"
  | "privacyNotice"
  | "confidentiality"
  | "supplierAgreement"
  | "cancellationRights"
  | "cookies";

export type LegalDocument = {
  key: LegalDocumentKey;
  title: string;
  shortTitle: string;
  version: string;
  effectiveDate: string;
  path: string;
};

export const legalDocuments: Record<LegalDocumentKey, LegalDocument> = {
  membershipAgreement: {
    key: "membershipAgreement",
    title: "Membership Agreement",
    shortTitle: "Membership Agreement",
    version: "MA-2026.3",
    effectiveDate: "2026-08-25",
    path: "/membership-agreement",
  },
  websiteTerms: {
    key: "websiteTerms",
    title: "Terms of membership & use",
    shortTitle: "Website Terms",
    version: "WT-2026.4",
    effectiveDate: "2026-08-25",
    path: "/terms",
  },
  privacyNotice: {
    key: "privacyNotice",
    title: "Privacy Notice",
    shortTitle: "Privacy Notice",
    version: "PN-2026.2",
    effectiveDate: "2026-08-24",
    path: "/privacy",
  },
  confidentiality: {
    key: "confidentiality",
    title: "Confidentiality & No Solicitation",
    shortTitle: "Confidentiality & No Solicitation standard",
    version: "CN-2026.1",
    effectiveDate: "2026-08-23",
    path: "/confidentiality",
  },
  supplierAgreement: {
    key: "supplierAgreement",
    title: "Supplier & Partner Agreement",
    shortTitle: "Supplier & Partner Agreement",
    version: "SP-2026.2",
    effectiveDate: "2026-08-25",
    path: "/supplier-agreement",
  },
  cancellationRights: {
    key: "cancellationRights",
    title: "Cancellation Rights",
    shortTitle: "Cancellation Rights",
    version: "CR-2026.3",
    effectiveDate: "2026-08-25",
    path: "/cancellation",
  },
  cookies: {
    key: "cookies",
    title: "Cookies & local storage",
    shortTitle: "Cookies",
    version: "CK-2026.1",
    effectiveDate: "2026-08-23",
    path: "/cookies",
  },
};

/** Documents a member accepts at every sign-in. */
export const memberLegalBundle: LegalDocumentKey[] = [
  "membershipAgreement",
  "websiteTerms",
  "privacyNotice",
  "confidentiality",
];

/** Documents a supplier accepts before portal access. */
export const supplierLegalBundle: LegalDocumentKey[] = [
  "supplierAgreement",
  "privacyNotice",
  "confidentiality",
];

/** Stable, comparable identifier for a set of document versions. */
export function legalVersionBundle(keys: LegalDocumentKey[]): string {
  return keys
    .map((key) => `${legalDocuments[key].key}:${legalDocuments[key].version}`)
    .sort()
    .join("|");
}

export const memberLegalVersionBundle = legalVersionBundle(memberLegalBundle);
export const supplierLegalVersionBundle = legalVersionBundle(supplierLegalBundle);

/** Human-readable "last updated" line used across the public legal pages. */
export function legalUpdatedLine(key: LegalDocumentKey): string {
  const document = legalDocuments[key];
  const formatted = new Date(`${document.effectiveDate}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
  return `Version ${document.version} · effective ${formatted}`;
}
