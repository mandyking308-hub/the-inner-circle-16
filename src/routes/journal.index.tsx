import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpenText } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { journalArticles } from "@/data/journal";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: `Journal — ${site.name}` },
      { name: "description", content: "Practical thinking on family enterprise, global life, next-generation capability, advisers and the operating problems created by success." },
    ],
  }),
  component: JournalPage,
});

function JournalPage() {
  const lead = journalArticles[0]!;
  return (
    <>
      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div><p className="eyebrow text-oxblood">The Journal</p><h1 className="mt-5 max-w-[10ch] font-display text-6xl leading-[0.96] md:text-8xl">Useful thinking for the life behind the success.</h1></div>
            <p className="max-w-xl text-base leading-8 text-muted-foreground lg:justify-self-end">No content treadmill. We publish when a question is important enough to deserve a clear answer, a better framework or a practical playbook.</p>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-14 md:py-20">
        <Container>
          <Link to="/journal/$slug" params={{ slug: lead.slug }} className="group grid overflow-hidden border border-foreground/15 bg-card lg:grid-cols-[1.12fr_0.88fr]">
            <div className="relative min-h-[420px] overflow-hidden"><img src={luxuryImages[lead.image]} alt="A globally mobile family arriving in London" className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02] md:object-[38%_center] xl:object-center" /><div className="absolute inset-0 bg-gradient-to-t from-foreground/55 via-transparent to-transparent" /></div>
            <div className="flex flex-col justify-center p-7 md:p-10 lg:p-12"><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">{lead.category} · {lead.readTime}</p><h2 className="mt-5 font-display text-5xl leading-[1.02]">{lead.title}</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">{lead.deck}</p><span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Read the essay <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div>
          </Link>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-8 flex items-end justify-between gap-5"><div><p className="eyebrow text-oxblood">Latest thinking</p><h2 className="mt-3 font-display text-4xl md:text-5xl">Built around real decisions.</h2></div><BookOpenText className="h-5 w-5 text-bronze" /></div>
          <div className="grid gap-px bg-foreground/15 md:grid-cols-2 lg:grid-cols-3">
            {journalArticles.slice(1).map((article) => (
              <Link key={article.slug} to="/journal/$slug" params={{ slug: article.slug }} className="group bg-background p-6 md:p-7">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-oxblood">{article.category} · {article.readTime}</p>
                <h3 className="mt-5 font-display text-3xl leading-[1.06]">{article.title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{article.deck}</p>
                <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
