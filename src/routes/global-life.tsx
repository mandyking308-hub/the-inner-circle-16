import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import heroCoastalResidence from "@/assets/gl2-hero-coastal-residence.jpg";
import secondHome from "@/assets/gl2-second-home-terrace.jpg";
import residenceDetail from "@/assets/gl2-residence-detail.jpg";

const principles = [
  {
    title: "Familiarity",
    body: "The people and preferences that matter should not disappear each time the postcode changes.",
  },
  {
    title: "Family",
    body: "School, routines, friendships and the ordinary shape of family life need continuity too.",
  },
  {
    title: "Trusted people",
    body: "The right local relationships make a place feel easier — from health and home to culture, business and everyday life.",
  },
  {
    title: "Timing",
    body: "The best support appears when it is useful and then recedes again, leaving the life itself to take centre stage.",
  },
] as const;

export const Route = createFileRoute("/global-life")({
  head: () => ({
    meta: [
      { title: `Global Life — ${site.name}` },
      {
        name: "description",
        content:
          "One life, more than one home. Montvelle helps the preferences, relationships and context that make a place feel familiar travel with you.",
      },
      { property: "og:title", content: `One life. More than one home. — ${site.name}` },
      {
        property: "og:description",
        content:
          "The places may change; the life around them should still feel beautifully connected.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${site.url}/global-life` }],
  }),
  component: GlobalLifePage,
});

function GlobalLifePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[620px] overflow-hidden bg-foreground text-background md:min-h-[760px]">
        <img
          src={heroCoastalResidence}
          alt="An infinity pool on the stone terrace of a private Mediterranean residence above a blue bay"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,11,0.74)_0%,rgba(12,12,11,0.40)_50%,rgba(12,12,11,0.04)_88%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,11,0.18)_0%,rgba(12,12,11,0.52)_45%,rgba(12,12,11,0.80)_100%)] md:hidden" />
        <Container className="relative flex min-h-[620px] items-end py-20 md:min-h-[760px] md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Global Life</p>
            <h1 className="mt-6 max-w-[16ch] font-display text-5xl leading-[0.97] md:text-8xl">
              One life. More than one home.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-background/82">
              London for part of the year. Somewhere warmer when it suits. Family in one place,
              school or work in another. The places may change; the life around them should still
              feel beautifully connected.
            </p>
            <Button asChild size="lg" className="mt-9 rounded-none px-8">
              <Link to="/apply">
                Request membership <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* The idea */}
      <section className="border-b border-foreground/12 bg-background py-24 md:py-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-24">
            <p className="eyebrow text-bronze">The idea</p>
            <div>
              <h2 className="max-w-[20ch] font-display text-5xl leading-[1.02] md:text-7xl">
                A life across places should still feel like one life.
              </h2>
              <p className="mt-9 max-w-2xl text-base leading-8 text-muted-foreground">
                Each home has its own rhythm, people and routines. Montvelle helps the important
                parts travel with you — the preferences, relationships and context that make a place
                begin to feel familiar.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Arrive well */}
      <section className="border-b border-foreground/12 bg-linen py-20 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-24">
            <figure className="overflow-hidden">
              <img
                src={secondHome}
                alt="A breakfast table laid on the terrace of a lived-in second residence"
                loading="lazy"
                width={1600}
                height={1104}
                className="aspect-[16/11] w-full object-cover"
              />
            </figure>
            <div>
              <p className="eyebrow text-bronze">Arrive well</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.04] md:text-6xl">
                The second home should not feel like a second start.
              </h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">
                A favourite table. The school run. The doctor you trust. A house ready in the way you
                like it. The small details matter because they are what turn another address into
                part of your life.
              </p>
              <Link
                to="/concierge"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Private service <ArrowRight className="h-4 w-4 text-bronze" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="border-b border-foreground/12 bg-background py-24 md:py-36">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="eyebrow text-bronze">What makes a place feel yours</p>
              <h2 className="mt-5 max-w-[18ch] font-display text-4xl leading-[1.04] md:text-5xl">
                Belonging is built from the details that follow you.
              </h2>
            </div>
            <div>
              {principles.map((item, index) => (
                <div
                  key={item.title}
                  className="grid gap-4 border-t border-foreground/15 py-8 last:border-b sm:grid-cols-[auto_0.6fr_1.4fr] sm:items-baseline sm:gap-8 md:py-10"
                >
                  <p className="font-display text-xl text-bronze">0{index + 1}</p>
                  <h3 className="font-display text-3xl leading-none">{item.title}</h3>
                  <p className="max-w-xl text-sm leading-7 text-muted-foreground">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Quietly behind the scenes */}
      <section className="relative overflow-hidden bg-foreground text-background">
        <Container className="relative py-20 md:py-32">
          <div className="grid gap-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-24">
            <div>
              <p className="eyebrow text-bronze">Quietly behind the scenes</p>
              <h2 className="mt-6 max-w-[20ch] font-display text-4xl leading-[1.04] md:text-6xl">
                The ease you feel on the outside comes from having the right things quietly in place.
              </h2>
              <p className="mt-8 max-w-xl text-base leading-8 text-background/72">
                Homes, advisers, schools, travel, health and family plans sometimes touch one
                another. Montvelle helps the wider picture stay connected, without turning your life
                into a project to be managed.
              </p>
              <Link
                to="/concierge"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Private Office <ArrowRight className="h-4 w-4 text-bronze" />
              </Link>
            </div>
            <figure className="overflow-hidden">
              <img
                src={residenceDetail}
                alt="A hallway console at dusk with house keys, a linen scarf and an open notebook"
                loading="lazy"
                width={1600}
                height={1104}
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
          </div>
        </Container>
      </section>

      {/* Closing */}
      <section className="bg-linen py-24 md:py-36">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.3fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-bronze">By invitation</p>
              <h2 className="mt-6 max-w-[22ch] font-display text-4xl leading-[1.03] md:text-6xl">
                Wherever life goes next, it should still feel like your life.
              </h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">
                Montvelle is designed around continuity — familiar people, familiar context and a
                sense of ease that can travel with you.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-none px-8">
              <Link to="/apply">
                Request membership <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
