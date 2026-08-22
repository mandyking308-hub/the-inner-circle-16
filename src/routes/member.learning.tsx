import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, GraduationCap, Hammer } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { curriculumDomains, executionFramework, sampleQuests } from "@/data/infrastructure";

export const Route = createFileRoute("/member/learning")({
  component: LearningStudioPage,
});

function LearningStudioPage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Family Learning Studio"
        title="Build a curriculum around capability"
        description="A supplementary, hybrid or alternative-learning workspace that combines academic mastery with communication, enterprise, technology, practical independence, character and real-world execution."
        action={<Button className="rounded-none">Create a learning plan</Button>}
      />

      <section className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <article className="border border-border bg-foreground p-6 text-background">
          <GraduationCap className="h-5 w-5 text-bronze" />
          <p className="mt-7 text-[10px] uppercase tracking-[0.2em] text-background/60">Current principle</p>
          <h2 className="mt-3 font-display text-4xl leading-tight">Skill is not execution.</h2>
          <p className="mt-5 text-sm leading-7 text-background/70">The learner is not finished when they can explain a tool. They are finished when they can select it, use it under uncertainty, deliver something useful and improve after feedback.</p>
        </article>
        <div className="grid gap-px bg-border sm:grid-cols-2">
          {executionFramework.map((item) => <article key={item.step} className="bg-card p-5"><p className="text-[10px] uppercase tracking-[0.18em] text-bronze">{item.step}</p><h3 className="mt-2 font-display text-2xl">{item.title}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{item.body}</p></article>)}
        </div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-5"><div><p className="eyebrow text-bronze">Curriculum domains</p><h2 className="mt-2 font-display text-3xl">What this family wants education to produce</h2></div><ClipboardList className="h-5 w-5 text-bronze" /></div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{curriculumDomains.map((domain) => <article key={domain.title} className="border border-border bg-card p-5"><h3 className="font-display text-2xl">{domain.title}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{domain.description}</p></article>)}</div>
      </section>

      <section className="border border-border bg-card p-6">
        <div className="flex items-center gap-3"><Hammer className="h-5 w-5 text-bronze" /><div><p className="eyebrow text-bronze">Next quests</p><h2 className="mt-2 font-display text-3xl">Work that creates evidence</h2></div></div>
        <div className="mt-6 grid gap-4 lg:grid-cols-2">{sampleQuests.map((quest) => <article key={quest.title} className="border border-border bg-background p-5"><div className="flex items-start justify-between gap-4"><h3 className="font-display text-2xl">{quest.title}</h3><span className="shrink-0 text-[10px] uppercase tracking-[0.14em] text-bronze">{quest.ages}</span></div><p className="mt-3 text-xs leading-6 text-muted-foreground">{quest.outcome}</p><div className="mt-4 flex flex-wrap gap-2">{quest.domains.map((domain) => <span key={domain} className="border border-border px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{domain}</span>)}</div></article>)}</div>
      </section>

      <section className="border border-border bg-card p-6">
        <p className="eyebrow text-bronze">Evidence portfolio</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">{["Projects delivered", "Presentations", "References / feedback", "Apprenticeships & service"].map((item) => <div key={item} className="flex items-center gap-3 border border-border bg-background p-4 text-sm"><CheckCircle2 className="h-4 w-4 text-bronze" />{item}</div>)}</div>
      </section>
    </div>
  );
}
