import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { journalArticles } from "@/data/journal";
import { knowledgeLibrary } from "@/data/knowledgeLibrary";
import { ExpertCouncilCta } from "@/components/private/RequestCtas";

export const Route = createFileRoute("/member/knowledge/")({ component: KnowledgePage });

const STORAGE_KEY = "project-table:saved-knowledge";

type ArchiveResult = {
  id: string;
  type: "Briefing" | "Journal" | "Playbook";
  title: string;
  summary: string;
  category: string;
  /** Every result opens something real. */
  to: "internal" | "journal";
  slug: string;
};

function KnowledgePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [saved, setSaved] = useState<string[]>([]);
  const [archiveQuestion, setArchiveQuestion] = useState("");
  const [asked, setAsked] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setSaved(JSON.parse(raw) as string[]);
    } catch {
      // Saved state is optional.
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  }, [saved]);

  const archive: ArchiveResult[] = useMemo(
    () => [
      ...knowledgeLibrary.map((item) => ({
        id: item.id,
        type: item.type,
        title: item.title,
        summary: item.summary,
        category: item.category,
        to: "internal" as const,
        slug: item.id,
      })),
      ...journalArticles.map((item) => ({
        id: `journal-${item.slug}`,
        type: "Journal" as const,
        title: item.title,
        summary: item.deck,
        category: item.category,
        to: "journal" as const,
        slug: item.slug,
      })),
    ],
    [],
  );

  const categories = ["All", ...Array.from(new Set(archive.map((item) => item.category)))];
  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return archive.filter(
      (item) =>
        (category === "All" || item.category === category) &&
        (!needle || [item.title, item.summary, item.category, item.type].join(" ").toLowerCase().includes(needle)),
    );
  }, [archive, category, query]);

  const archiveAnswers = useMemo(() => {
    if (!asked || !archiveQuestion.trim()) return [];
    const terms = archiveQuestion.toLowerCase().split(/[^a-z0-9]+/).filter((term) => term.length > 2);
    return archive
      .map((item) => ({
        item,
        score: terms.reduce(
          (sum, term) => sum + ([item.title, item.summary, item.category].join(" ").toLowerCase().includes(term) ? 1 : 0),
          0,
        ),
      }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5)
      .map(({ item }) => item);
  }, [archive, archiveQuestion, asked]);

  const toggleSaved = (id: string) =>
    setSaved((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

  const OpenLink = ({ item, className }: { item: ArchiveResult; className?: string }) =>
    item.to === "journal" ? (
      <Link to="/journal/$slug" params={{ slug: item.slug }} className={className}>
        Read </Link>
    ) : (
      <Link to="/member/knowledge/$id" params={{ id: item.slug }} className={className}>
        Open </Link>
    );

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Knowledge"
        title="Ask what the institution already knows"
        description="Briefings, playbooks and Journal essays, organised around decisions members actually face. Everything listed here opens to real material — nothing is held back behind a placeholder."
      />

      <section className="border border-border bg-foreground p-6 text-background md:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
          <div>
            <p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-background/45">Ask the Archive</p>
            <h2 className="mt-3 font-display text-4xl leading-tight">Start with the problem, not the category.</h2>
          </div>
          <div>
            <div className="flex gap-2">
              <Input
                value={archiveQuestion}
                onChange={(event) => {
                  setArchiveQuestion(event.target.value);
                  setAsked(false);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") setAsked(true);
                }}
                className="rounded-none border-background/25 bg-background/10 text-background placeholder:text-background/35"
                placeholder="e.g. moving to Dubai — schools, residence and company questions"
              />
              <Button type="button" className="rounded-none bg-oxblood" onClick={() => setAsked(true)}>
                Search
              </Button>
            </div>
            <p className="mt-3 text-[10px] leading-5 text-background/45">
              This is a search of the material held here. It retrieves notes; it does not answer questions, generate
              advice, or know anything beyond this archive.
            </p>
          </div>
        </div>
        {asked ? (
          <div className="mt-7 grid gap-px bg-background/15 md:grid-cols-2">
            {archiveAnswers.length ? (
              archiveAnswers.map((item) => (
                <article key={item.id} className="bg-foreground p-5">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-bronze">
                    {item.type} · {item.category}
                  </p>
                  <h3 className="mt-3 font-display text-3xl">{item.title}</h3>
                  <p className="mt-3 text-xs leading-6 text-background/60">{item.summary}</p>
                  <OpenLink item={item} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold" />
                </article>
              ))
            ) : (
              <p className="bg-foreground p-5 text-sm text-background/60">
                Nothing here matches closely enough. Make a Request rather than treating a weak search result as an
                answer.
              </p>
            )}
          </div>
        ) : null}
      </section>

      <section className="border border-border bg-card p-4 md:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="rounded-none pl-9"
              placeholder="Browse briefings, essays and playbooks"
            />
          </label>
          <div className="flex max-w-full gap-2 overflow-x-auto">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`shrink-0 border px-3 py-2 text-[10px] ${category === item ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <article
            key={item.id}
            className="group border border-border bg-card p-5 transition-colors hover:bg-accent/20 md:p-6"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-[9px] uppercase tracking-[0.18em] text-oxblood">
                {item.type} · {item.category}
              </span>
              <button
                type="button"
                onClick={() => toggleSaved(item.id)}
                aria-label={saved.includes(item.id) ? "Remove saved item" : "Save item"}
              >
                </button>
            </div>
            <h2 className="mt-5 font-display text-3xl leading-tight">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p>
            <OpenLink item={item} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold" />
          </article>
        ))}
      </div>

      <section className="border border-border bg-card p-6">
        <p className="eyebrow text-oxblood">Saved for you</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {saved.length ? (
            archive
              .filter((item) => saved.includes(item.id))
              .map((item) => (
                <div key={item.id} className="border-t border-border pt-3">
                  <p className="text-[9px] uppercase tracking-[0.13em] text-muted-foreground">{item.type}</p>
                  <OpenLink item={item} className="mt-1 inline-flex items-center gap-2 text-sm font-semibold" />
                  <p className="mt-1 text-sm">{item.title}</p>
                </div>
              ))
          ) : (
            <p className="text-sm text-muted-foreground">Save useful material and it will stay in your private reading list.</p>
          )}
        </div>
      </section>

      <section className="border border-border bg-foreground p-6 text-background md:p-8">
        <p className="eyebrow text-background/50">Areas we curate</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl">The archive grows around the questions members bring.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-background/65">
          These are the themes we write for and commission against. They are areas of curation, not standing committees
          — where a question needs a specialist, we find the right one for that question.
        </p>
        <div className="mt-7 grid gap-px bg-background/15 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from(new Set(knowledgeLibrary.map((item) => item.category))).map((theme) => (
            <button
              key={theme}
              type="button"
              onClick={() => {
                setCategory(theme);
                setQuery("");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="bg-foreground p-4 text-left text-sm leading-6 text-background/85 hover:bg-background/10"
            >
              {theme}
            </button>
          ))}
        </div>
        <Button
          asChild
          variant="outline"
          className="mt-7 rounded-none border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"
        >
          <Link to="/journal">
            Open public Journal </Link>
        </Button>
      </section>

      <ExpertCouncilCta topic={category === "All" ? undefined : category} />
    </div>
  );
}
