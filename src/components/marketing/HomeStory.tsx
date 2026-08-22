import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpenCheck,
  Compass,
  Handshake,
  HeartHandshake,
  LockKeyhole,
  Plane,
  ShieldCheck,
  Sparkles,
  TableProperties,
  UsersRound,
} from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

const principles = [
  ["Character", "Integrity before status. The room only works when people can speak plainly without wondering what is being extracted from them."],
  ["Contribution", "Members add value through judgement, experience, introductions, questions and help — not merely through access or capital."],
  ["Execution", "A useful community does more than discuss problems. Requests, introductions and plans need an owner, a next action and a finish line."],
  ["Confidentiality", "The private room is private. No recording, forwarding, harvesting or turning someone else's challenge into content."],
  ["No solicitation", "No pitching, poaching or buying access to members. Business may happen; prospecting is not the purpose of the room."],
];

const ecosystem = [
  [TableProperties, "The Table", "A permanent peer circle that remembers the context, not another room full of strangers.", "/the-table"],
  [Plane, "Global Life", "Coordinate residence, tax, trusts, schools, property, banking and family logistics across borders.", "/global-life"],
  [BookOpenCheck, "Family Learning", "Build capability through mastery, real projects, execution and evidence — not worksheets alone.", "/family-learning"],
  [Handshake, "Trusted Partners", "Member-recommended and vetted specialists, introduced with consent rather than cold access.", "/partners"],
  [Compass, "Concierge", "One execution desk for the complicated jobs that sit between advisers, countries and family life.", "/concierge"],
  [HeartHandshake, "The Continuum", "A 16+/alumni pathway into mentors, projects, apprenticeships, work and eventually giving back.", "/alumni"],
] as const;

