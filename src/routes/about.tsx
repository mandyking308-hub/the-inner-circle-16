import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Compass, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: `Why this exists — ${site.name}` }, { name: "description", content: "Why Project Table exists: one private world around people, places, family, trusted help and serious private-office infrastructure." }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative min-h-[78vh] overflow-hidden bg-[#171716] text-white">
        <img src={luxuryImages.world} alt="A beautiful coastal home and landscape" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(12,12,11,0.72)_0%,rgba(12,12,11,0.42)_42%,rgba(12,12,11,0.08)_78%)]" />
        <Container className="relative flex min-h-[78vh] items-end py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/62">Why Project Table exists</p>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">A good life should feel connected.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/78">People, places, family, opportunity and trusted help should not live in completely separate worlds.</p>
          </div>
        </Container>
      </section>

      <section className="py-32 md:py-48">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-oxblood">The idea</p></div>
            <div>
              <h2 className="max-w-5xl font-display text-5xl leading-[1.02] md:text-7xl">The best parts of life are rarely organised by category.</h2>
              <div className="mt-9 grid gap-8 text-base leading-8 text-muted-foreground md:grid-cols-2">
                <p>A move may involve schools, property, advisers, friendships, travel and family timing all at once. A business decision may affect the next generation. A useful introduction may matter more than another report.</p>
                <p>Project Table brings those worlds closer together: a permanent circle, global relationships, family experiences, private service and a serious operating layer behind it when the question becomes important.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#efe8dd] py-32 md:py-48">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[1.18fr_0.82fr] lg:items-center lg:gap-24">
            <figure className="overflow-hidden"><img src={luxuryImages.table} alt="A private gathering among trusted people" className="aspect-[16/11] w-full object-cover" loading="lazy" /></figure>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-oxblood">The human layer</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">The right people change what becomes possible.</h2>
              <p className="mt-7 text-base leading-8 text-muted-foreground">A familiar Table. A family who already knows the city. An adviser introduced with context. A mentor who widens a young person's view. A host who knows who should meet.</p>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">Project Table is designed so relationships deepen rather than reset every time a new question appears.</p>
              <Link to="/the-table" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">The Table <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-32 md:py-48">
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.78fr_1.22fr] lg:items-center lg:gap-24">
            <div>
              <Compass className="h-5 w-5 text-oxblood" />
              <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-oxblood">The private office</p>
              <h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">And underneath the beautiful life, serious foundations.</h2>
              <p className="mt-7 max-w-lg text-base leading-8 text-muted-foreground">Decision Rooms, Family Architecture, Trusted Partners, Global Life and Concierge keep context connected when the member needs more than inspiration or access.</p>
              <p className="mt-5 max-w-lg text-sm leading-7 text-muted-foreground">The technology is there to remember, prepare and coordinate. It should never become the personality of the membership.</p>
              <Link to="/ecosystem" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Inside the private office <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <figure className="overflow-hidden"><img src={luxuryImages.office} alt="A quiet private office and study" className="aspect-[4/3] w-full object-cover" loading="lazy" /></figure>
          </div>
        </Container>
      </section>

      <section className="bg-[#171716] py-28 text-white md:py-40">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><ShieldCheck className="h-5 w-5 text-[#c9a56d]" /><p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55">The standard</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">Warm enough to feel personal. Serious enough to trust.</h2></div>
            <Button asChild size="lg" className="rounded-full bg-white px-8 text-foreground hover:bg-white/90"><Link to="/apply">Request membership <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
