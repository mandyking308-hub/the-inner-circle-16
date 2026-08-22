import { type ReactNode, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { site } from "@/config/site";

export const INTERNAL_PREVIEW_KEY = "project-table:internal-preview";

export function enableInternalPreview() {
  if (typeof window !== "undefined") window.sessionStorage.setItem(INTERNAL_PREVIEW_KEY, "1");
}

export function PrivatePreviewGate({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    setAllowed(window.sessionStorage.getItem(INTERNAL_PREVIEW_KEY) === "1");
  }, []);

  if (allowed === null) return <div className="min-h-screen bg-foreground" />;
  if (allowed) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-foreground px-5 text-background">
      <div className="w-full max-w-xl border border-background/18 bg-background p-7 text-foreground shadow-2xl md:p-10">
        <div className="flex items-center gap-3"><BrandMark compact /><div><p className="font-display text-2xl">{site.name}</p><p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">Private access</p></div></div>
        <LockKeyhole className="mt-10 h-5 w-5 text-oxblood" />
        <h1 className="mt-5 font-display text-5xl leading-[0.98]">This room requires private access.</h1>
        <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">Member and operations workspaces are not part of the public website. Access is issued individually when an account is activated.</p>
        <Link to="/auth" className="mt-8 inline-flex bg-oxblood px-6 py-3 text-sm font-semibold text-oxblood-foreground">Go to member access</Link>
      </div>
    </div>
  );
}
