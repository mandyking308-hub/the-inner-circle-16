import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Compass, MessageSquareText, TableProperties } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export const Route = createFileRoute("/decision-room")({
  head: () => ({
    meta: [
      { title: `Life Decision Room — ${site.name}` },
      { name: "description", content: "A private workflow that turns complex family decisions into clear choices, qualified advice, owned execution and evidence of completion." },
    ],
  }),
  component: DecisionRoomPage,
});

const lanes = [
  ["01", "Decide", "What belongs to the family? Clarify the outcome, priorities, trade-offs and assumptions before anybody starts implementing."],
  ["02", "Expert", "What requires professional advice? Route only the technical questions to the right qualified specialists."],
  ["03", "Execute", "Who actually does the work? Every practical action receives an owner, dependency, next step and finish line."],
  ["04", "Evidence", "How do we know it is done? Keep decisions, dates, documents, reviews and controls visible afterwards."],
] as const;

const exampleRooms = [
  ["Move country", "Residence · tax · entities · schools · housing · banking · insurance · day counts"],
  ["Build a family office", "Ownership · governance · advisers · reporting · protection · continuity · operating rhythm"],
  ["Rethink education", "Core mastery · alternative routes · projects · mentors · execution · evidence portfolio"],
  ["Plan succession", "Ownership · trusts · wills · next-gen readiness · staged authority · family communication"],
] as const;

export function DecisionRoomPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-foreground/15 bg-foreground py-20 text-background md:py-28">
        <div className="absolute inset-y-0 right-0 hidden w-[42%] bg-oxblood/20 lg:block" />
        <Container className="relative">
          <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-bronze">Life Decision Room</p>
              <h1 className="mt-6 max-w-[11ch] text-balance font-display text-6xl leading-[0.92] md:text-8xl">Stop collecting advice. <span className="text-bronze">Start closing decisions.</span></h1>
              <p className="mt-8 max-w-xl text-base leading-8 text-background/65">The hardest family decisions do not belong to one profession. The Decision Room gives the whole problem a structure before the family spends time and money implementing fragments.</p>
              <div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-none bg-oxblood px-8 text-oxblood-foreground hover:bg-background hover:text-foreground"><Link to="/apply">Request a seat</Link></Button><Button asChild size="lg" variant="outline" className="rounded-none border-background/30 bg-transparent px-8 text-background hover:bg-background hover:text-foreground"><Link to="/ecosystem">See the ecosystem <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
            </div>
            <figure className="relative">
              <div className="overflow-hidden border border-background/20 bg-background image-frame"><img src="/art/decision-room.svg" alt="The four-lane Life Decision Room" className="aspect-[4/3] w-full object-cover" /></div>
              <figcaption className="mt-4 grid grid-cols-2 gap-4 text-[9px] font-semibold uppercase tracking-[0.15em] text-background/45"><span>Peers for judgement</span><span className="text-right">Execution with evidence</span></figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-24">
        <Container>
          <div className="mb-10 grid gap-7 lg:grid-cols-[0.6fr_1.4fr] lg:items-end"><div><p className="eyebrow text-oxblood">The operating discipline</p><h2 className="mt-4 font-display text-4xl">Four lanes. No hiding behind research.</h2></div><p className="max-w-2xl text-sm leading-7 text-muted-foreground lg:justify-self-end">The workflow forces the family to distinguish judgement, regulated advice, practical execution and proof of completion. That alone prevents a surprising amount of drift.</p></div>
          <div className="grid gap-px bg-foreground/15 md:grid-cols-2 xl:grid-cols-4">{lanes.map(([number, title, body], index) => <article key={title} className={`min-h-[300px] p-6 md:p-7 ${index === 1 || index === 3 ? "bg-card" : "bg-background"}`}><div className="flex items-start justify-between"><span className="font-display text-4xl text-oxblood">{number}</span><span className="h-2.5 w-2.5 rounded-full bg-bronze" /></div><h3 className="mt-16 font-display text-4xl">{title}</h3><p className="mt-5 text-sm leading-7 text-muted-foreground">{body}</p></article>)}</div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="eyebrow text-oxblood">Where the value enters</p><h2 className="mt-5 font-display text-5xl leading-[1.02]">One decision can pull the whole institution into the room.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">The member does not need to decide whether a problem belongs to networking, advice, research or concierge. They start with the outcome.</p></div>
            <div className="divide-y divide-foreground/15 border-y border-foreground/15">
              {[
                [TableProperties, "The Table", "Use peers for lived judgement before paying to implement an assumption."],
                [BadgeCheck, "Trusted Partners", "Bring in the right specialist only where technical expertise is actually required."],
                [Compass, "Concierge", "Turn the chosen direction into appointments, research, documents, coordination and completed actions."],
                [MessageSquareText, "Knowledge", "Convert recurring problems into playbooks so the next family begins further ahead."],
              ].map(([Icon, title, body], index) => { const Component = Icon as typeof TableProperties; return <article key={String(title)} className="grid gap-4 py-6 md:grid-cols-[55px_220px_1fr] md:items-center"><span className="font-display text-2xl text-oxblood">0{index + 1}</span><div className="flex items-center gap-3"><Component className="h-4 w-4 text-bronze" /><h3 className="font-display text-3xl">{String(title)}</h3></div><p className="text-sm leading-7 text-muted-foreground">{String(body)}</p></article>; })}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-forest py-20 text-forest-foreground md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="eyebrow text-forest-foreground/50">Example rooms</p><h2 className="mt-5 font-display text-5xl leading-tight">The problems do not arrive neatly. The rooms do.</h2></div>
            <div className="divide-y divide-forest-foreground/15 border-y border-forest-foreground/15">{exampleRooms.map(([title, body], index) => <div key={title} className="grid gap-4 py-6 md:grid-cols-[60px_220px_1fr] md:items-center"><span className="font-display text-2xl text-bronze">0{index + 1}</span><h3 className="font-display text-3xl">{title}</h3><p className="text-xs font-medium uppercase leading-6 tracking-[0.08em] text-forest-foreground/55">{body}</p></div>)}</div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-8 border border-foreground/20 bg-card p-8 md:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><p className="eyebrow text-oxblood">Inside membership</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-tight">The public page explains the method. The private room is where the work moves.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Members can switch decision templates, mark work complete, see dependencies and owners, and route the next step directly to peers, Trusted Partners or Concierge.</p></div>
            <Button asChild size="lg" className="rounded-none bg-oxblood px-8 text-oxblood-foreground hover:bg-foreground"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
