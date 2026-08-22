import { createFileRoute } from "@tanstack/react-router";
import { Landmark, LockKeyhole, ShieldCheck } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { familyArchitecture } from "@/data/infrastructure";

export const Route = createFileRoute("/member/family-architecture")({
  component: FamilyArchitecturePage,
});

function FamilyArchitecturePage() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Family Architecture"
        title="See the family enterprise as one system"
        description="A simple visual map for ownership, protection, purpose and advisers. Real confidential data should only be added after production authentication, repository privacy and appropriate database security are in place."
        action={<Button className="rounded-none">Add a structure note</Button>}
      />

      <section className="border border-border bg-card p-5 md:p-7">
        <div className="flex items-start gap-4"><Landmark className="mt-1 h-5 w-5 text-bronze" /><div><p className="eyebrow text-bronze">Architecture map</p><h2 className="mt-2 font-display text-3xl">Five layers that should agree with one another.</h2></div></div>
        <div className="mt-7 space-y-3">
          {familyArchitecture.map((layer, index) => (
            <div key={layer.layer} className="grid gap-3 border border-border bg-background p-4 md:grid-cols-[70px_160px_1fr] md:items-center">
              <span className="font-display text-2xl text-bronze">0{index + 1}</span>
              <h3 className="font-display text-2xl">{layer.layer}</h3>
              <div className="flex flex-wrap gap-2">{layer.items.map((item) => <span key={item} className="border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{item}</span>)}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="border border-border bg-card p-6">
          <ShieldCheck className="h-5 w-5 text-bronze" />
          <h2 className="mt-5 font-display text-3xl">Questions the map should surface</h2>
          <div className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
            <p>Who owns what, and who actually has decision authority?</p>
            <p>What happens on death, incapacity, divorce, relocation or a founder stepping back?</p>
            <p>Do wills, trusts, insurance, company documents and family expectations point in the same direction?</p>
            <p>Which professional is responsible for which issue, and where are the gaps between them?</p>
          </div>
        </section>
        <section className="border border-border bg-foreground p-6 text-background">
          <LockKeyhole className="h-5 w-5 text-bronze" />
          <h2 className="mt-5 font-display text-3xl">Security before detail</h2>
          <p className="mt-5 text-sm leading-7 text-background/70">The demo deliberately uses structural placeholders only. Actual trust deeds, wills, IDs, ownership documents, insurance schedules and sensitive family information must wait for a production-grade private data architecture with permissioning and encryption.</p>
          <p className="mt-4 text-sm leading-7 text-background/70">That restraint is part of the product design, not a missing feature.</p>
        </section>
      </div>
    </div>
  );
}
