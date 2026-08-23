import { type ReactNode, useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";

import { BrandMark } from "@/components/brand/BrandMark";
import { site } from "@/config/site";
import { isDemoMode } from "@/lib/demoMode";

const memberGroups = [
  {
    label: "Montvelle World",
    items: [
      { to: "/member", label: "Today", exact: true },
      { to: "/member/services", label: "Requests" },
      { to: "/member/control-room", label: "Decision Room" },
      { to: "/member/events", label: "Invitations" },
      { to: "/member/network", label: "Community" },
      { to: "/member/family", label: "Family" },
      { to: "/member/messages", label: "Messages" },
      { to: "/member/knowledge", label: "Knowledge" },
    ],
  },
  {
    label: "Your household",
    items: [
      { to: "/member/preferences", label: "My Preferences" },
      { to: "/member/household-access", label: "Household & Access" },
      { to: "/member/profile", label: "Account & privacy" },
    ],
  },
] as const;

const adminGroups = [
  {
    label: "Operations",
    items: [
      { to: "/admin", label: "Overview", exact: true },
      { to: "/admin/launch-readiness", label: "Launch control" },
      { to: "/admin/concierge", label: "Concierge" },
      { to: "/admin/sourcing", label: "Sourcing Desk" },
      { to: "/admin/services", label: "Private Services" },
      { to: "/admin/bookings", label: "Bookings" },
      { to: "/admin/messages", label: "Messages" },
      { to: "/admin/global-life", label: "Global Life" },
    ],
  },
  {
    label: "Community",
    items: [
      { to: "/admin/applications", label: "Applications" },
      { to: "/admin/members", label: "Members" },
      { to: "/admin/tables", label: "Tables" },
      { to: "/admin/introductions", label: "Introductions" },
      { to: "/admin/partners", label: "Partners" },
    ],
  },
  {
    label: "Family programme",
    items: [
      { to: "/admin/learning", label: "Learning" },
      { to: "/admin/next-gen", label: "Next Gen" },
      { to: "/admin/alumni", label: "Alumni" },
    ],
  },
  {
    label: "Institution",
    items: [
      { to: "/admin/events", label: "Events" },
      { to: "/admin/content", label: "Knowledge" },
      { to: "/admin/impact", label: "Impact" },
      { to: "/admin/settings", label: "Settings" },
    ],
  },
] as const;

type PrivateShellProps = { mode: "member" | "admin"; children: ReactNode };

type MemberIdentity = { name: string; city: string };

export function PrivateShell({ mode, children }: PrivateShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [memberIdentity, setMemberIdentity] = useState<MemberIdentity>({
    name: "DEMO Member",
    city: "London",
  });
  const [demo, setDemo] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const groups = mode === "member" ? memberGroups : adminGroups;

  useEffect(() => {
    if (mode !== "member") return;
    const load = () => {
      try {
        const raw = window.localStorage.getItem("project-table:member-profile:v2");
        if (!raw) return;
        const profile = JSON.parse(raw) as { name?: string; city?: string };
        setMemberIdentity({ name: profile.name || "DEMO Member", city: profile.city || "London" });
      } catch {
        /* keep preview identity */
      }
    };
    load();
    window.addEventListener("focus", load);
    window.addEventListener("storage", load);
    return () => {
      window.removeEventListener("focus", load);
      window.removeEventListener("storage", load);
    };
  }, [mode]);

  useEffect(() => setDemo(isDemoMode()), []);

  const identity = mode === "member" ? memberIdentity.name : "Concierge desk";
  const secondary =
    mode === "member" ? `${memberIdentity.city} · private member` : "Montvelle operations";
  const initials =
    mode === "member"
      ? memberIdentity.name
          .split(" ")
          .filter(Boolean)
          .slice(0, 2)
          .map((part) => part[0])
          .join("")
          .toUpperCase() || "MV"
      : "MV";
  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div className="min-h-screen bg-background">
      {demo && mode === "member" ? (
        <div className="sticky top-0 z-50 border-b border-bronze/40 bg-foreground px-4 py-2 text-center text-[10px] uppercase tracking-[0.2em] text-bronze lg:pl-[250px]">
          Demonstration · illustrative data only
        </div>
      ) : null}
      <header className="sticky top-0 z-40 border-b border-foreground/15 bg-background/95 backdrop-blur-xl lg:pl-[250px]">
        <div className="flex h-[68px] items-center justify-between px-4 md:px-7 lg:px-9">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center border border-border lg:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Toggle private navigation"
            >
              {mobileOpen ? "Close" : "Menu"}
            </button>
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">
                {mode === "member" ? "Private member workspace" : "Concierge & operations"}
              </p>
              <p className="mt-1 font-display text-xl text-foreground">
                {mode === "member" ? "Your private office" : "The house operating desk"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 text-right">
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-foreground">{identity}</p>
              <p className="mt-0.5 text-[10px] text-muted-foreground">{secondary}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-oxblood text-[10px] font-semibold text-oxblood-foreground">
              {initials}
            </div>
          </div>
        </div>
      </header>

      <aside
        className={`${mobileOpen ? "fixed inset-x-0 top-[68px] z-50 block h-[calc(100vh-68px)]" : "hidden"} bg-foreground text-background lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-[250px]`}
      >
        <div className="flex h-full flex-col">
          <Link
            to="/"
            className="flex h-[96px] items-center gap-3 border-b border-background/12 px-5"
          >
            <BrandMark inverse />
            <div>
              <p className="font-display text-2xl leading-none">{site.name}</p>
              <p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-background/40">
                Montvelle World
              </p>
            </div>
          </Link>
          <nav className="flex-1 overflow-y-auto px-3 py-5">
            {groups.map((group) => (
              <div key={group.label} className="mb-7 last:mb-0">
                <p className="px-3 pb-2 text-[8px] font-semibold uppercase tracking-[0.22em] text-background/35">
                  {group.label}
                </p>
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = isActive(item.to, "exact" in item ? item.exact : false);
                    return (
                      <Link
                        key={item.to}
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className={`group flex items-center justify-between border-l-2 px-3 py-3 text-[12px] transition-colors ${active ? "border-oxblood bg-background/8 text-background" : "border-transparent text-background/55 hover:bg-background/5 hover:text-background"}`}
                      >
                        <span className="tracking-[0.02em]">{item.label}</span>
                      </Link>

                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
          <div className="border-t border-background/12 p-5">
            <div className="flex items-start gap-3">
              <div>
                <p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-background/60">
                  Confidential by default
                </p>
                <p className="mt-2 text-[10px] leading-5 text-background/40">
                  No member data export, cold solicitation or private-room content harvesting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-7 md:px-8 md:py-9 lg:ml-[250px] lg:px-10 xl:px-12">
        {children}
      </main>
    </div>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-5 border-b border-foreground/15 pb-7 md:flex-row md:items-end md:justify-between">
      <div className="max-w-4xl">
        <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-balance font-display text-4xl leading-[0.98] text-foreground md:text-5xl xl:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="border-t-2 border-oxblood bg-card p-5 shadow-[0_20px_55px_-50px_rgba(0,0,0,0.75)]">
      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-4 font-display text-4xl leading-none text-foreground">{value}</p>
      {note ? <p className="mt-3 text-[11px] leading-5 text-muted-foreground">{note}</p> : null}
    </div>
  );
}
