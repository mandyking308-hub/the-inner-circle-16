import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { globalLifeFeelings, globalLifePlaces } from "@/data/globalLifePlaces";
import heroArrival from "@/assets/gl-hero-arrival.jpg";

export const Route = createFileRoute("/global-life")({
  head: () => ({
    meta: [
      { title: `Global Life — ${site.name}` },
      {
        name: "description",
        content:
          "Homes, schools, trusted advisers, family life and the places you return to — brought together with care, context and continuity.",
      },
      { property: "og:title", content: `Global Life — ${site.name}` },
      {
        property: "og:description",
        content:
          "Wherever life takes you, it should still feel like yours. Montvelle brings the places that matter into one connected view.",
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
      <section className="relative min-h-[640px] overflow-hidden bg-foreground text-background md:min-h-[760px]">
        <img
          src={heroArrival}
          alt="A family arriving at a European coastal residence in warm afternoon light"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/92 via-foreground/62 to-foreground/10" />
        <Container className="relative flex min-h-[640px] items-center py-20 md:min-h-[760px]">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Global Life</p>
            <h1 className="mt-6 max-w-[14ch] font-display text-5xl leading-[0.96] md:text-8xl">
              Wherever life takes you, it should still feel like yours.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-background/75">
              Homes, schools, trusted advisers, family life and the places you return to — brought
              together with care, context and continuity.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-none px-8">
                <a href="#your-world">
                  Explore Global Life <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Your world, connected */}
      <section id="your-world" className="scroll-mt-24 border-b border-foreground/12 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="eyebrow text-bronze">Your world, connected</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.03] md:text-6xl">
                The places that matter to your life.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">
              Some cities are home. Others matter because of family, education, business, health,
              culture or simply how you choose to live. Montvelle brings those places into one
              connected view, so moving between them feels considered rather than fragmented.
            </p>
          </div>

          <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2 xl:grid-cols-4">
            {globalLifePlaces.map((place) => (
              <article key={place.city} className="group">
                <div className="overflow-hidden bg-foreground/5">
                  <img
                    src={place.image}
                    alt={place.alt}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>
                <h3 className="mt-6 font-display text-3xl leading-none">{place.city}</h3>
                <p className="mt-2 text-xs tracking-[0.08em] text-muted-foreground">{place.country}</p>
                <p className="mt-4 border-t border-foreground/12 pt-4 text-[10px] uppercase tracking-[0.2em] text-bronze">
                  {place.theme}
                </p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{place.line}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* How it feels */}
      <section className="bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow text-bronze">How it feels</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.03]">
                Your world should feel joined up.
              </h2>
            </div>
            <div className="grid gap-px bg-background/15 sm:grid-cols-2">
              {globalLifeFeelings.map((item, index) => (
                <article key={item.title} className="bg-foreground p-7 md:p-8">
                  <p className="font-display text-xl text-bronze">0{index + 1}</p>
                  <h3 className="mt-4 font-display text-3xl leading-tight">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-background/65">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Closing */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-8 border border-foreground/15 bg-card p-8 md:p-12 lg:grid-cols-[1fr_auto] lg:items-end">
            <h2 className="max-w-4xl font-display text-4xl leading-[1.05] md:text-5xl">
              However global life becomes, it should still feel simple, personal and yours.
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
