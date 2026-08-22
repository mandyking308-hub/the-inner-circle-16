import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, ShieldCheck, UsersRound } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/the-table")({
  head: () => ({ meta: [{ title: `The Table — ${site.name}` }, { name: "description", content: "A permanent private peer circle for the decisions that are too nuanced for a search result and too personal for ordinary networking." }] }),
  component: TheTablePage,
});

function TheTablePage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private members table overlooking London" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/72 to-foreground/16" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">The Table</p>
            <h1 className="mt-6 max-w-[10ch] font-display text-6xl leading-[0.93] md:text-8xl">You do not need another room full of strangers.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/72">You need a small group that remembers the last conversation, understands the life behind the decision and has enough experience to ask the question you have not thought of yet.</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/55">Eight to twelve people. Same circle. Confidential. No pitching.</p>
            <Button asChild size="lg" className="mt-9 rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
            <div><p className="eyebrow text-oxblood">Why permanent?</p><h2 className="mt-5 font-display text-5xl leading-[1.02]">Context compounds.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">The tenth conversation is more valuable than the first because people know what you are building, what you already tried, which adviser is involved and what happened last time.</p></div>
            <div className="grid gap-px bg-foreground/15 sm:grid-cols-2">
              {[
                ["The same people", "A stable circle creates memory, accountability and the confidence to skip the polished version of the story."],
                ["A real agenda", "Members bring decisions, not presentations. The room can spend its time where somebody genuinely needs judgement."],
                ["No extraction", "No member list harvesting, no cold pitching and no sponsor dropping into a private conversation because they paid."],
                ["Action afterwards", "The useful part does not end when dinner does. A decision can move into a specialist brief, Concierge or a Decision Room."],
              ].map(([title, body]) => <article key={title} className="bg-background p-7"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p></article>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <article className="border border-background/15 p-7"><UsersRound className="h-5 w-5 text-bronze" /><h2 className="mt-8 font-display text-4xl">The people</h2><p className="mt-4 text-sm leading-7 text-background/64">Founders, owners, family-enterprise principals, investors and a small number of operators or professionals whose judgement genuinely improves the room.</p></article>
            <article className="border border-background/15 p-7"><LockKeyhole className="h-5 w-5 text-bronze" /><h2 className="mt-8 font-display text-4xl">The privacy</h2><p className="mt-4 text-sm leading-7 text-background/64">No recording. No forwarding. No turning somebody else’s family problem into a LinkedIn post the next morning.</p></article>
            <article className="border border-background/15 p-7"><ShieldCheck className="h-5 w-5 text-bronze" /><h2 className="mt-8 font-display text-4xl">The standard</h2><p className="mt-4 text-sm leading-7 text-background/64">Character before status. Contribution before access. Enough confidence in the room that somebody can say, “I do not know what to do next.”</p></article>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="eyebrow text-oxblood">A typical question</p><h2 className="mt-5 font-display text-5xl leading-[1.02]">Not “How do I grow my network?”</h2></div><div className="space-y-5 font-display text-3xl leading-tight text-foreground md:text-4xl"><p>“We are thinking of moving the family. What did nobody tell you before you did it?”</p><p>“My child will inherit responsibility one day. When did you start teaching yours?”</p><p>“I have three advisers giving technically correct answers that do not fit together. How would you untangle this?”</p><p>“I want to step back without everything slowing down. What did you have to build first?”</p></div></div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">One seat</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">The right table should be more valuable each year you stay at it.</h2></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container>
      </section>
    </>
  );
}
