import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Compass,
  HeartHandshake,
  LayoutDashboard,
  Plane,
  ShieldCheck,
  Sparkles,
  TableProperties,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

const operatingLayers = [
  [TableProperties, "Judgement", "The Table", "A permanent circle that remembers the history behind the decision.", "/the-table"],
  [LayoutDashboard, "Orchestration", "Decision Room", "Separate what the family must decide from what experts must advise and what someone must execute.", "/decision-room"],
  [BadgeCheck, "Expertise", "Trusted Partners", "Recommendation-led specialists who earn trust without buying access to members.", "/partners"],
  [Compass, "Execution", "Concierge", "One owner for the awkward work between countries, advisers and ordinary family life.", "/concierge"],
] as const;

const principles = [
  ["Character", "Who someone is matters more than the size of the name on their card."],
  ["Contribution", "Members are expected to add judgement, experience, introductions and time."],
  ["Confidentiality", "The private room stays private. No harvesting, forwarding or content mining."],
  ["No solicitation", "Business can happen. Prospecting is not why the room exists."],
  ["Execution", "Every serious problem eventually needs an owner, a next action and a finish line."],
];

export function HomeStory() {
  return (
    <>
      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="eyebrow text-oxblood">The premise</p>
              <p className="mt-7 font-display text-4xl leading-[1.08] text-foreground md:text-5xl">The problem is not that successful families lack advisers.</p>
            </div>
            <div className="border-l border-foreground/20 pl-6 md:pl-10">
              <p className="max-w-4xl font-display text-4xl leading-[1.08] text-foreground md:text-6xl">
                It is that <span className="text-oxblood">nobody owns the space between them.</span>
              </p>
              <div className="mt-8 grid gap-6 text-sm leading-7 text-muted-foreground md:grid-cols-2">
                <p>Build a company. Add property. Move country. Open banking. Find a school. Create a trust. Hire advisers. Think about succession. Prepare children for responsibility. The decisions stop arriving one at a time.</p>
                <p>Project Table is designed for that overlap: peers for judgement, specialists for technical advice, concierge for execution and a family learning layer so capability compounds across generations.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="relative">
              <div className="overflow-hidden border border-foreground/20 bg-foreground image-frame"><img src="/art/decision-room.svg" alt="The four-lane Life Decision Room" className="aspect-[4/3] w-full object-cover" /></div>
              <div className="absolute -bottom-5 right-4 max-w-xs border border-foreground/20 bg-background p-4 md:right-8">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-oxblood">Member workflow</p>
                <p className="mt-2 font-display text-2xl">Decide · Expert · Execute · Evidence</p>
              </div>
            </div>
            <div className="lg:pl-8">
              <div className="flex items-center gap-3"><LayoutDashboard className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">Flagship product</p></div>
              <h2 className="mt-5 text-balance font-display text-5xl leading-[1.01] md:text-6xl">Stop collecting advice. Start closing decisions.</h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">A member opens one room for a major issue — moving country, building a family office, rethinking education or planning succession — and sees the whole problem as an executable system.</p>
              <div className="mt-8 divide-y divide-foreground/15 border-y border-foreground/15">
                {[
                  ["Decide", "What belongs to the family and peers?"],
                  ["Expert", "Where is qualified professional advice required?"],
                  ["Execute", "Who owns the next practical action?"],
                  ["Evidence", "What proves the work is actually complete?"],
                ].map(([title, text], index) => <div key={title} className="grid grid-cols-[48px_105px_1fr] gap-3 py-4"><span className="font-display text-xl text-oxblood">0{index + 1}</span><span className="text-xs font-semibold uppercase tracking-[0.1em]">{title}</span><span className="text-xs leading-6 text-muted-foreground">{text}</span></div>)}
              </div>
              <Link to="/decision-room" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-foreground">See the Decision Room <ArrowRight className="h-4 w-4 text-oxblood" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="eyebrow text-background/55">The service stack</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">One house. Four different kinds of help.</h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-background/65">The point is not to collapse every profession into one service. It is to make the boundaries clear and the hand-offs excellent.</p>
            </div>
            <div className="grid gap-px bg-background/15 sm:grid-cols-2">
              {operatingLayers.map(([Icon, line, title, body, to], index) => (
                <Link key={title} to={to} className="group bg-foreground p-6 transition-colors hover:bg-background/5 md:p-7">
                  <div className="flex items-start justify-between"><Icon className="h-5 w-5 text-bronze" /><span className="font-display text-2xl text-background/25">0{index + 1}</span></div>
                  <p className="mt-10 text-[9px] font-semibold uppercase tracking-[0.2em] text-bronze">{line}</p>
                  <h3 className="mt-2 font-display text-4xl">{title}</h3>
                  <p className="mt-4 text-sm leading-7 text-background/65">{body}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">Enter <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
            <div><p className="eyebrow text-oxblood">Where the existing market fragments</p><h2 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] md:text-6xl">Club. Family office. Concierge. Education. We connect the seams.</h2></div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">Most families can buy each service separately. What is harder to buy is continuity: the same context surviving from a peer conversation into an adviser brief, an execution plan and what the next generation eventually needs to understand.</p>
          </div>

          <div className="space-y-5">
            <article className="grid overflow-hidden border border-foreground/20 bg-card lg:grid-cols-[1.05fr_0.95fr]">
              <div className="min-h-[330px]"><img src="/art/global-life.svg" alt="Global Life planning illustration" className="h-full w-full object-cover" /></div>
              <div className="flex flex-col justify-center p-7 md:p-10"><div className="flex items-center gap-3"><Plane className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">Global Life</p></div><h3 className="mt-4 font-display text-5xl leading-tight">A move is never just a visa.</h3><p className="mt-5 text-sm leading-7 text-muted-foreground">Residence, tax, companies, trusts, schools, housing, banking, healthcare, insurance and travel-day rules belong in one decision room before the family starts paying separate professionals to implement pieces.</p><Link to="/global-life" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Explore Global Life <ArrowRight className="h-4 w-4 text-oxblood" /></Link></div>
            </article>

            <article className="grid overflow-hidden border border-foreground/20 bg-forest text-forest-foreground lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex flex-col justify-center p-7 md:p-10 lg:order-1"><div className="flex items-center gap-3"><BookOpenCheck className="h-5 w-5 text-bronze" /><p className="eyebrow text-forest-foreground/55">Family Learning Studio</p></div><h3 className="mt-4 font-display text-5xl leading-tight">Skill is not execution.</h3><p className="mt-5 text-sm leading-7 text-forest-foreground/70">Knowledge matters. But so does being handed a messy problem, finding what you need, making a plan and finishing for a real audience. The family curriculum adds money, enterprise, AI, communication, practical independence, service and evidence of capability.</p><Link to="/family-learning" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Explore Family Learning <ArrowRight className="h-4 w-4 text-bronze" /></Link></div>
              <div className="min-h-[330px] lg:order-2"><img src="/art/learning-studio.svg" alt="Family Learning Studio illustration" className="h-full w-full object-cover" /></div>
            </article>

            <article className="grid overflow-hidden border border-foreground/20 bg-card lg:grid-cols-[1.05fr_0.95fr]">
              <div className="min-h-[330px]"><img src="/art/concierge-desk.svg" alt="Concierge execution desk illustration" className="h-full w-full object-cover" /></div>
              <div className="flex flex-col justify-center p-7 md:p-10"><div className="flex items-center gap-3"><Compass className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">Concierge & execution</p></div><h3 className="mt-4 font-display text-5xl leading-tight">Advice is useful. Finished is better.</h3><p className="mt-5 text-sm leading-7 text-muted-foreground">The request desk is deliberately unglamorous: one outcome, one owner, one visible next action. It handles the work that gets lost between advisers, assistants, countries and family members.</p><Link to="/concierge" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Explore Concierge <ArrowRight className="h-4 w-4 text-oxblood" /></Link></div>
            </article>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
            <div>
              <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-bronze" /><p className="eyebrow text-oxblood-foreground/55">Trusted Partner Network</p></div>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Professionals should earn access through usefulness, not a cheque.</h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-oxblood-foreground/70">A member-recommended and vetted provider network gives families a better starting point and gives excellent firms a reason to contribute — without turning the member directory into a prospect list.</p>
              <Link to="/partners" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">See the partner model <ArrowRight className="h-4 w-4 text-bronze" /></Link>
            </div>
            <div className="overflow-hidden border border-oxblood-foreground/20 bg-background/5"><img src="/art/partner-network.svg" alt="Trusted Partner Network illustration" className="aspect-[4/3] w-full object-cover" /></div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <figure className="overflow-hidden border border-foreground/20 bg-card image-frame"><img src="/art/alumni-path.svg" alt="Rising generation pathway from learning to mentoring" className="aspect-[4/3] w-full object-cover" /></figure>
            <div>
              <div className="flex items-center gap-3"><HeartHandshake className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">The family continuum</p></div>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Do not inherit the outcome without learning how to create one.</h2>
              <p className="mt-6 text-sm leading-7 text-muted-foreground">Learning flows into real projects, founder shadowing, apprenticeships, alumni relationships and eventually adult responsibility. The last stage is giving opportunities back to the cohort coming behind.</p>
              <Link to="/alumni" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Explore the Continuum <ArrowRight className="h-4 w-4 text-oxblood" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
            <div><p className="eyebrow text-oxblood">The rules of the room</p><h2 className="mt-5 font-display text-4xl leading-tight">Trust is infrastructure too.</h2></div>
            <div className="divide-y divide-foreground/15 border-y border-foreground/15">
              {principles.map(([title, copy], index) => <div key={title} className="grid gap-4 py-5 md:grid-cols-[55px_170px_1fr] md:items-center"><span className="font-display text-2xl text-oxblood">0{index + 1}</span><h3 className="font-display text-2xl">{title}</h3><p className="text-sm leading-7 text-muted-foreground">{copy}</p></div>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="relative overflow-hidden border border-foreground/20 bg-foreground p-8 text-background md:p-12 lg:p-16">
            <Sparkles className="absolute right-8 top-8 h-5 w-5 text-bronze" />
            <p className="eyebrow text-background/55">Founding cohort</p>
            <h2 className="mt-5 max-w-5xl text-balance font-display text-5xl leading-[1.02] md:text-7xl">A private institution should become indispensable before it becomes large.</h2>
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><p className="max-w-2xl text-sm leading-7 text-background/65">We are deliberately proving the room, the workflows and the service before optimising pricing or scale. Admission is about character, contribution, commitment and fit — not theatre.</p><Button asChild size="lg" className="rounded-none bg-oxblood px-8 text-oxblood-foreground hover:bg-background hover:text-foreground"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
          </div>
        </Container>
      </section>
    </>
  );
}
