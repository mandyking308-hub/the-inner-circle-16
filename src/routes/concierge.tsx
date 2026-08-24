import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import heroResidence from "@/assets/po2-hero-residence.jpg";
import quietDetail from "@/assets/po-morning-table.jpg";
import departureHall from "@/assets/po2-departure-hall.jpg";
import studyDusk from "@/assets/po2-study-dusk.jpg";

const HEADLINE = "A private office, quietly behind the life you love.";

export const Route = createFileRoute("/concierge")({
  head: () => ({
    meta: [
      { title: `Private Office — ${site.name}` },
      { name: "description", content: "From homes and travel to family, advisers and the details in between, Montvelle keeps the wider picture in view — with discretion, continuity and a light touch." },
      { property: "og:title", content: `Private Office — ${site.name}` },
      { property: "og:description", content: HEADLINE },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `Private Office — ${site.name}` },
      { name: "twitter:description", content: HEADLINE },
    ],
  }),
  component: ConciergePage,
});

const standard = [
  ["Known", "Your preferences, people and priorities stay familiar, so you are not repeating yourself."],
  ["Anticipated", "The next useful step can appear before it becomes another thing for you to manage."],
  ["Connected", "When several people are involved, the right context stays with the request."],
  ["Discreet", "Private remains private. Introductions are thoughtful, and access is never assumed."],
] as const;

function Eyebrow({ children, tone = "ink" }: { children: string; tone?: "ink" | "light" }) {
  return (
    <p className={`text-[10px] font-semibold uppercase tracking-[0.32em] ${tone === "light" ? "text-white/55" : "text-oxblood"}`}>
      {children}
    </p>
  );
}

function ConciergePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[84vh] overflow-hidden bg-[#171716] text-white">
        <img
          src={heroResidence}
          alt="A private residence drawing room in warm morning light, doors open to a terrace"
          className="absolute inset-0 h-full w-full object-cover object-[38%_center] md:object-center"
          fetchPriority="high"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,10,0.45)_0%,rgba(11,11,10,0.12)_35%,rgba(11,11,10,0.78)_100%)] md:bg-[linear-gradient(90deg,rgba(11,11,10,0.80)_0%,rgba(11,11,10,0.44)_46%,rgba(11,11,10,0.04)_82%)]" />
        <Container className="relative flex min-h-[84vh] items-end py-24 md:py-32">
          <div className="max-w-3xl">
            <Eyebrow tone="light">Private Office</Eyebrow>
            <h1 className="mt-6 text-balance font-display text-[3.25rem] leading-[0.95] md:text-8xl">{HEADLINE}</h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-white/78 md:text-lg">
              From homes and travel to family, advisers and the details in between, Montvelle keeps the wider picture in view — with discretion, continuity and a light touch.
            </p>
            <Button asChild size="lg" className="mt-10 rounded-full bg-white px-8 text-foreground hover:bg-white/90">
              <Link to="/apply">Request membership</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* A QUIETER WAY — editorial spread */}
      <section className="py-28 md:py-44">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.34fr_0.66fr] lg:gap-20">
            <div>
              <Eyebrow>A quieter way</Eyebrow>
              <div className="mt-10 hidden h-px w-full bg-foreground/15 lg:block" />
              <p className="mt-8 hidden max-w-[18ch] font-display text-2xl italic leading-snug text-foreground/70 lg:block">
                Continuity is the luxury.
              </p>
            </div>
            <div>
              <h2 className="max-w-[18ch] text-balance font-display text-[2.75rem] leading-[1.03] md:text-6xl">
                You should not have to start from the beginning every time.
              </h2>
              <div className="mt-10 grid gap-12 md:grid-cols-[1fr_0.9fr] md:items-start md:gap-16">
                <p className="max-w-xl text-base leading-8 text-muted-foreground md:text-lg">
                  The people around you may each know one part of your life. Montvelle remembers how the parts fit together, so conversations begin with context and decisions feel easier to carry.
                </p>
                <figure className="overflow-hidden">
                  <img
                    src={quietDetail}
                    alt="A morning table with flowers, an open leather folio and keys in a family residence"
                    className="aspect-[5/4] w-full object-cover"
                    loading="lazy"
                    width={1600}
                    height={1200}
                  />
                </figure>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* DAY TO DAY — full-bleed image with copy panel */}
      <section className="bg-[#efe8dd] py-20 md:py-32">
        <Container>
          <div className="relative">
            <figure className="overflow-hidden">
              <img
                src={departureHall}
                alt="An entrance hall of a private residence prepared for a departure, with a weekend bag, keys and a handwritten note"
                className="aspect-[4/3] w-full object-cover md:aspect-[16/8]"
                loading="lazy"
                width={1600}
                height={1200}
              />
            </figure>
            <div className="mt-10 max-w-xl bg-background p-8 md:absolute md:-bottom-16 md:right-0 md:mt-0 md:p-12 lg:max-w-lg">
              <Eyebrow>Day to day</Eyebrow>
              <h2 className="mt-5 font-display text-4xl leading-[1.05] md:text-5xl">Start with what you want to make happen.</h2>
              <p className="mt-6 text-base leading-8 text-muted-foreground">
                A move. A school visit. A summer away. A dinner that matters. A trusted introduction. A question that touches more than one place or adviser. Tell us the outcome; we help the right pieces come together quietly.
              </p>
              <Link to="/world" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                The World <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
          <div className="hidden md:block md:h-16" />
        </Container>
      </section>

      {/* TWO SIDES OF THE SAME LIFE */}
      <section className="border-t border-foreground/10 py-28 md:py-40">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Personal and business</Eyebrow>
            <h2 className="mt-6 text-balance font-display text-[2.75rem] leading-[1.03] md:text-6xl">
              Two sides of the same life, held together.
            </h2>
            <p className="mt-8 text-base leading-8 text-muted-foreground md:text-lg">
              There is no supplier directory to work through. You tell us what you need; we find and
              coordinate the right route, whether the question belongs to the household or to the
              business behind it.
            </p>
          </div>

          <div className="mt-16 grid gap-px bg-foreground/12 lg:grid-cols-2">
            {[
              {
                title: "Personal access",
                copy: "Montvelle arranges the life around the household through ordinary booking, contact and concierge routes, and through relationships we already hold — travel and hotels, restaurants and hospitality, private clubs, property and relocation, education, health and wellbeing, household services, culture and experiences.",
                categories: personalCategories,
              },
              {
                title: "Business access",
                copy: "Montvelle sources professional organisations worldwide around business and family-office needs — legal and tax, banking and finance, insurance, fiduciary and corporate services, transactions, executive search, cyber security and philanthropy. Montvelle coordinates and keeps the context; Montvelle is not itself the regulated adviser.",
                categories: businessCategories,
              },
            ].map((column) => (
              <article key={column.title} className="bg-background p-8 md:p-10">
                <h3 className="font-display text-3xl leading-tight md:text-4xl">{column.title}</h3>
                <p className="mt-5 text-base leading-8 text-muted-foreground">{column.copy}</p>
                <ul className="mt-8 grid gap-x-10 gap-y-2 sm:grid-cols-2">
                  {column.categories.map((category) => (
                    <li key={category.id} className="border-b border-foreground/12 py-2 text-sm">
                      {category.label}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <p className="mt-10 max-w-3xl text-xs leading-6 text-muted-foreground">{accessQualifier}</p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/apply">Request membership</Link>
            </Button>
            <Link to="/auth" className="inline-flex items-center gap-2 text-sm font-semibold">
              Member access <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>



      {/* THE STANDARD — restrained rules */}
      <section className="py-28 md:py-44">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <Eyebrow>The standard</Eyebrow>
            <h2 className="mt-6 text-balance font-display text-[2.75rem] leading-[1.03] md:text-6xl">
              Good support should feel almost invisible.
            </h2>
          </div>
          <div className="mx-auto mt-16 max-w-5xl border-t border-foreground/15 md:mt-24">
            {standard.map(([title, body]) => (
              <div key={title} className="grid gap-3 border-b border-foreground/15 py-9 md:grid-cols-[0.32fr_0.68fr] md:gap-16 md:py-12">
                <h3 className="font-display text-2xl tracking-wide md:text-3xl">{title}</h3>
                <p className="max-w-xl text-base leading-8 text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* BEHIND THE SCENES — single dark section */}
      <section className="relative overflow-hidden bg-[#131312] text-white">
        <div className="grid lg:grid-cols-2">
          <figure className="order-2 lg:order-1">
            <img
              src={studyDusk}
              alt="A private residential library at dusk, lit by a single lamp and a low fire"
              className="h-full min-h-[320px] w-full object-cover lg:min-h-[620px]"
              loading="lazy"
              width={1600}
              height={1200}
            />
          </figure>
          <div className="order-1 flex items-center px-6 py-24 sm:px-10 lg:order-2 lg:px-20 lg:py-32">
            <div className="max-w-xl">
              <Eyebrow tone="light">Behind the scenes</Eyebrow>
              <h2 className="mt-6 text-balance font-display text-[2.5rem] leading-[1.05] md:text-5xl">
                A private office that stays quietly in the background.
              </h2>
              <p className="mt-7 text-base leading-8 text-white/68">
                For the moments that need a little more thought, Montvelle keeps the people, decisions and next steps in one view — so you can stay close to what matters without living inside the detail.
              </p>
              <Link to="/ecosystem" className="mt-9 inline-flex items-center gap-2 text-sm font-semibold">
                Inside the private office <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-28 md:py-44">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <Eyebrow>By invitation</Eyebrow>
            <h2 className="mt-6 text-balance font-display text-[2.75rem] leading-[1.03] md:text-6xl">
              More time for the life you wanted. Less time managing the life around it.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-muted-foreground">
              That is the standard Montvelle is designed around: personal enough to know the context, discreet enough to stay in the background, and dependable when it matters.
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
