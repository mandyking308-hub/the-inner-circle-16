import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock3, Compass, MapPinned, Send } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { conciergeCategories, reciprocalPlaces } from "@/data/infrastructure";

export const Route = createFileRoute("/member/concierge")({ component: MemberConciergePage });

type MemberRequest = {
  id: string;
  outcome: string;
  context: string;
  deadline: string;
  category: string;
  status: string;
  owner: string;
  nextStep: string;
  createdAt: string;
};

const STORAGE_KEY = "project-table:concierge-requests";
const starterRequests: MemberRequest[] = [
  {
    id: "REQ-2048",
    outcome: "Compare two international-school pathways before an October move",
    context: "We need the school decision to fit the likely residence timeline and housing area, not be treated as a separate search.",
    deadline: "This week",
    category: "Education",
    status: "Matching experts",
    owner: "Sofia",
    nextStep: "Education partner shortlist due Monday",
    createdAt: "2026-08-20",
  },
];

function MemberConciergePage() {
  const [requests, setRequests] = useState<MemberRequest[]>(starterRequests);
  const [hydrated, setHydrated] = useState(false);
  const [outcome, setOutcome] = useState("");
  const [deadline, setDeadline] = useState("");
  const [category, setCategory] = useState("Family administration");
  const [context, setContext] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setRequests(JSON.parse(stored) as MemberRequest[]);
    } catch {
      // Keep the starter request if local storage is unavailable or malformed.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [hydrated, requests]);

  const openCount = useMemo(() => requests.filter((request) => request.status !== "Complete").length, [requests]);

  const submitRequest = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cleanOutcome = outcome.trim();
    if (!cleanOutcome) return;

    const request: MemberRequest = {
      id: `REQ-${Date.now().toString().slice(-6)}`,
      outcome: cleanOutcome,
      context: context.trim(),
      deadline: deadline.trim() || "No fixed deadline",
      category,
      status: "New request",
      owner: "Concierge desk",
      nextStep: "We will review the brief and set the first action.",
      createdAt: new Date().toISOString().slice(0, 10),
    };

    setRequests((current) => [request, ...current]);
    setOutcome("");
    setDeadline("");
    setContext("");
    setCategory("Family administration");
  };

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Concierge & Execution"
        title="Give the complicated job one owner"
        description="Tell us the outcome. You do not need to know which provider category it belongs to. The desk clarifies the brief, finds the right route and keeps a visible next action until the work is closed."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border border-border bg-card p-5"><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Open requests</p><p className="mt-3 font-display text-4xl">{openCount}</p></div>
        <div className="border border-border bg-card p-5"><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">One point of contact</p><p className="mt-3 font-display text-2xl">Concierge desk</p></div>
        <div className="border border-border bg-card p-5"><p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Persistence</p><p className="mt-3 text-sm leading-6">Your prototype requests stay on this device.</p></div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-3"><Compass className="h-5 w-5 text-bronze" /><div><p className="eyebrow text-bronze">New request</p><h2 className="mt-2 font-display text-3xl">What do you want to be true when this is finished?</h2></div></div>
          <form className="mt-7 space-y-5" onSubmit={submitRequest}>
            <div className="space-y-2"><Label htmlFor="outcome">Outcome</Label><Input id="outcome" value={outcome} onChange={(event) => setOutcome(event.target.value)} required placeholder="e.g. Have the right school and residence path agreed before October" className="rounded-none" /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2"><Label htmlFor="category">Area</Label><select id="category" value={category} onChange={(event) => setCategory(event.target.value)} className="h-10 w-full rounded-none border border-input bg-background px-3 text-sm">{conciergeCategories.map(([title]) => <option key={title} value={title}>{title}</option>)}</select></div>
              <div className="space-y-2"><Label htmlFor="deadline">When?</Label><Input id="deadline" value={deadline} onChange={(event) => setDeadline(event.target.value)} placeholder="e.g. Before 12 September" className="rounded-none" /></div>
            </div>
            <div className="space-y-2"><Label htmlFor="context">What should we know?</Label><Textarea id="context" value={context} onChange={(event) => setContext(event.target.value)} rows={6} placeholder="What has already happened? What cannot change? Who is already involved?" className="rounded-none" /></div>
            <Button type="submit" className="w-full rounded-none"><Send className="mr-2 h-4 w-4" />Give this to Concierge</Button>
          </form>
        </section>

        <section className="border border-border bg-card">
          <div className="flex items-end justify-between gap-5 border-b border-border p-5 md:p-6"><div><p className="eyebrow text-bronze">Your requests</p><h2 className="mt-2 font-display text-3xl">A next action for every job</h2></div><Clock3 className="h-5 w-5 text-bronze" /></div>
          <div className="divide-y divide-border">
            {requests.length ? requests.map((request) => (
              <article key={request.id} className="p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.16em] text-bronze">{request.category} · {request.id}</p><h3 className="mt-2 font-display text-2xl">{request.outcome}</h3></div><span className="border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]">{request.status}</span></div>
                {request.context ? <p className="mt-4 max-w-3xl text-xs leading-6 text-muted-foreground">{request.context}</p> : null}
                <div className="mt-5 grid gap-3 border-t border-border pt-4 text-xs sm:grid-cols-3"><div><p className="uppercase tracking-[0.12em] text-muted-foreground">Timing</p><p className="mt-1">{request.deadline}</p></div><div><p className="uppercase tracking-[0.12em] text-muted-foreground">Owner</p><p className="mt-1">{request.owner}</p></div><div><p className="uppercase tracking-[0.12em] text-muted-foreground">Next action</p><p className="mt-1 leading-5">{request.nextStep}</p></div></div>
                {request.status === "New request" ? <button type="button" onClick={() => setRequests((current) => current.map((item) => item.id === request.id ? { ...item, status: "Complete", nextStep: "Closed by member in prototype." } : item))} className="mt-5 inline-flex items-center gap-2 text-xs font-semibold"><CheckCircle2 className="h-4 w-4 text-bronze" />Mark complete</button> : null}
              </article>
            )) : <div className="p-8 text-sm text-muted-foreground">No requests yet. Give the first complicated job to the desk.</div>}
          </div>
        </section>
      </div>

      <section>
        <div className="flex items-center gap-3"><MapPinned className="h-5 w-5 text-bronze" /><div><p className="eyebrow text-bronze">Places & reciprocal relationships</p><h2 className="mt-2 font-display text-3xl">A useful global network needs somewhere to land.</h2></div></div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">This is the relationship pipeline, not a promise of access. As formal agreements are secured, the status can become a real member benefit.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{reciprocalPlaces.map((place) => <article key={`${place.city}-${place.name}`} className="border border-border bg-card p-5"><p className="text-[10px] uppercase tracking-[0.16em] text-bronze">{place.city}</p><h3 className="mt-2 font-display text-2xl">{place.name}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{place.type}</p><p className="mt-4 border-t border-border pt-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{place.status}</p></article>)}</div>
      </section>

      <section className="border border-border bg-foreground p-6 text-background md:p-8"><div className="flex items-start justify-between gap-6"><div><p className="eyebrow text-background/55">Need a specialist rather than execution?</p><h2 className="mt-3 font-display text-3xl">Go straight to the trusted bench.</h2></div><Button asChild variant="outline" className="rounded-none border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"><Link to="/member/partners">Trusted Partners <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></section>
    </div>
  );
}
