import { createFileRoute } from "@tanstack/react-router";
import { ClipboardCheck, GraduationCap, ShieldCheck } from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { curriculumDomains, sampleQuests } from "@/data/infrastructure";

export const Route = createFileRoute("/admin/learning")({
  component: AdminLearningPage,
});

function AdminLearningPage() {
  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Learning operations" title="Family Learning Studio" description="Manage curriculum templates, quests, evidence standards and age-appropriate opportunities without pretending one curriculum fits every family." action={<Button className="rounded-none">Create quest template</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Curriculum domains" value={String(curriculumDomains.length)} /><StatCard label="Quest templates" value={String(sampleQuests.length)} /><StatCard label="Active learners" value="7" note="Demo" /><StatCard label="Evidence reviews" value="3" /></div>
      <section className="border border-border bg-card"><div className="border-b border-border p-5"><div className="flex items-center gap-3"><GraduationCap className="h-5 w-5 text-bronze" /><h2 className="font-display text-3xl">Curriculum library</h2></div></div><div className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-4">{curriculumDomains.map((domain) => <article key={domain.title} className="bg-background p-5"><h3 className="font-display text-2xl">{domain.title}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{domain.description}</p></article>)}</div></section>
      <section className="border border-border bg-card"><div className="border-b border-border p-5"><div className="flex items-center gap-3"><ClipboardCheck className="h-5 w-5 text-bronze" /><h2 className="font-display text-3xl">Quest templates</h2></div></div><div className="divide-y divide-border">{sampleQuests.map((quest) => <article key={quest.title} className="grid gap-4 p-5 md:grid-cols-[1fr_120px_250px_auto] md:items-center"><div><h3 className="font-display text-2xl">{quest.title}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{quest.outcome}</p></div><span className="text-xs text-bronze">{quest.ages}</span><div className="flex flex-wrap gap-1.5">{quest.domains.map((domain) => <span key={domain} className="border border-border px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{domain}</span>)}</div><Button variant="outline" className="rounded-none">Edit</Button></article>)}</div></section>
      <section className="border border-border bg-foreground p-6 text-background"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 text-bronze" /><div><h2 className="font-display text-3xl">Education and safeguarding boundary</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-background/70">A family learning plan may supplement school or support a lawful alternative route, but local education law, attendance obligations, safeguarding, special educational needs and accredited qualification requirements must be checked separately for the child and jurisdiction.</p></div></div></section>
    </div>
  );
}
