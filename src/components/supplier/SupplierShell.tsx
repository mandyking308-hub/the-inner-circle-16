import { type ReactNode, useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarCheck2,
  CalendarRange,
  ClipboardList,
  Home,
  Inbox,
  Menu,
  MessagesSquare,
  ShieldCheck,
  X,
} from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { getSupplier, supplierOrgs } from "@/data/privateServices";

export const SUPPLIER_PREVIEW_KEY = "montvelle:supplier-preview";
export const SUPPLIER_ID_KEY = "montvelle:supplier-id";

export function enableSupplierPreview(supplierId: string) {
  if (typeof window === "undefined") return;
  window.sessionStorage.setItem(SUPPLIER_PREVIEW_KEY, "1");
  window.sessionStorage.setItem(SUPPLIER_ID_KEY, supplierId);
}

export function useSupplierIdentity() {
  const [supplierId, setSupplierId] = useState<string>(supplierOrgs[0]!.id);
  useEffect(() => {
    const stored = window.sessionStorage.getItem(SUPPLIER_ID_KEY);
    if (stored) setSupplierId(stored);
  }, []);
  return { supplierId, supplier: getSupplier(supplierId) };
}

const nav = [
  { to: "/supplier", label: "Today", icon: Home, exact: true },
  { to: "/supplier/services", label: "Services", icon: ClipboardList },
  { to: "/supplier/requests", label: "Requests", icon: Inbox },
  { to: "/supplier/bookings", label: "Bookings", icon: CalendarCheck2 },
  { to: "/supplier/messages", label: "Messages", icon: MessagesSquare },
  { to: "/supplier/availability", label: "Availability", icon: CalendarRange },
  { to: "/supplier/profile", label: "Profile & Assurance", icon: ShieldCheck },
] as const;

export function SupplierShell({ children }: { children: ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const { supplier } = useSupplierIdentity();
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-foreground/15 bg-background/95 backdrop-blur-xl lg:pl-[250px]">
        <div className="flex h-[68px] items-center justify-between px-4 md:px-7 lg:px-9">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center border border-border lg:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Toggle supplier navigation"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">Partner & Supplier Portal</p>
              <p className="mt-1 font-display text-xl text-foreground">{supplier?.name ?? "Supplier"}</p>
            </div>
          </div>
          <p className="hidden text-[10px] uppercase tracking-[0.16em] text-muted-foreground sm:block">
            Your work only · no member directory
          </p>
        </div>
      </header>

      <aside
        className={`${mobileOpen ? "fixed inset-x-0 top-[68px] z-50 block h-[calc(100vh-68px)]" : "hidden"} bg-foreground text-background lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-[250px]`}
      >
        <div className="flex h-full flex-col">
          <Link to="/" className="flex h-[96px] items-center gap-3 border-b border-background/12 px-5">
            <BrandMark inverse />
            <div>
              <p className="font-display text-2xl leading-none">Montvelle</p>
              <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-background/40">
                Supplier portal
              </p>
            </div>
          </Link>
          <nav className="flex-1 overflow-y-auto px-3 py-5">
            <div className="space-y-0.5">
              {nav.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.to, "exact" in item ? item.exact : false);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 border-l-2 px-3 py-3 text-[12px] transition-colors ${active ? "border-oxblood bg-background/8 text-background" : "border-transparent text-background/55 hover:bg-background/5 hover:text-background"}`}
                  >
                    <Icon className={`h-3.5 w-3.5 ${active ? "text-bronze" : "text-background/35"}`} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
          <div className="border-t border-background/12 p-5">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-background/60">
                  Minimum necessary
                </p>
                <p className="mt-2 text-[10px] leading-5 text-background/40">
                  You see only the work assigned to you and the context a member has chosen to share.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-7 md:px-8 md:py-9 lg:ml-[250px] lg:px-10 xl:px-12">{children}</main>
    </div>
  );
}

export function SupplierIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return (
    <div className="border-b border-foreground/15 pb-7">
      <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">{eyebrow}</p>
      <h1 className="mt-3 max-w-4xl text-balance font-display text-4xl leading-[0.98] text-foreground md:text-5xl">
        {title}
      </h1>
      {description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p> : null}
    </div>
  );
}
