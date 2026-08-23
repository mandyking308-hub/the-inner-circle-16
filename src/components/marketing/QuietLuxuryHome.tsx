import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Globe2,
  Plane,
  Play,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { destinationImages, luxuryImages } from "@/data/luxuryImages";

const heroKeywords = ["Belong", "Move", "Live", "Raise", "Connect", "Gather", "Give", "Pass it on"];

const services = [
  { icon: Globe2, label: "Travel & Residences" },
  { icon: Users, label: "Family Support" },
  { icon: BarChart3, label: "Business & Wealth" },
  { icon: CalendarDays, label: "Events & Access" },
] as const;

const destinations = [
  { name: "London", image: destinationImages.london },
  { name: "Dubai", image: destinationImages.dubai },
  { name: "Geneva", image: destinationImages.geneva },
  { name: "New York", image: destinationImages.newYork },
] as const;

function Eyebrow({ children, tone = "gold" }: { children: string; tone?: "gold" | "bronze" }) {
  return (
    <p
      className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${tone === "gold" ? "text-gold" : "text-bronze"}`}
    >
      {children}
    </p>
  );
}

export function QuietLuxuryHome() {
  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="relative bg-ink text-background">
        <img
          src={luxuryImages.hero}
          alt="A family boarding a private aircraft at sunset"
          className="absolute inset-0 h-full w-full object-cover object-[62%_center]"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,11,10,0.92)_0%,rgba(12,11,10,0.66)_30%,rgba(12,11,10,0.18)_58%,rgba(12,11,10,0.05)_100%)]" />
        <div className="relative mx-auto flex min-h-[30rem] w-full max-w-[110rem] flex-col justify-between px-6 pb-6 pt-12 sm:px-10 md:min-h-[34rem] md:pt-14 lg:px-14">
          <div className="max-w-2xl">
            <h1 className="font-display text-[2.6rem] leading-[1.02] sm:text-5xl md:text-[3.7rem]">
              A private world
              <br className="hidden sm:block" /> around the life
              <br className="hidden sm:block" /> you&rsquo;ve built.
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-background/75">
              {heroKeywords.map((word, i) => (
                <span key={word} className="flex items-center gap-2.5">
                  {word}
                  {i < heroKeywords.length - 1 && <span className="text-gold">&bull;</span>}
                </span>
              ))}
            </div>
            <p className="mt-6 font-display text-lg italic leading-7 text-background/88 md:text-xl">
              Membership. Concierge. Private Office.
              <br />A global community for families of exceptional means.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button
                asChild
                className="h-11 rounded-none bg-gold px-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink hover:bg-gold/90"
              >
                <Link to="/apply">
                  Membership inquiry <ArrowRight className="ml-3 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-none border-background/45 bg-transparent px-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-background hover:bg-background hover:text-ink"
              >
                <Link to="/about">
                  Watch our story <Play className="ml-3 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-10 flex justify-end">
            <div className="flex items-center gap-3 bg-background/92 px-4 py-2.5 text-ink shadow-lg">
              <Plane className="h-4 w-4 text-bronze" />
              <span className="text-[13px] leading-tight">
                Nice, France
                <br />
                <span className="text-muted-foreground">14:30</span>
              </span>
            </div>
          </div>
        </div>
      </section>


      {/* Global life */}
      <section className="bg-linen">
        <div className="mx-auto grid w-full max-w-[110rem] gap-6 px-6 py-10 sm:px-10 lg:grid-cols-[0.8fr_1.7fr_0.85fr] lg:items-center lg:gap-5 lg:px-14">
          <div>
            <Eyebrow tone="bronze">Global Life</Eyebrow>
            <h2 className="mt-4 font-display text-4xl leading-[1.05] md:text-5xl">
              Move freely.
              <br />
              Live beautifully.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">
              From seaside villas to city residences, private aviation to remote retreats — we open the world
              for you, quietly.
            </p>
            <Link
              to="/global-life"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground"
            >
              Explore Global Life <ArrowRight className="h-4 w-4 text-bronze" />
            </Link>
          </div>

          <figure className="overflow-hidden">
            <img
              src={luxuryImages.world}
              alt="A coastal villa terrace overlooking the Mediterranean"
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
          </figure>

          <div className="grid gap-6">
            {[
              { name: "Paris", copy: "Residences & Access", image: destinationImages.paris },
              { name: "Courchevel", copy: "Winter Escapes", image: destinationImages.courchevel },
            ].map((item) => (
              <Link key={item.name} to="/global-life" className="group block">
                <img
                  src={item.image}
                  alt={item.name}
                  className="aspect-[16/9] w-full object-cover"
                  loading="lazy"
                />
                <p className="mt-3 font-display text-lg">{item.name}</p>
                <span className="inline-flex items-center gap-2 text-xs text-muted-foreground">
                  {item.copy} <ArrowRight className="h-3 w-3 transition group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Mosaic: people + service */}
      <section className="grid lg:grid-cols-[1fr_1fr_1fr_1fr]">
        <img
          src={luxuryImages.table}
          alt="Members at a candlelit private dinner"
          className="h-64 w-full object-cover lg:h-full"
          loading="lazy"
        />

        <div className="bg-ink px-7 py-10 text-background md:px-9">
          <Eyebrow>Our People</Eyebrow>
          <h2 className="mt-5 font-display text-3xl leading-[1.1] md:text-4xl">
            The people make
            <br />
            the membership worth belonging to.
          </h2>
          <p className="mt-6 text-sm leading-7 text-background/68">
            Founders. Investors. Families. Creators. Doers. United by shared values, discretion and a desire
            to build something greater.
          </p>
          <Link
            to="/membership"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-gold"
          >
            Discover Membership <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="bg-linen px-7 py-10 md:px-9">
          <Eyebrow tone="bronze">Bespoke Service</Eyebrow>
          <h2 className="mt-5 font-display text-3xl leading-[1.1] md:text-4xl">More than concierge.</h2>
          <div className="mt-7 grid gap-8 sm:grid-cols-2">
            <p className="text-sm leading-7 text-muted-foreground">
              A dedicated team, anticipates, arranges and solves — so you can focus on what matters most.
            </p>
            <ul className="space-y-4">
              {services.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-sm">
                  <Icon className="h-4 w-4 shrink-0 text-bronze" />
                  {label}
                </li>
              ))}
            </ul>
          </div>
          <Link to="/concierge" className="mt-8 inline-flex items-center gap-2 text-sm font-medium">
            Our Services <ArrowRight className="h-4 w-4 text-bronze" />
          </Link>
        </div>

        <img
          src={luxuryImages.service}
          alt="Discreet private service on arrival"
          className="h-64 w-full object-cover lg:h-full"
          loading="lazy"
        />
      </section>

      {/* Mosaic: family, destinations, private office */}
      <section className="grid lg:grid-cols-[0.8fr_1fr_1.3fr_0.9fr]">
        <div className="bg-background px-7 py-10 md:px-9">
          <Eyebrow tone="bronze">Family &amp; Legacy</Eyebrow>
          <h2 className="mt-5 font-display text-3xl leading-[1.08] md:text-4xl">
            Build a bigger world for the people it&rsquo;s all for.
          </h2>
          <p className="mt-6 text-sm leading-7 text-muted-foreground">
            Supporting your family today, and the next generation tomorrow — with learning, mentorship,
            opportunities and a trusted community.
          </p>
          <Link to="/next-gen" className="mt-7 inline-flex items-center gap-2 text-sm font-medium">
            Next Generation <ArrowRight className="h-4 w-4 text-bronze" />
          </Link>
        </div>

        <img
          src={luxuryImages.family}
          alt="A family watching the sunset together"
          className="h-64 w-full object-cover lg:h-full"
          loading="lazy"
        />

        <div className="bg-ink px-7 py-10 text-background md:px-9">
          <Eyebrow>Where life takes you</Eyebrow>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {destinations.map((city) => (
              <Link key={city.name} to="/global-life" className="group relative block overflow-hidden">
                <img
                  src={city.image}
                  alt={city.name}
                  className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/90 to-transparent p-3 text-sm font-medium">
                  {city.name}
                </span>
              </Link>
            ))}
          </div>
          <Link
            to="/global-life"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-background/85"
          >
            Explore All Destinations <ArrowRight className="h-4 w-4 text-gold" />
          </Link>
        </div>

        <div className="relative isolate overflow-hidden bg-ink px-7 py-10 text-background md:px-9">
          <img
            src={luxuryImages.office}
            alt="A private office library at dusk"
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45"
            loading="lazy"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/40" />
          <Eyebrow>Private Office</Eyebrow>
          <h2 className="mt-5 font-display text-3xl leading-[1.1] md:text-4xl">
            A private office.
            <br />
            Quietly behind the life.
          </h2>
          <p className="mt-6 text-sm leading-7 text-background/72">
            The intelligence, research, operations and governance that support your world — handled with the
            highest standards of privacy and care.
          </p>
          <Link
            to="/concierge"
            className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-gold"
          >
            Our Private Office <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Montvelle World */}
      <section className="border-t border-border bg-linen">
        <div className="mx-auto grid w-full max-w-[110rem] gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[0.92fr_1.08fr] lg:px-14 lg:py-28">
          <div>
            <Eyebrow tone="bronze">Montvelle World</Eyebrow>
            <h2 className="mt-6 max-w-[16ch] font-display text-5xl leading-[0.98] md:text-7xl">
              The private world behind the membership.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">
              Not another concierge app. Montvelle World is the private environment where the whole picture of a
              family's life stays in one place — the requests in motion, the decisions being weighed, the people you
              choose to know — and the experts we find and assemble around a decision when you need them, and the household around you.
            </p>
            <p className="mt-5 max-w-xl text-base leading-8 text-muted-foreground">
              A conventional concierge holds a phone number and a memory. A private club holds a room. Montvelle holds
              continuity: every request acknowledged immediately and answered meaningfully within twenty-four hours, by
              people who already know the context. The technology exists so the relationship never has to start again.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-5">
              <Button asChild className="h-12 rounded-none bg-ink px-8 text-background hover:bg-oxblood">
                <Link to="/montvelle-world">
                  Explore Montvelle World <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 border-b border-bronze pb-1 text-sm font-medium text-foreground"
              >
                Explore the demo <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-px bg-border sm:grid-cols-2">
            {[
              {
                name: "Today",
                copy: "What needs you, what Montvelle is already handling, and what is coming up — in that order.",
              },
              {
                name: "Requests",
                copy: "One place to ask for anything. Immediate acknowledgement, a meaningful response within 24 hours.",
              },
              {
                name: "Decision Room",
                copy: "For the decisions that deserve more than a phone call: options, sequence, and who is doing what.",
              },
              {
                name: "Invitations",
                copy: "Gatherings and private moments held for you, kept quietly in one diary.",
              },
              {
                name: "Expert Councils",
                copy: "A council assembled around your decision, not a standing panel. We search worldwide and return a short, checked list.",
              },
              {
                name: "Community & your circle",
                copy: "Consent-led introductions, plus help building the wider circle of people useful to a particular goal.",
              },
              {
                name: "Family & household",
                copy: "Approved adults hold their own login and their own privacy. Sharing is deliberate, area by area.",
              },
              {
                name: "Messages",
                copy: "A continuous private line to the people who already hold your context.",
              },
              {
                name: "Preferences",
                copy: "How your household likes things done, recorded once and applied without being asked again.",
              },
            ].map((item) => (
              <article key={item.name} className="bg-linen p-6">
                <h3 className="font-display text-2xl leading-tight">{item.name}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

