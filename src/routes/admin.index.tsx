import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Compass, Globe2, GraduationCap, Network, ShieldCheck, TableProperties } from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";

export const Route = createFileRoute("/admin/")({ component: AdminOverviewV2 });

function AdminOverviewV2() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Concierge & operations"
        title="Protect the room. Coordinate the complexity."
        description="The operating dashboard now spans membership, peer Tables, introductions, partner quality, Global Life case rooms, concierge execution and family learning. The system should make service more coherent without turning members into data points to exploit."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Active members" value="28" note="Two London Tables · founding cohort" />
        <StatCard label="Concierge requests" value="3" note="Every request has an owner and next action" />
        <StatCard label="Trusted partners" value="6" note="Recommendation-led demo register" />
        <StatCard label="Global Life rooms" value="3" note="Cross-border planning cases" />
      </div>

      <section>
        <p className="eyebrow text-bronze">Operating rooms</p>
        <div className="mt-5 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
          {[
            [TableProperties, "Membership & Tables", "Applications, member mix, peer circles and culture protection.", "/admin/applications"],
            [Network, "Introductions", "Consent-led relationship brokerage rather than contact harvesting.", "/admin/introductions"],
            [Globe2, "Global Life", "Coordinate cross-border questions, advisers, dependencies and deadlines.", "/admin/global-life"],
            [BadgeCheck, "Trusted Partners", "References, status, conflicts, member benefits and service quality.", "/admin/partners"],
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
          <p className="eyebrow text-bronze">Today's operational priorities</p>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {[
              ["Concierge", "Education relocation brief", "Partner shortlist due Monday"],
              ["Partners", "Two provider references", "Complete screening before directory visibility"],
              ["Global Life", "Cross-border move room", "Reconcile tax and immigration question lists"],
              ["Learning", "New quest template", "Review age range and evidence standard"],
            ].map(([area, title, next]) => <div key={title} className="grid gap-3 py-4 md:grid-cols-[110px_1fr_1fr]"><span className="text-[10px] uppercase tracking-[0.15em] text-bronze">{area}</span><span className="text-sm font-medium">{title}</span><span className="text-xs leading-6 text-muted-foreground">{next}</span></div>)}
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
