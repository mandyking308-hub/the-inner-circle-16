import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, GraduationCap, Hammer, Presentation, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { curriculumDomains, executionFramework, sampleQuests } from "@/data/infrastructure";
import { site } from "@/config/site";
import { luxuryImages } from "@/data/luxuryImages";

export const Route = createFileRoute("/family-learning")({
  head: () => ({ meta: [{ title: `Families — ${site.name}` }, { name: "description", content: "A private family learning experience combining strong education with confidence, culture, practical capability, mentors and real-world opportunity." }] }),
  component: FamilyLearningPage,
});

function FamilyLearningPage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.learning} alt="A family learning together in a private London study" className="absolute inset-0 h-full w-full object-cover brightness-[1.1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/82 via-foreground/56 to-foreground/10" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Families & the next generation</p>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">Give them a wider world — and the confidence to make something of it.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/78">The best education opens doors. We want the next generation to know what to do once those doors open: meet people well, think independently, understand money, use technology, travel confidently, make things happen and know what they care about.</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/64">This sits around a child’s existing education and grows with them over time.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat</Link></Button><Button asChild size="lg" variant="outline" className="rounded-none border-background/40 bg-background/10 px-8 text-background hover:bg-background hover:text-foreground"><Link to="/alumni">See the pathway <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
            <div>
              <p className="eyebrow text-oxblood">A fuller education</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.02]">Knowledge matters. So does knowing how to use yourself in the world.</h2>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">A child can be academically excellent and still need practice speaking to adults, planning a real journey, making a budget, recovering from a mistake, using AI thoughtfully or taking an idea all the way to a finished result.</p>
            </div>
            <div className="grid gap-px bg-foreground/15 sm:grid-cols-2">
              {executionFramework.map((item) => <article key={item.step} className="bg-background p-7"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-oxblood">{item.step}</p><h3 className="mt-3 font-display text-3xl">{item.title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.body}</p></article>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-forest py-20 text-forest-foreground md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><div className="flex items-center gap-3"><GraduationCap className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">Build the family curriculum</p></div><h2 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] md:text-6xl">Keep the strong foundations. Add the experiences that shape a capable person.</h2></div><p className="max-w-xl text-sm leading-7 text-forest-foreground/68 lg:justify-self-end">Every family will choose a different mix. The point is not to create another school. It is to make space for the things families often wish education had included more of.</p></div>
          <div className="grid gap-px bg-forest-foreground/15 md:grid-cols-2 lg:grid-cols-4">
            {curriculumDomains.map((domain) => <article key={domain.title} className="bg-forest p-6"><h3 className="font-display text-3xl">{domain.title}</h3><p className="mt-4 text-sm leading-7 text-forest-foreground/66">{domain.description}</p></article>)}
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
            <div><div className="flex items-center gap-3"><Hammer className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">Experience the world</p></div><h2 className="mt-5 font-display text-5xl leading-[1.02]">Real projects make confidence feel earned.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">A small venture. A family trip planned properly. A presentation to adults. A piece of technology built and tested. A giving project. A mentor who expects a real answer.</p></div>
            <div className="space-y-4">
              {sampleQuests.map((quest) => <article key={quest.title} className="border border-foreground/15 bg-card p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-display text-3xl">{quest.title}</h3><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-oxblood">{quest.ages}</span></div><p className="mt-3 text-sm leading-7 text-muted-foreground">{quest.outcome}</p><div className="mt-4 flex flex-wrap gap-2">{quest.domains.map((domain) => <span key={domain} className="border border-foreground/15 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{domain}</span>)}</div></article>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <article className="border border-background/15 p-7"><BriefcaseBusiness className="h-5 w-5 text-bronze" /><h3 className="mt-8 font-display text-4xl">See real life up close</h3><p className="mt-4 text-sm leading-7 text-background/65">Founder shadowing, trusted-partner visits, cultural experiences and carefully designed placements let young people see how interesting lives and serious work are actually built.</p></article>
            <article className="border border-background/15 p-7"><Presentation className="h-5 w-5 text-bronze" /><h3 className="mt-8 font-display text-4xl">Build a story of capability</h3><p className="mt-4 text-sm leading-7 text-background/65">Projects, presentations, ventures, service, feedback and references create something richer than a list of marks: evidence of what this young person can actually do.</p></article>
            <article className="border border-background/15 p-7"><Sparkles className="h-5 w-5 text-bronze" /><h3 className="mt-8 font-display text-4xl">Grow into the network</h3><p className="mt-4 text-sm leading-7 text-background/65">As they get older, the world can open gradually into mentors, project briefs, apprenticeships, alumni and eventually the opportunity to create doors for somebody else.</p><Link to="/alumni" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">The Continuum <ArrowRight className="h-4 w-4 text-bronze" /></Link></article>
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">The hope</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">Raise children who feel at home in the world — and know how to contribute to it.</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-oxblood-foreground/68">Education should widen possibility without taking away childhood.</p></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
        </Container>
      </section>
    </>
  );
}
