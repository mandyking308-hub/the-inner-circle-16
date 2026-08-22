import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Handshake, ShieldCheck, Users } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/membership")({
  head: () => ({ meta: [{ title: `Membership — ${site.name}` }, { name: "description", content: "Private membership for founders, family enterprises and globally mobile families who value judgement, execution and multigenerational capability." }] }),
  component: MembershipPage,
});

function MembershipPage() {
  return (
    <>
      <section className="relative min-h-[690px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private London members table at sunset" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/76 to-foreground/18" />
        <Container className="relative flex min-h-[690px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Membership</p>
            <h1 className="mt-6 max-w-[10ch] font-display text-6xl leading-[0.93] md:text-8xl">The room only works if the people are right.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/72">We are not trying to fill a club. We are building a small private institution where members recognise the value of one another, trust the service around them and use the platform when life becomes complicated.</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/55">Money can get somebody through many doors. It is not enough to make them useful around this table.</p>
            <Button asChild size="lg" className="mt-9 rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><p className="eyebrow text-oxblood">Three doors</p><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Different relationships. Clear boundaries.</h2></div><p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">The member room, the family layer and the professional network are deliberately not the same thing. That separation is what lets trust survive commercial activity.</p></div>
          <div className="grid gap-px bg-foreground/15 lg:grid-cols-3">
            <article className="bg-background p-7 md:p-8"><BriefcaseBusiness className="h-5 w-5 text-oxblood" /><p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">Individual</p><h3 className="mt-3 font-display text-4xl">For the person carrying the decisions.</h3><p className="mt-5 text-sm leading-7 text-muted-foreground">Founders, owners, investors, family-enterprise principals and senior operators who want a serious peer room plus an operating layer around the life behind the business.</p><div className="mt-6 space-y-3 text-sm text-muted-foreground">{["Permanent Table", "Decision Rooms", "Warm introductions", "Trusted Partners", "Concierge", "Global Life tools", "Private gatherings & knowledge"].map((item) => <p key={item} className="border-t border-foreground/12 pt-3">{item}</p>)}</div></article>
            <article className="bg-forest p-7 text-forest-foreground md:p-8"><Users className="h-5 w-5 text-bronze" /><p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-bronze">Family</p><h3 className="mt-3 font-display text-4xl">For the system around the person.</h3><p className="mt-5 text-sm leading-7 text-forest-foreground/68">For families who want the adult member experience plus family architecture, next-generation learning, mentors and a pathway that continues beyond school.</p><div className="mt-6 space-y-3 text-sm text-forest-foreground/68">{["Everything in Individual", "Family Architecture", "Family Learning Studio", "Next Gen protected area", "The Continuum / alumni", "Mentors & opportunities", "Family playbooks"].map((item) => <p key={item} className="border-t border-forest-foreground/15 pt-3">{item}</p>)}</div></article>
            <article className="bg-background p-7 md:p-8"><BadgeCheck className="h-5 w-5 text-oxblood" /><p className="mt-8 text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">Trusted Partner</p><h3 className="mt-3 font-display text-4xl">For the specialist who deserves to be recommended.</h3><p className="mt-5 text-sm leading-7 text-muted-foreground">Excellent firms can contribute expertise, receive consent-led briefs and build reputation through useful work. They do not buy access to member identities.</p><div className="mt-6 space-y-3 text-sm text-muted-foreground">{["Screened profile", "Qualified briefs", "Expert clinics", "Research & guides", "Partner referrals", "Member benefits", "No cold-access rights"].map((item) => <p key={item} className="border-t border-foreground/12 pt-3">{item}</p>)}</div></article>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr]">
            <div><ShieldCheck className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-5xl leading-[1.02]">What we are looking for.</h2></div>
            <div className="divide-y divide-background/15 border-y border-background/15">
              {[
                ["Character", "Can people speak plainly around you without wondering what will be repeated or used later?"],
                ["Contribution", "Do you bring judgement, experience, curiosity, introductions or a willingness to help?"],
                ["Relevance", "Are you genuinely dealing with the kinds of decisions this community is built around?"],
                ["Participation", "Will you show up enough for a permanent Table to become more valuable over time?"],
                ["Fit", "Does adding you make the current room better rather than merely bigger?"],
              ].map(([title, body], index) => <div key={title} className="grid gap-4 py-6 md:grid-cols-[60px_180px_1fr]"><span className="font-display text-3xl text-bronze">0{index + 1}</span><h3 className="font-display text-3xl">{title}</h3><p className="text-sm leading-7 text-background/62">{body}</p></div>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="border border-foreground/15 bg-card p-7 md:p-9"><Handshake className="h-5 w-5 text-oxblood" /><h2 className="mt-8 font-display text-4xl">Why no public price yet?</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Because the founding job is to prove what people value enough to rely on: the Table, Decision Rooms, Concierge, Global Life, family learning, introductions and partner access. Price should follow a real service, not compensate for one that is still finding itself.</p></article>
            <article className="border border-foreground/15 bg-card p-7 md:p-9"><ShieldCheck className="h-5 w-5 text-oxblood" /><h2 className="mt-8 font-display text-4xl">What happens after you apply?</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">A human reviews the application. If there appears to be a fit, we talk. We are interested in what you are building, what is complicated now and what kind of room would actually be useful to you — not just your title.</p></article>
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">Founding cohort</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">Small first. Useful first. Trust first.</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-oxblood-foreground/68">If that sounds like the kind of room you would value — and improve — request a seat.</p></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container>
      </section>
    </>
  );
}
