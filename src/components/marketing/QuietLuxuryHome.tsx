import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, HeartHandshake, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

const images = {
  hero: "/images/quiet-luxury/hero.webp",
  home: "/images/quiet-luxury/home.webp",
  service: "/images/quiet-luxury/service.webp",
  learning: "/images/quiet-luxury/learning.webp",
  connect: "/images/quiet-luxury/connect.webp",
  office: "/images/quiet-luxury/office.webp",
} as const;

export function QuietLuxuryHome() {
  return (
    <main className="overflow-hidden bg-background">
      <section className="relative min-h-[78vh] bg-[#d8cbb8] md:min-h-[86vh]">
        <img src={images.hero} alt="A couple arriving at a private London house" className="absolute inset-0 h-full w-full object-cover object-center" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/42 via-black/16 to-transparent" />
        <Container className="relative flex min-h-[78vh] items-end pb-16 pt-28 md:min-h-[86vh] md:pb-24">
          <div className="max-w-3xl text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/72">Private membership · London & beyond</p>
            <h1 className="mt-6 max-w-[11ch] text-balance font-display text-6xl leading-[0.93] md:text-8xl xl:text-[7.5rem]">
              A private world around the life you've built.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/82 md:text-lg">
              Beautiful places. Trusted people. Family, culture, travel and a discreet private office behind it all.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-white px-7 text-foreground hover:bg-white/90"><Link to="/apply">Request membership</Link></Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/55 bg-transparent px-7 text-white hover:bg-white hover:text-foreground"><Link to="/gatherings">Explore the world <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-28 md:py-40">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-oxblood">The life behind the membership</p>
            <h2 className="mt-8 text-balance font-display text-5xl leading-[1.02] md:text-7xl">Luxury should feel simple.</h2>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">The best lives are not defined by how much is visible. They are defined by ease, trusted relationships, time with the people who matter and the freedom to move between places without starting again.</p>
          </div>
        </Container>
      </section>

      <section className="pb-28 md:pb-40">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end lg:gap-20">
            <figure className="overflow-hidden rounded-[2px]"><img src={images.home} alt="A couple arriving at one of their homes" className="aspect-[4/3] w-full object-cover" loading="lazy" /></figure>
            <div className="pb-2 lg:pb-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-oxblood">Move</p>
              <h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.01] md:text-6xl">One life. More than one home.</h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">London for part of the year. Somewhere warmer when it suits the family. Children in one place, work in another. The support around you should travel as naturally as you do.</p>
              <Link to="/global-life" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">The world around membership <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#eee6da] py-28 md:py-40">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-oxblood">Belong</p>
              <h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.01] md:text-6xl">Some rooms become part of your life.</h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">A dinner you look forward to. A familiar host. People you can speak to without the performance. The Table is deliberately small enough for relationships to become real.</p>
              <Link to="/the-table" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">The Table <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <figure className="overflow-hidden"><img src={images.connect} alt="Members in conversation at an intimate gathering" className="aspect-[4/3] w-full object-cover" loading="lazy" /></figure>
          </div>
        </Container>
      </section>

      <section className="py-28 md:py-40">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
            <figure className="overflow-hidden"><img src={images.service} alt="Discreet service at a private house" className="aspect-[4/3] w-full object-cover" loading="lazy" /></figure>
            <div>
              <div className="flex items-center gap-3"><Compass className="h-4 w-4 text-oxblood" /><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-oxblood">Live</p></div>
              <h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.01] md:text-6xl">The best service is the part you barely notice.</h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">A reservation handled. A school visit arranged. A trusted specialist found. A family journey made easier. Good service should return time to you, not create another layer to manage.</p>
              <Link to="/concierge" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Private service <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#173924] py-28 text-[#f5f0e7] md:py-40">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d9b37a]">Families</p>
              <h2 className="mt-5 max-w-xl font-display text-5xl leading-[1.01] md:text-6xl">Give the next generation a wider world.</h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-[#f5f0e7]/72">School is one part of education. Confidence, judgement, curiosity, culture, enterprise and the ability to turn an idea into something real are part of it too.</p>
              <Link to="/family-learning" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#f5f0e7]">Families & learning <ArrowRight className="h-4 w-4 text-[#d9b37a]" /></Link>
            </div>
            <figure className="overflow-hidden"><img src={images.learning} alt="A parent and teenager learning together in a private study" className="aspect-[4/3] w-full object-cover" loading="lazy" /></figure>
          </div>
        </Container>
      </section>

      <section className="py-28 md:py-40">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <HeartHandshake className="mx-auto h-5 w-5 text-oxblood" />
            <h2 className="mt-8 text-balance font-display text-5xl leading-[1.02] md:text-7xl">The right people make the world feel smaller.</h2>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-muted-foreground">A family who already knows the city. An adviser someone genuinely trusts. A mentor who can widen a young person's view. A host who knows who should meet. The network is built around context, not contact lists.</p>
            <div className="mt-9 flex justify-center gap-6"><Link to="/partners" className="inline-flex items-center gap-2 text-sm font-semibold">Trusted people <ArrowRight className="h-4 w-4" /></Link><Link to="/gatherings" className="inline-flex items-center gap-2 text-sm font-semibold">Gatherings <ArrowRight className="h-4 w-4" /></Link></div>
          </div>
        </Container>
      </section>

      <section className="relative min-h-[70vh] overflow-hidden bg-foreground text-white">
        <img src={images.office} alt="A family reviewing plans with a trusted adviser" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/36 to-transparent" />
        <Container className="relative flex min-h-[70vh] items-center py-24 md:py-32">
          <div className="max-w-2xl">
            <Sparkles className="h-5 w-5 text-[#d9b37a]" />
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/64">Behind the life</p>
            <h2 className="mt-5 font-display text-5xl leading-[1.01] md:text-7xl">Beautiful on the outside. Serious underneath.</h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/76">When life crosses countries, companies, advisers and generations, the private office keeps the whole picture connected — quietly, securely and only when you need it.</p>
            <Link to="/concierge" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">Discover the private office <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Container>
      </section>

      <section className="py-28 md:py-40">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-oxblood">By invitation</p>
            <h2 className="mt-6 text-balance font-display text-5xl leading-[1.02] md:text-7xl">Come for the world around it. Stay because the circle becomes part of your life.</h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground">Membership begins with fit. We are building slowly enough for the culture to matter.</p>
            <Button asChild size="lg" className="mt-9 rounded-full px-8"><Link to="/apply">Request membership</Link></Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
