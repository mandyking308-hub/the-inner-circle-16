import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, HandHeart, Scale, ShieldCheck, UsersRound } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/impact")({
  head: () => ({ meta: [{ title: `Impact — ${site.name}` }, { name: "description", content: "A practical philanthropy and contribution strand where members can offer expertise, relationships, time and funding without turning charitable work into performance." }] }),
  component: ImpactPublicPage,
});

function ImpactPublicPage() {
  return (
    <>
      <section className="relative min-h-[700px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private group discussing purpose and contribution" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/78 to-foreground/18" />
        <Container className="relative flex min-h-[700px] items-center py-20">
          <div className="max-w-3xl"><p className="eyebrow text-bronze">Impact & philanthropy</p><h1 className="mt-6 max-w-[10ch] font-display text-6xl leading-[0.93] md:text-8xl">Put capability to work where it can actually help.</h1><p className="mt-7 max-w-2xl text-base leading-8 text-background/72">Money matters. So do operating experience, introductions, governance, recruitment, technology, professional expertise and the willingness to stay with a problem after the photograph has been taken.</p><Button asChild size="lg" className="mt-9 rounded-none bg-oxblood px-8"><Link to="/membership">Explore membership <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div><HandHeart className="h-5 w-5 text-oxblood" /><p className="mt-7 eyebrow text-oxblood">The contribution model</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">Start with the organisation's problem, not the member's desire to help.</h2></div>
            <div className="grid gap-px bg-foreground/15 sm:grid-cols-2">{[
              ["Listen first", "Understand what the organisation is trying to achieve, what is already working and what kind of help would genuinely reduce a constraint."],
              ["Match the contribution", "A founder may be more useful fixing an operating problem than writing another cheque. A lawyer, recruiter or technologist may unlock something different."],
              ["Protect dignity", "Beneficiaries are not content and charitable work is not a luxury backdrop. Privacy, consent and context matter."],
              ["Close the loop", "Record what was offered, who owned the follow-through and what changed. Contribution should create evidence, not just attendance."],
            ].map(([title, body]) => <article key={title} className="bg-background p-6"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p></article>)}</div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"><div><p className="eyebrow text-bronze">Ways to contribute</p><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Capital is one tool in a much larger kit.</h2></div><p className="max-w-xl text-sm leading-7 text-background/62 lg:justify-self-end">The programme is built around opt-in opportunities. Members choose where they can be useful; projects do not become an excuse for constant fundraising inside the community.</p></div>
          <div className="grid gap-px bg-background/15 md:grid-cols-2 lg:grid-cols-4">{[
            ["Expertise", "Short, defined help with operations, governance, technology, finance, hiring, legal issues or communications."],
            ["Relationships", "A thoughtful introduction to a funder, employer, specialist, institution or partner when the connection has a credible reason."],
            ["Time", "Mentoring, review panels, project clinics and practical problem-solving with teams who can use the experience."],
            ["Funding", "Direct or collaborative giving where the organisation, purpose, governance and reporting are sufficiently clear."],
          ].map(([title, body]) => <article key={title} className="bg-foreground p-6"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-background/62">{body}</p></article>)}</div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="border border-foreground/15 bg-card p-7"><UsersRound className="h-5 w-5 text-oxblood" /><h2 className="mt-7 font-display text-4xl">Across generations</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Contribution gives families somewhere to practise shared judgement. Younger members can research, listen, evaluate trade-offs and see what stewardship looks like outside the family balance sheet.</p></article>
            <article className="border border-foreground/15 bg-card p-7"><Scale className="h-5 w-5 text-oxblood" /><h2 className="mt-7 font-display text-4xl">Clear boundaries</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">The community does not present charitable projects as investments, does not promise outcomes and does not pressure members to fund a cause because they attended an event.</p></article>
            <article className="border border-foreground/15 bg-card p-7"><ShieldCheck className="h-5 w-5 text-oxblood" /><h2 className="mt-7 font-display text-4xl">Proof over performance</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">A useful impact record should say what problem was addressed, what help was provided, what the organisation reports changed and what remains unresolved.</p></article>
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28"><Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">The standard</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">Do something useful. Protect people's dignity. Measure what changed.</h2></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container></section>
    </>
  );
}
