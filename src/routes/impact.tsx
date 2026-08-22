import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HandHeart, Scale, ShieldCheck, UsersRound } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/impact")({
  head: () => ({ meta: [{ title: `Impact — ${site.name}` }, { name: "description", content: "A private contribution strand for families who want to use time, experience, relationships and resources in ways that matter." }] }),
  component: ImpactPublicPage,
});

function ImpactPublicPage() {
  return (
    <>
      <section className="relative min-h-[700px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private group talking about purpose and contribution" className="absolute inset-0 h-full w-full object-cover brightness-[1.08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/82 via-foreground/58 to-foreground/10" />
        <Container className="relative flex min-h-[700px] items-center py-20">
          <div className="max-w-3xl"><p className="eyebrow text-bronze">Give</p><h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">Use what life has taught you to open something for somebody else.</h1><p className="mt-7 max-w-2xl text-base leading-8 text-background/78">Sometimes the most useful contribution is money. Sometimes it is judgement, a thoughtful introduction, a day of somebody’s time, a mentor, a board conversation or knowing exactly who might unlock the next step.</p><Button asChild size="lg" className="mt-9 rounded-none bg-oxblood px-8"><Link to="/membership">Explore membership <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div><HandHeart className="h-5 w-5 text-oxblood" /><p className="mt-7 eyebrow text-oxblood">Purpose in practice</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">Giving becomes more meaningful when it is close enough to understand.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">Members can meet practitioners, understand a problem properly and choose whether their most useful contribution is time, experience, relationships, funding or a combination.</p></div>
            <div className="grid gap-px bg-foreground/15 sm:grid-cols-2">{[
              ["Listen", "Start with what the organisation or community says it needs, not with what the member arrives wanting to give."],
              ["Contribute", "Offer the thing that genuinely helps: expertise, a connection, time, governance, technology, hiring support or funding."],
              ["Stay human", "People and communities are never scenery for somebody else’s philanthropy. Privacy, dignity and consent remain part of the work."],
              ["Learn", "Understand what changed, what did not, and what the family learned from being close enough to see the work properly."],
            ].map(([title, body]) => <article key={title} className="bg-background p-6"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p></article>)}</div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"><div><p className="eyebrow text-bronze">Many ways to matter</p><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Resources are useful. So is everything it took to build them.</h2></div><p className="max-w-xl text-sm leading-7 text-background/64 lg:justify-self-end">Experience, credibility, relationships and judgement can sometimes change a situation faster than another donation alone.</p></div>
          <div className="grid gap-px bg-background/15 md:grid-cols-2 lg:grid-cols-4">{[
            ["Expertise", "Help with a defined question in operations, governance, technology, finance, hiring, law or communications."],
            ["Relationships", "Make one thoughtful introduction when the connection has a credible reason and both sides want it."],
            ["Time", "Mentor, listen, review, host, teach or spend time with a team facing a problem you understand."],
            ["Funding", "Support an organisation or idea when the purpose, governance and intended use of funds are sufficiently clear."],
          ].map(([title, body]) => <article key={title} className="bg-foreground p-6"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-background/64">{body}</p></article>)}</div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="border border-foreground/15 bg-card p-7"><UsersRound className="h-5 w-5 text-oxblood" /><h2 className="mt-7 font-display text-4xl">Across generations</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Giving creates a natural place for families to talk about what matters, make decisions together and let younger members experience stewardship outside the family itself.</p></article>
            <article className="border border-foreground/15 bg-card p-7"><Scale className="h-5 w-5 text-oxblood" /><h2 className="mt-7 font-display text-4xl">No pressure</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Impact opportunities are opt-in. Attending a gathering never creates an obligation to fund something, and charitable work never becomes a route to commercial access.</p></article>
            <article className="border border-foreground/15 bg-card p-7"><ShieldCheck className="h-5 w-5 text-oxblood" /><h2 className="mt-7 font-display text-4xl">Meaning over performance</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">The aim is to create useful contribution and real learning for the family, not another public display of generosity.</p></article>
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28"><Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">The spirit</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">A good life becomes richer when some of it flows outward.</h2></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container></section>
    </>
  );
}
