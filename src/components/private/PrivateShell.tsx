import { type ReactNode, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  BadgeCheck,
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  ChevronRight,
  CircleUserRound,
  Compass,
  Globe2,
  GraduationCap,
  HandHeart,
  Home,
  Inbox,
  Landmark,
  LayoutDashboard,
  Menu,
  MessageSquareText,
  Network,
  Settings,
  ShieldCheck,
  Sparkles,
  TableProperties,
  Users,
  X,
} from "lucide-react";

import { site } from "@/config/site";

const memberNav = [
  { to: "/member", label: "Home", icon: Home, exact: true },
  { to: "/member/control-room", label: "Decision Room", icon: LayoutDashboard },
  { to: "/member/table", label: "My Table", icon: TableProperties },
  { to: "/member/community", label: "Community", icon: Users },
  { to: "/member/introductions", label: "Introductions", icon: Network },
  { to: "/member/ask-offer", label: "Ask & Offer", icon: MessageSquareText },
  { to: "/member/global-life", label: "Global Life", icon: Globe2 },
  { to: "/member/family-architecture", label: "Family Architecture", icon: Landmark },
  { to: "/member/learning", label: "Learning Studio", icon: GraduationCap },
  { to: "/member/partners", label: "Trusted Partners", icon: BadgeCheck },
  { to: "/member/concierge", label: "Concierge", icon: Compass },
  { to: "/member/events", label: "Events", icon: CalendarDays },
  { to: "/member/knowledge", label: "Knowledge", icon: BookOpen },
  { to: "/member/impact", label: "Impact", icon: HandHeart },
  { to: "/member/next-gen", label: "Next Gen", icon: Sparkles },
  { to: "/member/alumni", label: "Rising Gen Alumni", icon: BriefcaseBusiness },
  { to: "/member/profile", label: "Profile", icon: CircleUserRound },
] as const;

const adminNav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/applications", label: "Applications", icon: Inbox },
  { to: "/admin/members", label: "Members", icon: Users },
  { to: "/admin/tables", label: "Tables", icon: TableProperties },
  { to: "/admin/global-life", label: "Global Life", icon: Globe2 },
  { to: "/admin/partners", label: "Partners", icon: BadgeCheck },
  { to: "/admin/concierge", label: "Concierge", icon: Compass },
  { to: "/admin/learning", label: "Learning", icon: GraduationCap },
  { to: "/admin/alumni", label: "Alumni", icon: BriefcaseBusiness },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/introductions", label: "Introductions", icon: Network },
  { to: "/admin/content", label: "Knowledge", icon: BookOpen },
  { to: "/admin/impact", label: "Impact", icon: HandHeart },
  { to: "/admin/next-gen", label: "Next Gen", icon: Sparkles },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

type PrivateShellProps = {
  mode: "member" | "admin";
  children: ReactNode;
};

export function PrivateShell({ mode, children }: PrivateShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const nav = mode === "member" ? memberNav : adminNav;
  const eyebrow = mode === "member" ? "Private member room" : "Concierge & operations";
  const identity = mode === "member" ? "Amelia Hart" : "Concierge desk";
  const secondary = mode === "member" ? "London Table 01" : "Project Table administration";

  const isActive = (to: string, exact?: boolean) =>
    exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 md:px-7">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center border border-border lg:hidden"
              onClick={() => setMobileOpen((value) => !value)}
              aria-label="Toggle private navigation"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
            <Link to="/" className="group">
              <div className="font-display text-xl leading-none text-foreground">{site.name}</div>
              <div className="mt-1 text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                {eyebrow}
              </div>
            </Link>
          </div>

          <div className="hidden items-center gap-3 text-right sm:flex">
            <div>
              <p className="text-xs font-medium text-foreground">{identity}</p>
              <p className="text-[11px] text-muted-foreground">{secondary}</p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-xs font-medium">
              {mode === "member" ? "AH" : "PT"}
            </div>
          </div>
        </div>
      </header>

      <div className="lg:grid lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside
          className={`${mobileOpen ? "block" : "hidden"} border-b border-border bg-card/35 lg:sticky lg:top-16 lg:block lg:h-[calc(100vh-4rem)] lg:overflow-y-auto lg:border-b-0 lg:border-r`}
        >
          <nav className="space-y-1 p-3 lg:p-4">
            {nav.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to, "exact" in item ? item.exact : false);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center justify-between px-3 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  {active ? <ChevronRight className="h-3.5 w-3.5" /> : null}
                </Link>
              );
            })}
          </nav>

          <div className="mx-4 mt-4 border-t border-border pt-5 pb-5">
            <div className="flex items-start gap-3 text-xs text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
              <p className="leading-relaxed">
                Confidential space. Member information and discussions must not be exported, sold or used for solicitation.
              </p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 px-4 py-7 md:px-8 md:py-9 xl:px-10">{children}</main>
      </div>
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
    <div className="flex flex-col gap-5 border-b border-border pb-7 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="eyebrow text-bronze">{eyebrow}</p>
        <h1 className="mt-2 font-display text-4xl leading-none text-foreground md:text-5xl">{title}</h1>
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
    <div className="border border-border bg-card p-5">
      <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className="mt-3 font-display text-4xl text-foreground">{value}</p>
      {note ? <p className="mt-2 text-xs leading-5 text-muted-foreground">{note}</p> : null}
    </div>
  );
}
