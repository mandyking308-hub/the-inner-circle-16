import { Link } from "@tanstack/react-router";
import { ArrowRight, Compass, HeartHandshake, Sparkles } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

const images = {
  hero: "https://images.unsplash.com/photo-1741031535418-b241b1d245a2?auto=format&fit=crop&w=2400&q=88",
  home: "https://images.unsplash.com/photo-1740596261028-29a7ad308157?auto=format&fit=crop&w=2000&q=86",
  service: "https://images.unsplash.com/photo-1775257796019-3e8db981a1a6?auto=format&fit=crop&w=1800&q=86",
  learning: "https://images.unsplash.com/photo-1758687126499-9ff30d1c5762?auto=format&fit=crop&w=1800&q=86",
  connect: "https://images.unsplash.com/photo-1768508948835-7dbab7ca6d58?auto=format&fit=crop&w=1800&q=86",
  office: "https://images.unsplash.com/photo-1767277680055-34f1eeec0c26?auto=format&fit=crop&w=1800&q=86",
} as const;

export function QuietLuxuryHome() {
  return (
    <main className="overflow-hidden bg-background">
      <section className="relative min-h-[82vh] bg-[#d8cbb8] md:min-h-[90vh]">
        <img src={images.hero} alt="An elegant London townhouse entrance" className="absolute inset-0 h-full w-full object-cover object-center" fetchPriority="high" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/48 via-black/18 to-transparent" />
        <Container className="relative flex min-h-[82vh] items-end pb-16 pt-28 md:min-h-[90vh] md:pb-24">
          <div className="max-w-3xl text-white">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">Private membership · London & beyond</p>
            <h1 className="mt-6 max-w-[11ch] text-balance font-display text-6xl leading-[0.94] md:text-8xl xl:text-[7.4rem]">A private world around the life you've built.</h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/82 md:text-lg">Beautiful places. Trusted people. Family, culture, travel and discreet support around it all.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-white px-7 text-foreground hover:bg-white/90"><Link to="/apply">Request membership</Link></Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-white/55 bg-transparent px-7 text-white hover:bg-white hover:text-foreground"><Link to="/gatherings">Explore the world <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-32 md:py-44">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-oxblood">The life behind the membership</p>
            <h2 className="mt-8 text-balance font-display text-5xl leading-[1.03] md:text-7xl">Luxury should feel simple.</h2>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-muted-foreground md:text-lg">Ease. Beautiful places. People you trust. Time with family. The freedom to move without rebuilding your world every time life changes.</p>
          </div>
        </Container>
      </section>

      <section className="pb-32 md:pb-44">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:items-end lg:gap-24">
            <figure className="overflow-hidden"><img src={images.home} alt="London homes and architecture" className="aspect-[4/3] w-full object-cover" loading="lazy" /></figure>
            <div className="lg:pb-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-oxblood">Move</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">One life. More than one home.</h2>
              <p className="mt-7 text-base leading-8 text-muted-foreground">London for part of the year. Somewhere warmer when it suits. Children in one place, work in another. The support around you should travel as naturally as you do.</p>
              <Link to="/global-life" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">The world around membership <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#efe8dd] py-32 md:py-44">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-24">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-oxblood">Belong</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Some rooms become part of your life.</h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">A dinner you look forward to. A familiar host. People you can speak to without the performance. The circle is deliberately small enough for relationships to become real.</p>
              <Link to="/the-table" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">The Table <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <figure className="overflow-hidden"><img src={images.connect} alt="Guests at an elegant private dinner" className="aspect-[4/3] w-full object-cover" loading="lazy" /></figure>
          </div>
        </Container>
      </section>

      <section className="py-32 md:py-44">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-24">
            <figure className="overflow-hidden"><img src={images.service} alt="Discreet hospitality and service" className="aspect-[4/3] w-full object-cover object-top" loading="lazy" /></figure>
            <div>
              <div className="flex items-center gap-3"><Compass className="h-4 w-4 text-oxblood" /><p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-oxblood">Live</p></div>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">The best service is the part you barely notice.</h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">A reservation handled. A school visit arranged. A trusted specialist found. Good service returns time to you instead of creating another layer to manage.</p>
              <Link to="/concierge" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Private service <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#183b28] py-32 text-[#f5f0e7] md:py-44">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-24">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#d9b37a]">Families</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Give the next generation a wider world.</h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-[#f5f0e7]/72">School is one part of education. Confidence, judgement, curiosity, culture and the ability to make something happen are part of it too.</p>
              <Link to="/family-learning" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-white">Families & learning <ArrowRight className="h-4 w-4 text-[#d9b37a]" /></Link>
            </div>
            <figure className="overflow-hidden"><img src={images.learning} alt="A father and son learning together" className="aspect-[4/3] w-full object-cover" loading="lazy" /></figure>
          </div>
        </Container>
      </section>

      <section className="py-32 md:py-44">
        <Container>
          <div className="mx-auto max-w-5xl text-center">
            <HeartHandshake className="mx-auto h-5 w-5 text-oxblood" />
            <h2 className="mt-8 text-balance font-display text-5xl leading-[1.03] md:text-7xl">The right people make the world feel smaller.</h2>
            <p className="mx-auto mt-8 max-w-3xl text-base leading-8 text-muted-foreground">A family who already knows the city. An adviser somebody genuinely trusts. A mentor who widens a young person's view. A host who knows who should meet.</p>
          </div>
        </Container>
      </section>

      <section className="relative min-h-[72vh] overflow-hidden bg-foreground text-white">
        <img src={images.office} alt="A private study and office" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/42 to-black/12" />
        <Container className="relative flex min-h-[72vh] items-center py-24 md:py-32">
          <div className="max-w-2xl">
            <Sparkles className="h-5 w-5 text-[#d9b37a]" />
            <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/62">Behind the life</p>
            <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-7xl">Beautiful on the outside. Serious underneath.</h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-white/75">When life crosses countries, companies, advisers and generations, the private office keeps the whole picture connected — quietly and only when you need it.</p>
            <Link to="/concierge" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white">Discover the private office <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </Container>
      </section>

      <section className="py-32 md:py-44">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-oxblood">By invitation</p>
            <h2 className="mt-6 text-balance font-display text-5xl leading-[1.03] md:text-7xl">Come for the world around it. Stay because the circle becomes part of your life.</h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground">Membership begins with fit. We are building slowly enough for the culture to matter.</p>
            <Button asChild size="lg" className="mt-9 rounded-full px-8"><Link to="/apply">Request membership</Link></Button>
          </div>
        </Container>
      </section>
    </main>
  );
}
