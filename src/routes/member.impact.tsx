import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, HandHeart } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { impactProjects } from "@/data/community";

export const Route = createFileRoute("/member/impact")({
  component: ImpactPage,
});

function ImpactPage() {
  const [interest, setInterest] = useState<Record<string, boolean>>({});

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Impact"
        title="Capital is only one form of help."
        description="Members can contribute expertise, introductions, governance, operational problem-solving and funding to carefully selected work. The point is useful contribution, not performative philanthropy."
      />

      <section className="grid gap-4 lg:grid-cols-3">
        {impactProjects.map((project) => {
          const active = interest[project.title];
          return (
            <article key={project.title} className="border border-border bg-card p-5 md:p-6">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] uppercase tracking-[0.18em] text-bronze">{project.theme}</span>
                <HandHeart className="h-4 w-4 text-muted-foreground" />
              </div>
              <h2 className="mt-5 font-display text-3xl leading-tight">{project.title}</h2>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{project.description}</p>
              <div className="mt-6 border-t border-border pt-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Currently useful</p>
                <p className="mt-2 text-sm leading-6">{project.need}</p>
              </div>
              {active ? (
                <p className="mt-5 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">Interest registered. Concierge will contact you privately about the most useful way to engage.</p>
              ) : (
                <Button className="mt-5 rounded-none" variant="outline" onClick={() => setInterest((current) => ({ ...current, [project.title]: true }))}>
                  I may be able to help <ArrowUpRight className="ml-2 h-3.5 w-3.5" />
                </Button>
              )}
            </article>
          );
        })}
      </section>

      <section className="border border-border bg-accent/25 p-6 md:p-8">
        <p className="eyebrow text-bronze">Operating principle</p>
        <blockquote className="mt-3 max-w-4xl font-display text-3xl leading-tight md:text-4xl">“Do not build a philanthropy theatre around wealthy people. Build a place where useful people can solve useful problems.”</blockquote>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Projects are reviewed for fit, governance and practical need. The community does not promise investment returns, sell access to beneficiaries or turn charitable activity into member marketing.</p>
      </section>
    </div>
  );
}
