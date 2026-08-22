import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, CalendarClock, GraduationCap, Landmark, Plane, ShieldCheck, WalletCards } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { luxuryImages } from "@/data/luxuryImages";

export const Route = createFileRoute("/global-life")({
  head: () => ({ meta: [{ title: `Global Life — ${site.name}` }, { name: "description", content: "A private coordination layer for residence, advisers, education, property, banking and family life across borders." }] }),
  component: GlobalLifePage,
});

function GlobalLifePage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.jet} alt="An international family arriving by private aircraft" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/72 to-foreground/16" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Global Life</p>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">A move is never just a visa.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/72">You should not have to become an amateur tax lawyer, immigration coordinator, school-admissions expert and family-office operator just because your family can live in more than one country.</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/55">We keep the whole move visible, then the right qualified people advise on the pieces that belong to them.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat</Link></Button><Button asChild size="lg" variant="outline" className="rounded-none border-background/35 bg-foreground/10 px-8 text-background hover:bg-background hover:text-foreground"><Link to="/decision-room">Open the idea <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="eyebrow text-oxblood">Before anyone is instructed</p><h2 className="mt-5 font-display text-5xl leading-[1.03]">First decide what a good life actually means to this family.</h2></div>
            <div className="grid gap-px bg-foreground/15 sm:grid-cols-2 lg:grid-cols-3">
              {[
                [Landmark, "Residence & tax", "Can we live there legally, sustainably and without creating a problem somewhere else?"],
                [GraduationCap, "Children", "Will the school, curriculum, language, friendships and journey work in real life?"],
                [Building2, "Homes & work", "Where will we live, work, host, travel from and actually spend our weeks?"],
                [WalletCards, "Money", "Banking, FX, insurance, payment rails and what needs to be opened before something else can happen."],
                [ShieldCheck, "Structures", "Companies, trusts, property, wills, protection and anything a change of residence may touch."],
                [CalendarClock, "Timing", "School years, tax years, residence days, renewals, property dates and the point at which a plan becomes expensive to reverse."],
              ].map(([Icon, title, body]) => { const Component = Icon as typeof Landmark; return <article key={String(title)} className="bg-linen p-6"><Component className="h-5 w-5 text-oxblood" /><h3 className="mt-7 font-display text-3xl">{String(title)}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{String(body)}</p></article>; })}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="overflow-hidden border border-background/15"><img src={luxuryImages.command} alt="A private cross-border family planning meeting" className="aspect-[16/11] w-full object-cover" /></div>
            <div>
              <p className="eyebrow text-bronze">One case room</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">One question list across every adviser.</h2>
              <p className="mt-6 text-base leading-8 text-background/70">Immigration counsel can be right. Tax counsel can also be right. The problem is when their answers were based on different assumptions and the family discovers the conflict after paying to implement both.</p>
              <p className="mt-5 text-sm leading-7 text-background/58">The case room keeps the assumptions, questions, advice, dependencies and unresolved decisions together so the family can reconcile the picture before moving money, people or structures.</p>
              <Link to="/decision-room" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">See the Decision Room <ArrowRight className="h-4 w-4 text-bronze" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <p className="eyebrow text-oxblood">How it feels when it works</p>
          <div className="mt-10 divide-y divide-foreground/15 border-y border-foreground/15">
            {[
              ["Before", "Five email threads, three advisers, a school deadline, a property search and somebody asking whether the family can travel next month."],
              ["During", "One room showing the family brief, shortlist, questions, professional advice, open decisions, documents and next actions."],
              ["After", "A clear move sequence, named owners, calendar dates, a record of what was decided and a 30/90/180-day review instead of a disappearing project."],
            ].map(([title, body], index) => <div key={title} className="grid gap-4 py-7 md:grid-cols-[70px_180px_1fr] md:items-start"><span className="font-display text-3xl text-oxblood">0{index + 1}</span><h3 className="font-display text-3xl">{title}</h3><p className="max-w-3xl text-sm leading-7 text-muted-foreground">{body}</p></div>)}
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><div className="flex items-center gap-3"><Plane className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">Built for optionality</p></div><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">The freedom to live globally is valuable. The administration around it should not own your life.</h2></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
        </Container>
      </section>
    </>
  );
}
