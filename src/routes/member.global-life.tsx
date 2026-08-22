import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, CircleAlert, Clock3, Globe2 } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { globalLifeWorkstreams, playbooks } from "@/data/infrastructure";

export const Route = createFileRoute("/member/global-life")({
  component: MemberGlobalLife,
});

function MemberGlobalLife() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Global Life Desk"
        title="Your cross-border decision room"
        description="Keep the jurisdictions, advisers, family constraints and unresolved questions in one place before instructions fragment across inboxes. This demo coordinates information; qualified professionals provide regulated advice."
        action={<Button className="rounded-none">Start a move room</Button>}
      />

      <div className="grid gap-4 xl:grid-cols-[1.3fr_0.7fr]">
        <section className="border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-5 md:p-6"><div><p className="eyebrow text-bronze">Active case room</p><h2 className="mt-2 font-display text-3xl">International family move · early planning</h2></div><Globe2 className="h-5 w-5 text-bronze" /></div>
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
            {globalLifeWorkstreams.map((workstream) => (
              <article key={workstream.name} className="bg-background p-5">
                <div className="flex items-center justify-between gap-3"><h3 className="font-display text-2xl">{workstream.name}</h3><CircleAlert className="h-4 w-4 text-bronze" /></div>
                <p className="mt-3 text-[10px] uppercase tracking-[0.16em] text-bronze">{workstream.status}</p>
                <p className="mt-3 text-xs leading-6 text-muted-foreground">{workstream.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border border-border bg-foreground p-6 text-background">
          <Clock3 className="h-5 w-5 text-bronze" />
          <p className="mt-7 text-[10px] uppercase tracking-[0.2em] text-background/60">Next three actions</p>
          <ol className="mt-5 space-y-5">
            {[
              "Confirm the two jurisdictions that remain genuinely viable for the whole family.",
              "Send one reconciled question list to immigration and tax specialists before paying for implementation.",
              "Map school-year timing against residence-day requirements and housing availability.",
            ].map((action, index) => <li key={action} className="flex gap-3 text-sm leading-6 text-background/80"><span className="font-display text-xl text-bronze">0{index + 1}</span><span>{action}</span></li>)}
          </ol>
          <Button asChild variant="outline" className="mt-7 w-full rounded-none border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"><Link to="/member/concierge">Ask concierge to coordinate <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
        </section>
      </div>

      <section>
        <div className="flex items-end justify-between gap-4"><div><p className="eyebrow text-bronze">Decision checklist</p><h2 className="mt-2 font-display text-3xl">What a serious move room should cover</h2></div></div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {["Residence rights and renewal", "Tax residence and exit/entry timing", "Companies, trusts and ownership", "Banking, FX and payment rails", "Property and household logistics", "Schools and curriculum continuity", "Healthcare and insurance", "Wills, succession and incapacity", "Travel-day calendar and key dates"].map((item) => <div key={item} className="flex items-start gap-3 border border-border bg-card p-4 text-sm"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-bronze" /><span>{item}</span></div>)}
        </div>
      </section>

      <section className="border border-border bg-card p-6">
        <p className="eyebrow text-bronze">Relevant playbooks</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">{playbooks.slice(0, 6).map((playbook) => <div key={playbook} className="border-t border-border pt-3 text-sm text-muted-foreground">{playbook}</div>)}</div>
      </section>
    </div>
  );
}
