/**
 * Public Montvelle World demo.
 *
 * The demo grants access to the MEMBER environment only, using illustrative
 * DEMO fixtures and local browser persistence. It never grants admin or
 * supplier access, and it never touches production data or credentials.
 */
export const DEMO_MODE_KEY = "montvelle:demo-mode";

export function enableDemoMode() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(DEMO_MODE_KEY, "1");
  } catch {
    /* storage unavailable */
  }
}

export function disableDemoMode() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.removeItem(DEMO_MODE_KEY);
  } catch {
    /* storage unavailable */
  }
}

export function isDemoMode(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(DEMO_MODE_KEY) === "1";
  } catch {
    return false;
  }
}
