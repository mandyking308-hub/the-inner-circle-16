import { type FormEvent, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { decisionRooms, type DecisionIcon, type DecisionLane, type DecisionRoomTemplate, type DecisionWorkItem } from "@/data/decisionRooms";
import { luxuryImages } from "@/data/luxuryImages";

export const Route = createFileRoute("/member/control-room")({
  validateSearch: (search: Record<string, unknown>): { topic?: string } =>
    typeof search["topic"] === "string" ? { topic: (search["topic"] as string).slice(0, 120) } : {},
  component: ControlRoomPage,
});

const STORAGE_KEY = "project-table:decision-room:v2";
const laneOrder: DecisionLane[] = ["DECIDE", "EXPERT", "EXECUTE", "EVIDENCE"];

type DecisionLogEntry = { id: string; text: string; date: string };
type DocumentReference = { id: string; name: string; note: string };

type StoredRoomState = {
  activeId: string;
  complete: Record<string, boolean>;
  notes: Record<string, string>;
  customRooms: DecisionRoomTemplate[];
  extraItems: Record<string, DecisionWorkItem[]>;
  deadlines: Record<string, string>;
  participants: Record<string, string[]>;
  decisions: Record<string, DecisionLogEntry[]>;
  documents: Record<string, DocumentReference[]>;
};

const starterState: StoredRoomState = {
  activeId: decisionRooms[0]!.id,
  complete: { "move-brief": true },
  notes: {},
  customRooms: [],
  extraItems: {},
  deadlines: {},
  participants: {},
  decisions: {},
  documents: {},
};

function ControlRoomPage() {
  const { topic } = Route.useSearch();
  const [state, setState] = useState<StoredRoomState>(starterState);
  const [hydrated, setHydrated] = useState(false);
  const [showCreate, setShowCreate] = useState(Boolean(topic));

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...starterState, ...(JSON.parse(raw) as Partial<StoredRoomState>) });
    } catch {
      // The workspace remains usable if local persistence is unavailable.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const rooms = useMemo(() => [...decisionRooms, ...state.customRooms], [state.customRooms]);
  const active = rooms.find((room) => room.id === state.activeId) ?? rooms[0]!;
  const activeItems = useMemo(() => [...active.items, ...(state.extraItems[active.id] ?? [])], [active, state.extraItems]);
  const completedCount = activeItems.filter((item) => state.complete[item.id]).length;
  const progress = activeItems.length ? Math.round((completedCount / activeItems.length) * 100) : 0;
  const nextItem = activeItems.find((item) => !state.complete[item.id]);
  const grouped = useMemo(() => laneOrder.map((lane) => ({ lane, items: activeItems.filter((item) => item.lane === lane) })), [activeItems]);

  const createRoom = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = `custom-${Date.now()}`;
    const room: DecisionRoomTemplate = {
      id,
      label: String(form.get("label") ?? "New decision").trim(),
      icon: "shield",
      headline: String(form.get("headline") ?? "").trim(),
      question: String(form.get("question") ?? "").trim(),
      outcome: String(form.get("outcome") ?? "").trim(),
      experts: [],
      questions: [],
      items: [],
    };
    setState((current) => ({ ...current, activeId: id, customRooms: [...current.customRooms, room] }));
    setShowCreate(false);
    event.currentTarget.reset();
  };

  const addAction = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const item: DecisionWorkItem = {
      id: `${active.id}-action-${Date.now()}`,
      title: String(form.get("title") ?? "").trim(),
      detail: String(form.get("detail") ?? "").trim(),
      lane: String(form.get("lane") ?? "EXECUTE") as DecisionLane,
      owner: String(form.get("owner") ?? "Family").trim(),
      ...(String(form.get("dependency") ?? "").trim() ? { dependency: String(form.get("dependency") ?? "").trim() } : {}),
    };
    setState((current) => ({ ...current, extraItems: { ...current.extraItems, [active.id]: [...(current.extraItems[active.id] ?? []), item] } }));
    event.currentTarget.reset();
  };

  const addParticipant = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("participant") ?? "").trim();
    if (!name) return;
    setState((current) => ({ ...current, participants: { ...current.participants, [active.id]: [...(current.participants[active.id] ?? []), name] } }));
    event.currentTarget.reset();
  };

  const addDecision = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = String(form.get("decision") ?? "").trim();
    if (!text) return;
    const entry: DecisionLogEntry = { id: `decision-${Date.now()}`, text, date: new Date().toISOString().slice(0, 10) };
    setState((current) => ({ ...current, decisions: { ...current.decisions, [active.id]: [entry, ...(current.decisions[active.id] ?? [])] } }));
    event.currentTarget.reset();
  };

  const addDocument = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("document") ?? "").trim();
    if (!name) return;
    const item: DocumentReference = { id: `doc-${Date.now()}`, name, note: String(form.get("documentNote") ?? "").trim() };
    setState((current) => ({ ...current, documents: { ...current.documents, [active.id]: [item, ...(current.documents[active.id] ?? [])] } }));
    event.currentTarget.reset();
  };

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Life Decision Room" title="Keep the whole decision in one room" description="Separate what the family must decide, what qualified professionals must advise on, what somebody must execute and what evidence proves the work is complete." action={<Button className="rounded-none" onClick={() => setShowCreate((value) => !value)}>New decision</Button>} />

      {showCreate ? <form onSubmit={createRoom} className="grid gap-5 border border-border bg-card p-6 md:grid-cols-2"><div className="space-y-2"><Label htmlFor="room-label">Short name</Label><Input id="room-label" name="label" required defaultValue={topic ?? ""} className="rounded-none" placeholder="e.g. Sell the business" /></div><div className="space-y-2"><Label htmlFor="room-headline">Outcome headline</Label><Input id="room-headline" name="headline" required className="rounded-none" placeholder="What are we trying to make happen?" /></div><div className="space-y-2 md:col-span-2"><Label htmlFor="room-question">The central decision</Label><Textarea id="room-question" name="question" required rows={3} className="rounded-none" /></div><div className="space-y-2 md:col-span-2"><Label htmlFor="room-outcome">Definition of done</Label><Textarea id="room-outcome" name="outcome" required rows={3} className="rounded-none" /></div><div className="md:col-span-2"><Button type="submit" className="rounded-none bg-oxblood">Create Decision Room</Button></div></form> : null}

      <section className="relative min-h-[320px] overflow-hidden border border-border bg-foreground text-background">
        <img src={luxuryImages.command} alt="Private family office command room" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/78 to-transparent" />
        <div className="relative max-w-2xl p-7 md:p-9"><p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze">Your Decision Room</p><h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{active.headline}</h2><p className="mt-5 text-sm leading-7 text-background/68">{active.question}</p></div>
      </section>

      <section className="flex gap-2 overflow-x-auto pb-1">
        {rooms.map((room) => { const selected = room.id === active.id; return <button key={room.id} type="button" onClick={() => setState((current) => ({ ...current, activeId: room.id }))} className={`min-w-[210px] border p-5 text-left transition-colors ${selected ? "border-oxblood bg-oxblood text-oxblood-foreground" : "border-border bg-card hover:bg-accent"}`}><p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em] opacity-60">Decision room</p><h3 className="mt-2 font-display text-2xl">{room.label}</h3></button>; })}
      </section>

      <section className="border border-border bg-card">
        <div className="grid gap-6 border-b border-border p-6 lg:grid-cols-[1fr_300px] lg:items-end"><div><p className="eyebrow text-bronze">Definition of done</p><p className="mt-3 max-w-4xl text-sm leading-7">{active.outcome}</p></div><div className="border border-border bg-background p-5"><div className="flex items-end justify-between gap-4"><div><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Progress</p><p className="mt-2 font-display text-4xl">{progress}%</p></div><p className="text-xs text-muted-foreground">{completedCount}/{activeItems.length}</p></div><div className="mt-4 h-2 bg-accent"><div className="h-full bg-oxblood transition-all" style={{ width: `${progress}%` }} /></div></div></div>
        <div className="grid gap-px bg-border lg:grid-cols-2"><div className="bg-background p-6"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-bronze">Next executable action</p><h3 className="mt-3 font-display text-2xl">{nextItem?.title ?? (activeItems.length ? "Room complete" : "Add the first action")}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{nextItem?.detail ?? "Build the execution board below so the decision has owners and a finish line."}</p></div><div className="bg-background p-6"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-bronze">Private working note</p><Textarea value={state.notes[active.id] ?? ""} onChange={(event) => setState((current) => ({ ...current, notes: { ...current.notes, [active.id]: event.target.value } }))} rows={4} className="mt-3 rounded-none" placeholder="What changed? What are we waiting on? What decision must the family make next?" /></div></div>
      </section>

      <section>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"><div><p className="eyebrow text-bronze">Decide · Expert · Execute · Evidence</p><h2 className="mt-2 font-display text-3xl">Four honest stages, so a decision cannot quietly stall in research.</h2></div><div className="flex flex-wrap gap-2"><Button asChild variant="outline" className="rounded-none"><Link to="/member/table">Ask the Table</Link></Button><Button asChild variant="outline" className="rounded-none"><Link to="/member/services">Ask Montvelle to source expertise</Link></Button><Button asChild className="rounded-none"><Link to="/member/concierge">Give Montvelle the brief</Link></Button></div></div>
        <div className="mt-5 grid gap-4 xl:grid-cols-4">{grouped.map((group, laneIndex) => <div key={group.lane} className="border border-border bg-card"><div className="border-b border-border p-4"><div className="flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-bronze">{group.lane}</p><span className="font-display text-xl text-muted-foreground">0{laneIndex + 1}</span></div></div><div className="divide-y divide-border">{group.items.length ? group.items.map((item) => { const done = Boolean(state.complete[item.id]); return <div key={item.id} className="p-4"><button type="button" onClick={() => setState((current) => ({ ...current, complete: { ...current.complete, [item.id]: !current.complete[item.id] } }))} className="block w-full text-left"><div className="flex items-start gap-3">{done ? : }<div><h3 className={`text-sm font-medium ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.title}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{item.detail}</p><div className="mt-3 flex flex-wrap gap-2 text-[9px] uppercase tracking-[0.12em] text-muted-foreground"><span className="border border-border px-2 py-1">Owner: {item.owner}</span>{item.dependency ? <span className="border border-border px-2 py-1">After: {item.dependency}</span> : null}</div></div></div></button><div className="mt-3 border-t border-border pt-3"><Label htmlFor={`deadline-${item.id}`} className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Deadline</Label><Input id={`deadline-${item.id}`} type="date" value={state.deadlines[item.id] ?? ""} onChange={(event) => setState((current) => ({ ...current, deadlines: { ...current.deadlines, [item.id]: event.target.value } }))} className="mt-1 h-8 rounded-none text-xs" /></div></div>; }) : <p className="p-4 text-xs leading-6 text-muted-foreground">No actions in this lane yet.</p>}</div></div>)}</div>

        <form onSubmit={addAction} className="mt-4 grid gap-3 border border-border bg-card p-5 md:grid-cols-2 xl:grid-cols-[1fr_130px_180px_1fr_auto]"><Input name="title" required className="rounded-none" placeholder="Add an action" /><select name="lane" className="h-10 rounded-none border border-input bg-background px-3 text-sm">{laneOrder.map((lane) => <option key={lane}>{lane}</option>)}</select><Input name="owner" required className="rounded-none" placeholder="Owner" /><Input name="dependency" className="rounded-none" placeholder="Dependency (optional)" /><Button type="submit" className="rounded-none">Add</Button><Textarea name="detail" rows={2} className="rounded-none md:col-span-2 xl:col-span-5" placeholder="What specifically needs to happen?" /></form>
      </section>

      <section className="grid gap-5 xl:grid-cols-3">
        <article className="border border-border bg-card p-6"><div className="flex items-center gap-3"><h2 className="font-display text-3xl">People in the room</h2></div><form onSubmit={addParticipant} className="mt-5 flex gap-2"><Input name="participant" className="rounded-none" placeholder="Family member, adviser or owner" /><Button type="submit" className="rounded-none" size="sm">Add</Button></form><div className="mt-5 space-y-2">{(state.participants[active.id] ?? []).map((person) => <div key={person} className="border-t border-border pt-2 text-sm">{person}</div>)}</div></article>

        <article className="border border-border bg-card p-6"><div className="flex items-center gap-3"><h2 className="font-display text-3xl">Decision log</h2></div><form onSubmit={addDecision} className="mt-5 space-y-2"><Textarea name="decision" required rows={3} className="rounded-none" placeholder="What was decided, and why?" /><Button type="submit" variant="outline" className="rounded-none">Record decision</Button></form><div className="mt-5 space-y-3">{(state.decisions[active.id] ?? []).map((entry) => <div key={entry.id} className="border-t border-border pt-3"><p className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">{entry.date}</p><p className="mt-1 text-xs leading-6">{entry.text}</p></div>)}</div></article>

        <article className="border border-border bg-card p-6"><div className="flex items-center gap-3"><h2 className="font-display text-3xl">Document references</h2></div><p className="mt-3 text-xs leading-6 text-muted-foreground">Record where the relevant document lives without uploading sensitive files into an unsecured browser workspace.</p><form onSubmit={addDocument} className="mt-4 space-y-2"><Input name="document" required className="rounded-none" placeholder="Document name" /><Input name="documentNote" className="rounded-none" placeholder="Vault, adviser or location note" /><Button type="submit" variant="outline" className="rounded-none">Add reference</Button></form><div className="mt-5 space-y-3">{(state.documents[active.id] ?? []).map((document) => <div key={document.id} className="border-t border-border pt-3"><p className="text-sm font-medium">{document.name}</p><p className="mt-1 text-xs text-muted-foreground">{document.note || "Reference recorded"}</p></div>)}</div></article>
      </section>

      {active.questions.length || active.experts.length ? <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]"><section className="border border-border bg-card p-6"><p className="eyebrow text-bronze">Questions worth taking to the room</p><div className="mt-5 divide-y divide-border border-y border-border">{active.questions.map((question, index) => <div key={question} className="grid gap-3 py-4 sm:grid-cols-[40px_1fr]"><span className="font-display text-xl text-bronze">0{index + 1}</span><p className="text-sm leading-7">{question}</p></div>)}</div></section><section className="border border-border bg-foreground p-6 text-background"><p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-background/50">Outside expertise</p><h2 className="mt-3 font-display text-3xl">Bring expertise in only where expertise is required.</h2><div className="mt-5 flex flex-wrap gap-2">{active.experts.map((expert) => <span key={expert} className="border border-background/20 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-background/70">{expert}</span>)}</div><Link to="/member/services" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Ask Montvelle to source this </Link></section></div> : null}
    </div>
  );
}
