import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bookmark, BookOpenText, Search, Sparkles } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { expertCouncils, knowledge } from "@/data/community";
import { journalArticles } from "@/data/journal";
import { playbooks } from "@/data/infrastructure";

export const Route = createFileRoute("/member/knowledge")({ component: KnowledgePage });

const STORAGE_KEY = "project-table:saved-knowledge";

type ArchiveResult = { id: string; type: "Briefing" | "Journal" | "Playbook"; title: string; summary: string; category: string; href?: string };

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
  useEffect(() => { if (typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, JSON.stringify(saved)); }, [saved]);

  const archive: ArchiveResult[] = useMemo(() => [
    ...knowledge.map((item) => ({ id: item.id, type: "Briefing" as const, title: item.title, summary: item.summary, category: item.category })),
    ...journalArticles.map((item) => ({ id: `journal-${item.slug}`, type: "Journal" as const, title: item.title, summary: item.deck, category: item.category, href: `/journal/${item.slug}` })),
    ...playbooks.map((title, index) => ({ id: `playbook-${index}`, type: "Playbook" as const, title, summary: "A practical decision sequence, questions and execution checklist for members working through this problem.", category: "Playbook" })),
  ], []);

  const categories = ["All", ...Array.from(new Set(archive.map((item) => item.category)))];
  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return archive.filter((item) => (category === "All" || item.category === category) && (!needle || [item.title, item.summary, item.category, item.type].join(" ").toLowerCase().includes(needle)));
  }, [archive, category, query]);

  const archiveAnswers = useMemo(() => {
    if (!asked || !archiveQuestion.trim()) return [];
    const terms = archiveQuestion.toLowerCase().split(/[^a-z0-9]+/).filter((term) => term.length > 2);
    return archive.map((item) => ({ item, score: terms.reduce((sum, term) => sum + ([item.title, item.summary, item.category].join(" ").toLowerCase().includes(term) ? 1 : 0), 0) })).filter(({ score }) => score > 0).sort((a, b) => b.score - a.score).slice(0, 5).map(({ item }) => item);
  }, [archive, archiveQuestion, asked]);

  const toggleSaved = (id: string) => setSaved((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Knowledge" title="Ask what the institution already knows" description="Briefings, playbooks, Journal essays and expert-council material should reduce repeated research. The archive is organised around decisions members actually face, not a content calendar." />

      <section className="border border-border bg-foreground p-6 text-background md:p-8"><div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-end"><div><Sparkles className="h-5 w-5 text-bronze" /><p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.2em] text-background/45">Ask the Archive</p><h2 className="mt-3 font-display text-4xl leading-tight">Start with the problem, not the category.</h2></div><div><div className="flex gap-2"><Input value={archiveQuestion} onChange={(event) => { setArchiveQuestion(event.target.value); setAsked(false); }} onKeyDown={(event) => { if (event.key === "Enter") setAsked(true); }} className="rounded-none border-background/25 bg-background/10 text-background placeholder:text-background/35" placeholder="e.g. We are moving to Dubai and need to coordinate schools, residence and company questions" /><Button type="button" className="rounded-none bg-oxblood" onClick={() => setAsked(true)}>Search</Button></div><p className="mt-3 text-[10px] leading-5 text-background/45">This version retrieves relevant material from the curated archive. It does not invent professional advice or answer beyond the material held here.</p></div></div>{asked ? <div className="mt-7 grid gap-px bg-background/15 md:grid-cols-2">{archiveAnswers.length ? archiveAnswers.map((item) => <article key={item.id} className="bg-foreground p-5"><p className="text-[9px] uppercase tracking-[0.14em] text-bronze">{item.type} · {item.category}</p><h3 className="mt-3 font-display text-3xl">{item.title}</h3><p className="mt-3 text-xs leading-6 text-background/60">{item.summary}</p>{item.href ? <a href={item.href} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold">Open <ArrowRight className="h-3.5 w-3.5" /></a> : null}</article>) : <p className="bg-foreground p-5 text-sm text-background/60">Nothing strong enough matched. Ask Concierge or the Table rather than treating a weak search result as an answer.</p>}</div> : null}</section>

      <section className="border border-border bg-card p-4 md:p-5"><div className="grid gap-3 lg:grid-cols-[1fr_auto]"><label className="relative block"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-none pl-9" placeholder="Browse briefings, essays and playbooks" /></label><div className="flex max-w-full gap-2 overflow-x-auto">{categories.map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 border px-3 py-2 text-[10px] ${category === item ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground"}`}>{item}</button>)}</div></div></section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((item) => <article key={item.id} className="group border border-border bg-card p-5 transition-colors hover:bg-accent/20 md:p-6"><div className="flex items-center justify-between gap-4"><span className="text-[9px] uppercase tracking-[0.18em] text-oxblood">{item.type} · {item.category}</span><button type="button" onClick={() => toggleSaved(item.id)} aria-label={saved.includes(item.id) ? "Remove saved item" : "Save item"}><Bookmark className={`h-4 w-4 ${saved.includes(item.id) ? "fill-current text-oxblood" : "text-muted-foreground"}`} /></button></div><h2 className="mt-5 font-display text-3xl leading-tight">{item.title}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{item.summary}</p>{item.href ? <a href={item.href} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Read <ArrowRight className="h-3.5 w-3.5" /></a> : <span className="mt-6 inline-flex items-center gap-2 text-xs text-muted-foreground"><BookOpenText className="h-4 w-4" />Available in the member archive</span>}</article>)}</div>

      <section className="border border-border bg-card p-6"><p className="eyebrow text-oxblood">Saved for you</p><div className="mt-5 grid gap-3 md:grid-cols-2">{saved.length ? archive.filter((item) => saved.includes(item.id)).map((item) => <div key={item.id} className="border-t border-border pt-3"><p className="text-[9px] uppercase tracking-[0.13em] text-muted-foreground">{item.type}</p><p className="mt-1 text-sm font-semibold">{item.title}</p></div>) : <p className="text-sm text-muted-foreground">Save useful material and it will stay in your private reading list.</p>}</div></section>

      <section className="border border-border bg-foreground p-6 text-background md:p-8"><p className="eyebrow text-background/50">Expert councils</p><h2 className="mt-3 max-w-2xl font-display text-4xl">The archive gets stronger when the room gets smarter.</h2><p className="mt-4 max-w-2xl text-sm leading-7 text-background/65">Councils help curate questions, briefings and masterclasses. They do not receive unrestricted access to member data.</p><div className="mt-7 grid gap-px bg-background/15 sm:grid-cols-2 lg:grid-cols-4">{expertCouncils.map((council) => <div key={council} className="bg-foreground p-4 text-sm leading-6 text-background/85">{council}</div>)}</div><Button asChild variant="outline" className="mt-7 rounded-none border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"><Link to="/journal">Open public Journal <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></section>
    </div>
  );
}
