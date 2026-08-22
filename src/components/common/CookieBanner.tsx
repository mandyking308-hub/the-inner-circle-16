import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const VERSION = "montvelle-cookie-notice-1.0";
const STORAGE_KEY = "montvelle:cookie-consent";
const VERSION_KEY = "montvelle:cookie-version";
export const OPEN_COOKIE_SETTINGS_EVENT = "montvelle:open-cookie-settings";

export type CookiePreferences = {
  necessary: true;
  functional: boolean;
  analytics: boolean;
  other: boolean;
};

const DEFAULTS: CookiePreferences = { necessary: true, functional: false, analytics: false, other: false };

const getStoredPrefs = (): CookiePreferences | null => {
  if (typeof window === "undefined") return null;
  try {
    if (window.localStorage.getItem(VERSION_KEY) !== VERSION) return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookiePreferences>;
    return { necessary: true, functional: Boolean(parsed.functional), analytics: Boolean(parsed.analytics), other: Boolean(parsed.other) };
  } catch {
    return null;
  }
};

const applyConsent = (prefs: CookiePreferences) => {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("consent", "update", {
    analytics_storage: prefs.analytics ? "granted" : "denied",
    ad_storage: prefs.other ? "granted" : "denied",
    ad_user_data: prefs.other ? "granted" : "denied",
    ad_personalization: prefs.other ? "granted" : "denied",
    functionality_storage: prefs.functional ? "granted" : "denied",
    security_storage: "granted",
  });
};

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>(DEFAULTS);

  const persist = useCallback((next: CookiePreferences) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.localStorage.setItem(VERSION_KEY, VERSION);
    window.localStorage.setItem("montvelle:cookie-consent-at", new Date().toISOString());
    applyConsent(next);
    setPrefs(next);
    setShowBanner(false);
    setShowManage(false);
    window.dispatchEvent(new CustomEvent("montvelle:consent-updated", { detail: next }));
  }, []);

  useEffect(() => {
    const stored = getStoredPrefs();
    if (stored) {
      setPrefs(stored);
      applyConsent(stored);
    } else {
      applyConsent(DEFAULTS);
      setShowBanner(true);
    }

    const openSettings = () => {
      setPrefs(getStoredPrefs() ?? DEFAULTS);
      setShowManage(true);
    };
    window.addEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_COOKIE_SETTINGS_EVENT, openSettings);
  }, []);

  return (
    <>
      {showBanner && (
        <div role="dialog" aria-label="Cookie choices" aria-live="polite" className="fixed inset-x-0 bottom-0 z-[80] border-t border-white/12 bg-[#171716] text-white shadow-2xl">
          <div className="mx-auto flex max-w-[92rem] flex-col gap-5 px-6 py-5 sm:px-8 md:flex-row md:items-center md:justify-between md:px-12 lg:px-16 xl:px-20">
            <div className="max-w-3xl">
              <p className="font-display text-xl">Your privacy choices</p>
              <p className="mt-1 text-xs leading-6 text-white/58">Necessary storage keeps Montvelle secure and working. Optional functional and analytics technologies stay off unless you choose them. Read our <Link to="/cookies" className="underline underline-offset-4">Cookie Notice</Link>.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white hover:text-foreground" onClick={() => persist(DEFAULTS)}>Reject non-essential</Button>
              <Button variant="outline" className="border-white/25 bg-transparent text-white hover:bg-white hover:text-foreground" onClick={() => setShowManage(true)}>Manage</Button>
              <Button className="bg-white text-foreground hover:bg-white/90" onClick={() => persist({ necessary: true, functional: true, analytics: true, other: true })}>Accept all</Button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={showManage} onOpenChange={setShowManage}>
        <DialogContent className="max-w-xl bg-[#f6f1e8]">
          <DialogHeader>
            <DialogTitle className="font-display text-3xl">Manage privacy choices</DialogTitle>
            <DialogDescription>Strictly necessary storage is always active. Optional categories are off unless you enable them.</DialogDescription>
          </DialogHeader>
          <div className="space-y-5 py-2">
            <PreferenceRow label="Necessary" description="Security, authentication, session and consent-preference storage." checked disabled />
            <PreferenceRow label="Functional" description="Remembers non-essential preferences and optional service settings." checked={prefs.functional} onChange={(value) => setPrefs((current) => ({ ...current, functional: value }))} />
            <PreferenceRow label="Analytics" description="Helps us understand aggregate site use and improve the experience." checked={prefs.analytics} onChange={(value) => setPrefs((current) => ({ ...current, analytics: value }))} />
            <PreferenceRow label="Other optional technologies" description="Optional embedded content or integrations that may store data on your device." checked={prefs.other} onChange={(value) => setPrefs((current) => ({ ...current, other: value }))} />
          </div>
          <div className="flex flex-wrap justify-end gap-2 border-t border-foreground/10 pt-5">
            <Button variant="outline" onClick={() => persist(DEFAULTS)}>Reject non-essential</Button>
            <Button variant="outline" onClick={() => persist({ necessary: true, functional: true, analytics: true, other: true })}>Accept all</Button>
            <Button onClick={() => persist(prefs)}>Save choices</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function PreferenceRow({ label, description, checked, onChange, disabled = false }: { label: string; description: string; checked: boolean; onChange?: (value: boolean) => void; disabled?: boolean }) {
  return <div className="flex items-start justify-between gap-5"><div><p className="font-medium">{label}</p><p className="mt-1 text-sm leading-6 text-muted-foreground">{description}</p></div><Switch checked={checked} onCheckedChange={onChange} disabled={disabled} /></div>;
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
