import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Building2, CalendarClock, GraduationCap, Landmark, Plane, ShieldCheck, WalletCards } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { luxuryImages } from "@/data/luxuryImages";

export const Route = createFileRoute("/global-life")({
  head: () => ({ meta: [{ title: `The World — ${site.name}` }, { name: "description", content: "Private support for families whose lives span more than one city or country — from schools and homes to trusted people and the practical details around a move." }] }),
  component: GlobalLifePage,
});

function GlobalLifePage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.jet} alt="An international family arriving in London" className="absolute inset-0 h-full w-full object-cover brightness-[1.08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/82 via-foreground/56 to-foreground/10" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">The World</p>
            <h1 className="mt-6 max-w-[10ch] font-display text-6xl leading-[0.93] md:text-8xl">One life. More than one home.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/78">Some families belong to more than one city. Work may be in London, winter somewhere warmer, school in another place, and friends spread across the world. Membership should travel with that life.</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/64">We help a new place become familiar faster — with trusted people, local intelligence and a joined-up view of the practical details.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat</Link></Button><Button asChild size="lg" variant="outline" className="rounded-none border-background/40 bg-background/10 px-8 text-background hover:bg-background hover:text-foreground"><Link to="/concierge">Private service <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div><p className="eyebrow text-oxblood">What makes a place work</p><h2 className="mt-5 font-display text-5xl leading-[1.03]">A good move is not only about getting there. It is about wanting to stay.</h2></div>
            <div className="grid gap-px bg-foreground/15 sm:grid-cols-2 lg:grid-cols-3">
              {[
                [Landmark, "Belonging", "Can the family build a life there that feels natural, interesting and sustainable?"],
                [GraduationCap, "Children", "Will the school, curriculum, friendships and day-to-day rhythm help them thrive?"],
                [Building2, "Home", "Where will you live, host, work, relax and actually spend the ordinary parts of the week?"],
                [WalletCards, "Practical life", "Banking, insurance, payments, healthcare and the details that make a place function smoothly."],
                [ShieldCheck, "Trusted people", "Who do you call locally when the question matters and a search result is not enough?"],
                [CalendarClock, "Rhythm", "School years, travel patterns, seasons, family visits and the practical timing around a move."],
              ].map(([Icon, title, body]) => { const Component = Icon as typeof Landmark; return <article key={String(title)} className="bg-linen p-6"><Component className="h-5 w-5 text-oxblood" /><h3 className="mt-7 font-display text-3xl">{String(title)}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{String(body)}</p></article>; })}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="overflow-hidden border border-background/15"><img src={luxuryImages.command} alt="A private cross-border family meeting" className="aspect-[16/11] w-full object-cover brightness-[1.1]" /></div>
            <div>
              <p className="eyebrow text-bronze">When the details matter</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">The calm feeling on the outside needs good coordination underneath.</h2>
              <p className="mt-6 text-base leading-8 text-background/72">Residence, tax, schools, property, banking and family timing can still matter enormously. The difference is that members should not have to carry every moving part in their own head.</p>
              <p className="mt-5 text-sm leading-7 text-background/60">When the move becomes serious, the private office can organise the questions, bring in the right qualified specialists and keep the family’s wider life visible while those decisions are made.</p>
              <Link to="/decision-room" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">See what sits behind the move <ArrowRight className="h-4 w-4 text-bronze" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <p className="eyebrow text-oxblood">From arrival to belonging</p>
          <div className="mt-10 divide-y divide-foreground/15 border-y border-foreground/15">
            {[
              ["Arrive", "The practical pieces are ready: the right people, the right place and fewer surprises waiting after landing."],
              ["Settle", "Schools, homes, routines, healthcare, local introductions and the small things that make a city start to work for the family."],
              ["Belong", "The city becomes more than logistics: friends, culture, places you return to and a network that feels genuinely yours."],
            ].map(([title, body], index) => <div key={title} className="grid gap-4 py-7 md:grid-cols-[70px_180px_1fr] md:items-start"><span className="font-display text-3xl text-oxblood">0{index + 1}</span><h3 className="font-display text-3xl">{title}</h3><p className="max-w-3xl text-sm leading-7 text-muted-foreground">{body}</p></div>)}
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><div className="flex items-center gap-3"><Plane className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">A life in motion</p></div><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">Wherever life takes the family, the circle around it should still feel familiar.</h2></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
        </Container>
      </section>
    </>
  );
}
