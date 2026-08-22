import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness, GraduationCap, HeartHandshake, Network } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { alumniOpportunities } from "@/data/infrastructure";

export const Route = createFileRoute("/member/alumni")({
  component: MemberAlumniPage,
});

function MemberAlumniPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Rising Generation & Alumni"
        title="The Continuum"
        description="A protected bridge from learning into real work, mentors, peer relationships and eventually adult membership. Demo opportunities are fictional placeholders."
        action={<Button className="rounded-none">Nominate an opportunity</Button>}
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [GraduationCap, "Learn", "Master skills and build an evidence portfolio."],
          [BriefcaseBusiness, "Work", "Take on real projects, shadowing and apprenticeships."],
          [Network, "Belong", "Build an age-appropriate peer and mentor network."],
          [HeartHandshake, "Give back", "Return later as a mentor, host, employer or donor."],
        ].map(([Icon, title, body]) => {
          const Component = Icon as typeof GraduationCap;
          return <article key={String(title)} className="border border-border bg-card p-5"><Component className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">{String(title)}</h2><p className="mt-3 text-xs leading-6 text-muted-foreground">{String(body)}</p></article>;
        })}
      </div>

      <section>
        <div><p className="eyebrow text-bronze">Opportunity board</p><h2 className="mt-2 font-display text-3xl">Real rooms and real briefs</h2></div>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          {alumniOpportunities.map((opportunity) => (
            <article key={opportunity.title} className="border border-border bg-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-[10px] uppercase tracking-[0.16em] text-bronze">{opportunity.type}</p><h3 className="mt-2 font-display text-3xl">{opportunity.title}</h3></div><span className="border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]">{opportunity.age}</span></div>
              <p className="mt-4 text-sm text-muted-foreground">{opportunity.location}</p>
              <div className="mt-5 flex flex-wrap gap-2">{opportunity.skills.map((skill) => <span key={skill} className="border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{skill}</span>)}</div>
              <Button variant="outline" className="mt-6 rounded-none">Express interest</Button>
            </article>
          ))}
        </div>
      </section>

      <section className="border border-border bg-foreground p-6 text-background md:p-8">
        <p className="eyebrow text-background/60">Safeguarding boundary</p>
        <h2 className="mt-3 font-display text-4xl">Opportunity requires structure.</h2>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-background/70">Any real programme for under-18s needs guardian permissions, age-appropriate communication, vetted adults, clear placement expectations, reporting routes and appropriate safeguarding controls. Adult confidential rooms remain separate by default.</p>
      </section>
    </div>
  );
}
