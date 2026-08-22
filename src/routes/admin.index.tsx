import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, BadgeCheck, Compass, Globe2, GraduationCap, Network, ShieldCheck, TableProperties } from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { loadApplications } from "@/data/applicationStore";
import { members } from "@/data/community";
import { trustedPartners } from "@/data/infrastructure";
import { loadPartnerApplications } from "@/data/partnerApplicationStore";

export const Route = createFileRoute("/admin/")({ component: AdminOverviewV3 });

const launchGateCount = 22;

function AdminOverviewV3() {
  const [applicationCount, setApplicationCount] = useState(0);
  const [partnerApplicationCount, setPartnerApplicationCount] = useState(0);
  const [conciergeCount, setConciergeCount] = useState(0);
  const [launchOpen, setLaunchOpen] = useState(launchGateCount);
  const [conciergeNext, setConciergeNext] = useState("No live case in this browser yet.");

  const refresh = () => {
    setApplicationCount(loadApplications().length);
    setPartnerApplicationCount(loadPartnerApplications().length);
    try {
      const cases = JSON.parse(window.localStorage.getItem("project-table:concierge-cases:v2") ?? "[]") as Array<{ status?: string; nextStep?: string }>;
      const open = cases.filter((item) => item.status !== "Complete");
      setConciergeCount(open.length);
      setConciergeNext(open[0]?.nextStep || "No live case in this browser yet.");
    } catch { setConciergeCount(0); }
    try {
      const readiness = JSON.parse(window.localStorage.getItem("project-table:launch-readiness:v1") ?? "{}") as Record<string, boolean>;
      setLaunchOpen(Math.max(0, launchGateCount - Object.values(readiness).filter(Boolean).length));
    } catch { setLaunchOpen(launchGateCount); }
  };

  useEffect(() => {
    refresh();
    window.addEventListener("focus", refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener("focus", refresh); window.removeEventListener("storage", refresh); };
  }, []);

  const priorities = useMemo(() => [
    ...(launchOpen ? [["Launch", `${launchOpen} readiness control${launchOpen === 1 ? "" : "s"} still open`, "Clear hard security and legal gates before real data"]] : []),
    ...(conciergeCount ? [["Concierge", `${conciergeCount} live case${conciergeCount === 1 ? "" : "s"}`, conciergeNext]] : []),
    ...(applicationCount ? [["Membership", `${applicationCount} application record${applicationCount === 1 ? "" : "s"}`, "Review for character, relevance, contribution and room fit"]] : []),
    ...(partnerApplicationCount ? [["Partners", `${partnerApplicationCount} partner candidate${partnerApplicationCount === 1 ? "" : "s"}`, "Complete references and assurance before recommendation status"]] : []),
  ].slice(0, 5), [applicationCount, conciergeCount, conciergeNext, launchOpen, partnerApplicationCount]);

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Concierge & operations"
        title="Protect the room. Coordinate the complexity."
        description="This desk is now reading the work happening underneath the prototype rather than displaying a separate set of marketing numbers. At production cutover the same operating view moves to role-secured database state and audit history."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Preview member profiles" value={String(members.length)} note="Fictional records for product testing only" />
        <StatCard label="Member applications" value={String(applicationCount)} note="Current browser review queue" />
        <StatCard label="Live concierge cases" value={String(conciergeCount)} note={conciergeNext} />
        <StatCard label="Launch controls open" value={String(launchOpen)} note="Use Launch Control as the go / no-go gate" />
      </div>

      {launchOpen > 0 ? (
        <Link to="/admin/launch-readiness" className="group block border border-oxblood bg-oxblood p-6 text-oxblood-foreground md:p-7">
          <div className="flex items-start justify-between gap-6"><div className="flex items-start gap-4"><AlertTriangle className="mt-1 h-5 w-5 shrink-0 text-bronze" /><div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-bronze">Launch state · no-go</p><h2 className="mt-3 font-display text-4xl">The product can be demonstrated. It is not cleared for sensitive family data.</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-oxblood-foreground/68">Repository privacy, production identity, RLS testing, vault validation, legal/privacy review, recovery and safeguarding remain controlled gates — not assumptions.</p></div></div><ArrowRight className="mt-1 h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" /></div>
        </Link>
      ) : null}

      <section>
        <p className="eyebrow text-bronze">Operating rooms</p>
        <div className="mt-5 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
          {[
            [TableProperties, "Membership & Tables", "Applications, member mix, peer circles and culture protection.", "/admin/applications"],
            [Network, "Introductions", "Consent-led relationship brokerage rather than contact harvesting.", "/admin/introductions"],
            [Globe2, "Global Life", "Coordinate cross-border questions, advisers, dependencies and deadlines.", "/admin/global-life"],
            [BadgeCheck, "Trusted Partners", `${trustedPartners.length} preview partners plus ${partnerApplicationCount} candidate applications.`, "/admin/partners"],
            [Compass, "Concierge", "Requests, owners, next actions, partner hand-offs and completion.", "/admin/concierge"],
            [GraduationCap, "Learning & Alumni", "Curriculum templates, quests, evidence, opportunities and safeguarding.", "/admin/learning"],
          ].map(([Icon, title, body, to]) => {
            const Component = Icon as typeof TableProperties;
            return (
              <Link key={String(title)} to={String(to)} className="group bg-card p-6 transition-colors hover:bg-accent">
                <Component className="h-5 w-5 text-bronze" />
                <h2 className="mt-6 font-display text-3xl">{String(title)}</h2>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{String(body)}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em]">Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <section className="border border-border bg-card p-6">
          <p className="eyebrow text-bronze">Operational priorities</p>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {priorities.length ? priorities.map(([area, title, next]) => <div key={`${area}-${title}`} className="grid gap-3 py-4 md:grid-cols-[110px_1fr_1fr]"><span className="text-[10px] uppercase tracking-[0.15em] text-bronze">{area}</span><span className="text-sm font-medium">{title}</span><span className="text-xs leading-6 text-muted-foreground">{next}</span></div>) : <div className="py-6 text-sm text-muted-foreground">No open preview priorities. Check the launch controls before treating that as launch readiness.</div>}
          </div>
        </section>

        <section className="border border-border bg-foreground p-6 text-background">
          <ShieldCheck className="h-5 w-5 text-bronze" />
          <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-background/60">Culture & trust watch</p>
          <h2 className="mt-3 font-display text-3xl">Commercial value must never outrun trust.</h2>
          <p className="mt-4 text-sm leading-7 text-background/70">Partners can pay for legitimate programme value later — research, education, service infrastructure or approved benefits — but never for member identities, confidential Table access or cold solicitation rights.</p>
        </section>
      </div>
    </div>
  );
}
