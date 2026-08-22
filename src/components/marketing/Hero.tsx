import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export function Hero() {
  return (
    <section className="border-b border-border/70 py-16 md:py-24 lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <div className="pb-2">
            <p className="eyebrow">{site.location} &middot; By invitation only</p>
            <h1 className="font-display mt-8 max-w-3xl text-5xl leading-[0.98] text-foreground md:text-7xl">
              {site.positioning}
            </h1>
            <p className="mt-7 text-lg text-bronze md:text-xl">{site.supportingLine}</p>
            <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground">
              {site.description}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-none px-8">
                <Link to="/apply">{site.ctaLabel}</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-none px-8">
                <Link to="/ecosystem">See the whole system <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </div>
          </div>
          <figure>
            <div className="overflow-hidden border border-border bg-card">
              <img src="/art/table-room.svg" alt="Editorial illustration of a private table in a London room" className="aspect-[4/3] w-full object-cover" />
            </div>
            <figcaption className="mt-3 flex items-start justify-between gap-5 text-[11px] leading-5 text-muted-foreground">
              <span>The Table is the room.</span>
              <span className="max-w-sm text-right">Global Life, Family Learning, Trusted Partners and Concierge turn the room into infrastructure.</span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
