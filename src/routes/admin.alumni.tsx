import { createFileRoute } from "@tanstack/react-router";
import { BriefcaseBusiness, HeartHandshake, ShieldCheck } from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { alumniOpportunities } from "@/data/infrastructure";

export const Route = createFileRoute("/admin/alumni")({
  component: AdminAlumniPage,
});

function AdminAlumniPage() {
  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Rising Generation operations" title="Alumni & opportunities" description="Manage age-appropriate opportunities, mentors, placements and the pathway from Next Gen into adult professional life." action={<Button className="rounded-none">Create opportunity</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Open opportunities" value={String(alumniOpportunities.length)} /><StatCard label="Mentors" value="8" note="Demo" /><StatCard label="Alumni profiles" value="14" note="Demo" /><StatCard label="Give-back commitments" value="5" /></div>
      <section className="border border-border bg-card"><div className="border-b border-border p-5"><div className="flex items-center gap-3"><BriefcaseBusiness className="h-5 w-5 text-bronze" /><h2 className="font-display text-3xl">Opportunity register</h2></div></div><div className="divide-y divide-border">{alumniOpportunities.map((opportunity) => <article key={opportunity.title} className="grid gap-4 p-5 md:grid-cols-[1fr_100px_140px_260px_auto] md:items-center"><div><p className="text-[10px] uppercase tracking-[0.16em] text-bronze">{opportunity.type}</p><h3 className="mt-1 font-display text-2xl">{opportunity.title}</h3></div><span className="text-xs">{opportunity.age}</span><span className="text-xs text-muted-foreground">{opportunity.location}</span><div className="flex flex-wrap gap-1.5">{opportunity.skills.map((skill) => <span key={skill} className="border border-border px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{skill}</span>)}</div><Button variant="outline" className="rounded-none">Review</Button></article>)}</div></section>
      <div className="grid gap-4 lg:grid-cols-2"><section className="border border-border bg-card p-6"><HeartHandshake className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">Give-back loop</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Track which alumni are mentoring, hosting shadow days, creating project briefs, hiring or supporting impact work. The network becomes stronger when value flows back toward the next cohort.</p></section><section className="border border-border bg-foreground p-6 text-background"><ShieldCheck className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">Safeguarding controls</h2><p className="mt-4 text-sm leading-7 text-background/70">Under-18 opportunities need guardian consent, vetted adults, clear communication channels, placement expectations, reporting routes and a record of who approved what. Adult networking permissions should switch only at the appropriate age and status.</p></section></div>
    </div>
  );
}
