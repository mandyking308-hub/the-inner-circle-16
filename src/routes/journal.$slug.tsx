import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { findJournalArticle, journalArticles } from "@/data/journal";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = findJournalArticle(params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.title ?? "Journal"} — ${site.name}` },
      { name: "description", content: loaderData?.deck ?? site.description },
    ],
  }),
  component: JournalArticlePage,
});

function JournalArticlePage() {
  const article = Route.useLoaderData();
  const next = journalArticles.find((item) => item.slug !== article.slug) ?? journalArticles[0]!;

  return (
    <>
      <section className="border-b border-foreground/15 bg-linen py-14 md:py-20">
        <Container>
          <Link to="/journal" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"><ArrowLeft className="h-3.5 w-3.5" />Journal</Link>
          <div className="mt-10 grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
            <div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">{article.category} · {article.date} · {article.readTime}</p><h1 className="mt-5 font-display text-5xl leading-[0.98] md:text-7xl">{article.title}</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{article.deck}</p></div>
            <div className="overflow-hidden border border-foreground/15"><img src={luxuryImages[article.image]} alt="Editorial image for this Montvelle journal essay" className="aspect-[4/3] w-full object-cover" /></div>
          </div>
        </Container>
      </section>

      <article className="py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <p className="font-display text-3xl leading-[1.35] text-foreground md:text-4xl">{article.introduction}</p>
            <div className="mt-12 space-y-12">
              {article.sections.map((section, index) => (
                <section key={section.heading} className="border-t border-foreground/15 pt-7">
                  <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">0{index + 1}</p>
                  <h2 className="mt-3 font-display text-4xl leading-[1.05]">{section.heading}</h2>
                  <p className="mt-5 text-base leading-8 text-muted-foreground">{section.body}</p>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </article>

      <section className="border-y border-background/10 bg-foreground py-16 text-background md:py-20">
        <Container><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">Continue reading</p><h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight md:text-5xl">{next.title}</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-background/62">{next.deck}</p></div><Button asChild variant="outline" className="rounded-none border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"><Link to="/journal/$slug" params={{ slug: next.slug }}>Read next <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container>
      </section>
    </>
  );
}
