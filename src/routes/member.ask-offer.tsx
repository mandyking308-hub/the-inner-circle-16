import { FormEvent, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { asksOffers } from "@/data/community";

export const Route = createFileRoute("/member/ask-offer")({
  component: AskOfferPage,
});

function AskOfferPage() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [composerOpen, setComposerOpen] = useState(false);
  const [posted, setPosted] = useState(false);

  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return asksOffers.filter((item) => {
      const typeMatch = type === "All" || item.type === type;
      const textMatch = !needle || [item.title, item.body, item.category, item.author].join(" ").toLowerCase().includes(needle);
      return typeMatch && textMatch;
    });
  }, [query, type]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPosted(true);
  };

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Ask & Offer"
        title="Make the network useful."
        description="Ask for something specific, offer something genuinely useful, or request a particular introduction. This is a needs-and-capability board, not an advertising feed."
        action={
          <Button className="rounded-none" onClick={() => { setComposerOpen(true); setPosted(false); }}>
            Post something useful
          </Button>
        }
      />

      {composerOpen ? (
        <section className="border border-border bg-card p-5 md:p-6">
          {posted ? (
            <div>
              <p className="eyebrow text-bronze">Submitted</p>
              <h2 className="mt-3 font-display text-3xl">Your post is ready for the community.</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">A light moderation check protects the room from solicitation and vague commercial promotion.</p>
              <Button className="mt-5 rounded-none" variant="outline" onClick={() => setComposerOpen(false)}>Close</Button>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-5 lg:grid-cols-2">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="post-type">Type</Label>
                  <select id="post-type" className="h-10 w-full border border-input bg-background px-3 text-sm" defaultValue="Need">
                    <option>Need</option><option>Offer</option><option>Introduction</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-title">Specific headline</Label>
                  <Input id="post-title" required className="rounded-none" placeholder="e.g. Independent chair with regulated-services experience" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="post-category">Category</Label>
                  <Input id="post-category" className="rounded-none" placeholder="Governance, AI, hiring, philanthropy…" />
                </div>
              </div>
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="post-detail">Context</Label>
                  <Textarea id="post-detail" required rows={6} className="rounded-none" placeholder="What do you need, why now, and what would make a response relevant?" />
                </div>
                <div className="flex gap-3">
                  <Button type="submit" className="rounded-none">Submit</Button>
                  <Button type="button" variant="outline" className="rounded-none" onClick={() => setComposerOpen(false)}>Cancel</Button>
                </div>
              </div>
            </form>
          )}
        </section>
      ) : null}

      <section className="border border-border bg-card p-4 md:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Input value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-none pl-9" placeholder="Search asks and offers" />
          </label>
          <div className="flex gap-2">
            {["All", "Need", "Offer", "Introduction"].map((item) => (
              <button key={item} type="button" onClick={() => setType(item)} className={`border px-3 py-2 text-xs ${type === item ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground"}`}>{item}</button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((item) => (
          <article key={item.id} className="border border-border bg-card p-5 md:p-6">
            <div className="flex items-center justify-between gap-4">
              <span className={`px-2 py-1 text-[10px] uppercase tracking-[0.18em] ${item.type === "Need" ? "bg-foreground text-background" : "border border-border text-muted-foreground"}`}>{item.type}</span>
              <span className="text-[11px] text-muted-foreground">{item.urgency}</span>
            </div>
            <h2 className="mt-5 font-display text-3xl leading-tight">{item.title}</h2>
            <p className="mt-2 text-xs text-muted-foreground">{item.author} · {item.category}</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.body}</p>
            <button className="mt-5 inline-flex items-center gap-2 text-sm font-medium">I may be able to help </button>
          </article>
        ))}
      </div>
    </div>
  );
}
