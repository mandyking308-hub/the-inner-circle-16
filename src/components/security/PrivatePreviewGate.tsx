import { type ReactNode, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { site } from "@/config/site";
import { isDemoMode } from "@/lib/demoMode";

export const INTERNAL_PREVIEW_KEY = "project-table:internal-preview";

export function enableInternalPreview() {
  if (typeof window !== "undefined") window.sessionStorage.setItem(INTERNAL_PREVIEW_KEY, "1");
}

/**
 * `scope="member"` also admits the public Montvelle World demo session.
 * `scope="internal"` (the default, used by operations) never does.
 */
export function PrivatePreviewGate({
  children,
  scope = "internal",
}: {
  children: ReactNode;
  scope?: "internal" | "member";
}) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const internal = window.sessionStorage.getItem(INTERNAL_PREVIEW_KEY) === "1";
    setAllowed(internal || (scope === "member" && isDemoMode()));
  }, [scope]);

  if (allowed === null) return <div className="min-h-screen bg-foreground" />;
  if (allowed) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-foreground px-5 text-background">
      <div className="w-full max-w-xl border border-background/18 bg-background p-7 text-foreground shadow-2xl md:p-10">
        <div className="flex items-center gap-3"><BrandMark compact /><div><p className="font-display text-2xl">{site.name}</p><p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Private access</p></div></div>
        <LockKeyhole className="mt-10 h-5 w-5 text-oxblood" />
        <h1 className="mt-5 font-display text-5xl leading-[0.98]">This room requires private access.</h1>
        <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">Member and operations workspaces are not part of the public website. Access is issued individually when an account is activated.</p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link to="/auth" className="inline-flex bg-oxblood px-6 py-3 text-sm font-semibold text-oxblood-foreground">Go to member access</Link>
          <Link to="/demo" className="border-b border-bronze pb-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-oxblood">Explore the demo</Link>
        </div>
      </div>
    </div>
  );
}
