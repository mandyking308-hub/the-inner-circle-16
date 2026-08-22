import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export type EditorialBlock = {
  title: string;
  body: string;
  kicker?: string;
};

export function EditorialDetailPage({
  eyebrow,
  title,
  introduction,
  blocks,
  closingTitle,
  closingBody,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  blocks: EditorialBlock[];
  closingTitle?: string;
  closingBody?: string;
}) {
  return (
    <>
      <section className="border-b border-border py-20 md:py-32">
        <Container>
          <p className="eyebrow text-bronze">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl font-display text-5xl leading-[1.04] md:text-7xl">{title}</h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground">{introduction}</p>
        </Container>
      </section>

      <section className="border-b border-border py-16 md:py-24">
        <Container>
          <div className="divide-y divide-border border-y border-border">
            {blocks.map((block, index) => (
              <article key={block.title} className="grid gap-5 py-8 md:grid-cols-[90px_260px_1fr] md:py-10">
                <span className="font-display text-3xl text-bronze">0{index + 1}</span>
                <div>
                  {block.kicker ? <p className="mb-2 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{block.kicker}</p> : null}
                  <h2 className="font-display text-3xl leading-tight">{block.title}</h2>
                </div>
                <p className="max-w-3xl text-sm leading-8 text-muted-foreground">{block.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-7 border border-border bg-card p-7 md:p-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="eyebrow text-bronze">Request a seat</p>
              <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">{closingTitle ?? "The right room starts with the right people."}</h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">{closingBody ?? "Applications are reviewed personally. We are building a small founding community before optimising for scale."}</p>
            </div>
            <Button asChild size="lg" className="rounded-none px-8"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
