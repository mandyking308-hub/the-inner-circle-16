import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock3, LockKeyhole, UsersRound } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/gatherings")({
  head: () => ({ meta: [{ title: `Gatherings — ${site.name}` }, { name: "description", content: "Private dinners, working breakfasts, salons, masterclasses, retreats and family programmes designed around useful conversation rather than event volume." }] }),
  component: GatheringsPage,
});

const formats = [
  ["Private dinner", "8–14", "One serious question, beautiful room, enough time for the conversation to become real."],
  ["Working breakfast", "8–12", "A tighter morning format for one practical decision: governance, hiring, technology, relocation or growth."],
  ["Salon", "12–24", "A member or invited expert opens a subject, then the room does the work. No sponsor speech and no conference theatre."],
  ["Family programme", "Small cohort", "Age-appropriate learning, stewardship, enterprise, technology and philanthropy for families and the rising generation."],
  ["Retreat", "Curated", "Time away from the ordinary calendar for deeper family-enterprise work and relationships that need more than two hours."],
  ["Impact visit", "Curated", "A chance to understand a problem closely, meet practitioners and contribute expertise without turning people into content."],
] as const;

export default function GatheringsPage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private members gathering in a beautiful London room" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/70 to-foreground/12" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Gatherings</p>
            <h1 className="mt-6 max-w-[10ch] font-display text-6xl leading-[0.93] md:text-8xl">A room should earn the time it takes from you.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/72">The point is not a busy calendar. It is a handful of rooms where the guest list, subject and setting are good enough that people leave with a better decision, a useful relationship or a thought they would not have reached alone.</p>
            <Button asChild size="lg" className="mt-9 rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><p className="eyebrow text-oxblood">The programme</p><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Different rooms for different kinds of work.</h2></div><p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">Exact venues stay private until attendance is approved. Public pages describe the format and purpose, not the guest list.</p></div>
          <div className="grid gap-px bg-foreground/15 md:grid-cols-2 lg:grid-cols-3">
            {formats.map(([title, size, body]) => <article key={title} className="bg-background p-6 md:p-7"><div className="flex items-center justify-between"><CalendarDays className="h-5 w-5 text-oxblood" /><span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">{size}</span></div><h3 className="mt-7 font-display text-4xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p></article>)}
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <div><UsersRound className="h-5 w-5 text-bronze" /><p className="mt-7 eyebrow text-background/50">What makes the room work</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">The guest list is part of the product.</h2></div>
            <div className="divide-y divide-background/15 border-y border-background/15">{[
              ["A reason to be there", "Every invitation should answer one question: why is this room worth these particular people's time?"],
              ["Enough difference", "The best rooms are not twelve versions of the same person. Lived experience, generation, discipline and perspective should vary without destroying trust."],
              ["No performance", "Nobody needs to win the room. No forced introductions, no public boasting and no pressure to reveal more than is useful."],
              ["Follow-through", "A gathering becomes more valuable when useful introductions, actions and resources are remembered after people leave."],
            ].map(([title, body], index) => <div key={title} className="grid gap-4 py-6 md:grid-cols-[54px_180px_1fr]"><span className="font-display text-2xl text-bronze">0{index + 1}</span><h3 className="font-display text-3xl">{title}</h3><p className="text-sm leading-7 text-background/62">{body}</p></div>)}</div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="overflow-hidden border border-foreground/15"><img src={luxuryImages.table} alt="Private members around a table at sunset" className="h-full min-h-[480px] w-full object-cover" /></div>
            <div className="border border-foreground/15 bg-card p-7 md:p-9"><LockKeyhole className="h-5 w-5 text-oxblood" /><p className="mt-7 eyebrow text-oxblood">Private by design</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">Beautiful does not mean public.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">Member names, sensitive subjects and private venue details are not marketing material. Where photography is appropriate, consent is explicit. Where it is not, the phones stay away and the room stays in the room.</p><div className="mt-7 flex items-center gap-3 text-xs text-muted-foreground"><Clock3 className="h-4 w-4 text-bronze" /><span>Fewer events. Better rooms. Stronger continuity.</span></div></div>
          </div>
        </Container>
      </section>
    </>
  );
}
