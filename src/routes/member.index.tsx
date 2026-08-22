import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Compass,
  Globe2,
  GraduationCap,
  Landmark,
  Network,
  Sparkles,
  TableProperties,
} from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { asksOffers, gatherings, knowledge } from "@/data/community";

export const Route = createFileRoute("/member/")({
  component: MemberHome,
});

function MemberHome() {
  const next = gatherings[0]!;
  const firstAsk = asksOffers[0]!;
  const recommendation = knowledge[1]!;

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Saturday, 22 August"
        title="Good morning, Amelia."
        description="Your private room is intentionally quiet. The useful things are the next decision, the introduction waiting for consent, the request with a next action and the work you said you would finish."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Your Table" value="10" note="London Table 01 · next session 17 September" />
        <StatCard label="Introductions" value="2" note="One awaiting consent · one ready to make" />
        <StatCard label="Concierge requests" value="1" note="Education move brief · matching experts" />
        <StatCard label="Open actions" value="3" note="Across Table and Global Life" />
      </div>

      <section>
        <div className="flex items-end justify-between gap-5"><div><p className="eyebrow text-bronze">Your infrastructure</p><h2 className="mt-2 font-display text-3xl">The rooms behind the room</h2></div></div>
        <div className="mt-5 grid gap-px bg-border md:grid-cols-2 xl:grid-cols-5">
          {[
            [Globe2, "Global Life", "Coordinate a cross-border move.", "/member/global-life"],
            [Landmark, "Architecture", "Map ownership, protection and advisers.", "/member/family-architecture"],
            [GraduationCap, "Learning", "Build capability through real work.", "/member/learning"],
            [BadgeCheck, "Partners", "Find a trusted specialist.", "/member/partners"],
            [Compass, "Concierge", "Give a complicated job one owner.", "/member/concierge"],
          ].map(([Icon, title, body, to]) => {
            const Component = Icon as typeof Globe2;
            return <Link key={String(title)} to={String(to)} className="group bg-card p-5 transition-colors hover:bg-accent"><Component className="h-5 w-5 text-bronze" /><h3 className="mt-5 font-display text-2xl">{String(title)}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{String(body)}</p><span className="mt-5 inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.14em]">Open <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" /></span></Link>;
          })}
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <section className="border border-border bg-card">
          <div className="border-b border-border p-5 md:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="eyebrow text-bronze">Next gathering</p>
                <h2 className="mt-2 font-display text-3xl">{next.title}</h2>
              </div>
              <CalendarDays className="h-5 w-5 text-bronze" />
            </div>
          </div>
          <div className="p-5 md:p-6">
            <div className="grid gap-5 md:grid-cols-3">
              <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">When</p><p className="mt-2 text-sm">{next.date}</p><p className="text-sm text-muted-foreground">{next.time}</p></div>
              <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Where</p><p className="mt-2 text-sm leading-6">{next.location}</p></div>
              <div><p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Format</p><p className="mt-2 text-sm">{next.seats}</p><p className="text-sm text-muted-foreground">Confidential working session</p></div>
            </div>
            <p className="mt-6 border-t border-border pt-5 text-sm leading-7 text-muted-foreground">{next.description}</p>
            <Link to="/member/table" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-foreground underline decoration-bronze/40 underline-offset-4">Review the private agenda <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
        </section>

        <section className="border border-border bg-foreground p-6 text-background">
          <Sparkles className="h-5 w-5 text-bronze" />
          <p className="mt-8 text-[11px] uppercase tracking-[0.2em] text-background/60">Curated for you</p>
          <h2 className="mt-3 font-display text-3xl leading-tight">{recommendation.title}</h2>
          <p className="mt-4 text-sm leading-7 text-background/70">{recommendation.summary}</p>
          <Link to="/member/knowledge" className="mt-6 inline-flex items-center gap-2 text-sm">Open the library <ArrowRight className="h-3.5 w-3.5" /></Link>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="border border-border bg-card p-5 md:p-6">
          <div className="flex items-center gap-3"><Network className="h-4 w-4 text-bronze" /><p className="eyebrow">Introduction desk</p></div>
          <h3 className="mt-4 font-display text-2xl">One introduction is ready for consent.</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">A member would like to connect you with an operator who has scaled a founder-led company into Europe. We never release contact details until both sides agree.</p>
          <Link to="/member/introductions" className="mt-5 inline-flex items-center gap-2 text-sm font-medium">Review introductions <ArrowRight className="h-3.5 w-3.5" /></Link>
        </section>

        <section className="border border-border bg-card p-5 md:p-6">
          <div className="flex items-center gap-3"><TableProperties className="h-4 w-4 text-bronze" /><p className="eyebrow">From the community</p></div>
          <h3 className="mt-4 font-display text-2xl">{firstAsk.title}</h3>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">{firstAsk.body}</p>
          <Link to="/member/ask-offer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium">See asks & offers <ArrowRight className="h-3.5 w-3.5" /></Link>
        </section>
      </div>
    </div>
  );
}
