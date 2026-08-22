import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, GraduationCap, Hammer, Presentation, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { curriculumDomains, executionFramework, sampleQuests } from "@/data/infrastructure";
import { site } from "@/config/site";
import { luxuryImages } from "@/data/luxuryImages";

export const Route = createFileRoute("/family-learning")({
  head: () => ({ meta: [{ title: `Family Learning — ${site.name}` }, { name: "description", content: "A private family learning studio built around mastery, real work, execution and evidence." }] }),
  component: FamilyLearningPage,
});

function FamilyLearningPage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.learning} alt="A family learning together in a private London study" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/70 to-foreground/16" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Family Learning Studio</p>
            <h1 className="mt-6 max-w-[10ch] font-display text-6xl leading-[0.93] md:text-8xl">Give them more than the life. Give them the ability to run it.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/72">A child can have excellent schools, tutors and qualifications and still reach adulthood without knowing how to turn an idea into a plan, speak to adults, manage money, solve an unfamiliar problem or finish something that matters.</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/55">We keep the academics. Then we add the part life will eventually demand.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat</Link></Button><Button asChild size="lg" variant="outline" className="rounded-none border-background/35 bg-foreground/10 px-8 text-background hover:bg-background hover:text-foreground"><Link to="/alumni">See the pathway <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
            <div>
              <p className="eyebrow text-oxblood">The capability model</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.02]">Skill is not execution.</h2>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">Knowing what a spreadsheet is does not mean you can build a budget when the numbers are incomplete. Knowing PowerPoint does not mean you can stand up on Friday and convince a room. Knowing AI does not mean you can choose the right problem, build something safe and test whether it works.</p>
            </div>
            <div className="grid gap-px bg-foreground/15 sm:grid-cols-2">
              {executionFramework.map((item) => <article key={item.step} className="bg-background p-7"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-oxblood">{item.step}</p><h3 className="mt-3 font-display text-3xl">{item.title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.body}</p></article>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-forest py-20 text-forest-foreground md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end"><div><div className="flex items-center gap-3"><GraduationCap className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">Build the family curriculum</p></div><h2 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] md:text-6xl">Keep what school does well. Add what this child will need for the life ahead.</h2></div><p className="max-w-xl text-sm leading-7 text-forest-foreground/68 lg:justify-self-end">This can sit alongside a conventional school, support a hybrid route or help a family think through alternative education. It is not about making a child work like an adult. It is about letting capability grow before responsibility becomes real.</p></div>
          <div className="grid gap-px bg-forest-foreground/15 md:grid-cols-2 lg:grid-cols-4">
            {curriculumDomains.map((domain) => <article key={domain.title} className="bg-forest p-6"><h3 className="font-display text-3xl">{domain.title}</h3><p className="mt-4 text-sm leading-7 text-forest-foreground/66">{domain.description}</p></article>)}
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
            <div><div className="flex items-center gap-3"><Hammer className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">Real quests</p></div><h2 className="mt-5 font-display text-5xl leading-[1.02]">Give them a brief, a budget, a deadline and somebody who cares about the result.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">That is where knowledge becomes judgement. The learner has to decide what matters, ask for help, use tools, recover when something fails and deliver.</p></div>
            <div className="space-y-4">
              {sampleQuests.map((quest) => <article key={quest.title} className="border border-foreground/15 bg-card p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-display text-3xl">{quest.title}</h3><span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-oxblood">{quest.ages}</span></div><p className="mt-3 text-sm leading-7 text-muted-foreground">{quest.outcome}</p><div className="mt-4 flex flex-wrap gap-2">{quest.domains.map((domain) => <span key={domain} className="border border-foreground/15 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">{domain}</span>)}</div></article>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <article className="border border-background/15 p-7"><BriefcaseBusiness className="h-5 w-5 text-bronze" /><h3 className="mt-8 font-display text-4xl">See real work</h3><p className="mt-4 text-sm leading-7 text-background/65">Founder shadowing, trusted-partner visits and carefully designed placements let older learners see how decisions are actually made when the answer is not in a textbook.</p></article>
            <article className="border border-background/15 p-7"><Presentation className="h-5 w-5 text-bronze" /><h3 className="mt-8 font-display text-4xl">Prove capability</h3><p className="mt-4 text-sm leading-7 text-background/65">Projects, presentations, ventures, service, feedback and references become an evidence portfolio: a record of what this young person can actually do.</p></article>
            <article className="border border-background/15 p-7"><Sparkles className="h-5 w-5 text-bronze" /><h3 className="mt-8 font-display text-4xl">Keep the network</h3><p className="mt-4 text-sm leading-7 text-background/65">At 16+ the pathway begins to open into mentors, project briefs, apprenticeships, alumni and eventually an expectation to create opportunities for the cohort behind.</p><Link to="/alumni" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">The Continuum <ArrowRight className="h-4 w-4 text-bronze" /></Link></article>
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">The outcome</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">By adulthood, the question should not be “What do you know?” It should also be “What can you turn your hand to?”</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-oxblood-foreground/68">That is the capability we are building for.</p></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
        </Container>
      </section>
    </>
  );
}
