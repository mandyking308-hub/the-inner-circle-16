import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BriefcaseBusiness, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/next-gen")({
  head: () => ({ meta: [{ title: `Next Generation — ${site.name}` }, { name: "description", content: "A protected rising-generation programme for stewardship, execution, enterprise, technology, philanthropy and real-world capability." }] }),
  component: NextGenPublicPage,
});

function NextGenPublicPage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.learning} alt="A parent and young person learning together in an elegant private study" className="absolute inset-0 h-full w-full object-cover object-center md:object-[22%_center] xl:object-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/72 to-foreground/16" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl"><p className="eyebrow text-bronze">The next generation</p><h1 className="mt-6 max-w-[10ch] font-display text-6xl leading-[0.93] md:text-8xl">Prepare capability before responsibility arrives.</h1><p className="mt-7 max-w-2xl text-base leading-8 text-background/72">A child should not discover the family business, ownership, money, advisers and responsibility for the first time when the paperwork says it is theirs. Exposure can begin earlier — carefully, gradually and without turning childhood into a board meeting.</p><Button asChild size="lg" className="mt-9 rounded-none bg-oxblood px-8"><Link to="/family-learning">Explore Family Learning <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div><GraduationCap className="h-5 w-5 text-oxblood" /><p className="mt-7 eyebrow text-oxblood">The learning model</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">Knowledge → application → delivery → review.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">The goal is not a child who can recite the language of business. It is a young person who can meet an unfamiliar problem, learn what is needed, make a plan, work with people and finish something useful.</p></div>
            <div className="grid gap-px bg-foreground/15 sm:grid-cols-2">{[
              ["Know", "Build enough academic and practical understanding to recognise the problem and the available tools."],
              ["Apply", "Use the knowledge in context where the learner has to choose what matters rather than follow a worksheet."],
              ["Deliver", "Finish for a real audience, customer, deadline, budget or standard. Somebody else should care whether the work is good."],
              ["Review", "Collect feedback, document what failed, show evidence and decide what to improve next time."],
            ].map(([title, body]) => <article key={title} className="bg-background p-6"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p></article>)}</div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"><div><Sparkles className="h-5 w-5 text-bronze" /><p className="mt-7 eyebrow text-bronze">What they should learn</p><h2 className="mt-4 font-display text-5xl leading-[1.02] md:text-6xl">Strong academics plus the capabilities life will actually ask of them.</h2></div><p className="max-w-xl text-sm leading-7 text-background/62 lg:justify-self-end">Families can use the programme alongside school or as part of a lawful alternative route. Local education rules, safeguarding and qualification requirements still apply.</p></div>
          <div className="grid gap-px bg-background/15 md:grid-cols-2 lg:grid-cols-4">{[
            ["Communication", "Writing, speaking, listening, negotiation and the confidence to ask useful questions."],
            ["Money & enterprise", "Customers, cost, pricing, accounts, ownership, investing, risk and how organisations actually work."],
            ["AI & technology", "Research, automation, building, verification, privacy, cyber judgement and when not to delegate responsibility."],
            ["Practical independence", "Travel, documents, appointments, correspondence, household systems, deadlines and unfamiliar problems."],
            ["World & citizenship", "History, institutions, geopolitics, cultures, law, ethics and understanding how countries function."],
            ["Execution", "Planning, resilience, reliability, teamwork, judgement and the discipline of finishing what was started."],
            ["Stewardship", "Ownership, governance, responsibility, philanthropy and understanding that resources create obligations as well as options."],
            ["Self-knowledge", "Strengths, limits, interests, work habits, relationships and the ability to ask for help before a problem becomes a crisis."],
          ].map(([title, body]) => <article key={title} className="bg-foreground p-6"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-background/62">{body}</p></article>)}</div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"><div className="overflow-hidden border border-foreground/15"><img src={luxuryImages.learning} alt="A young person building capability in an elegant learning environment" className="aspect-[4/3] w-full object-cover" /></div><div><BriefcaseBusiness className="h-5 w-5 text-oxblood" /><p className="mt-7 eyebrow text-oxblood">The Continuum</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">Education should connect to real rooms and real work.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">As young people become ready, learning can lead into mentor office hours, founder shadowing, project briefs, apprenticeships, internships and an alumni network. The final stage is not access. It is responsibility: returning later to create opportunities for the cohort behind them.</p><Link to="/alumni" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Explore the Continuum <ArrowRight className="h-4 w-4" /></Link></div></div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28"><Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><ShieldCheck className="h-5 w-5 text-bronze" /><p className="mt-7 eyebrow text-bronze">Protected by design</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">Opportunity needs safeguarding, permission and age-appropriate boundaries.</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-oxblood-foreground/68">Under-18 participants do not enter adult confidential rooms by default. Guardian permissions, vetted adults, clear communication channels and reporting routes belong in the operating model.</p></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Family membership <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container></section>
    </>
  );
}
