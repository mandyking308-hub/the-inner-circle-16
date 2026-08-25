import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import heroConversation from "@/assets/giv-hero-courtyard-conversation.jpg";
import workshopDrawings from "@/assets/giv-workshop-drawings.jpg";
import gardenPath from "@/assets/giv-walled-garden-path.jpg";

const principles = [
  {
    title: "Listen first",
    body: "Begin close enough to understand the people, the work and what would genuinely be useful.",
  },
  {
    title: "Use what is yours",
    body: "Time, knowledge, relationships, judgement and capital can each matter in different ways.",
  },
  {
    title: "Stay human",
    body: "Giving should never turn people into projects. Dignity, privacy and mutual respect come first.",
  },
  {
    title: "Leave room",
    body: "The right involvement can be private, occasional or long-term. It should fit the life you actually want to live.",
  },
] as const;

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: `Giving — ${site.name}` },
      {
        name: "description",
        content:
          "What you have built can become part of something larger. Giving at Montvelle is personal, discreet and entirely voluntary — capital, experience, time or a well-timed introduction.",
      },
      { property: "og:title", content: `Giving — ${site.name}` },
      {
        property: "og:description",
        content:
          "Personal enough to matter. Light enough to remain yours. A quieter way to give within a wider private life.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GivingPage,
});

function GivingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[620px] overflow-hidden bg-foreground text-background md:min-h-[760px]">
        <img
          src={heroConversation}
          alt="Three adults in unhurried conversation in a sunlit foundation courtyard"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover object-[68%_center] md:object-[20%_center] xl:object-[68%_center]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,11,0.86)_0%,rgba(12,12,11,0.55)_48%,rgba(12,12,11,0.10)_88%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,12,11,0.20)_0%,rgba(12,12,11,0.55)_45%,rgba(12,12,11,0.82)_100%)] md:hidden" />
        <Container className="relative flex min-h-[620px] items-end py-20 md:min-h-[760px] md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Giving</p>
            <h1 className="mt-6 max-w-[15ch] font-display text-5xl leading-[0.97] md:text-8xl">
              What you have built can become part of something larger.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-background/82">
              Sometimes that means capital. Sometimes experience, time, a relationship or a
              well-timed introduction. The point is not to give more. It is to understand where
              something of yours could genuinely matter.
            </p>
            <Button asChild size="lg" className="mt-9 rounded-none px-8">
              <Link to="/apply">
                Request membership <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Closer to what matters */}
      <section className="border-b border-foreground/12 bg-background py-24 md:py-36">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.62fr_1.38fr] lg:gap-24">
            <p className="eyebrow text-bronze">Closer to what matters</p>
            <div>
              <h2 className="max-w-[20ch] font-display text-5xl leading-[1.02] md:text-7xl">
                The most meaningful giving begins with understanding.
              </h2>
              <p className="mt-9 max-w-2xl text-base leading-8 text-muted-foreground">
                Montvelle creates room to get closer to thoughtful people and serious work without
                turning generosity into theatre. See the work. Hear the story. Understand the
                context. Then decide whether there is a place for you in it.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* More than money */}
      <section className="border-b border-foreground/12 bg-linen py-20 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-24">
            <figure className="overflow-hidden">
              <img
                src={workshopDrawings}
                alt="Two adults studying drawings and a model together on a workshop bench"
                loading="lazy"
                width={1600}
                height={1104}
                className="aspect-[16/11] w-full object-cover"
              />
            </figure>
            <div>
              <p className="eyebrow text-bronze">More than money</p>
              <h2 className="mt-5 font-display text-4xl leading-[1.04] md:text-6xl">
                Sometimes the most useful thing you can offer is not money.
              </h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">
                A founder may need perspective. A young organisation may need an introduction. A
                cause may need time, experience or someone prepared to listen carefully. Capital
                matters, but so do the things it took to build it.
              </p>
              <Link
                to="/membership"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold"
              >
                Explore membership <ArrowRight className="h-4 w-4 text-bronze" />
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
              <p className="eyebrow text-bronze">A quieter way to give</p>
              <h2 className="mt-5 max-w-[18ch] font-display text-4xl leading-[1.04] md:text-5xl">
                Personal enough to matter. Light enough to remain yours.
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

      {/* Across generations */}
      <section className="border-b border-foreground/12 bg-linen py-20 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-24">
            <div>
              <p className="eyebrow text-bronze">Across generations</p>
              <h2 className="mt-5 max-w-[20ch] font-display text-4xl leading-[1.04] md:text-6xl">
                Giving can become part of the family story without becoming a performance.
              </h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">
                It can be a way to talk about what matters, make choices together and let the next
                generation see generosity as something personal rather than prescribed.
              </p>
            </div>
            <figure className="overflow-hidden">
              <img
                src={gardenPath}
                alt="A quiet walled garden path at golden hour with a weathered stone bench"
                loading="lazy"
                width={1600}
                height={1104}
                className="aspect-[4/3] w-full object-cover"
              />
            </figure>
          </div>
        </Container>
      </section>

      {/* Private by nature */}
      <section className="bg-foreground text-background">
        <Container className="py-20 md:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-24">
            <p className="eyebrow text-bronze">Private by nature</p>
            <div>
              <h2 className="max-w-[18ch] font-display text-4xl leading-[1.04] md:text-6xl">
                Not everything meaningful needs an audience.
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-8 text-background/72">
                Some of the most valuable contributions are quiet: a conversation, a connection, a
                piece of judgement, time given well, or support offered without becoming part of the
                story. Montvelle is designed to leave room for that.
              </p>
            </div>
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
                A good life can reach beyond itself without becoming less your own.
              </h2>
              <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">
                Giving sits within Montvelle as one part of a wider private life — available when it
                feels meaningful, never because it is expected.
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
