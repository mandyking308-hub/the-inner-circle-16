import { type ReactNode, useEffect, useState } from "react";
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
  Network,
  Settings,
  ShieldCheck,
  Sparkles,
  TableProperties,
  Users,
  X,
  FileSearch,
} from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { site } from "@/config/site";

const memberGroups = [
  {
    label: "Private office",
    items: [
      { to: "/member", label: "Today", icon: Home, exact: true },
      { to: "/member/control-room", label: "Decisions", icon: LayoutDashboard },
      { to: "/member/concierge", label: "Concierge", icon: Compass },
      { to: "/member/services", label: "Private Services", icon: Sparkles },
      { to: "/member/bookings", label: "Bookings", icon: CalendarDays },
      { to: "/member/messages", label: "Messages", icon: Inbox },
    ],
  },
  {
    label: "The wider house",
    items: [
      { to: "/member/table", label: "My Table", icon: TableProperties },
      { to: "/member/family", label: "Family", icon: Landmark },
      { to: "/member/network", label: "Network", icon: Network },
      { to: "/member/programme", label: "Programme", icon: CalendarDays },
    ],
  },
  {
    label: "You",
    items: [
      { to: "/member/preferences", label: "My Preferences", icon: BookOpen },
      { to: "/member/profile", label: "Account & privacy", icon: CircleUserRound },
    ],
  },
] as const;

