import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe2, MapPinned, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { pageImages } from "@/data/pageImages";
import { worldNodes, worldPrinciples } from "@/data/world";
import { site } from "@/config/site";

export const Route = createFileRoute("/world")({
  head: () => ({
    meta: [
      { title: `The World — ${site.name}` },
      { name: "description", content: "A growing global intelligence layer for families whose lives, businesses and advisers cross borders." },
    ],
    links: [{ rel: "canonical", href: `${site.url}/world` }],
  }),
  component: WorldPage,
});

function WorldPage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={pageImages.worldHero} alt="A globally mobile family arriving by private aviation" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/74 to-foreground/18" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">The world around the family</p>
            <h1 className="mt-6 max-w-[10ch] font-display text-6xl leading-[0.93] md:text-8xl">Global life should feel connected, not scattered.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/72">A family may live in one country, own companies in another, educate children in a third and rely on advisers in four more. The useful product is not a list of cities. It is one view of how the whole life fits together.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-none bg-oxblood px-8"><Link to="/global-life">Open Global Life <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              <Button asChild size="lg" variant="outline" className="rounded-none border-background/35 bg-transparent px-8 text-background hover:bg-background hover:text-foreground"><Link to="/membership">Membership</Link></Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
            <div><p className="eyebrow text-oxblood">A growing intelligence layer</p><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Useful geography, without pretending we have an office everywhere.</h2></div>
            <p className="max-w-xl text-sm leading-7 text-muted-foreground lg:justify-self-end">Each node below represents a place where member experience, family decisions or deliberate relationship-building make local intelligence useful. Formal partners, reciprocal places and benefits are only shown when they actually exist.</p>
          </div>
          <div className="mt-12 grid gap-px bg-foreground/15 md:grid-cols-2 xl:grid-cols-4">
            {worldNodes.map((node) => (
              <article key={node.city} className="bg-background p-6 md:p-7">
                <div className="flex items-start justify-between gap-4"><div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">{node.status}</p><h3 className="mt-3 font-display text-4xl">{node.city}</h3><p className="mt-1 text-xs text-muted-foreground">{node.region}</p></div><MapPinned className="h-5 w-5 text-bronze" /></div>
                <p className="mt-5 text-sm leading-7 text-muted-foreground">{node.line}</p>
                <div className="mt-5 flex flex-wrap gap-2">{node.usefulFor.map((item) => <span key={item} className="border border-foreground/12 px-2 py-1 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{item}</span>)}</div>
                <p className="mt-5 border-t border-foreground/12 pt-4 text-[10px] leading-5 text-muted-foreground">{node.note}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div><Globe2 className="h-5 w-5 text-bronze" /><p className="mt-7 eyebrow text-background/50">The standard</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">Global should mean coordinated.</h2></div>
            <div className="grid gap-px bg-background/15 sm:grid-cols-2">{worldPrinciples.map((item) => <article key={item.title} className="bg-foreground p-6"><h3 className="font-display text-3xl">{item.title}</h3><p className="mt-4 text-sm leading-7 text-background/62">{item.body}</p></article>)}</div>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-8 border border-foreground/15 bg-card p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div><ShieldCheck className="h-5 w-5 text-oxblood" /><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02]">The family owns the decision. Local specialists own the regulated advice. We keep the whole picture visible.</h2></div>
            <Button asChild size="lg" className="rounded-none bg-oxblood px-8"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
