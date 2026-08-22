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
  ["01", "Decide", "Clarify what the family is actually choosing, what matters most and which assumptions need testing."],
  ["02", "Expert", "Separate the questions that require qualified legal, tax, immigration, fiduciary, education or other specialist advice."],
  ["03", "Execute", "Give every practical action an owner, dependency, next step and finish line so advice does not die in an inbox."],
  ["04", "Evidence", "Record what proves completion: documents, dates, decisions, reviews, feedback and the controls that remain afterwards."],
] as const;

export function DecisionRoomPage() {
  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div>
              <p className="eyebrow text-bronze">Life Decision Room</p>
              <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-7xl">Stop collecting advice. Start closing decisions.</h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground">The hardest family decisions rarely belong to one profession. Moving country touches tax, immigration, companies, trusts, schools, property, banking and ordinary family life. Succession touches ownership, law, capability and relationships. The Decision Room gives the whole problem one operating structure.</p>
              <div className="mt-8 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-none px-8"><Link to="/apply">Request a seat</Link></Button><Button asChild size="lg" variant="outline" className="rounded-none px-8"><Link to="/ecosystem">See the ecosystem <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
            </div>
            <figure><div className="overflow-hidden border border-border"><img src="/art/decision-room.svg" alt="Editorial illustration of the four-lane Life Decision Room" className="aspect-[4/3] w-full object-cover" /></div><figcaption className="mt-3 text-[11px] leading-5 text-muted-foreground">Peers for judgement. Qualified professionals for advice. Concierge for execution. Evidence for continuity.</figcaption></figure>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 md:py-24">
        <Container>
          <div className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-4">{lanes.map(([number, title, body]) => <article key={title} className="bg-background p-6 md:p-7"><span className="font-display text-3xl text-bronze">{number}</span><h2 className="mt-8 font-display text-4xl">{title}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p></article>)}</div>
        </Container>
      </section>

      <section className="border-b border-border bg-foreground py-16 text-background md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div><p className="eyebrow text-background/60">One workflow, several sources of value</p><h2 className="mt-4 font-display text-5xl leading-tight">The community becomes useful at the exact moment a decision becomes messy.</h2></div>
            <div className="grid gap-px bg-background/20 sm:grid-cols-2">
              {[
                [TableProperties, "The Table", "Ask peers who have lived through a version of the problem before you pay to implement it."],
                [BadgeCheck, "Trusted Partners", "Bring in the right regulated or specialist expertise without searching blindly or opening the member directory to salespeople."],
                [Compass, "Concierge", "Give coordination, research, appointments, documents and practical follow-through a named owner."],
                [MessageSquareText, "Knowledge", "Convert recurring problems into reusable playbooks so the next member starts further ahead."],
              ].map(([Icon, title, body]) => { const Component = Icon as typeof TableProperties; return <article key={String(title)} className="bg-foreground p-6"><Component className="h-5 w-5 text-bronze" /><h3 className="mt-5 font-display text-3xl">{String(title)}</h3><p className="mt-4 text-sm leading-7 text-background/70">{String(body)}</p></article>; })}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <p className="eyebrow text-bronze">Example rooms</p>
          <div className="mt-8 divide-y divide-border border-y border-border">{[
            ["Move country", "Residence, tax, entities, schools, housing, banking, insurance and day-counts."],
            ["Build a family office", "Ownership, governance, advisers, reporting, continuity, protection and operational rhythm."],
            ["Rethink education", "Academic foundations, alternative routes, capability, real projects, mentors and evidence."],
            ["Plan succession", "Ownership, trusts, wills, next-generation readiness, staged authority and family communication."],
          ].map(([title, body], index) => <div key={title} className="grid gap-4 py-6 md:grid-cols-[80px_220px_1fr] md:items-start"><span className="font-display text-2xl text-bronze">0{index + 1}</span><h2 className="font-display text-3xl">{title}</h2><p className="max-w-3xl text-sm leading-7 text-muted-foreground">{body}</p></div>)}</div>
        </Container>
      </section>
    </>
  );
}
