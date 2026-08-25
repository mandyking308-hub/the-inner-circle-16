import { type ReactNode, useEffect, useState } from "react";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { SupplierShell, SUPPLIER_PREVIEW_KEY } from "@/components/supplier/SupplierShell";
import { site } from "@/config/site";

export const Route = createFileRoute("/supplier")({
  head: () => ({
    meta: [
      { title: `Supplier portal — ${site.name}` },
    ],
  }),
  component: SupplierLayout,
});

function SupplierGate({ children }: { children: ReactNode }) {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    setAllowed(window.sessionStorage.getItem(SUPPLIER_PREVIEW_KEY) === "1");
  }, []);

  if (allowed === null) return <div className="min-h-screen bg-foreground" />;
  if (allowed) return <>{children}</>;

  return (
    <div className="flex min-h-screen items-center justify-center bg-foreground px-5 text-background">
      <div className="w-full max-w-xl border border-background/18 bg-background p-7 text-foreground md:p-10">
        <div className="flex items-center gap-3">
          <BrandMark compact />
          <div>
            <p className="font-display text-2xl">{site.name}</p>
            <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Partner & supplier access
            </p>
          </div>
        </div>
        <LockKeyhole className="mt-10 h-5 w-5 text-oxblood" />
        <h1 className="mt-5 font-display text-4xl leading-[1.0]">This door requires supplier access.</h1>
        <p className="mt-5 text-sm leading-7 text-muted-foreground">
          Supplier accounts are issued individually. Enter through the portal page to continue.
        </p>
        <Link to="/supplier-portal" className="mt-8 inline-flex bg-oxblood px-6 py-3 text-sm font-semibold text-oxblood-foreground">
          Go to the supplier portal
        </Link>
      </div>
    </div>
  );
}

function SupplierLayout() {
  return (
    <SupplierGate>
      <SupplierShell>
        <Outlet />
      </SupplierShell>
    </SupplierGate>
  );
}
