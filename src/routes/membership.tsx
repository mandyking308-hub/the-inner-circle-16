import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Handshake, ShieldCheck, Users } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";
import { memberQualification } from "@/data/qualification";
import { site } from "@/config/site";

export const Route = createFileRoute("/membership")({
  head: () => ({ meta: [{ title: `Membership — ${site.name}` }, { name: "description", content: "Private membership for founders, family enterprises and globally minded families — bringing together belonging, global life, family, trusted people and private service." }] }),
  component: MembershipPage,
});

function MembershipPage() {
  return (
    <>
      <section className="relative min-h-[690px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private London members table at sunset" className="absolute inset-0 h-full w-full object-cover brightness-[1.08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/82 via-foreground/56 to-foreground/10" />
        <Container className="relative flex min-h-[690px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Membership</p>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">A membership that grows with the life around it.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/78">The right people. Beautiful gatherings. A world that travels with you. More for the family. Trusted help when you need it. And, behind all of that, a private office for the moments when life becomes genuinely complicated.</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/64">Founding membership is intentionally personal. We get to know the person and the life before deciding what kind of membership relationship makes sense.</p>
            <Button asChild size="lg" className="mt-9 rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><p className="eyebrow text-oxblood">Around the member</p><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">One membership. Different parts of life.</h2></div><p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">Some members come first for the Table. Some for global life, family, trusted introductions or private service. The relationship can deepen as life changes.</p></div>
          <div className="grid gap-px bg-foreground/15 lg:grid-cols-3">
            <article className="bg-background p-7 md:p-8"><BriefcaseBusiness className="h-5 w-5 text-oxblood" /><p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">Individual</p><h3 className="mt-3 font-display text-4xl">For the person at the centre of the life.</h3><p className="mt-5 text-sm leading-7 text-muted-foreground">Founders, owners, investors and family principals who value a trusted circle, thoughtful introductions, private gatherings and support that follows the life beyond work.</p><div className="mt-6 space-y-3 text-sm text-muted-foreground">{["A permanent Table", "Private gatherings", "Warm introductions", "The World / Global Life", "Trusted people", "Private Office", "The deeper member workspace when needed"].map((item) => <p key={item} className="border-t border-foreground/12 pt-3">{item}</p>)}</div></article>
            <article className="bg-forest p-7 text-forest-foreground md:p-8"><Users className="h-5 w-5 text-bronze" /><p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-bronze">Family</p><h3 className="mt-3 font-display text-4xl">For the people who make success matter.</h3><p className="mt-5 text-sm leading-7 text-forest-foreground/70">Family membership opens the relationship into learning, mentors, next-generation experiences, family architecture and a pathway that can continue as children grow into adults.</p><div className="mt-6 space-y-3 text-sm text-forest-foreground/68">{["Everything around the individual member", "Family Learning Studio", "Next-generation experiences", "Mentors & opportunities", "The Continuum / alumni", "Family Architecture when useful", "Family-focused gatherings"].map((item) => <p key={item} className="border-t border-forest-foreground/15 pt-3">{item}</p>)}</div></article>
            <article className="bg-background p-7 md:p-8"><BadgeCheck className="h-5 w-5 text-oxblood" /><p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">Trusted Partner</p><h3 className="mt-3 font-display text-4xl">For the specialist members are glad to be introduced to.</h3><p className="mt-5 text-sm leading-7 text-muted-foreground">A separate professional relationship for excellent advisers and firms who want to contribute expertise, earn trust through useful work and receive consent-led introductions when there is a genuine fit.</p><div className="mt-6 space-y-3 text-sm text-muted-foreground">{["Screened profile", "Qualified member briefs", "Expert clinics", "Research & practical guidance", "Partner-to-partner relationships", "Genuine member benefits", "No cold-access rights"].map((item) => <p key={item} className="border-t border-foreground/12 pt-3">{item}</p>)}</div><Button asChild variant="outline" className="mt-7 rounded-none"><Link to="/partner-application">Apply as a Trusted Partner <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></article>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div><ShieldCheck className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-5xl leading-[1.02]">The room is curated quietly.</h2><p className="mt-5 text-sm leading-7 text-background/64">There is no public wealth scoreboard. We look at the life somebody is responsible for, the perspective they bring, how they treat people and whether the existing community becomes better with them in it.</p></div>
            <div className="divide-y divide-background/15 border-y border-background/15">
              {memberQualification.map((item, index) => <div key={item.key} className="grid gap-4 py-6 md:grid-cols-[60px_180px_1fr]"><span className="font-display text-3xl text-bronze">0{index + 1}</span><h3 className="font-display text-3xl">{item.label}</h3><p className="text-sm leading-7 text-background/62">{item.question}</p></div>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="border border-foreground/15 bg-card p-7 md:p-9"><Handshake className="h-5 w-5 text-oxblood" /><h2 className="mt-8 font-display text-4xl">Founding terms are discussed privately.</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">We establish fit first, then talk about the right membership relationship and service level. There is no automated checkout and no paid shortcut around curation.</p></article>
            <article className="border border-foreground/15 bg-card p-7 md:p-9"><ShieldCheck className="h-5 w-5 text-oxblood" /><h2 className="mt-8 font-display text-4xl">The first conversation should feel human.</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">We want to know what you enjoy, where life is going, what matters to the family and what kind of people or experiences would make membership genuinely valuable — not simply what title appears on a business card.</p></article>
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">Founding membership</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">A small private world, built carefully enough that people want to remain part of it.</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-oxblood-foreground/70">If it feels like your kind of room, request a seat.</p></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container>
      </section>
    </>
  );
}
