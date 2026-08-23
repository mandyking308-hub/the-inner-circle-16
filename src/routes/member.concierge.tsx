import { type FormEvent, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, CheckCircle2, Clock3, FileText, MessageSquareText, Send, Star, UserRoundCheck } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { conciergeCategories } from "@/data/infrastructure";

export const Route = createFileRoute("/member/concierge")({ component: MemberConciergePage });

type CaseMessage = { id: string; author: "Member" | "Concierge"; body: string; date: string };
type CaseOption = { id: string; title: string; note: string; status: "Considering" | "Selected" | "Declined" };
type CaseDocument = { id: string; name: string; note: string };
type MemberRequest = {
  id: string;
  outcome: string;
  context: string;
  deadline: string;
  category: string;
  status: "New" | "Clarifying" | "Matching" | "Executing" | "Complete";
  owner: string;
  nextStep: string;
  createdAt: string;
  consentToIntroduce: boolean;
  partnerIntroduced?: string;
  rating?: number;
  messages: CaseMessage[];
  options: CaseOption[];
  documents: CaseDocument[];
};

const STORAGE_KEY = "project-table:concierge-cases:v2";
const starterRequests: MemberRequest[] = [
  {
    id: "REQ-2048",
    outcome: "Compare two international-school pathways before an October move",
    context: "We need the school decision to fit the likely residence timeline and housing area, not be treated as a separate search.",
    deadline: "2026-09-05",
    category: "Education",
    status: "Matching",
    owner: "Sofia",
    nextStep: "Review the two shortlisted education advisers and approve an introduction.",
    createdAt: "2026-08-20",
    consentToIntroduce: false,
    messages: [
      { id: "msg-1", author: "Member", body: "Please keep curriculum continuity and the likely commute to the centre of London in the brief.", date: "2026-08-20" },
      { id: "msg-2", author: "Concierge", body: "Understood. I have kept those as hard constraints and am comparing advisers who can cover both school selection and relocation timing.", date: "2026-08-21" },
    ],
    options: [
      { id: "opt-1", title: "Education adviser A", note: "Strong international-school and London relocation experience. Intro available after consent.", status: "Considering" },
      { id: "opt-2", title: "Education adviser B", note: "Stronger on alternative / hybrid pathways and curriculum continuity.", status: "Considering" },
    ],
    documents: [{ id: "doc-1", name: "School shortlist brief", note: "Reference: secure family vault / Education folder" }],
  },
];

