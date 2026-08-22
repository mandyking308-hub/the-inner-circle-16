import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, CheckCircle2, Circle, Compass, Globe2, GraduationCap, Landmark, ShieldCheck, TableProperties } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { decisionRooms, type DecisionIcon, type DecisionLane } from "@/data/decisionRooms";
import { luxuryImages } from "@/data/luxuryImages";

export const Route = createFileRoute("/member/control-room")({ component: ControlRoomPage });

const STORAGE_KEY = "project-table:decision-room";
const laneOrder: DecisionLane[] = ["DECIDE", "EXPERT", "EXECUTE", "EVIDENCE"];
const icons: Record<DecisionIcon, typeof Globe2> = { globe: Globe2, landmark: Landmark, learning: GraduationCap, shield: ShieldCheck };

type StoredRoomState = {
  activeId: string;
  complete: Record<string, boolean>;
  notes: Record<string, string>;
};

function ControlRoomPage() {
  const [activeId, setActiveId] = useState(decisionRooms[0]!.id);
  const [complete, setComplete] = useState<Record<string, boolean>>({ "move-brief": true });
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as StoredRoomState;
        if (decisionRooms.some((room) => room.id === stored.activeId)) setActiveId(stored.activeId);
        setComplete(stored.complete ?? {});
        setNotes(stored.notes ?? {});
      }
    } catch {
      // The prototype remains usable even if local storage is unavailable.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: StoredRoomState = { activeId, complete, notes };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [activeId, complete, hydrated, notes]);

  const active = decisionRooms.find((room) => room.id === activeId) ?? decisionRooms[0]!;
  const completedCount = active.items.filter((item) => complete[item.id]).length;
  const progress = Math.round((completedCount / active.items.length) * 100);
  const nextItem = active.items.find((item) => !complete[item.id]);
  const grouped = useMemo(() => laneOrder.map((lane) => ({ lane, items: active.items.filter((item) => item.lane === lane) })), [active]);

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Life Decision Room"
        title="Keep the whole decision in one room"
        description="This prototype now remembers your selected room, completed actions and working notes on this device. Use it like a private decision notebook: family judgement, professional advice, execution and evidence kept separate but connected."
      />

      <section className="relative min-h-[320px] overflow-hidden border border-border bg-foreground text-background">
        <img src={luxuryImages.command} alt="Private family office command room" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-foreground/78 to-transparent" />
        <div className="relative max-w-2xl p-7 md:p-9">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze">Your private command room</p>
          <h2 className="mt-4 font-display text-4xl leading-tight md:text-5xl">{active.headline}</h2>
          <p className="mt-5 text-sm leading-7 text-background/68">{active.question}</p>
        </div>
      </section>

      <section className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {decisionRooms.map((room) => {
          const Icon = icons[room.icon];
          const selected = room.id === active.id;
          return (
            <button key={room.id} type="button" onClick={() => setActiveId(room.id)} className={`border p-5 text-left transition-colors ${selected ? "border-oxblood bg-oxblood text-oxblood-foreground" : "border-border bg-card hover:bg-accent"}`}>
              <Icon className={`h-5 w-5 ${selected ? "text-bronze" : "text-muted-foreground"}`} />
              <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.18em] opacity-60">Decision room</p>
              <h3 className="mt-2 font-display text-2xl">{room.label}</h3>
            </button>
          );
        })}
      </section>

      <section className="border border-border bg-card">
        <div className="grid gap-6 border-b border-border p-6 lg:grid-cols-[1fr_300px] lg:items-end">
          <div>
            <p className="eyebrow text-bronze">Definition of done</p>
            <p className="mt-3 max-w-4xl text-sm leading-7">{active.outcome}</p>
          </div>
          <div className="border border-border bg-background p-5">
            <div className="flex items-end justify-between gap-4"><div><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">Progress</p><p className="mt-2 font-display text-4xl">{progress}%</p></div><p className="text-xs text-muted-foreground">{completedCount}/{active.items.length}</p></div>
            <div className="mt-4 h-2 bg-accent"><div className="h-full bg-oxblood transition-all" style={{ width: `${progress}%` }} /></div>
          </div>
        </div>
        <div className="grid gap-px bg-border lg:grid-cols-2">
          <div className="bg-background p-6"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-bronze">Next executable action</p><h3 className="mt-3 font-display text-2xl">{nextItem?.title ?? "Room complete"}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{nextItem?.detail ?? "Review the evidence and decide what should become a recurring family control."}</p></div>
          <div className="bg-background p-6"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-bronze">Working note · saved on this device</p><Textarea value={notes[active.id] ?? ""} onChange={(event) => setNotes((current) => ({ ...current, [active.id]: event.target.value }))} rows={4} className="mt-3 rounded-none" placeholder="What changed? What are we waiting on? What decision must the family make next?" /></div>
        </div>
      </section>

      <section>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div><p className="eyebrow text-bronze">Execution board</p><h2 className="mt-2 font-display text-3xl">Four lanes. No hiding behind research.</h2></div>
          <div className="flex flex-wrap gap-2"><Button asChild variant="outline" className="rounded-none"><Link to="/member/table"><TableProperties className="mr-2 h-4 w-4" />Ask the Table</Link></Button><Button asChild variant="outline" className="rounded-none"><Link to="/member/partners"><BadgeCheck className="mr-2 h-4 w-4" />Find specialist</Link></Button><Button asChild className="rounded-none"><Link to="/member/concierge"><Compass className="mr-2 h-4 w-4" />Give Concierge the brief</Link></Button></div>
        </div>

        <div className="mt-5 grid gap-4 xl:grid-cols-4">
          {grouped.map((group, laneIndex) => (
            <div key={group.lane} className="border border-border bg-card">
              <div className="border-b border-border p-4"><div className="flex items-center justify-between"><p className="text-[10px] font-semibold uppercase tracking-[0.19em] text-bronze">{group.lane}</p><span className="font-display text-xl text-muted-foreground">0{laneIndex + 1}</span></div></div>
              <div className="divide-y divide-border">
                {group.items.map((item) => {
                  const done = Boolean(complete[item.id]);
                  return (
                    <button key={item.id} type="button" onClick={() => setComplete((current) => ({ ...current, [item.id]: !current[item.id] }))} className="block w-full p-4 text-left transition-colors hover:bg-accent/50">
                      <div className="flex items-start gap-3">{done ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-bronze" /> : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />}<div><h3 className={`text-sm font-medium ${done ? "text-muted-foreground line-through" : "text-foreground"}`}>{item.title}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{item.detail}</p><div className="mt-3 flex flex-wrap gap-2 text-[9px] uppercase tracking-[0.12em] text-muted-foreground"><span className="border border-border px-2 py-1">Owner: {item.owner}</span>{item.dependency ? <span className="border border-border px-2 py-1">After: {item.dependency}</span> : null}</div></div></div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="border border-border bg-card p-6"><p className="eyebrow text-bronze">Questions worth taking to the room</p><div className="mt-5 divide-y divide-border border-y border-border">{active.questions.map((question, index) => <div key={question} className="grid gap-3 py-4 sm:grid-cols-[40px_1fr]"><span className="font-display text-xl text-bronze">0{index + 1}</span><p className="text-sm leading-7">{question}</p></div>)}</div></section>
        <section className="border border-border bg-foreground p-6 text-background"><BadgeCheck className="h-5 w-5 text-bronze" /><p className="mt-7 text-[9px] font-semibold uppercase tracking-[0.2em] text-background/50">Specialist bench</p><h2 className="mt-3 font-display text-3xl">Bring expertise in only where expertise is required.</h2><div className="mt-5 flex flex-wrap gap-2">{active.experts.map((expert) => <span key={expert} className="border border-background/20 px-2.5 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-background/70">{expert}</span>)}</div><Link to="/member/partners" className="mt-7 inline-flex items-center gap-2 text-sm font-semibold">Open Trusted Partners <ArrowRight className="h-4 w-4 text-bronze" /></Link></section>
      </div>
    </div>
  );
}
