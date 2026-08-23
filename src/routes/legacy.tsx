import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Landmark, Network, ShieldCheck, UsersRound } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { pageImages } from "@/data/pageImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/legacy")({
  head: () => ({ meta: [{ title: `Legacy — ${site.name}` }, { name: "description", content: "Family continuity, stewardship, purpose and the relationships that help what has been built travel well across generations." }],
    links: [{ rel: "canonical", href: `${site.url}/legacy` }], }),
  component: LegacyPage,
});

const architecture = [
  ["Family", "Roles · communication · guardianship · next generation"],
  ["Ownership", "Companies · property · investments · voting rights"],
  ["Protection", "Wills · trusts · insurance · powers · contingency"],
  ["Purpose", "Philanthropy · values · family projects · legacy"],
  ["Advisers", "Legal · tax · accounting · fiduciary · investment · education"],
] as const;

function LegacyPage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={pageImages.legacyHero} alt="A family thinking together about the future" className="absolute inset-0 h-full w-full object-cover brightness-[1.08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/82 via-foreground/58 to-foreground/10" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl"><p className="eyebrow text-bronze">Pass it on</p><h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">Leave them more than what you built.</h1><p className="mt-7 max-w-2xl text-base leading-8 text-background/78">A family can pass on assets. The harder and more interesting work is passing on judgement, confidence, relationships, stories, values and a sense of what all of this is for.</p><Button asChild size="lg" className="mt-9 rounded-none bg-oxblood px-8"><Link to="/membership">Family membership <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.64fr_1.36fr]">
            <div><Landmark className="h-5 w-5 text-oxblood" /><p className="mt-7 eyebrow text-oxblood">Family architecture</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">A family is more than a balance sheet.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">People, ownership, protection, purpose and trusted advisers all shape what the next generation eventually inherits — whether anybody writes that system down or not.</p></div>
            <div className="space-y-3">{architecture.map(([title, body], index) => <div key={title} className="grid gap-3 border border-foreground/15 bg-background p-5 md:grid-cols-[60px_150px_1fr] md:items-center"><span className="font-display text-2xl text-oxblood">0{index + 1}</span><h3 className="font-display text-2xl">{title}</h3><p className="text-sm leading-7 text-muted-foreground">{body}</p></div>)}</div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"><div><p className="eyebrow text-bronze">Across generations</p><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Responsibility can be introduced long before it has to be inherited.</h2></div><p className="max-w-xl text-sm leading-7 text-background/64 lg:justify-self-end">Children can hear the family story, understand what exists, meet trusted people, learn how decisions are made and gradually take on meaningful responsibility without carrying adult burdens too early.</p></div>
          <div className="grid gap-px bg-background/15 md:grid-cols-2 lg:grid-cols-4">{[
            ["Know the story", "Understand how things were built, what the family values and which choices shaped the life they have inherited."],
            ["Meet the people", "Know the advisers, mentors, family friends and institutions that form part of the trusted circle around the family."],
            ["Practise judgement", "Take part in age-appropriate decisions, projects, giving and conversations before major authority arrives."],
            ["Find a purpose", "Legacy works better when the next generation is given space to shape what they want to carry forward rather than simply being handed instructions."],
          ].map(([title, body]) => <article key={title} className="bg-foreground p-6"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-background/64">{body}</p></article>)}</div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="border border-foreground/15 bg-card p-7"><Network className="h-5 w-5 text-oxblood" /><h2 className="mt-7 font-display text-4xl">Trusted continuity</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">The people around a family matter. Good advisers, mentors and peers can provide continuity when generations, countries and responsibilities change.</p></article>
            <article className="border border-foreground/15 bg-card p-7"><UsersRound className="h-5 w-5 text-oxblood" /><h2 className="mt-7 font-display text-4xl">Family conversation</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Some of the most important things to pass on are never written in a trust deed: how the family speaks to one another, makes decisions, handles disagreement and thinks about fairness.</p></article>
            <article className="border border-foreground/15 bg-card p-7"><ShieldCheck className="h-5 w-5 text-oxblood" /><h2 className="mt-7 font-display text-4xl">Quiet foundations</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Wills, trusts, insurance, governance and continuity planning sit underneath the family story so that intention has strong technical support when it matters.</p></article>
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28"><Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">The hope</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">Let the next generation inherit a world they understand — and enough freedom to make it their own.</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-oxblood-foreground/70">Professional legal, tax, fiduciary and investment work remains with appropriately qualified advisers.</p></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container></section>
    </>
  );
}
