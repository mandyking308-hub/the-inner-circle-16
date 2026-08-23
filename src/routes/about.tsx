import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import heroOpenDoors from "@/assets/ab2-hero-open-doors.jpg";
import libraryConversation from "@/assets/ab2-library-conversation.jpg";
import studyDetail from "@/assets/ab2-study-detail.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `Our Story — ${site.name}` },
      { name: "description", content: "Why Montvelle exists: one private world around the people, places and moments that make a life feel connected." },
      { property: "og:title", content: `Our Story — ${site.name}` },
      { property: "og:description", content: "A good life should feel connected. The philosophy behind Montvelle." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const principles = [
  { label: "Personal", body: "Know enough to understand the context without becoming intrusive." },
  { label: "Connected", body: "Let people, places and decisions speak to one another when it is genuinely useful." },
  { label: "Discreet", body: "The private life remains private. Access and introductions are never assumed." },
  { label: "Lasting", body: "Build relationships and memory over time, so the world does not reset with every new question." },
];

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[86vh] overflow-hidden bg-[#171716] text-white">
        <img
          src={heroOpenDoors}
          alt="Doors open between a warm private interior and a garden terrace in late afternoon light"
          className="absolute inset-0 h-full w-full object-cover"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,11,0.74)_0%,rgba(12,12,11,0.44)_46%,rgba(12,12,11,0.06)_82%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,11,0.28)_0%,rgba(12,12,11,0)_38%,rgba(12,12,11,0.42)_100%)] md:hidden" />
        <Container className="relative flex min-h-[86vh] items-end py-24 md:py-32">
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/60">Why Montvelle exists</p>
            <h1 className="mt-6 max-w-[13ch] font-display text-5xl leading-[0.96] sm:text-6xl md:text-8xl">
              A good life should feel connected.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/80">
              The places you live. The people you trust. Family, friendships, work, travel, culture and the
              moments that matter in between. Montvelle began with a simple idea: they should not have to
              exist as separate worlds.
            </p>
            <Button asChild size="lg" className="mt-10 rounded-full bg-white px-8 text-foreground hover:bg-white/90">
              <Link to="/apply">Request membership <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* The idea */}
      <section className="py-28 md:py-44">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-24">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-oxblood">The idea</p>
            <div>
              <h2 className="max-w-4xl font-display text-4xl leading-[1.04] sm:text-5xl md:text-7xl">
                Life does not arrive in neat categories.
              </h2>
              <div className="mt-10 max-w-3xl border-t border-border/60 pt-10">
                <p className="text-base leading-8 text-muted-foreground">
                  A move can touch family, school, friendships and work. A conversation can become an
                  introduction. A place can begin as somewhere you visit and slowly become part of home.
                  Montvelle was created around the way life actually happens — with one part naturally
                  leading into another.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The people */}
      <section className="bg-[#efe8dd] py-24 md:py-40">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-24">
            <figure className="overflow-hidden">
              <img
                src={libraryConversation}
                alt="Three adults of different generations in conversation in a warm residential library"
                className="aspect-[16/11] w-full object-cover"
                loading="lazy"
                width={1600}
                height={1104}
              />
            </figure>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-oxblood">The people</p>
              <h2 className="mt-6 font-display text-4xl leading-[1.04] sm:text-5xl md:text-6xl">
                The right people make a world feel smaller in the best possible way.
              </h2>
              <p className="mt-8 text-base leading-8 text-muted-foreground">
                Someone who already knows the city. A friend who understands the family. An introduction made
                with context. A conversation that opens a door you were not looking for. The value is rarely
                in having more names. It is in knowing the right people well enough for the relationship to
                mean something.
              </p>
              <Link to="/gatherings" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold">
                Gatherings <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Quietly behind it */}
      <section className="py-28 md:py-44">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
            <div className="lg:pr-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-oxblood">Quietly behind it</p>
              <h2 className="mt-6 max-w-xl font-display text-4xl leading-[1.04] sm:text-5xl md:text-6xl">
                The best support leaves more room for the life itself.
              </h2>
              <p className="mt-8 max-w-lg text-base leading-8 text-muted-foreground">
                There are moments when a family needs more than an introduction or a beautiful place to
                belong. Montvelle keeps context close, helps the right people come together and makes the
                practical side of life feel lighter — without asking the member to live inside the detail.
              </p>
              <Link to="/concierge" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold">
                Private Office <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <figure className="overflow-hidden">
              <img
                src={studyDetail}
                alt="A leather folio, correspondence, keys and a brass lamp in a private study at dusk"
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
                width={1600}
                height={1104}
              />
            </figure>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section className="pb-28 md:pb-44">
        <Container>
          <div className="border-t border-border/60">
            {principles.map((p) => (
              <div key={p.label} className="grid gap-4 border-b border-border/60 py-9 md:grid-cols-[0.34fr_0.66fr] md:gap-16 md:py-12">
                <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-oxblood">{p.label}</p>
                <p className="max-w-2xl font-display text-2xl leading-[1.35] md:text-3xl">{p.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The standard */}
      <section className="bg-[#171716] py-28 text-white md:py-44">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-24">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-white/55">The standard</p>
            <div>
              <h2 className="max-w-4xl font-display text-4xl leading-[1.04] sm:text-5xl md:text-6xl">
                Warm enough to feel personal. Quiet enough to disappear when it should.
              </h2>
              <p className="mt-10 max-w-2xl border-t border-white/15 pt-10 text-base leading-8 text-white/72">
                Montvelle should feel present when it is useful and almost invisible when it is not. The point
                is not to create another layer in life. It is to make the life already there feel more
                connected.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-28 md:py-40">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-oxblood">By invitation</p>
              <h2 className="mt-6 max-w-3xl font-display text-4xl leading-[1.04] sm:text-5xl md:text-6xl">
                A private world around the life you have built.
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
                Belong. Move. Live. Raise. Connect. Gather. Give. Pass it on — with one familiar world around
                you as life changes.
              </p>
            </div>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/apply">Request membership <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
