import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import heroDesk from "@/assets/mw-hero-quiet-desk.jpg";
import conversationRoom from "@/assets/mw-conversation-room.jpg";
import hallwayDusk from "@/assets/mw-hallway-dusk.jpg";

const outcomes = [
  {
    title: "See what needs you.",
    body: "A short list each morning: the decision waiting on your judgement, the booking that needs a word, the invitation still open. Everything else stays where it belongs.",
  },
  {
    title: "Make important decisions with the whole picture visible.",
    body: "The move, the school, the sale — held in one place with the sequence, the people involved and what has already been settled, so nothing has to be reconstructed from memory.",
  },
  {
    title: "Hand something over without losing sight of it.",
    body: "Give a complicated thing to your private office and keep watching it quietly. One owner, one next step, and your consent asked for before anyone is introduced.",
  },
  {
    title: "Stay close to the right people.",
    body: "The handful of relationships that matter, remembered properly — who you meant to call, who was helpful, who should meet whom, and when the moment is right.",
  },
  {
    title: "Keep family life connected as it changes.",
    body: "Schools, homes, generations and the practical rhythm of the household, kept coherent as the family moves between places and stages.",
  },
] as const;

const beyond = [
  { title: "Gatherings", body: "Rooms worth entering, with the invitation and the context in one place." },
  { title: "Knowledge", body: "What other families learned, written honestly, kept private." },
  { title: "Giving", body: "Involvement that stays personal, quiet and entirely yours." },
  { title: "Family", body: "A wider education for the next generation, at their own pace." },
  { title: "Global Life", body: "More than one home, without losing continuity between them." },
] as const;

export const Route = createFileRoute("/montvelle-world")({
  head: () => ({
    meta: [
      { title: `Montvelle World — ${site.name}` },
      {
        name: "description",
        content:
          "Montvelle World is what opens after membership: your world held in one place — decisions, private office, the people who matter and family life, quietly connected.",
      },
      { property: "og:title", content: `Montvelle World — ${site.name}` },
      {
        property: "og:description",
        content: "Your world. Held in one place. What opens after membership at Montvelle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${site.url}/montvelle-world` }],
  }),
  component: MontvelleWorldPage,
});

function MontvelleWorldPage() {
  return (
    <>
      <section className="relative min-h-[600px] overflow-hidden bg-foreground text-background md:min-h-[740px]">
        <img
          src={heroDesk}
          alt="A quiet private study desk in warm morning light"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,11,0.88)_0%,rgba(12,12,11,0.52)_52%,rgba(12,12,11,0.08)_92%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,11,0.25)_0%,rgba(12,12,11,0.58)_45%,rgba(12,12,11,0.85)_100%)] md:hidden" />
        <Container className="relative flex min-h-[600px] items-end py-20 md:min-h-[740px] md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Montvelle World</p>
            <h1 className="mt-6 max-w-[16ch] font-display text-5xl leading-[0.97] md:text-8xl">
              Your world. Held in one place.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-background/72">
              Membership opens a private environment built around your life rather than around software: what needs you
              today, what someone else is already carrying, and everything that can safely wait.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Button asChild className="rounded-none bg-background px-7 py-6 text-foreground hover:bg-background/90">
                <Link to="/apply">
                  Request membership <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Link
                to="/auth"
                className="border-b border-bronze/60 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-bronze transition-colors hover:text-background"
              >
                Member access
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-border bg-background py-20 md:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="eyebrow text-oxblood">What it is for</p>
              <h2 className="mt-6 max-w-[18ch] font-display text-4xl leading-[1.02] md:text-6xl">
                Five things it should quietly do for you.
              </h2>
            </div>
            <div className="divide-y divide-border border-y border-border">
              {outcomes.map((outcome, index) => (
                <article key={outcome.title} className="grid gap-4 py-8 md:grid-cols-[64px_1fr] md:gap-8">
                  <span className="font-display text-3xl text-bronze">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-3xl leading-tight md:text-4xl">{outcome.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{outcome.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-background py-20 md:py-28">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <img
              src={conversationRoom}
              alt="Two adults in unhurried conversation across a table in a private drawing room"
              width={1600}
              height={1104}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <div className="lg:pl-10">
              <p className="eyebrow text-oxblood">Private Office</p>
              <h2 className="mt-6 font-display text-4xl leading-[1.03] md:text-5xl">
                One place that already understands the whole picture.
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-8 text-muted-foreground">
                Your private office lives inside Montvelle World. Ask for something once and it is carried — with the
                context, the people already involved and the standard you expect — until you agree it is finished.
              </p>
              <p className="mt-5 max-w-xl text-sm leading-8 text-muted-foreground">
                Nothing is shared with anyone outside your household unless you ask for it, and only the small part of
                the picture a particular arrangement actually requires.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-accent/40 py-20 md:py-28">
        <Container>
          <p className="eyebrow text-oxblood">Beyond the screen</p>
          <h2 className="mt-6 max-w-[20ch] font-display text-4xl leading-[1.02] md:text-6xl">
            The world beyond the screen.
          </h2>
          <div className="mt-12 divide-y divide-border border-y border-border">
            {beyond.map((item) => (
              <div key={item.title} className="grid gap-3 py-7 md:grid-cols-[260px_1fr] md:gap-10">
                <h3 className="font-display text-2xl md:text-3xl">{item.title}</h3>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative overflow-hidden bg-foreground text-background">
        <img
          src={hallwayDusk}
          alt="A residence hallway console with keys on a brass tray at dusk"
          width={1600}
          height={1104}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,11,0.92)_0%,rgba(12,12,11,0.70)_60%,rgba(12,12,11,0.40)_100%)]" />
        <Container className="relative py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">The point</p>
            <h2 className="mt-6 font-display text-4xl leading-[1.02] md:text-6xl">
              The point is not to spend more time inside Montvelle World. It is to have more time outside it.
            </h2>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild className="rounded-none bg-background px-7 py-6 text-foreground hover:bg-background/90">
                <Link to="/apply">
                  Request membership <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-none border-background/40 bg-transparent px-7 py-6 text-background hover:bg-background hover:text-foreground"
              >
                <Link to="/membership">Membership</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
