import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Compass, KeyRound, Plane, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { conciergeCategories } from "@/data/infrastructure";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/concierge")({
  head: () => ({ meta: [{ title: `Concierge — ${site.name}` }, { name: "description", content: "A private execution desk for the complicated jobs around travel, family, education, property, relocation and access." }] }),
  component: ConciergePage,
});

function ConciergePage() {
  return (
    <>
      <section className="relative min-h-[690px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="Private members receiving discreet high-level service" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/76 to-foreground/22" />
        <Container className="relative flex min-h-[690px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Concierge & Execution</p>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">Tell one person what you need done.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/72">Not which department you think it belongs to. Not which adviser you think might handle it. Tell us the outcome. We work out the path, the people and the next action.</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/55">Travel, schools, property, relocation, private access, household questions, health navigation or the awkward jobs that sit between three professionals and nobody’s job description.</p>
            <Button asChild size="lg" className="mt-9 rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
            <div><div className="flex items-center gap-3"><Compass className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">The service</p></div><h2 className="mt-5 font-display text-5xl leading-[1.02]">One request. One owner. No disappearing into an inbox.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">You can see where the request is, what it is waiting on and who owns the next action. If a trusted specialist is needed, the introduction happens with your consent and the brief travels with the context.</p></div>
            <div className="grid gap-px bg-foreground/15 md:grid-cols-2 lg:grid-cols-3">
              {conciergeCategories.map(([title, body]) => <article key={title} className="bg-background p-6"><CheckCircle2 className="h-5 w-5 text-oxblood" /><h3 className="mt-7 font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p></article>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="overflow-hidden border border-background/15"><img src={luxuryImages.jet} alt="Private global travel and arrival service" className="aspect-[16/11] w-full object-cover" /></div>
            <div>
              <div className="flex items-center gap-3"><Plane className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">The world around the member</p></div>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">The glamorous part should feel effortless. The invisible part is where the work is.</h2>
              <p className="mt-6 text-sm leading-7 text-background/68">The car is easy to see. The useful service is remembering the family’s timing, the children’s school dates, the preferred hotel, the passport expiry, the specialist you already trust, the property handover and what has to happen before you land.</p>
              <p className="mt-5 text-sm leading-7 text-background/55">That context is what turns a booking service into a private office.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <article className="border border-foreground/15 bg-card p-7"><KeyRound className="h-5 w-5 text-oxblood" /><h3 className="mt-8 font-display text-4xl">Access</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">Restaurants, cultural experiences, private venues, travel and reciprocal relationships where we have a genuine arrangement or can make a credible request. We never promise access we do not have.</p></article>
            <article className="border border-foreground/15 bg-card p-7"><ShieldCheck className="h-5 w-5 text-oxblood" /><h3 className="mt-8 font-display text-4xl">Trust</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">Members do not become a lead list. Sensitive context is shared only as needed and third-party introductions require consent.</p></article>
            <article className="border border-foreground/15 bg-card p-7"><Compass className="h-5 w-5 text-oxblood" /><h3 className="mt-8 font-display text-4xl">Follow-through</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">The request stays open until somebody can say what happened. “Sent an email” is not the same as “handled.”</p></article>
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">Private service</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">The aim is simple: return time and remove friction.</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-oxblood-foreground/68">When the family has to chase every detail itself, the service has not done its job.</p></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container>
      </section>
    </>
  );
}
