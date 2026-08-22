import { Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

export function Hero() {
  return (
    <section className="border-b border-border/70 py-24 md:py-40">
      <Container>
        <p className="eyebrow">{site.location} &middot; By invitation only</p>
        <h1 className="font-display mt-8 max-w-3xl text-4xl leading-[1.08] text-foreground md:text-6xl">
          {site.positioning}
        </h1>
        <p className="mt-8 text-lg text-bronze md:text-xl">{site.supportingLine}</p>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground">
          {site.description}
        </p>
        <div className="mt-12">
          <Button asChild size="lg" className="rounded-none px-8">
            <Link to="/apply">{site.ctaLabel}</Link>
          </Button>
        </div>
      </Container>
    </section>
  );
}
