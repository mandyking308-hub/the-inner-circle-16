import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, BriefcaseBusiness, Family, Handshake, ShieldCheck, Users } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export const Route = createFileRoute("/membership")({
  head: () => ({ meta: [{ title: `Membership — ${site.name}` }, { name: "description", content: "Who Project Table is for, the value of family membership and how trusted partners participate without buying member access." }] }),
  component: MembershipPage,
});

function MembershipPage() {
  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <p className="eyebrow text-bronze">Membership</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[1.02] md:text-7xl">Different people need different doors into the same ecosystem.</h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground">The peer room, the family infrastructure and the trusted-provider network are deliberately separated. A founder joins for peers and execution. A family may need a multigenerational layer. A specialist may contribute expertise — without buying proximity to confidential members.</p>
        </Container>
      </section>

      <section className="border-b border-border py-16 md:py-24">
        <Container>
          <div className="grid gap-px bg-border lg:grid-cols-3">
            <article className="bg-background p-7 md:p-8">
              <Users className="h-5 w-5 text-bronze" />
              <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-bronze">Individual membership</p>
              <h2 className="mt-3 font-display text-4xl">A serious peer room plus a useful operating layer.</h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">For founders, owners, family-enterprise principals, investors, senior operators and a small number of professionals whose judgement improves the community.</p>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">{["Permanent Table / peer circle", "Warm introductions", "Ask & Offer", "Gatherings and knowledge", "Trusted Partner directory", "Concierge requests", "Global Life planning tools"].map((item) => <p key={item} className="border-t border-border pt-3">{item}</p>)}</div>
            </article>

            <article className="bg-card p-7 md:p-8">
              <Family className="h-5 w-5 text-bronze" />
              <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-bronze">Family membership</p>
              <h2 className="mt-3 font-display text-4xl">Treat family, learning and legacy as part of the system.</h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">For families that want the adult member experience plus rising-generation education, family architecture and age-appropriate continuity into alumni and work.</p>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">{["Everything in individual membership", "Family Architecture workspace", "Family Learning Studio", "Next Gen protected programme", "16+/alumni pathway", "Mentors and opportunities", "Family-focused playbooks and clinics"].map((item) => <p key={item} className="border-t border-border pt-3">{item}</p>)}</div>
            </article>

            <article className="bg-background p-7 md:p-8">
              <BadgeCheck className="h-5 w-5 text-bronze" />
              <p className="mt-8 text-[10px] uppercase tracking-[0.2em] text-bronze">Trusted Partner programme</p>
              <h2 className="mt-3 font-display text-4xl">A commercial relationship without turning members into leads.</h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">For excellent specialists with relevant experience who want to contribute useful expertise, receive qualified consent-led briefs and build reputation through service.</p>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">{["Screened directory profile", "Consent-led member briefs", "Expert sessions and clinics", "Research / practical guide participation", "Partner-to-partner network", "Ability to offer real member benefits", "No member database or cold-access rights"].map((item) => <p key={item} className="border-t border-border pt-3">{item}</p>)}</div>
              <Link to="/partners" className="mt-6 inline-flex items-center gap-2 text-sm font-medium">How the partner model works <ArrowRight className="h-3.5 w-3.5" /></Link>
            </article>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-foreground py-16 text-background md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div><ShieldCheck className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-5xl leading-tight">Admission and commercial participation are not the same thing.</h2></div>
            <div className="grid gap-px bg-background/20 sm:grid-cols-2">
              {[
                [BriefcaseBusiness, "Member fit", "Character, contribution, commitment and relevance to the current peer mix. Wealth or title alone is not enough."],
                [Handshake, "Partner fit", "Proven expertise, references, collaboration, responsiveness, conflict disclosure and respect for the no-solicitation firewall."],
              ].map(([Icon, title, body]) => { const Component = Icon as typeof BriefcaseBusiness; return <article key={String(title)} className="bg-foreground p-6"><Component className="h-5 w-5 text-bronze" /><h3 className="mt-5 font-display text-3xl">{String(title)}</h3><p className="mt-4 text-sm leading-7 text-background/70">{String(body)}</p></article>; })}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-8 border border-border bg-card p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><p className="eyebrow text-bronze">Founding cohort</p><h2 className="mt-4 max-w-3xl font-display text-5xl leading-tight">Prove the service before optimising the price.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Public pricing remains deliberately off during the MVP. The first job is to prove which parts of the experience members and partners genuinely value, then price those layers without compromising trust.</p></div>
            <Button asChild size="lg" className="rounded-none px-8"><Link to="/apply">Request a seat</Link></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
