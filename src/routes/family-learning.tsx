import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, GraduationCap, Hammer, Presentation, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { curriculumDomains, executionFramework, sampleQuests } from "@/data/infrastructure";
import { site } from "@/config/site";

export const Route = createFileRoute("/family-learning")({
  head: () => ({
    meta: [
      { title: `Family Learning — ${site.name}` },
      { name: "description", content: "A personalised family curriculum built around mastery, real work, execution and evidence rather than worksheets alone." },
    ],
  }),
  component: FamilyLearningPage,
});

function FamilyLearningPage() {
  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="eyebrow text-bronze">Family Learning Studio</p>
              <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] md:text-7xl">Skills matter. Execution changes lives.</h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-muted-foreground">
                Traditional education is good at teaching knowledge and measuring recall. Families also need young people who can face an unfamiliar problem, find the information, make a plan, use tools, work with other people and finish something that matters.
              </p>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground">
                The Family Learning Studio lets a family build a supplementary, hybrid or alternative curriculum around the child in front of them — while keeping academic foundations and adding practical capability, enterprise, technology, culture, service and real-world work.
              </p>
            </div>
            <figure>
              <div className="overflow-hidden border border-border bg-card"><img src="/art/learning-studio.svg" alt="Editorial illustration of a learning studio and execution cycle" className="aspect-[4/3] w-full object-cover" /></div>
              <figcaption className="mt-3 text-[11px] leading-5 text-muted-foreground">The aim is not to produce a child who knows everything. It is to produce a young person who can learn, adapt, execute and show evidence of what they can do.</figcaption>
            </figure>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-foreground py-16 text-background md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow text-background/60">The capability model</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Knowledge → skill → execution → evidence.</h2>
              <p className="mt-5 text-sm leading-7 text-background/70">A child may understand a spreadsheet, a presentation or a coding tool and still be unable to use it when the brief is unclear, the deadline is real and somebody else is depending on the result. Execution is a separate capability and it can be trained.</p>
            </div>
            <div className="grid gap-px bg-background/20 sm:grid-cols-2">
              {executionFramework.map((item) => (
                <article key={item.step} className="bg-foreground p-6 md:p-7">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-bronze">{item.step}</p>
                  <h3 className="mt-3 font-display text-3xl">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-background/70">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 md:py-24">
        <Container>
          <div className="flex items-end justify-between gap-5">
            <div><p className="eyebrow text-bronze">Build your own curriculum</p><h2 className="mt-4 max-w-3xl font-display text-4xl md:text-5xl">Academic foundations plus the things life will actually ask of them.</h2></div>
          </div>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
            {curriculumDomains.map((domain) => (
              <article key={domain.title} className="bg-background p-6">
                <GraduationCap className="h-5 w-5 text-bronze" />
                <h3 className="mt-5 font-display text-2xl leading-tight">{domain.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{domain.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-card py-16 md:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <div className="flex items-center gap-3"><Hammer className="h-5 w-5 text-bronze" /><p className="eyebrow">Quests, not worksheets</p></div>
              <h2 className="mt-4 font-display text-4xl leading-tight">Every project ends with something real.</h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">A quest has a brief, a constraint, a deadline and an audience. It can use academic knowledge, but the learner must turn that knowledge into an outcome.</p>
            </div>
            <div className="space-y-4">
              {sampleQuests.map((quest) => (
                <article key={quest.title} className="border border-border bg-background p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3"><h3 className="font-display text-3xl">{quest.title}</h3><span className="text-xs uppercase tracking-[0.18em] text-bronze">{quest.ages}</span></div>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{quest.outcome}</p>
                  <div className="mt-4 flex flex-wrap gap-2">{quest.domains.map((domain) => <span key={domain} className="border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{domain}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 md:py-24">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <article className="border border-border p-6"><BriefcaseBusiness className="h-5 w-5 text-bronze" /><h3 className="mt-6 font-display text-3xl">Apprenticeships</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">Members and trusted partners can offer carefully designed shadowing, project briefs and placements so older learners see how serious work is actually done.</p></article>
            <article className="border border-border p-6"><Presentation className="h-5 w-5 text-bronze" /><h3 className="mt-6 font-display text-3xl">Evidence portfolio</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">Projects, presentations, businesses, volunteering, exhibitions and feedback create a portable record of capability beyond marks on a test.</p></article>
            <article className="border border-border p-6"><Sparkles className="h-5 w-5 text-bronze" /><h3 className="mt-6 font-display text-3xl">A lifelong network</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">The programme does not end at school. Rising-generation members can move into an alumni network of mentors, opportunities, peers and eventually a responsibility to give back.</p><Link to="/alumni" className="mt-5 inline-flex items-center gap-2 text-sm font-medium">Explore the continuum <ArrowRight className="h-3.5 w-3.5" /></Link></article>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 border border-border bg-card p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><p className="eyebrow text-bronze">Family membership</p><h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">Prepare them for responsibility before responsibility arrives.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">The learning layer is designed to complement a child’s existing education or support a family exploring hybrid and alternative routes. Local education rules and safeguarding requirements always apply.</p></div>
            <Button asChild size="lg" className="rounded-none px-8"><Link to="/apply">Request a seat</Link></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
