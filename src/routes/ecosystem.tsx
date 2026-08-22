import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenCheck, Compass, Handshake, HeartHandshake, LayoutDashboard, Plane, TableProperties } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { site } from "@/config/site";

const layers = [
  {
    icon: TableProperties,
    title: "The Table",
    line: "Judgement",
    body: "A permanent peer circle for decisions that are too nuanced for a search result and too personal for public networking.",
    to: "/the-table",
  },
  {
    icon: LayoutDashboard,
    title: "Decision Room",
    line: "Orchestration",
    body: "Turn a major family problem into four visible lanes: decide, expert, execute and evidence — with owners, dependencies and a definition of done.",
    to: "/decision-room",
  },
  {
    icon: Plane,
    title: "Global Life",
    line: "Coordination",
    body: "A cross-border workspace covering residence, tax questions, structures, schools, banking, property, health and family logistics.",
    to: "/global-life",
  },
  {
    icon: BookOpenCheck,
    title: "Family Learning",
    line: "Capability",
    body: "A personalised learning layer built around mastery, real projects, execution and an evidence portfolio for the rising generation.",
    to: "/family-learning",
  },
  {
    icon: Handshake,
    title: "Trusted Partners",
    line: "Expertise",
    body: "A recommendation-led specialist network with consent-based introductions and a strict firewall from confidential peer spaces.",
    to: "/partners",
  },
  {
    icon: Compass,
    title: "Concierge",
    line: "Execution",
    body: "One point of coordination for complicated requests, practical jobs and the space between specialist advisers.",
    to: "/concierge",
  },
  {
    icon: HeartHandshake,
    title: "The Continuum",
    line: "Compounding",
    body: "A 16+/alumni pathway from education into mentors, work, apprenticeships, peer community and eventually giving back.",
    to: "/alumni",
  },
] as const;

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: `The Ecosystem — ${site.name}` },
      { name: "description", content: "How Montvelle connects trusted peers, a Life Decision Room, global life coordination, family learning, specialist partners, concierge execution and a rising-generation network." },
    ],
  }),
  component: EcosystemPage,
});

function EcosystemPage() {
  return (
    <>
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <p className="eyebrow text-bronze">The operating system</p>
          <h1 className="mt-5 max-w-5xl font-display text-5xl leading-[1.02] md:text-7xl">The room is only the beginning.</h1>
          <p className="mt-7 max-w-3xl text-base leading-8 text-muted-foreground">A private community becomes much more useful when it can convert collective judgement into clear decisions, trusted expertise, coordinated action and capability across generations. Each layer below solves a different part of that problem.</p>
        </Container>
      </section>

      <section className="border-b border-border py-16 md:py-24">
        <Container>
          <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
            {layers.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={item.title} to={item.to} className="group bg-background p-7 transition-colors hover:bg-card md:p-8">
                  <div className="flex items-center justify-between"><Icon className="h-5 w-5 text-bronze" /><span className="font-display text-2xl text-bronze">0{index + 1}</span></div>
                  <p className="mt-10 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{item.line}</p>
                  <h2 className="mt-2 font-display text-4xl">{item.title}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.body}</p>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium">Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-foreground py-16 text-background md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div><p className="eyebrow text-background/60">The execution principle</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">Ask → decide → coordinate → do → learn.</h2></div>
            <div className="grid gap-px bg-background/20 sm:grid-cols-5">
              {["Ask", "Decide", "Coordinate", "Do", "Learn"].map((step, index) => <div key={step} className="bg-foreground p-5"><p className="font-display text-3xl text-bronze">0{index + 1}</p><p className="mt-8 text-sm uppercase tracking-[0.15em] text-background/75">{step}</p></div>)}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
