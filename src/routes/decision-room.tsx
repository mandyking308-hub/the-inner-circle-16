import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, CheckCircle2, Compass, MessageSquareText, TableProperties } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { luxuryImages } from "@/data/luxuryImages";

export const Route = createFileRoute("/decision-room")({
  head: () => ({ meta: [{ title: `Life Decision Room — ${site.name}` }, { name: "description", content: "A private room that turns complex family decisions into clear choices, qualified advice, owned execution and evidence of completion." }] }),
  component: DecisionRoomPage,
});

const lanes = [
  ["01", "Decide", "What are we actually choosing, and what matters enough to change the answer?"],
  ["02", "Expert", "Which parts need a lawyer, tax adviser, immigration specialist, trustee, educator or another qualified professional?"],
  ["03", "Execute", "Who owns the next action, what are they waiting for and when should it be done?"],
  ["04", "Evidence", "What document, decision, review or outcome proves we can stop carrying this in our heads?"],
] as const;

export function DecisionRoomPage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.command} alt="A private family office command room overlooking London" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/78 to-foreground/20" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-foreground to-transparent" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Life Decision Room</p>
            <h1 className="mt-6 max-w-[12ch] font-display text-6xl leading-[0.94] md:text-8xl">When five decisions are actually one decision.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/72">Move country and suddenly the visa touches tax, the tax touches the company, the company touches the trust, the school calendar touches the move date and the bank wants paperwork nobody told you to prepare. The room keeps the whole problem together.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat</Link></Button><Button asChild size="lg" variant="outline" className="rounded-none border-background/35 bg-foreground/10 px-8 text-background hover:bg-background hover:text-foreground"><Link to="/auth">Member sign in <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="eyebrow text-oxblood">The idea</p><h2 className="mt-5 font-display text-5xl leading-[1.02]">You should know who is deciding, who is advising and who is doing.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">Most expensive confusion comes from mixing those jobs together. A peer opinion is not legal advice. A brilliant tax memo is not an execution plan. A concierge cannot make a family decision for you. The room makes the boundary obvious.</p></div>
            <div className="grid gap-px bg-foreground/15 sm:grid-cols-2">
              {lanes.map(([number, title, body]) => <article key={title} className="bg-background p-7"><span className="font-display text-3xl text-oxblood">{number}</span><h3 className="mt-8 font-display text-4xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p></article>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"><div><p className="eyebrow text-bronze">Four rooms already built</p><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Start where life is already complicated.</h2></div><p className="max-w-xl text-sm leading-7 text-background/60 lg:justify-self-end">These are not articles. Inside membership they become working boards with tasks, owners, dependencies, progress and direct routes into the Table, sourced outside expertise and the Private Office.</p></div>
          <div className="divide-y divide-background/15 border-y border-background/15">
            {[
              ["Move country", "Residence, tax, entities, trusts, schools, homes, banking, insurance, healthcare and day counts."],
              ["Build a family office", "Ownership, advisers, reporting, protection, continuity, information and who actually owns each decision."],
              ["Rethink education", "What school does well, what life still needs to teach and how a young person proves they can execute."],
              ["Plan succession", "Paperwork, ownership, capability, communication and preparing people before authority lands on them."],
            ].map(([title, body], index) => <div key={title} className="grid gap-4 py-7 md:grid-cols-[70px_250px_1fr] md:items-start"><span className="font-display text-3xl text-bronze">0{index + 1}</span><h3 className="font-display text-3xl">{title}</h3><p className="max-w-3xl text-sm leading-7 text-background/62">{body}</p></div>)}
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            {[
              [TableProperties, "Ask the people who have lived it", "Before you spend money implementing a decision, ask a small circle what surprised them, what they would do differently and which question mattered most."],
              [BadgeCheck, "Bring in the right specialist", "The room shows where regulated or technical expertise is required, then routes the member into the relevant trusted-partner category."],
              [Compass, "Give the practical work an owner", "Research, scheduling, document chasing, introductions and follow-through can move into Concierge so the family is not carrying every loose end."],
            ].map(([Icon, title, body]) => { const Component = Icon as typeof TableProperties; return <article key={String(title)} className="border border-foreground/15 bg-card p-7"><Component className="h-5 w-5 text-oxblood" /><h3 className="mt-8 font-display text-4xl leading-tight">{String(title)}</h3><p className="mt-5 text-sm leading-7 text-muted-foreground">{String(body)}</p></article>; })}
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><div className="flex items-center gap-3"><CheckCircle2 className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">The definition of done</p></div><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">The best luxury is waking up and knowing the complicated thing is handled.</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-oxblood-foreground/68">That is what this room is for. Not more information. Less mental load, clearer decisions and visible completion.</p></div>
            <Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
