import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, ShieldCheck, UsersRound } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/the-table")({
  head: () => ({ meta: [{ title: `The Table — ${site.name}` }, { name: "description", content: "A permanent private circle for people who value trust, thoughtful conversation and relationships that deepen over time." }] }),
  component: TheTablePage,
});

function TheTablePage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private members table overlooking London" className="absolute inset-0 h-full w-full object-cover brightness-[1.08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/82 via-foreground/58 to-foreground/12" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Belong</p>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">Some conversations only make sense among people who have lived them.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/78">The Table is a small permanent circle: familiar enough for honesty, varied enough to surprise you, and private enough that the conversation can go beyond the version of life people normally present in public.</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/64">Eight to twelve people. The same circle. Beautiful rooms. No cold pitching.</p>
            <Button asChild size="lg" className="mt-9 rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
            <div><p className="eyebrow text-oxblood">A circle that lasts</p><h2 className="mt-5 font-display text-5xl leading-[1.02]">The value is not only who is there. It is what grows between you.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">The first dinner can be interesting. The tenth can be important. People remember the child choosing a school, the business you nearly sold, the move you were considering, the thing that worried you last year and what happened next.</p></div>
            <div className="grid gap-px bg-foreground/15 sm:grid-cols-2">
              {[
                ["Familiar faces", "A stable circle creates memory, warmth and the confidence to skip the polished version of the story."],
                ["Good conversation", "Business, family, culture, travel, education, purpose and the things that do not fit neatly into one category."],
                ["A private room", "No recording, no member-list harvesting and no sponsor appearing because they paid to be near the table."],
                ["Life beyond dinner", "Introductions, gatherings, friendships and useful help can continue naturally outside the room."],
              ].map(([title, body]) => <article key={title} className="bg-background p-7"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p></article>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <article className="border border-background/15 p-7"><UsersRound className="h-5 w-5 text-bronze" /><h2 className="mt-8 font-display text-4xl">The mix</h2><p className="mt-4 text-sm leading-7 text-background/68">Founders, owners, investors, family principals, operators and a small number of people whose perspective makes the room more interesting and more useful.</p></article>
            <article className="border border-background/15 p-7"><LockKeyhole className="h-5 w-5 text-bronze" /><h2 className="mt-8 font-display text-4xl">The privacy</h2><p className="mt-4 text-sm leading-7 text-background/68">The room is there for the people in it. What is shared privately stays private, and participation never depends on performing success for an audience.</p></article>
            <article className="border border-background/15 p-7"><ShieldCheck className="h-5 w-5 text-bronze" /><h2 className="mt-8 font-display text-4xl">The feeling</h2><p className="mt-4 text-sm leading-7 text-background/68">Warm, intelligent, curious and useful. The kind of room where somebody can ask a serious question and still enjoy the evening.</p></article>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="eyebrow text-oxblood">What comes up around the table</p><h2 className="mt-5 font-display text-5xl leading-[1.02]">The whole life is welcome.</h2></div><div className="space-y-5 font-display text-3xl leading-tight text-foreground md:text-4xl"><p>“We are spending more time abroad. Where actually feels like home for your family?”</p><p>“What changed when your children became old enough to understand what the family had built?”</p><p>“Who do you trust when you need a good answer quickly?”</p><p>“What are you doing with your time now that the business no longer needs every hour?”</p></div></div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">One seat</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">The right circle should feel more like a place you belong than a network you joined.</h2></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container>
      </section>
    </>
  );
}