function MemberConciergePage() {
  const [requests, setRequests] = useState<MemberRequest[]>(starterRequests);
  const [selectedId, setSelectedId] = useState(starterRequests[0]!.id);
  const [hydrated, setHydrated] = useState(false);
  const [showNew, setShowNew] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as MemberRequest[];
        setRequests(parsed);
        if (parsed[0]) setSelectedId(parsed[0].id);
      }
    } catch {
      // Keep starter case if local persistence is unavailable.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
  }, [hydrated, requests]);

  const selected = requests.find((request) => request.id === selectedId) ?? requests[0];
  const openCount = useMemo(() => requests.filter((request) => request.status !== "Complete").length, [requests]);

  const updateCase = (id: string, updater: (request: MemberRequest) => MemberRequest) => setRequests((current) => current.map((request) => request.id === id ? updater(request) : request));

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const outcome = String(form.get("outcome") ?? "").trim();
    if (!outcome) return;
    const request: MemberRequest = {
      id: `REQ-${Date.now().toString().slice(-6)}`,
      outcome,
      context: String(form.get("context") ?? "").trim(),
      deadline: String(form.get("deadline") ?? "").trim() || "No fixed date",
      category: String(form.get("category") ?? "Family administration"),
      status: "New",
      owner: "Concierge desk",
      nextStep: "Concierge will clarify the brief and set the first action.",
      createdAt: new Date().toISOString().slice(0, 10),
      consentToIntroduce: false,
      messages: [{ id: `msg-${Date.now()}`, author: "Member", body: "Request opened.", date: new Date().toISOString().slice(0, 10) }],
      options: [],
      documents: [],
    };
    setRequests((current) => [request, ...current]);
    setSelectedId(request.id);
    setShowNew(false);
    event.currentTarget.reset();
  };

  const addMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    const form = new FormData(event.currentTarget);
    const body = String(form.get("message") ?? "").trim();
    if (!body) return;
    const message: CaseMessage = { id: `msg-${Date.now()}`, author: "Member", body, date: new Date().toISOString().slice(0, 10) };
    updateCase(selected.id, (request) => ({ ...request, messages: [...request.messages, message] }));
    event.currentTarget.reset();
  };

  const addDocument = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    const form = new FormData(event.currentTarget);
    const name = String(form.get("document") ?? "").trim();
    if (!name) return;
    const document: CaseDocument = { id: `doc-${Date.now()}`, name, note: String(form.get("note") ?? "").trim() };
    updateCase(selected.id, (request) => ({ ...request, documents: [...request.documents, document] }));
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Concierge" title="Give the complicated job one owner" description="A concierge case should feel less like sending a request into a service desk and more like handing a problem to somebody who remembers the context, shows the options and keeps the next action visible until you agree the work is done." action={<Button className="rounded-none" onClick={() => setShowNew((value) => !value)}>New request</Button>} />

      <div className="grid gap-4 sm:grid-cols-3"><div className="border-t-2 border-oxblood bg-card p-5"><p className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Open cases</p><p className="mt-3 font-display text-4xl">{openCount}</p></div><div className="border-t-2 border-oxblood bg-card p-5"><p className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">One point of contact</p><p className="mt-3 font-display text-2xl">Concierge desk</p></div><div className="border-t-2 border-oxblood bg-card p-5"><p className="text-[9px] uppercase tracking-[0.16em] text-muted-foreground">Service rule</p><p className="mt-3 text-sm leading-6">Every live case has an owner and next action.</p></div></div>

      {showNew ? <form onSubmit={submitRequest} className="grid gap-4 border border-border bg-card p-6 md:grid-cols-2"><div className="space-y-2 md:col-span-2"><Label htmlFor="new-outcome">What should be true when this is finished?</Label><Input id="new-outcome" name="outcome" required className="rounded-none" /></div><div className="space-y-2"><Label htmlFor="new-category">Area</Label><select id="new-category" name="category" className="h-10 w-full rounded-none border border-input bg-background px-3 text-sm">{conciergeCategories.map(([title]) => <option key={title}>{title}</option>)}</select></div><div className="space-y-2"><Label htmlFor="new-deadline">When do you need it?</Label><Input id="new-deadline" name="deadline" type="date" className="rounded-none" /></div><div className="space-y-2 md:col-span-2"><Label htmlFor="new-context">Context</Label><Textarea id="new-context" name="context" rows={4} className="rounded-none" placeholder="What has already happened? What cannot change? Who is already involved?" /></div><div className="md:col-span-2"><Button type="submit" className="rounded-none bg-oxblood"><Send className="mr-2 h-4 w-4" />Give this to Concierge</Button></div></form> : null}

      <div className="grid gap-5 xl:grid-cols-[310px_1fr]">
        <aside className="border border-border bg-card xl:self-start">
          <div className="border-b border-border p-4"><p className="eyebrow text-oxblood">Your cases</p></div>
          <div className="divide-y divide-border">{requests.map((request) => <button key={request.id} type="button" onClick={() => setSelectedId(request.id)} className={`block w-full p-4 text-left transition-colors ${selected?.id === request.id ? "bg-foreground text-background" : "hover:bg-accent"}`}><div className="flex items-center justify-between gap-3"><span className={`text-[9px] uppercase tracking-[0.14em] ${selected?.id === request.id ? "text-bronze" : "text-oxblood"}`}>{request.status}</span><span className="text-[9px] opacity-55">{request.id}</span></div><h2 className="mt-2 font-display text-2xl leading-tight">{request.outcome}</h2><p className="mt-2 text-[10px] opacity-60">Owner · {request.owner}</p></button>)}</div>
        </aside>

        {selected ? <section className="space-y-5">
          <article className="border border-border bg-foreground p-6 text-background md:p-8"><div className="flex flex-wrap items-start justify-between gap-5"><div className="max-w-3xl"><p className="text-[9px] uppercase tracking-[0.16em] text-bronze">{selected.category} · opened {selected.createdAt}</p><h2 className="mt-3 font-display text-4xl leading-tight md:text-5xl">{selected.outcome}</h2><p className="mt-5 text-sm leading-7 text-background/65">{selected.context}</p></div><select value={selected.status} onChange={(event) => updateCase(selected.id, (request) => ({ ...request, status: event.target.value as MemberRequest["status"] }))} className="h-9 rounded-none border border-background/25 bg-background/10 px-3 text-xs text-background">{["New", "Clarifying", "Matching", "Executing", "Complete"].map((status) => <option key={status} value={status} className="text-foreground">{status}</option>)}</select></div><div className="mt-6 grid gap-4 border-t border-background/15 pt-5 sm:grid-cols-3"><div><p className="text-[9px] uppercase tracking-[0.12em] text-background/45">Owner</p><p className="mt-1 text-sm">{selected.owner}</p></div><div><p className="text-[9px] uppercase tracking-[0.12em] text-background/45">Target date</p><p className="mt-1 text-sm">{selected.deadline}</p></div><div><p className="text-[9px] uppercase tracking-[0.12em] text-background/45">Next action</p><p className="mt-1 text-sm">{selected.nextStep}</p></div></div></article>

          <div className="grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <article className="border border-border bg-card p-6"><div className="flex items-center gap-3"><MessageSquareText className="h-5 w-5 text-oxblood" /><h3 className="font-display text-3xl">Conversation</h3></div><div className="mt-5 space-y-3">{selected.messages.map((message) => <div key={message.id} className={`max-w-[88%] border p-4 ${message.author === "Member" ? "ml-auto border-oxblood/25 bg-accent" : "border-border bg-background"}`}><div className="flex items-center justify-between gap-3"><p className="text-[9px] font-semibold uppercase tracking-[0.12em] text-oxblood">{message.author}</p><p className="text-[9px] text-muted-foreground">{message.date}</p></div><p className="mt-2 text-xs leading-6">{message.body}</p></div>)}</div><form onSubmit={addMessage} className="mt-5 flex gap-2"><Input name="message" required className="rounded-none" placeholder="Add context or answer Concierge" /><Button type="submit" className="rounded-none"><Send className="h-4 w-4" /></Button></form></article>

            <article className="border border-border bg-card p-6"><div className="flex items-center gap-3"><BadgeCheck className="h-5 w-5 text-oxblood" /><h3 className="font-display text-3xl">Options from Montvelle</h3></div>{selected.options.length ? <div className="mt-5 space-y-3">{selected.options.map((option) => <div key={option.id} className="border border-border bg-background p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold">{option.title}</p><p className="mt-2 text-xs leading-6 text-muted-foreground">{option.note}</p></div><select value={option.status} onChange={(event) => updateCase(selected.id, (request) => ({ ...request, options: request.options.map((item) => item.id === option.id ? { ...item, status: event.target.value as CaseOption["status"] } : item) }))} className="h-8 rounded-none border border-input bg-background px-2 text-[10px]"><option>Considering</option><option>Selected</option><option>Declined</option></select></div></div>)}</div> : <p className="mt-5 text-xs leading-6 text-muted-foreground">Nothing to consider yet. Options appear here only once Montvelle has spoken to whoever is behind them.</p>}<label className="mt-5 flex items-start gap-3 border-t border-border pt-4 text-xs leading-6"><input type="checkbox" checked={selected.consentToIntroduce} onChange={(event) => updateCase(selected.id, (request) => ({ ...request, consentToIntroduce: event.target.checked }))} className="mt-1" /><span><strong>Consent to introduction.</strong> Concierge may share the minimum context required with the selected specialist once I approve this.</span></label>{selected.consentToIntroduce ? <p className="mt-3 text-[10px] uppercase tracking-[0.12em] text-oxblood">Consent recorded</p> : null}</article>
          </div>


          <div className="grid gap-5 lg:grid-cols-2">
            <article className="border border-border bg-card p-6"><div className="flex items-center gap-3"><FileText className="h-5 w-5 text-oxblood" /><h3 className="font-display text-3xl">Document references</h3></div><p className="mt-3 text-xs leading-6 text-muted-foreground">Record where an authorised document lives. Do not upload passports, bank records or sensitive family files here until encrypted storage is live.</p><form onSubmit={addDocument} className="mt-4 space-y-2"><Input name="document" required className="rounded-none" placeholder="Document / brief name" /><Input name="note" className="rounded-none" placeholder="Secure vault or adviser reference" /><Button type="submit" variant="outline" className="rounded-none">Add reference</Button></form><div className="mt-4 space-y-2">{selected.documents.map((document) => <div key={document.id} className="border-t border-border pt-3"><p className="text-sm font-medium">{document.name}</p><p className="mt-1 text-xs text-muted-foreground">{document.note}</p></div>)}</div></article>

            <article className="border border-border bg-card p-6"><div className="flex items-center gap-3"><UserRoundCheck className="h-5 w-5 text-oxblood" /><h3 className="font-display text-3xl">Close the loop</h3></div><p className="mt-4 text-sm leading-7 text-muted-foreground">When the outcome is genuinely complete, close the case and rate the service. The rating belongs to the member relationship and helps determine which concierge routes and partners remain trusted.</p><Button type="button" variant="outline" className="mt-5 rounded-none" onClick={() => updateCase(selected.id, (request) => ({ ...request, status: "Complete", nextStep: "Closed by member." }))}><CheckCircle2 className="mr-2 h-4 w-4" />Mark outcome complete</Button><div className="mt-6 border-t border-border pt-4"><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Private service rating</p><div className="mt-3 flex gap-2">{[1,2,3,4,5].map((rating) => <button key={rating} type="button" onClick={() => updateCase(selected.id, (request) => ({ ...request, rating }))} aria-label={`Rate ${rating} out of 5`}><Star className={`h-5 w-5 ${selected.rating && rating <= selected.rating ? "fill-current text-bronze" : "text-muted-foreground"}`} /></button>)}</div></div></article>
          </div>
        </section> : null}
      </div>

      <section className="border border-border bg-foreground p-6 text-background md:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow text-background/50">Need a specialist rather than execution?</p><h2 className="mt-3 font-display text-3xl">Tell us, and we will go and find the right person.</h2></div><Button asChild variant="outline" className="rounded-none border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground"><Link to="/member/services">Make a request <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></section>
    </div>
  );
}
