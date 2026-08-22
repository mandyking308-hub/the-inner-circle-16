import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BookOpenText, Search } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Input } from "@/components/ui/input";
import { expertCouncils, knowledge } from "@/data/community";

export const Route = createFileRoute("/member/knowledge")({
  component: KnowledgePage,
});

function KnowledgePage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const categories = ["All", ...Array.from(new Set(knowledge.map((item) => item.category)))];
  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return knowledge.filter((item) => {
      const categoryMatch = category === "All" || item.category === category;
      const textMatch = !needle || [item.title, item.summary, item.category, item.format].join(" ").toLowerCase().includes(needle);
      return categoryMatch && textMatch;
    });
  }, [query, category]);

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Knowledge"
        title="Useful thinking, not content volume."
        description="The library is built around decisions members actually face: governance, succession, family dynamics, technology, capital, risk, philanthropy and preparing the next generation."
      />

      <section className="border border-border bg-card p-4 md:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-none pl-9" placeholder="Search briefings, guides and research notes" />
          </label>
          <div className="flex flex-wrap gap-2">
            {categories.map((item) => (
              <button key={item} type="button" onClick={() => setCategory(item)} className={`border px-3 py-2 text-xs ${category === item ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground"}`}>{item}</button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((item) => (
          <article key={item.id} className="group border border-border bg-card p-5 transition-colors hover:bg-accent/20 md:p-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-[10px] uppercase tracking-[0.18em] text-bronze">{item.category}</span>
              <BookOpenText className="h-4 w-4 text-muted-foreground" />
            </div>
            <h2 className="mt-5 font-display text-3xl leading-tight">{item.title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p>
            <div className="mt-6 flex items-center justify-between border-t border-border pt-4 text-[11px] text-muted-foreground">
              <span>{item.format}</span><span>{item.readTime}</span>
            </div>
          </article>
        ))}
      </div>

      <section className="border border-border bg-foreground p-6 text-background md:p-8">
        <p className="eyebrow text-background/60">Expert councils</p>
        <h2 className="mt-3 max-w-2xl font-display text-4xl">The library gets stronger when the room gets smarter.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-background/70">Councils are small groups of experienced members and invited specialists who help curate questions, briefings and masterclasses. They do not receive unrestricted access to member data.</p>
        <div className="mt-7 grid gap-px bg-background/15 sm:grid-cols-2 lg:grid-cols-4">
          {expertCouncils.map((council) => (
            <div key={council} className="bg-foreground p-4 text-sm leading-6 text-background/85">{council}</div>
          ))}
        </div>
      </section>
    </div>
  );
}
