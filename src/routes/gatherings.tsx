import { createFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import heroSupper from "@/assets/gat-hero-salon-supper.jpg";
import terraceBreakfast from "@/assets/gat-terrace-breakfast.jpg";
import libraryDusk from "@/assets/gat-library-dusk.jpg";

const HEADLINE = "Some rooms stay with you.";
const DESCRIPTION =
  "A private dinner in Mayfair. A conversation in Geneva. A family weekend. A cultural evening. A breakfast that begins with ease and ends with something worth carrying forward.";

export const Route = createFileRoute("/gatherings")({
  head: () => ({
    meta: [
      { title: `Gatherings — ${site.name}` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: `Gatherings — ${site.name}` },
      { property: "og:description", content: HEADLINE },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Gatherings — ${site.name}` },
      { name: "twitter:description", content: HEADLINE },
    ],
  }),
  component: GatheringsPage,
});

const principles = [
  [
    "A reason",
    "Everybody in the room should understand, whether explicitly or intuitively, why this particular group of people has been brought together.",
  ],
  [
    "Enough difference",
    "The best rooms are not made from identical people. Perspective, experience and temperament should give the conversation life.",
  ],
  [
    "Ease",
    "No forced networking. No performative introductions. No pressure to impress. People should be able to arrive and settle naturally.",
  ],
  [
    "Something that lasts",
    "A friendship, an introduction, a new idea, a family connection, or simply a room members would genuinely choose to return to.",
  ],
] as const;

function Eyebrow({ children, tone = "ink" }: { children: string; tone?: "ink" | "light" }) {
  return (
    <p className={`text-[10px] font-semibold uppercase tracking-[0.32em] ${tone === "light" ? "text-white/55" : "text-oxblood"}`}>
      {children}
    </p>
  );
}

function GatheringsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[86vh] overflow-hidden bg-[#141312] text-white">
        <img
          src={heroSupper}
          alt="Adults of different ages in relaxed conversation around a candlelit supper table in a private drawing room"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center] md:object-[center_42%]"
          fetchPriority="high"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,9,0.52)_0%,rgba(10,10,9,0.10)_38%,rgba(10,10,9,0.86)_100%)] md:bg-[linear-gradient(90deg,rgba(10,10,9,0.82)_0%,rgba(10,10,9,0.42)_48%,rgba(10,10,9,0.02)_84%)]" />
        <Container className="relative flex min-h-[86vh] items-end py-24 md:py-32">
          <div className="max-w-3xl">
            <Eyebrow tone="light">Gatherings</Eyebrow>
            <h1 className="mt-6 text-balance font-display text-[3.25rem] leading-[0.95] md:text-8xl">{HEADLINE}</h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/78 md:text-lg">{DESCRIPTION}</p>
            <Button asChild size="lg" className="mt-10 rounded-full bg-white px-8 text-foreground hover:bg-white/90">
              <Link to="/apply">Request membership</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* THE IDEA */}
      <section className="py-28 md:py-44">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.34fr_0.66fr] lg:gap-20">
            <div>
              <Eyebrow>The idea</Eyebrow>
              <div className="mt-10 hidden h-px w-full bg-foreground/15 lg:block" />
              <p className="mt-8 hidden max-w-[18ch] font-display text-2xl italic leading-snug text-foreground/70 lg:block">
                Fewer rooms, chosen carefully.
              </p>
            </div>
            <div>
              <h2 className="max-w-[20ch] text-balance font-display text-[2.75rem] leading-[1.03] md:text-6xl">
                The point is not to fill a calendar. It is to create rooms worth entering.
              </h2>
              <p className="mt-10 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
                The best gatherings feel considered rather than programmed. The guest list has a reason. The atmosphere
                has ease. The setting supports the conversation. And the evening leaves something behind beyond the
                evening itself.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* PRIVATE GATHERINGS */}
      <section className="bg-[#efe8dd] py-20 md:py-32">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <figure className="overflow-hidden">
              <img
                src={terraceBreakfast}
                alt="Adults of varied ages talking over a late breakfast on the stone terrace of a Mediterranean residence"
                className="aspect-[4/3] w-full object-cover md:aspect-[5/4]"
                loading="lazy"
                width={1600}
                height={1200}
              />
            </figure>
            <div>
              <Eyebrow>Private gatherings</Eyebrow>
              <h2 className="mt-6 max-w-[16ch] text-balance font-display text-[2.5rem] leading-[1.04] md:text-[3.5rem]">
                Different rooms for different moments in life.
              </h2>
              <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground">
                Private dinners, breakfasts, family weekends, cultural evenings and smaller rooms for quieter
                introductions each create a different kind of connection. Fewer gatherings. Better reasons to attend.
              </p>
              <Link
                to="/the-table"
                className="mt-8 inline-flex items-center gap-2 border-b border-foreground/25 pb-1 text-sm font-medium text-foreground transition-colors hover:border-foreground"
              >
                The Permanent Table <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* PRINCIPLES */}
      <section className="py-28 md:py-44">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>What makes the room special</Eyebrow>
            <h2 className="mt-6 text-balance font-display text-[2.75rem] leading-[1.03] md:text-6xl">
              Atmosphere begins with judgement.
            </h2>
          </div>
          <div className="mt-16 md:mt-24">
            {principles.map(([title, body], index) => (
              <div
                key={title}
                className="grid gap-4 border-t border-foreground/12 py-10 md:grid-cols-[auto_0.3fr_0.7fr] md:gap-10 md:py-12"
              >
                <span className="font-display text-sm text-foreground/40 md:pt-2">{`0${index + 1}`}</span>
                <h3 className="font-display text-3xl leading-tight md:text-[2.25rem]">{title}</h3>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground">{body}</p>
              </div>
            ))}
            <div className="border-t border-foreground/12" />
          </div>
        </Container>
      </section>

      {/* PRIVATE BY DESIGN */}
      <section className="relative overflow-hidden bg-[#131211] text-white">
        <img
          src={libraryDusk}
          alt="Two adults in quiet conversation in a residential library at dusk"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
          loading="lazy"
          width={1600}
          height={1008}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,8,0.92)_0%,rgba(9,9,8,0.68)_58%,rgba(9,9,8,0.35)_100%)]" />
        <Container className="relative py-28 md:py-44">
          <div className="max-w-2xl">
            <Eyebrow tone="light">Private by design</Eyebrow>
            <h2 className="mt-6 text-balance font-display text-[2.5rem] leading-[1.04] md:text-[3.75rem]">
              Not every memorable moment needs to become content.
            </h2>
            <p className="mt-8 text-base leading-8 text-white/72 md:text-lg">
              Montvelle gatherings protect atmosphere as much as intimacy. Some moments are for the people in the room,
              not for the wider world. When photography is appropriate, context matters. Often it is not the image that
              matters, but the memory held by the people who were there.
            </p>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 md:py-44">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>By invitation</Eyebrow>
            <h2 className="mt-6 text-balance font-display text-[2.75rem] leading-[1.03] md:text-6xl">
              A private world is built one memorable room at a time.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">
              Membership opens access to the Permanent Table and to a wider gathering life shaped around people, place,
              culture and the quiet value of being well brought together.
            </p>
            <Button asChild size="lg" className="mt-10 rounded-full px-8">
              <Link to="/apply">Request membership</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