const adminGroups = [
  {
    label: "Operations",
    items: [
      { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
      { to: "/admin/launch-readiness", label: "Launch control", icon: ShieldCheck },
      { to: "/admin/concierge", label: "Concierge", icon: Compass },
      { to: "/admin/sourcing", label: "Sourcing Desk", icon: FileSearch },
      { to: "/admin/services", label: "Private Services", icon: Sparkles },
      { to: "/admin/bookings", label: "Bookings", icon: CalendarDays },
      { to: "/admin/messages", label: "Messages", icon: Inbox },
      { to: "/admin/global-life", label: "Global Life", icon: Globe2 },
    ],
  },
  {
    label: "Community",
    items: [
      { to: "/admin/applications", label: "Applications", icon: Inbox },
      { to: "/admin/members", label: "Members", icon: Users },
      { to: "/admin/tables", label: "Tables", icon: TableProperties },
      { to: "/admin/introductions", label: "Introductions", icon: Network },
      { to: "/admin/partners", label: "Partners", icon: BadgeCheck },
    ],
  },
  {
    label: "Family programme",
    items: [
      { to: "/admin/learning", label: "Learning", icon: GraduationCap },
      { to: "/admin/next-gen", label: "Next Gen", icon: Sparkles },
      { to: "/admin/alumni", label: "Alumni", icon: BriefcaseBusiness },
    ],
  },
  {
    label: "Institution",
    items: [
      { to: "/admin/events", label: "Events", icon: CalendarDays },
      { to: "/admin/content", label: "Knowledge", icon: BookOpen },
      { to: "/admin/impact", label: "Impact", icon: HandHeart },
      { to: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
] as const;

type PrivateShellProps = { mode: "member" | "admin"; children: ReactNode };

type MemberIdentity = { name: string; city: string };

export function PrivateShell({ mode, children }: PrivateShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [memberIdentity, setMemberIdentity] = useState<MemberIdentity>({ name: "Amelia Hart", city: "London" });
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const groups = mode === "member" ? memberGroups : adminGroups;

  useEffect(() => {
    if (mode !== "member") return;
    const load = () => {
      try {
        const raw = window.localStorage.getItem("project-table:member-profile:v2");
        if (!raw) return;
        const profile = JSON.parse(raw) as { name?: string; city?: string };
        setMemberIdentity({ name: profile.name || "Amelia Hart", city: profile.city || "London" });
      } catch { /* keep preview identity */ }
    };
    load();
    window.addEventListener("focus", load);
    window.addEventListener("storage", load);
    return () => { window.removeEventListener("focus", load); window.removeEventListener("storage", load); };
  }, [mode]);

  const identity = mode === "member" ? memberIdentity.name : "Concierge desk";
  const secondary = mode === "member" ? `${memberIdentity.city} · private member` : "Montvelle operations";
  const initials = mode === "member" ? memberIdentity.name.split(" ").filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "MV" : "MV";
  const isActive = (to: string, exact?: boolean) => exact ? pathname === to : pathname === to || pathname.startsWith(`${to}/`);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-foreground/15 bg-background/95 backdrop-blur-xl lg:pl-[250px]">
        <div className="flex h-[68px] items-center justify-between px-4 md:px-7 lg:px-9">
          <div className="flex items-center gap-4">
            <button type="button" className="inline-flex h-9 w-9 items-center justify-center border border-border lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle private navigation">{mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}</button>
            <div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">{mode === "member" ? "Private member workspace" : "Concierge & operations"}</p><p className="mt-1 font-display text-xl text-foreground">{mode === "member" ? "Your private office" : "The house operating desk"}</p></div>
          </div>
          <div className="flex items-center gap-3 text-right"><div className="hidden sm:block"><p className="text-xs font-semibold text-foreground">{identity}</p><p className="mt-0.5 text-[10px] text-muted-foreground">{secondary}</p></div><div className="flex h-9 w-9 items-center justify-center rounded-full bg-oxblood text-[10px] font-semibold text-oxblood-foreground">{initials}</div></div>
        </div>
      </header>

      <aside className={`${mobileOpen ? "fixed inset-x-0 top-[68px] z-50 block h-[calc(100vh-68px)]" : "hidden"} bg-foreground text-background lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-[250px]`}>
        <div className="flex h-full flex-col">
          <Link to="/" className="flex h-[96px] items-center gap-3 border-b border-background/12 px-5"><BrandMark inverse /><div><p className="font-display text-2xl leading-none">{site.name}</p><p className="mt-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-background/40">Montvelle World</p></div></Link>
          <nav className="flex-1 overflow-y-auto px-3 py-5">
            {groups.map((group) => (
              <div key={group.label} className="mb-7 last:mb-0">
                <p className="px-3 pb-2 text-[8px] font-semibold uppercase tracking-[0.22em] text-background/35">{group.label}</p>
                <div className="space-y-0.5">{group.items.map((item) => { const Icon = item.icon; const active = isActive(item.to, "exact" in item ? item.exact : false); return <Link key={item.to} to={item.to} onClick={() => setMobileOpen(false)} className={`group flex items-center justify-between border-l-2 px-3 py-3 text-[12px] transition-colors ${active ? "border-oxblood bg-background/8 text-background" : "border-transparent text-background/55 hover:bg-background/5 hover:text-background"}`}><span className="flex items-center gap-3"><Icon className={`h-3.5 w-3.5 ${active ? "text-bronze" : "text-background/35"}`} />{item.label}</span>{active ? <ChevronRight className="h-3 w-3 text-bronze" /> : null}</Link>; })}</div>
              </div>
            ))}
          </nav>
          <div className="border-t border-background/12 p-5"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-bronze" /><div><p className="text-[9px] font-semibold uppercase tracking-[0.17em] text-background/60">Confidential by default</p><p className="mt-2 text-[10px] leading-5 text-background/40">No member data export, cold solicitation or private-room content harvesting.</p></div></div></div>
        </div>
      </aside>

      <main className="min-w-0 px-4 py-7 md:px-8 md:py-9 lg:ml-[250px] lg:px-10 xl:px-12">{children}</main>
    </div>
  );
}

export function PageIntro({ eyebrow, title, description, action }: { eyebrow: string; title: string; description?: string; action?: ReactNode }) {
  return <div className="flex flex-col gap-5 border-b border-foreground/15 pb-7 md:flex-row md:items-end md:justify-between"><div className="max-w-4xl"><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">{eyebrow}</p><h1 className="mt-3 text-balance font-display text-4xl leading-[0.98] text-foreground md:text-5xl xl:text-6xl">{title}</h1>{description ? <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p> : null}</div>{action ? <div className="shrink-0">{action}</div> : null}</div>;
}

export function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return <div className="border-t-2 border-oxblood bg-card p-5 shadow-[0_20px_55px_-50px_rgba(0,0,0,0.75)]"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{label}</p><p className="mt-4 font-display text-4xl leading-none text-foreground">{value}</p>{note ? <p className="mt-3 text-[11px] leading-5 text-muted-foreground">{note}</p> : null}</div>;
}
