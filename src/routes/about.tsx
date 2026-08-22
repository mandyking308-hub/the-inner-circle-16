import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Quote, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `Why this exists — ${site.name}` },
      { name: "description", content: "The founder story behind Project Table: building a private operating layer for the complexity created by successful, international family life." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private London table at sunset" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/78 to-foreground/18" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-4xl">
            <p className="eyebrow text-bronze">From the founder</p>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">I built the map because I needed one.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/72">The idea did not begin with a desire to create another private club. It began with the ordinary reality that success creates a strange second job: learning how to run the life around it.</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.64fr_1.36fr]">
            <div><Quote className="h-7 w-7 text-oxblood" /><p className="mt-7 font-display text-4xl leading-[1.15] md:text-5xl">You can be perfectly capable and still find yourself asking questions nobody ever taught you to ask.</p></div>
            <div className="space-y-7 text-base leading-8 text-muted-foreground">
              <p>I learned that the hard way. A business grows and suddenly the decisions around it multiply: companies, accountants, lawyers, international structures, banking, property, insurance, schools, travel, philanthropy, succession and the future of your children. Each subject has experts. The family is still left holding the joins.</p>
              <p>I also noticed something else. The most useful answers often came from two places at once: a professional who knew the technical rule, and a person who had already lived through a version of the decision. One could tell me what was legally correct. The other could tell me what they wished they had known before doing it.</p>
              <p>Project Table is my attempt to put those two forms of intelligence around the same family — then add the missing piece: somebody who helps turn the decision into action.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><p className="eyebrow text-bronze">What I learned</p><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">The real problem was never lack of information.</h2></div><p className="max-w-xl text-sm leading-7 text-background/62 lg:justify-self-end">It was fragmentation: too many decisions living in different inboxes, too much context repeatedly explained, and too many important jobs with no single owner.</p></div>
          <div className="grid gap-px bg-background/15 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Peers", "Lived experience helps you recognise the real question before you pay to implement the wrong answer."],
              ["Professionals", "Qualified advisers make the technical answer sound, especially when law, tax, immigration or fiduciary duties are involved."],
              ["Execution", "The best plan still fails if documents, appointments, deadlines, hand-offs and follow-through remain nobody's job."],
              ["Next generation", "Assets are fragile if children inherit the outcome without gradually learning the judgement, responsibility and capability behind it."],
            ].map(([title, body]) => <article key={title} className="bg-foreground p-6"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-background/62">{body}</p></article>)}
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="overflow-hidden border border-foreground/15"><img src={luxuryImages.command} alt="A private family decision room overlooking London" className="aspect-[4/3] w-full object-cover" /></div>
            <div><Compass className="h-5 w-5 text-oxblood" /><p className="mt-7 eyebrow text-oxblood">What we are building</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">A private institution that becomes more useful as life becomes more complex.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">The Table gives members judgement. Decision Rooms organise the problem. Trusted Partners provide specialist expertise. Concierge closes the practical gaps. Family Architecture keeps the system visible. Global Life handles borders. Family Learning prepares the next generation.</p><p className="mt-5 text-sm leading-7 text-muted-foreground">None of those pieces is especially revolutionary alone. The point is that a real family needs them to talk to one another.</p></div>
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><ShieldCheck className="h-5 w-5 text-bronze" /><p className="mt-7 eyebrow text-bronze">The promise</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">The real luxury is trusted people, capability and time returned.</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-oxblood-foreground/68">If the institution cannot give members more of those three things, it does not deserve to exist.</p></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container>
      </section>
    </>
  );
}
