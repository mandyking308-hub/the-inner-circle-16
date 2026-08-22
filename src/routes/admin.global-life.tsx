import { createFileRoute } from "@tanstack/react-router";
import { Globe2, Link2, ShieldCheck } from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { globalLifeWorkstreams } from "@/data/infrastructure";

export const Route = createFileRoute("/admin/global-life")({
  component: AdminGlobalLifePage,
});

function AdminGlobalLifePage() {
  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Global Life operations" title="Cross-border case rooms" description="Coordinate questions and dependencies across qualified advisers without presenting the community itself as the source of regulated advice." action={<Button className="rounded-none">Open case room</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Active case rooms" value="3" /><StatCard label="Jurisdictions in review" value="6" /><StatCard label="Expert hand-offs" value="5" /><StatCard label="Open decisions" value="14" /></div>

      <section className="border border-border bg-card">
        <div className="border-b border-border p-5"><div className="flex items-center gap-3"><Globe2 className="h-5 w-5 text-bronze" /><h2 className="font-display text-3xl">Sample case room · International family move</h2></div></div>
        <div className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">{globalLifeWorkstreams.map((workstream) => <article key={workstream.name} className="bg-background p-5"><h3 className="font-display text-2xl">{workstream.name}</h3><p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-bronze">{workstream.status}</p><p className="mt-3 text-xs leading-6 text-muted-foreground">{workstream.note}</p></article>)}</div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="border border-border bg-card p-6"><Link2 className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">Adviser coordination log</h2><div className="mt-5 space-y-4 text-sm"><div className="border-t border-border pt-4"><p className="font-medium">Immigration specialist</p><p className="mt-1 text-xs leading-6 text-muted-foreground">Eligibility and document questions prepared. No advice recorded until formal instruction.</p></div><div className="border-t border-border pt-4"><p className="font-medium">Tax counsel</p><p className="mt-1 text-xs leading-6 text-muted-foreground">Residence and entity-impact questions queued for reconciliation against immigration timeline.</p></div><div className="border-t border-border pt-4"><p className="font-medium">Education adviser</p><p className="mt-1 text-xs leading-6 text-muted-foreground">School calendar and year-group constraints mapped to target move windows.</p></div></div></section>
        <section className="border border-border bg-foreground p-6 text-background"><ShieldCheck className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">Operating boundary</h2><p className="mt-4 text-sm leading-7 text-background/70">Staff can organise facts, questions, deadlines, permissions and adviser outputs. They should not translate that coordination role into unqualified legal, tax, immigration or fiduciary advice. The case room should make the professional boundaries more visible, not blur them.</p></section>
      </div>
    </div>
  );
}
