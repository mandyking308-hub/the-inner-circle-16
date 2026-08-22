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
  image,
  imageAlt,
  imageCaption,
}: {
  eyebrow: string;
  title: string;
  introduction: string;
  blocks: EditorialBlock[];
  closingTitle?: string;
  closingBody?: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
}) {
  return (
    <>
      <section className="py-24 md:py-36 lg:py-44">
        <Container>
          <div className={image ? "grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-24" : "mx-auto max-w-5xl text-center"}>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-oxblood">{eyebrow}</p>
              <h1 className="mt-7 max-w-5xl text-balance font-display text-6xl leading-[0.98] md:text-8xl">{title}</h1>
              <p className={`mt-8 text-base leading-8 text-muted-foreground md:text-lg ${image ? "max-w-xl" : "mx-auto max-w-3xl"}`}>{introduction}</p>
            </div>
            {image ? (
              <figure>
                <img src={image} alt={imageAlt ?? ""} className="aspect-[4/3] w-full object-cover" />
                {imageCaption ? <figcaption className="mt-4 max-w-xl text-[11px] leading-5 text-muted-foreground">{imageCaption}</figcaption> : null}
              </figure>
            ) : null}
          </div>
        </Container>
      </section>

      <section className="bg-[#efe8dd] py-24 md:py-36 lg:py-44">
        <Container>
          <div className="mx-auto max-w-6xl space-y-24 md:space-y-32">
            {blocks.map((block, index) => (
              <article key={block.title} className={`grid gap-7 md:grid-cols-[0.38fr_0.62fr] md:gap-16 ${index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-oxblood">{block.kicker ?? `0${index + 1}`}</p>
                  <h2 className="mt-4 font-display text-4xl leading-[1.04] md:text-5xl">{block.title}</h2>
                </div>
                <p className="max-w-2xl text-base leading-8 text-muted-foreground">{block.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-28 md:py-40">
        <Container>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-oxblood">By invitation</p>
            <h2 className="mt-6 text-balance font-display text-5xl leading-[1.03] md:text-7xl">{closingTitle ?? "The right room starts with the right people."}</h2>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-muted-foreground">{closingBody ?? "Applications are reviewed personally. The community grows carefully, one relationship at a time."}</p>
            <Button asChild size="lg" className="mt-9 rounded-full px-8"><Link to="/apply">Request membership <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
          </div>
        </Container>
      </section>
    </>
  );
}
