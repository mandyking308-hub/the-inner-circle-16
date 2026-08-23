import { createFileRoute, Link } from "@tanstack/react-router";

import { PageIntro } from "@/components/private/PrivateShell";

export const Route = createFileRoute("/member/programme")({ component: ProgrammeHubPage });

function ProgrammeHubPage() {
  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Programme" title="The things worth leaving the dashboard for" description="Gatherings, knowledge and impact should make the institution more useful without turning membership into an endless content feed or event calendar." />
      <div className="grid gap-px bg-border md:grid-cols-3">
        {[
          ["Gatherings", "Private dinners, working breakfasts, salons, masterclasses, retreats and impact visits.", "/member/events"],
          ["Knowledge", "Decision briefings, guides and playbooks built around problems members actually face.", "/member/knowledge"],
          ["Impact", "Selected opportunities to contribute expertise, relationships, time or funding where it can genuinely help.", "/member/impact"],
        ].map(([title, body, to]) => { return <Link key={String(title)} to={String(to)} className="group bg-card p-6 md:p-7"><h2 className="mt-7 font-display text-4xl">{String(title)}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{String(body)}</p><span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">Open </span></Link>; })}
      </div>
    </div>
  );
}
