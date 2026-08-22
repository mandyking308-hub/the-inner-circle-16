import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, Quote, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: `Why this exists — ${site.name}` }, { name: "description", content: "The founder story behind Project Table: creating one private world around an international family life — people, places, family, trusted help and the serious infrastructure underneath." }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private London table at sunset" className="absolute inset-0 h-full w-full object-cover brightness-[1.08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/82 via-foreground/58 to-foreground/12" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-4xl">
            <p className="eyebrow text-bronze">From the founder</p>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">I wanted one world around the life we were building.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/78">Not another club. Not another adviser. Not another app. A trusted circle around the family — people, places, experiences and help that could stay connected as life grew.</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.64fr_1.36fr]">
            <div><Quote className="h-7 w-7 text-oxblood" /><p className="mt-7 font-display text-4xl leading-[1.15] md:text-5xl">The more life opened up, the more I wanted the support around it to feel human and joined up.</p></div>
            <div className="space-y-7 text-base leading-8 text-muted-foreground">
              <p>A business can create extraordinary freedom. It can also change the geography of a family, the schools you consider, the people you meet, the places you spend time and the questions you start asking about what comes next.</p>
              <p>Along the way I kept finding brilliant people — advisers, founders, parents, professionals, friends — but they lived in separate worlds. The best lawyer did not know the school question. The person who had moved country knew things no checklist mentioned. A wonderful introduction often mattered as much as another piece of information.</p>
              <p>Project Table grew from a simple thought: what if the relationships, family life, global life, private service and serious decision support could sit around the same member rather than being rebuilt from scratch every time?</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><p className="eyebrow text-bronze">What became clear</p><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">A well-lived life needs more than excellent professionals.</h2></div><p className="max-w-xl text-sm leading-7 text-background/64 lg:justify-self-end">It needs trusted people, places you enjoy returning to, experiences that widen the family’s world, and somebody who remembers enough context to make help feel personal.</p></div>
          <div className="grid gap-px bg-background/15 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Belonging", "A familiar circle where ambition, family and the whole life can be part of the same conversation."],
              ["The world", "Support that travels with a family across cities, homes, schools, relationships and stages of life."],
              ["Private service", "Practical help that returns time and carries context instead of treating every request as the first."],
              ["The next generation", "A wider world of mentors, culture, capability, opportunity and responsibility that grows with them."],
            ].map(([title, body]) => <article key={title} className="bg-foreground p-6"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-background/64">{body}</p></article>)}
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="overflow-hidden border border-foreground/15"><img src={luxuryImages.command} alt="A private family office room overlooking London" className="aspect-[4/3] w-full object-cover brightness-[1.1]" /></div>
            <div><Compass className="h-5 w-5 text-oxblood" /><p className="mt-7 eyebrow text-oxblood">And underneath it</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">The beautiful life still deserves serious foundations.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">When members need more depth, there is a private office underneath the lifestyle: Decision Rooms, Family Architecture, Global Life coordination, Trusted Partners and Concierge case management.</p><p className="mt-5 text-sm leading-7 text-muted-foreground">That is not the reason to desire the membership. It is the reason the membership can remain useful when the question becomes important.</p></div>
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><ShieldCheck className="h-5 w-5 text-bronze" /><p className="mt-7 eyebrow text-bronze">The ambition</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">Create a private world people are happy to belong to — and relieved to have when they need it.</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-oxblood-foreground/70">Warm enough to feel personal. Serious enough to trust.</p></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container>
      </section>
    </>
  );
}