export function HomeStory() {
  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <p className="eyebrow text-bronze">Why this exists</p>
              <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">Nobody teaches you what to do when life becomes bigger than the systems around you.</h2>
            </div>
            <div className="space-y-6 text-base leading-8 text-muted-foreground">
              <p>Build a company. Move country. Choose advisers. Set up banking. Find the right school. Think about trusts. Protect the family. Hire people. Create a charity. Prepare children for responsibility. Suddenly every decision touches five others.</p>
              <p>The problem is rarely a shortage of information. It is fragmentation. Brilliant specialists answer their slice of the question while the family is left to join the pieces together and somehow keep ordinary life moving.</p>
              <p>Project Table is designed as the layer between the family and the complexity: trusted peers for judgement, qualified specialists for expertise, a concierge for execution, and a learning system that prepares the next generation to handle what comes after us.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-card py-16 md:py-24">
        <Container>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="eyebrow text-bronze">The ecosystem</p><h2 className="mt-4 max-w-3xl font-display text-5xl leading-[1.04]">The Table gives you people. The rest helps you use the room.</h2></div>
            <Link to="/ecosystem" className="inline-flex items-center gap-2 text-sm font-medium">See how it fits together <ArrowRight className="h-3.5 w-3.5" /></Link>
          </div>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {ecosystem.map(([Icon, title, body, to]) => (
              <Link key={title} to={to} className="group bg-background p-6 transition-colors hover:bg-accent/50 md:p-7">
                <Icon className="h-5 w-5 text-bronze" />
                <h3 className="mt-7 font-display text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em]">Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <figure>
              <div className="overflow-hidden border border-border"><img src="/art/global-life.svg" alt="Editorial illustration of a global life planning room" className="aspect-[4/3] w-full object-cover" /></div>
            </figure>
            <div>
              <p className="eyebrow text-bronze">Global Life</p>
              <h2 className="mt-4 font-display text-5xl leading-[1.04]">A move is never just a visa.</h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">Residence, tax, company structures, trusts, schools, property, healthcare, banking, travel days and family routines all collide. The member needs one decision room where the dependencies are visible before expensive instructions are given.</p>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">We do not replace qualified lawyers, tax advisers or immigration specialists. We make it easier for the family to ask the right questions, coordinate the answers and execute in the correct order.</p>
              <Button asChild variant="outline" className="mt-7 rounded-none"><Link to="/global-life">Explore Global Life <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-foreground py-16 text-background md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow text-background/60">Family Learning Studio</p>
              <h2 className="mt-4 font-display text-5xl leading-[1.02]">Skill is not execution.</h2>
              <p className="mt-6 text-base leading-8 text-background/70">Knowing how a tool works is different from being handed a messy problem and making something happen. The curriculum therefore trains a loop: know, apply, deliver, review.</p>
              <p className="mt-5 text-sm leading-7 text-background/70">A child can keep strong academics while also learning money, enterprise, AI, communication, practical independence, culture, service, judgement and the discipline of finishing real work.</p>
              <Link to="/family-learning" className="mt-7 inline-flex items-center gap-2 text-sm">Explore Family Learning <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
            <figure><div className="overflow-hidden border border-background/20"><img src="/art/learning-studio.svg" alt="Editorial illustration of a family learning studio" className="aspect-[4/3] w-full object-cover" /></div></figure>
          </div>
        </Container>
      </section>

      <section className="border-b border-border py-16 md:py-24">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <article className="border border-border bg-card">
              <img src="/art/partner-network.svg" alt="Editorial illustration of a trusted partner network" className="aspect-[16/10] w-full object-cover" />
              <div className="p-6 md:p-8"><p className="eyebrow text-bronze">Trusted Partners</p><h2 className="mt-4 font-display text-4xl">Good advisers without a sales floor.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Recommended and vetted providers can receive consent-led briefs, teach useful material and offer member benefits. They never buy the directory or cold access to members.</p><Link to="/partners" className="mt-6 inline-flex items-center gap-2 text-sm font-medium">How the partner model works <ArrowRight className="h-3.5 w-3.5" /></Link></div>
            </article>
            <article className="border border-border bg-card">
              <img src="/art/concierge-desk.svg" alt="Editorial illustration of a concierge execution desk" className="aspect-[16/10] w-full object-cover" />
              <div className="p-6 md:p-8"><p className="eyebrow text-bronze">Concierge & Execution</p><h2 className="mt-4 font-display text-4xl">Advice is useful. Finished is better.</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">One request, one owner, a visible next action. Concierge handles the coordination work across travel, property, education, relocation, household, health, access and family administration.</p><Link to="/concierge" className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Explore concierge <ArrowRight className="h-3.5 w-3.5" /></Link></div>
            </article>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-card py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <figure><div className="overflow-hidden border border-border"><img src="/art/alumni-path.svg" alt="Editorial illustration of a pathway from learning to mentoring" className="aspect-[4/3] w-full object-cover" /></div></figure>
            <div><div className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-bronze" /><p className="eyebrow">The Continuum</p></div><h2 className="mt-4 font-display text-5xl leading-[1.04]">Education should connect to rooms, work and responsibility.</h2><p className="mt-6 text-base leading-8 text-muted-foreground">The rising-generation network creates a bridge from school-age learning into mentor relationships, founder shadowing, real project briefs, apprenticeships and an alumni community that compounds over time.</p><p className="mt-5 text-sm leading-7 text-muted-foreground">The end goal is not inherited confidence. It is earned capability — followed by an expectation that alumni eventually create opportunities for the people coming behind them.</p><Link to="/alumni" className="mt-6 inline-flex items-center gap-2 text-sm font-medium">Explore the alumni pathway <ArrowRight className="h-3.5 w-3.5" /></Link></div>
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
            <div><div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-bronze" /><p className="eyebrow">Membership</p></div><h2 className="mt-4 max-w-3xl font-display text-5xl leading-tight">A seat is earned by what you bring to the room — and strengthened by what the system helps you do with it.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Applications are reviewed personally for character, contribution, commitment and fit. Trusted experts have their own lane; they do not buy access to confidential peer spaces.</p></div>
            <Button asChild size="lg" className="rounded-none px-8"><Link to="/apply">Request a seat</Link></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
