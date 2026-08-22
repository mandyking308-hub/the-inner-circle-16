import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock3, LockKeyhole, UsersRound } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/gatherings")({
  head: () => ({ meta: [{ title: `Gatherings — ${site.name}` }, { name: "description", content: "Private dinners, cultural evenings, family weekends, salons, breakfasts and retreats designed to create belonging, memory and useful relationships." }] }),
  component: GatheringsPage,
});

const formats = [
  ["Private dinner", "8–14", "A beautiful table, a thoughtful guest list and enough time for the evening to become more than introductions."],
  ["Breakfast in the city", "8–12", "A smaller morning room for people who would rather begin the day with a good conversation than another conference."],
  ["Salon", "12–24", "Culture, ideas, people and a subject worth staying for — intimate enough that the room can still speak back."],
  ["Family programme", "Small cohort", "Learning, culture, stewardship, enterprise and shared experiences for families and the rising generation."],
  ["Retreat", "Curated", "A few days away from the usual rhythm: beautiful surroundings, deeper conversation and space for relationships to grow."],
  ["Impact visit", "Curated", "Meet people doing meaningful work, understand an issue properly and contribute in ways that go beyond a cheque."],
] as const;

export default function GatheringsPage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private members gathering in a beautiful London room" className="absolute inset-0 h-full w-full object-cover brightness-[1.08]" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/54 to-foreground/10" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Gatherings</p>
            <h1 className="mt-6 max-w-[10ch] font-display text-6xl leading-[0.93] md:text-8xl">The rooms you remember.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/78">A dinner in Mayfair. A private conversation in Geneva. A family weekend. A cultural evening. A breakfast that introduces you to somebody who becomes part of the next chapter.</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/64">The programme is deliberately smaller than a mass events calendar. The point is not to be busy. It is to be glad you came.</p>
            <Button asChild size="lg" className="mt-9 rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><p className="eyebrow text-oxblood">The programme</p><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Different rooms for different moments in life.</h2></div><p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">Some evenings are about ideas. Some are about people. Some are about family, culture, place or simply enjoying the life around the work.</p></div>
          <div className="grid gap-px bg-foreground/15 md:grid-cols-2 lg:grid-cols-3">
            {formats.map(([title, size, body]) => <article key={title} className="bg-background p-6 md:p-7"><div className="flex items-center justify-between"><CalendarDays className="h-5 w-5 text-oxblood" /><span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{size}</span></div><h3 className="mt-7 font-display text-4xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p></article>)}
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div><UsersRound className="h-5 w-5 text-bronze" /><p className="mt-7 eyebrow text-background/50">What makes the room special</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">The guest list is part of the atmosphere.</h2></div>
            <div className="divide-y divide-background/15 border-y border-background/15">{[
              ["A reason to be together", "The invitation should feel personal enough that everybody understands why this particular room exists."],
              ["Enough difference", "The best evenings are not twelve versions of the same person. Age, discipline, background and perspective should make the room more interesting."],
              ["Ease", "No forced networking, name-badge theatre or pressure to perform. Conversation should be allowed to become natural."],
              ["Something that lasts", "A friendship, an introduction, a new idea, a place discovered or simply an evening members genuinely want to repeat."],
            ].map(([title, body], index) => <div key={title} className="grid gap-4 py-6 md:grid-cols-[54px_180px_1fr]"><span className="font-display text-2xl text-bronze">0{index + 1}</span><h3 className="font-display text-3xl">{title}</h3><p className="text-sm leading-7 text-background/64">{body}</p></div>)}</div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden border border-foreground/15"><img src={luxuryImages.table} alt="Private members around a table at sunset" className="h-full min-h-[480px] w-full object-cover brightness-[1.08]" /></div>
            <div className="border border-foreground/15 bg-card p-7 md:p-9"><LockKeyhole className="h-5 w-5 text-oxblood" /><p className="mt-7 eyebrow text-oxblood">Private by design</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">Not every beautiful moment needs to become content.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">Member names, private conversations and intimate family moments are not marketing material. Where photography is appropriate, consent is explicit. Where it is not, the phones stay away and the memory belongs to the people who were there.</p><div className="mt-7 flex items-center gap-3 text-xs text-muted-foreground"><Clock3 className="h-4 w-4 text-bronze" /><span>Fewer events. Better moments. Stronger relationships.</span></div></div>
          </div>
        </Container>
      </section>
    </>
  );
}
