import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { expertCouncilNeed } from "@/components/private/RequestCtas";
import { findKnowledgeDoc } from "@/data/knowledgeLibrary";

export const Route = createFileRoute("/member/knowledge/$id")({
  loader: ({ params }) => {
    const doc = findKnowledgeDoc(params.id);
    if (!doc) throw notFound();
    return { doc };
  },
  notFoundComponent: KnowledgeNotFound,
  component: KnowledgeDetailPage,
});

function KnowledgeNotFound() {
  return (
    <div className="border border-border bg-card p-8">
      <h1 className="font-display text-4xl">That note is not in the archive.</h1>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">
        It may have been renamed. Everything currently held is listed in Knowledge.
      </p>
      <Link
        to="/member/knowledge"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-oxblood"
      >
        Back to Knowledge
      </Link>
    </div>
  );
}

function KnowledgeDetailPage() {
  const { doc } = Route.useLoaderData();

  return (
    <article className="space-y-8">
      <header className="border border-border bg-card p-6 md:p-9">
        <Link
          to="/member/knowledge"
          className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
        >
          Knowledge
        </Link>
        <p className="mt-6 text-[9px] uppercase tracking-[0.18em] text-oxblood">
          {doc.type} · {doc.category} · {doc.readTime}
        </p>
        <h1 className="mt-4 max-w-[22ch] font-display text-4xl leading-[1.02] md:text-6xl">{doc.title}</h1>
        <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">{doc.summary}</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr] lg:items-start">
        <div className="divide-y divide-border border border-border bg-card">
          {doc.sections.map((section) => (
            <section key={section.heading} className="p-6 md:p-8">
              <h2 className="font-display text-2xl leading-tight md:text-3xl">{section.heading}</h2>
              {section.body ? (
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{section.body}</p>
              ) : null}
              {section.items ? (
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3 border-t border-border pt-3 text-sm leading-7 text-muted-foreground first:border-t-0 first:pt-0">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-bronze" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="border border-border bg-foreground p-6 text-background">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-bronze">Do something with this</p>
            <div className="mt-5 space-y-3">
              <Button
                asChild
                className="w-full justify-start rounded-none bg-background text-foreground hover:bg-bronze hover:text-foreground"
              >
                <Link
                  to="/member/control-room"
                  search={{ topic: doc.decisionRoom ?? doc.title }}
                >
                  Start a Decision Room
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start rounded-none border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"
              >
                <Link
                  to="/member/services"
                  search={{ need: doc.requestPrompt ?? `We would like help with: ${doc.title}.` }}
                >
                  Ask Montvelle to handle this
                </Link>
              </Button>
            </div>
            <p className="mt-5 text-[10px] leading-5 text-background/50">
              Both options open with this subject already filled in. Nothing is sent until you send it.
            </p>
          </div>

          <div className="border border-border bg-card p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-oxblood">
              Beyond the archive
            </p>
            <h2 className="mt-3 font-display text-2xl leading-tight">
              Need expertise beyond the archive? Assemble an Expert Council.
            </h2>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">
              A council is created for your actual decision — not a standing panel. Give us the
              outcome, the geography and the timing, and we research worldwide, check who genuinely
              fits and come back with a short, considered shortlist.
            </p>
            <Link
              to="/member/services"
              search={{ need: expertCouncilNeed(doc.title) }}
              className="mt-5 inline-flex items-center border border-foreground bg-foreground px-4 py-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-oxblood"
            >
              Assemble an Expert Council
            </Link>
          </div>

          {doc.boundary ? (
            <div className="border border-border bg-accent/30 p-5">
              <p className="mt-3 text-[11px] leading-6 text-muted-foreground">{doc.boundary}</p>
            </div>
          ) : null}

          <Link
            to="/member/knowledge"
            className="inline-flex items-center gap-2 text-sm font-semibold text-oxblood"
          >
            More in the archive </Link>
        </aside>
      </div>
    </article>
  );
}
