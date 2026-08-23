import { type FormEvent, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Send } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  readThreads,
  threadStateLabel,
  writeThreads,
  type Thread,
  type ThreadState,
} from "@/data/memberWorld";

export const Route = createFileRoute("/member/messages")({ component: MemberMessagesPage });

const kindLabel: Record<Thread["kind"], string> = {
  concierge: "Concierge",
  booking: "Booking",
  partner: "Private introduction",
  montvelle: "Montvelle",
  gathering: "Gathering",
};

const filters: (ThreadState | "all")[] = ["all", "needs_reply", "waiting", "active", "closed"];

function MemberMessagesPage() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [filter, setFilter] = useState<ThreadState | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const loaded = readThreads();
    setThreads(loaded);
    setSelectedId(loaded[0]?.id ?? null);
  }, []);

  const visible = useMemo(
    () => (filter === "all" ? threads : threads.filter((thread) => thread.state === filter)),
    [threads, filter],
  );
  const selected = threads.find((thread) => thread.id === selectedId) ?? visible[0];

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    const form = event.currentTarget;
    const body = String(new FormData(form).get("body") ?? "").trim();
    if (!body) return;
    const next = threads.map((thread) =>
      thread.id === selected.id
        ? {
            ...thread,
            state: "waiting" as ThreadState,
            messages: [
              ...thread.messages,
              {
                id: `m-${Date.now()}`,
                author: "You",
                role: "member" as const,
                body,
                at: new Date().toISOString().slice(0, 10),
              },
            ],
          }
        : thread,
    );
    setThreads(next);
    writeThreads(next);
    form.reset();
  };

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Messages"
        title="Correspondence, gathered by reason."
        description="Every conversation here exists because something is being arranged, decided or held. The reason sits at the top of each one, so you never have to remember the context."
      />

      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`border px-4 py-2 text-[10px] uppercase tracking-[0.14em] transition-colors ${filter === item ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            {item === "all"
              ? `All · ${threads.length}`
              : `${threadStateLabel[item]} · ${threads.filter((thread) => thread.state === item).length}`}
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="divide-y divide-border border border-border bg-card">
          {visible.map((thread) => (
            <button
              key={thread.id}
              type="button"
              onClick={() => setSelectedId(thread.id)}
              className={`block w-full px-5 py-5 text-left transition-colors ${selected?.id === thread.id ? "bg-accent" : "hover:bg-accent/60"}`}
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-[9px] uppercase tracking-[0.16em] text-oxblood">{kindLabel[thread.kind]}</p>
                <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  {threadStateLabel[thread.state]}
                </p>
              </div>
              <p className="mt-2 font-display text-xl leading-snug">{thread.subject}</p>
              <p className="mt-2 line-clamp-2 text-xs leading-6 text-muted-foreground">{thread.context}</p>
            </button>
          ))}
          {visible.length === 0 ? <p className="p-5 text-sm text-muted-foreground">Nothing in this view.</p> : null}
        </div>

        {selected ? (
          <section className="border border-border bg-card">
            <div className="border-b border-border p-6">
              <p className="text-[9px] uppercase tracking-[0.16em] text-oxblood">{kindLabel[selected.kind]}</p>
              <h2 className="mt-2 font-display text-3xl leading-tight">{selected.subject}</h2>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{selected.context}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-muted-foreground">
                <span>{selected.participants.join(" · ")}</span>
                {selected.bookingId ? (
                  <Link to="/member/bookings" className="underline underline-offset-4">
                    Booking {selected.bookingId}
                  </Link>
                ) : null}
                {selected.caseId ? (
                  <Link to="/member/concierge" className="underline underline-offset-4">
                    Case {selected.caseId}
                  </Link>
                ) : null}
                <span>{threadStateLabel[selected.state]}</span>
              </div>
            </div>

            <div className="divide-y divide-border">
              {selected.messages.map((message) => (
                <article key={message.id} className="px-6 py-5">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-sm font-semibold">{message.author}</p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{message.at}</p>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">{message.body}</p>
                </article>
              ))}
              {selected.messages.length === 0 ? (
                <p className="px-6 py-5 text-sm text-muted-foreground">No correspondence yet.</p>
              ) : null}
            </div>

            <form onSubmit={send} className="border-t border-border p-6">
              <label htmlFor="thread-message" className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Reply
              </label>
              <Textarea id="thread-message" name="body" rows={3} className="mt-3 rounded-none" placeholder="Write a short note." />
              <Button type="submit" className="mt-4 rounded-none">
                <Send className="mr-2 h-4 w-4" />
                Send
              </Button>
            </form>
          </section>
        ) : null}
      </div>
    </div>
  );
}
