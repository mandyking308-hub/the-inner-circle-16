import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  BookOpenCheck,
  Building2,
  Compass,
  Globe2,
  HeartHandshake,
  KeyRound,
  LayoutDashboard,
  Plane,
  ShieldCheck,
  TableProperties,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";

const worldItems = [
  [Plane, "Move", "Residence, visas, tax questions, schools, homes, banking and the order they need to happen in."],
  [Building2, "Build", "Companies, advisers, family-office structure, reporting, property and the operating rhythm around them."],
  [KeyRound, "Live", "Travel, private access, household help, health, security and the practical things that consume time."],
  [HeartHandshake, "Pass it on", "Succession, philanthropy, next-generation capability, mentors and meaningful responsibility."],
] as const;

export function HomeStory() {
  return (
    <>
      <section className="border-b border-foreground/15 bg-background py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-20">
            <div>
              <p className="eyebrow text-oxblood">Why it exists</p>
              <p className="mt-7 font-display text-4xl leading-[1.06] md:text-5xl">You should not have to become an expert in everything just because your life became international.</p>
            </div>
            <div className="border-l border-foreground/20 pl-6 md:pl-10">
              <p className="max-w-4xl font-display text-4xl leading-[1.07] md:text-6xl">
                The problem is rarely finding an adviser. It is <span className="text-oxblood">getting the whole life to work together.</span>
              </p>
              <div className="mt-8 grid gap-6 text-sm leading-7 text-muted-foreground md:grid-cols-2">
                <p>One lawyer knows the trust. Another knows the company. Somebody else knows the visa. The school has its own timetable. The bank wants a different document. Meanwhile you still have a business to run and a family to live with.</p>
                <p>Project Table is the place where the context stays together. People who understand the problem, specialists when expertise is needed, and one execution layer so the family is not left joining every gap alone.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden border-b border-background/15 bg-foreground text-background">
        <div className="absolute inset-0 opacity-40"><img src={luxuryImages.table} alt="Private members in conversation around a London table" className="h-full w-full object-cover" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/86 to-foreground/30" />
        <Container className="relative py-24 md:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3"><TableProperties className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">The Table</p></div>
            <h2 className="mt-6 font-display text-5xl leading-[0.98] md:text-7xl">The right room changes the quality of the decision.</h2>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/72">Not networking for the sake of it. A small private circle where somebody has usually lived through some version of the thing keeping you awake: a sale, a move, a school decision, a family disagreement, a trust, a succession question, a new country.</p>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-background/58">No cold pitches. No buying access to members. No pressure to perform. The point is to leave with better judgement than you walked in with.</p>
            <Link to="/the-table" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Enter The Table <ArrowRight className="h-4 w-4 text-bronze" /></Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="relative overflow-hidden border border-foreground/20 bg-foreground shadow-2xl">
              <img src={luxuryImages.command} alt="A private family office decision room overlooking London" className="aspect-[16/11] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground via-foreground/80 to-transparent p-6 pt-24 text-background">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-bronze">Inside membership</p>
                <p className="mt-2 font-display text-3xl">A room for the decisions that touch everything else.</p>
              </div>
            </div>
            <div className="lg:pl-8">
              <div className="flex items-center gap-3"><LayoutDashboard className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">Life Decision Room</p></div>
              <h2 className="mt-5 text-balance font-display text-5xl leading-[1.01] md:text-6xl">Stop collecting advice. Start closing decisions.</h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">Open one room for the issue. A move. A family-office build. A school rethink. Succession. Then separate what you need to decide, what a professional must advise on, what somebody must actually do and what proves it is finished.</p>
              <div className="mt-8 divide-y divide-foreground/15 border-y border-foreground/15">
                {[
                  ["Decide", "What are we actually choosing?"],
                  ["Expert", "Where do we need qualified advice?"],
                  ["Execute", "Who owns the next practical action?"],
                  ["Evidence", "What proves the work is complete?"],
                ].map(([title, text], index) => <div key={title} className="grid grid-cols-[48px_105px_1fr] gap-3 py-4"><span className="font-display text-xl text-oxblood">0{index + 1}</span><span className="text-xs font-semibold uppercase tracking-[0.1em]">{title}</span><span className="text-xs leading-6 text-muted-foreground">{text}</span></div>)}
              </div>
              <Link to="/decision-room" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">See the Decision Room <ArrowRight className="h-4 w-4 text-oxblood" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-background py-20 md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div><p className="eyebrow text-oxblood">The world around the member</p><h2 className="mt-5 max-w-3xl font-display text-5xl leading-[1.02] md:text-6xl">Your life does not stop at one postcode. Neither should the support around it.</h2></div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">A Tuesday can begin with a board call in London, move into a school question in another country and end with a lawyer, a bank and a property decision all waiting on the same answer. This is built for that reality.</p>
          </div>

          <div className="grid gap-px bg-foreground/15 md:grid-cols-2 lg:grid-cols-4">
            {worldItems.map(([Icon, title, body]) => (
              <article key={title} className="bg-linen p-6 md:p-7">
                <Icon className="h-5 w-5 text-oxblood" />
                <h3 className="mt-8 font-display text-4xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>

          <div className="mt-5 overflow-hidden border border-foreground/20 bg-foreground text-background">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="min-h-[390px]"><img src={luxuryImages.jet} alt="International family travel and private aviation" className="h-full w-full object-cover object-center" /></div>
              <div className="flex flex-col justify-center p-7 md:p-10">
                <div className="flex items-center gap-3"><Globe2 className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">Global Life</p></div>
                <h3 className="mt-5 font-display text-5xl leading-tight">A move is never just a visa.</h3>
                <p className="mt-5 text-sm leading-7 text-background/68">It is tax residence, entities, trusts, school calendars, housing, banking, insurance, healthcare, travel days and whether the family will actually enjoy living there. We keep the question whole before the specialists start answering their pieces.</p>
                <Link to="/global-life" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Explore Global Life <ArrowRight className="h-4 w-4 text-bronze" /></Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-forest text-forest-foreground">
        <Container className="py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <div className="flex items-center gap-3"><BookOpenCheck className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">Family Learning Studio</p></div>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Give them more than the outcome.</h2>
              <p className="mt-6 max-w-xl text-base leading-8 text-forest-foreground/74">Children can inherit access, education and opportunity and still arrive in adult life without knowing how to make something happen. We want the opposite: knowledge, judgement, practical independence and the confidence to execute.</p>
              <p className="mt-5 max-w-xl text-sm leading-7 text-forest-foreground/60">Run a small venture. Plan a real trip. Build with AI. Present to adults. Work with a mentor. Volunteer. Learn money. Learn how to recover when something goes wrong. Keep the evidence of what you can actually do.</p>
              <Link to="/family-learning" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Explore Family Learning <ArrowRight className="h-4 w-4 text-bronze" /></Link>
            </div>
            <div className="overflow-hidden border border-forest-foreground/20 shadow-2xl"><img src={luxuryImages.learning} alt="A family learning together in an elegant private study" className="aspect-[4/3] w-full object-cover" /></div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <div className="flex items-center gap-3"><BadgeCheck className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">Private Office</p></div>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">When you need somebody, you should not have to start with Google.</h2>
              <p className="mt-6 max-w-xl text-sm leading-7 text-oxblood-foreground/70">The partner network is built around people members would actually recommend: lawyers, tax advisers, trustees, immigration specialists, educators, property people, health navigators, cyber specialists, recruiters and others who understand complex families.</p>
              <p className="mt-4 max-w-xl text-sm leading-7 text-oxblood-foreground/70">They do not buy your contact details. They earn their place by being useful. Concierge can then carry the brief, make the introduction with consent and keep the next action visible.</p>
              <div className="mt-7 flex flex-wrap gap-4"><Link to="/partners" className="inline-flex items-center gap-2 text-sm font-semibold">Trusted Partners <ArrowRight className="h-4 w-4 text-bronze" /></Link><Link to="/concierge" className="inline-flex items-center gap-2 text-sm font-semibold">Concierge <ArrowRight className="h-4 w-4 text-bronze" /></Link></div>
            </div>
            <div className="relative overflow-hidden border border-oxblood-foreground/20 bg-foreground shadow-2xl">
              <img src={luxuryImages.table} alt="Private introductions and trusted relationships" className="aspect-[16/11] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground via-foreground/75 to-transparent p-6 pt-24 text-background">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-bronze">The rule</p>
                <p className="mt-2 font-display text-3xl">Trust first. Transaction second.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
            <div><div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">The house rules</p></div><h2 className="mt-5 font-display text-4xl leading-tight">Small enough to know who is in the room.</h2></div>
            <div className="divide-y divide-foreground/15 border-y border-foreground/15">
              {[
                ["Private", "What is shared in the room stays in the room."],
                ["Useful", "Bring judgement, experience, introductions or genuine curiosity."],
                ["No pitching", "Business can happen. Prospecting is not the point."],
                ["Consent", "No introduction releases your details until both sides want it."],
                ["Finish things", "A useful conversation should eventually become a decision, an action or a lesson."],
              ].map(([title, copy], index) => <div key={title} className="grid gap-4 py-5 md:grid-cols-[55px_150px_1fr] md:items-center"><span className="font-display text-2xl text-oxblood">0{index + 1}</span><h3 className="font-display text-2xl">{title}</h3><p className="text-sm leading-7 text-muted-foreground">{copy}</p></div>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.command} alt="Private family office command room" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/88 to-foreground/55" />
        <Container className="relative py-24 md:py-32">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-bronze">Founding membership</p>
              <h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.01] md:text-7xl">A private house for the life behind the success.</h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-background/68">We are keeping the founding community deliberately small. The right member is not simply wealthy. They are building, deciding, contributing and thinking about what comes next.</p>
            </div>
            <Button asChild size="lg" className="rounded-none bg-oxblood px-9 text-oxblood-foreground hover:bg-background hover:text-foreground"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
