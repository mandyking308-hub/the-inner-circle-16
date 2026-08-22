import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Compass, KeyRound, Plane, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { conciergeCategories } from "@/data/infrastructure";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/concierge")({
  head: () => ({ meta: [{ title: `Private Office — ${site.name}` }, { name: "description", content: "Discreet personal support for travel, access, family, education, property, relocation, trusted introductions and the practical details around a well-lived life." }] }),
  component: ConciergePage,
});

function ConciergePage() {
  return (
    <>
      <section className="relative min-h-[690px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.command} alt="Discreet private service in London" className="absolute inset-0 h-full w-full object-cover brightness-[1.1]" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/82 via-foreground/58 to-foreground/12" />
        <Container className="relative flex min-h-[690px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Private Office</p>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">Life should feel beautifully handled.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/78">The reservation. The school visit. The family trip. The house in another city. The introduction you would rather receive through somebody trusted. The detail you simply do not want to spend another afternoon chasing.</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/64">One private service around the member, with enough context to make help feel personal rather than transactional.</p>
            <Button asChild size="lg" className="mt-9 rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.65fr_1.35fr]">
            <div><div className="flex items-center gap-3"><Compass className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">Personal service</p></div><h2 className="mt-5 font-display text-5xl leading-[1.02]">The point is not to make more requests. It is to spend less of your life managing them.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">Members can simply tell us what they are trying to make happen. We carry the context, find the right path and stay with the request until there is an answer.</p></div>
            <div className="grid gap-px bg-foreground/15 md:grid-cols-2 lg:grid-cols-3">
              {conciergeCategories.map(([title, body]) => <article key={title} className="bg-background p-6"><CheckCircle2 className="h-5 w-5 text-oxblood" /><h3 className="mt-7 font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p></article>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="overflow-hidden border border-background/15"><img src={luxuryImages.jet} alt="Private global travel and arrival service" className="aspect-[16/11] w-full object-cover brightness-[1.08]" /></div>
            <div>
              <div className="flex items-center gap-3"><Plane className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">Wherever you are</p></div>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">The visible luxury is only half the story.</h2>
              <p className="mt-6 text-sm leading-7 text-background/70">A beautiful arrival matters. So does remembering the child’s school date, the room somebody preferred last time, the doctor already trusted, the passport expiry, the property handover and the person waiting at the other end.</p>
              <p className="mt-5 text-sm leading-7 text-background/58">That memory is what turns concierge into a private office around the life.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <article className="border border-foreground/15 bg-card p-7"><KeyRound className="h-5 w-5 text-oxblood" /><h3 className="mt-8 font-display text-4xl">Access</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">Restaurants, cultural moments, private venues, travel, trusted places and the kind of introductions that make a city feel easier to enter.</p></article>
            <article className="border border-foreground/15 bg-card p-7"><ShieldCheck className="h-5 w-5 text-oxblood" /><h3 className="mt-8 font-display text-4xl">Discretion</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">The service remembers enough to be useful without turning members into a lead list. Sensitive context stays private and introductions happen with consent.</p></article>
            <article className="border border-foreground/15 bg-card p-7"><Compass className="h-5 w-5 text-oxblood" /><h3 className="mt-8 font-display text-4xl">Continuity</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">The same circle of context follows the member from one request, city and stage of family life to the next.</p></article>
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">Private service</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">More time for the life you wanted. Less time managing the life around it.</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-oxblood-foreground/68">That is the standard.</p></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container>
      </section>
    </>
  );
}
