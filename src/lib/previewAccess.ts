/**
 * Internal Lovable preview helpers.
 *
 * Preview sign-in exists only on the Lovable internal preview host
 * (`id-preview--*.lovable.app`) and on localhost during development.
 * Public and production hosts stay gated until real auth is wired.
 */
export const PREVIEW_IDENTITY_KEY = "montvelle:preview-identity";

export function isInternalPreviewHost(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") return true;
  if (host.endsWith(".lovableproject.com")) return true;
  return host.startsWith("id-preview--") && host.endsWith(".lovable.app");
}

export function setPreviewIdentity(email: string) {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(PREVIEW_IDENTITY_KEY, email);
    window.localStorage.setItem(PREVIEW_IDENTITY_KEY, email);
  } catch {
    /* storage unavailable in this context */
  }
}

export function readPreviewIdentity(): string {
  if (typeof window === "undefined") return "";
  try {
    return (
      window.sessionStorage.getItem(PREVIEW_IDENTITY_KEY) ??
      window.localStorage.getItem(PREVIEW_IDENTITY_KEY) ??
      ""
    );
  } catch {
    return "";
  }
}
