import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { worldNodes, worldPrinciples } from "@/data/world";
import { site } from "@/config/site";
import worldHero from "@/assets/world-hero-terrace.jpg";

export const Route = createFileRoute("/world")({
  head: () => ({
    meta: [
      { title: `The World — ${site.name}` },
      {
        name: "description",
        content:
          "The places, people and possibilities that matter to your family — brought closer, easier to navigate and connected around the way you actually live.",
      },
      { property: "og:title", content: `The World — ${site.name}` },
      {
        property: "og:description",
        content: "A wider world, made more personal. The places that become part of your life.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WorldPage,
});

function WorldPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[640px] overflow-hidden bg-foreground text-background md:min-h-[760px]">
        <img
          src={worldHero}
          alt="A family together on a sunlit terrace of a European coastal residence"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/45 to-transparent" />
        <div className="absolute inset-0 bg-foreground/10" />
        <Container className="relative flex min-h-[640px] items-center py-20 md:min-h-[760px]">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">The World</p>
            <h1 className="mt-6 max-w-[13ch] font-display text-5xl leading-[0.96] md:text-8xl">
              A wider world, made more personal.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-background/75">
              The places, people and possibilities that matter to your family — brought closer,
              easier to navigate and connected around the way you actually live.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-none px-8">
                <a href="#places">
                  Explore the world <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-none border-background/35 bg-transparent px-8 text-background hover:bg-background hover:text-foreground"
              >
                <Link to="/membership">Membership</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Places that matter */}
      <section id="places" className="scroll-mt-24 border-b border-foreground/12 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow text-bronze">Places that matter</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.03] md:text-6xl">
                The places that become part of your life.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">
              Some places are home. Others become important through family, education, business,
              health, culture, friendships or simply because you love being there. Montvelle helps
              you move through them with more familiarity, better local context and the right people
              around you.
            </p>
          </div>

          <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-4">
            {worldNodes.map((place) => (
              <article key={place.city} className="group">
                <div className="relative overflow-hidden bg-foreground/5">
                  <img
                    src={place.image}
                    alt={`${place.city}, ${place.country}`}
                    width={1200}
                    height={1500}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-6 font-display text-4xl leading-none">{place.city}</h3>
                <p className="mt-3 text-sm font-medium tracking-[0.02em] text-foreground/70">
                  {place.country}
                </p>
                <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-bronze">{place.theme}</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{place.line}</p>
              </article>
            ))}
          </div>

        </Container>
      </section>

      {/* What matters */}
      <section className="bg-foreground py-24 text-background md:py-32">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">What matters</p>
            <h2 className="mt-5 font-display text-5xl leading-[1.03] md:text-6xl">
              Wherever you are, the experience should still feel familiar.
            </h2>
          </div>
          <div className="mt-16 grid gap-x-14 gap-y-14 md:grid-cols-2">
            {worldPrinciples.map((item) => (
              <article key={item.title} className="max-w-md">
                <h3 className="font-display text-3xl leading-tight">{item.title}</h3>
                <p className="mt-5 text-sm leading-8 text-background/65">{item.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Closing */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-8 border border-foreground/15 bg-card p-8 md:p-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <h2 className="max-w-4xl font-display text-4xl leading-[1.05] md:text-5xl">
              The world can be wide without ever feeling disconnected.
            </h2>
            <Button asChild size="lg" className="rounded-none px-8">
              <Link to="/apply">
                Membership inquiry <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
