import { Link } from "@tanstack/react-router";
import { ArrowRight, Handshake, LockKeyhole, ShieldCheck, Sparkles, TableProperties, UsersRound } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

const principles = [
  ["Character", "Integrity before status. The room only works when people can speak plainly without wondering what is being extracted from them."],
  ["Contribution", "Members add value through judgement, experience, introductions, questions and help — not merely through access or capital."],
  ["Commitment", "A Table becomes useful through continuity. Showing up, preparing and following through matters."],
  ["Confidentiality", "The private room is private. No recording, forwarding, harvesting or turning someone else's challenge into content."],
  ["No solicitation", "No pitching, poaching or buying access to members. Business may happen; prospecting is not the purpose of the room."],
];

export function HomeStory() {
  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div>
              <p className="eyebrow text-bronze">Why this exists</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Success creates decisions that become harder to discuss in public.</h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-muted-foreground">
              <p>Founders, family-enterprise principals and people carrying unusual responsibility often have plenty of advisers but very few peers with whom they can think out loud.</p>
              <p>The questions change: who runs the business when the founder steps back, how children learn responsibility, what belongs inside the family office, what to protect, what to give away, and which relationships matter for the next twenty years.</p>
              <p>Project Table is designed around those questions — not around status, nightlife or a larger contact list.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-card py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3"><TableProperties className="h-5 w-5 text-bronze" /><p className="eyebrow">The Table</p></div>
              <h2 className="mt-5 max-w-2xl font-display text-5xl leading-[1.05]">Eight to twelve people. The same people. Enough time to know the context.</h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground">A recurring peer circle becomes more useful than an endless sequence of introductions because members remember the previous decision, the family dynamics, the business constraints and what you said you would do next.</p>
              <Button asChild variant="outline" className="mt-7 rounded-none"><Link to="/the-table">How the Table works <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
            <div className="grid gap-px bg-border sm:grid-cols-3 lg:grid-cols-1">
              {[
                ["Peer", "People close enough to your present reality to recognise the problem."],
                ["Pathfinder", "People who have already lived through a version of what comes next."],
                ["Perspective", "People different enough to see assumptions your usual circle may share."],
              ].map(([title, copy]) => <div key={title} className="bg-background p-6"><p className="font-display text-3xl text-bronze">{title}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{copy}</p></div>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            <article className="border border-border p-6"><UsersRound className="h-5 w-5 text-bronze" /><p className="mt-8 eyebrow">Gatherings</p><h3 className="mt-3 font-display text-3xl">Good rooms, not event volume.</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">Private dinners, working breakfasts, salons, masterclasses, retreats and impact visits — curated for relevance and small enough for real conversation.</p><Link to="/gatherings" className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Explore gatherings <ArrowRight className="h-3.5 w-3.5" /></Link></article>
            <article className="border border-border p-6"><Handshake className="h-5 w-5 text-bronze" /><p className="mt-8 eyebrow">Introductions</p><h3 className="mt-3 font-display text-3xl">Context before contact.</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">Members can ask for a connection; concierge checks why it matters and asks the recipient first. Contact details are not a product for sale.</p><Link to="/membership" className="mt-6 inline-flex items-center gap-2 text-sm font-medium">See member experience <ArrowRight className="h-3.5 w-3.5" /></Link></article>
            <article className="border border-border p-6"><LockKeyhole className="h-5 w-5 text-bronze" /><p className="mt-8 eyebrow">Trust</p><h3 className="mt-3 font-display text-3xl">No pitch culture.</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">Advisers can be useful members of the wider community, but nobody buys access to another member, the directory or a confidential Table.</p><Link to="/about" className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Read the principles <ArrowRight className="h-3.5 w-3.5" /></Link></article>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <div><p className="eyebrow text-background/60">Family enterprise</p><h2 className="mt-4 font-display text-5xl leading-tight">Build the architecture before the complexity demands it.</h2><p className="mt-6 max-w-xl text-base leading-8 text-background/70">Governance, succession, protection, adviser coordination, philanthropy and next-generation education are easier to design before a crisis, liquidity event or family disagreement makes them urgent.</p><Link to="/legacy" className="mt-7 inline-flex items-center gap-2 text-sm">Explore legacy & governance <ArrowRight className="h-3.5 w-3.5" /></Link></div>
            <div className="border border-background/20 p-6 md:p-8"><Sparkles className="h-5 w-5 text-bronze" /><p className="mt-8 eyebrow text-background/60">Next generation</p><h3 className="mt-3 font-display text-4xl">Education by exposure, not inheritance by surprise.</h3><p className="mt-5 text-sm leading-7 text-background/70">A separate protected programme can introduce entrepreneurship, stewardship, financial literacy, technology and philanthropy gradually, without exposing young people to adult confidential rooms.</p><Link to="/next-gen" className="mt-6 inline-flex items-center gap-2 text-sm">Explore Next Gen <ArrowRight className="h-3.5 w-3.5" /></Link></div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <p className="eyebrow text-bronze">The rules of the room</p>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {principles.map(([title, copy], index) => <div key={title} className="grid gap-4 py-6 md:grid-cols-[80px_180px_1fr] md:items-start"><span className="font-display text-2xl text-bronze">0{index + 1}</span><h3 className="font-display text-2xl">{title}</h3><p className="max-w-3xl text-sm leading-7 text-muted-foreground">{copy}</p></div>)}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-8 border border-border bg-card p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-bronze" /><p className="eyebrow">Membership</p></div><h2 className="mt-4 max-w-3xl font-display text-5xl leading-tight">A seat is earned by what you bring to the room, not displayed by what you own.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">We do not publish a net-worth threshold. Applications are reviewed personally for character, contribution, commitment and fit with the current community.</p></div>
            <Button asChild size="lg" className="rounded-none px-8"><Link to="/apply">Request a seat</Link></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
