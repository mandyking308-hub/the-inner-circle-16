import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SupplierIntro, useSupplierIdentity } from "@/components/supplier/SupplierShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { readThreads, writeThreads, type Thread } from "@/data/memberWorld";

export const Route = createFileRoute("/supplier/messages")({ component: SupplierMessages });

function SupplierMessages() {
  const { supplierId } = useSupplierIdentity();
  const [threads, setThreads] = useState<Thread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");

  useEffect(() => {
    setThreads(readThreads());
  }, []);

  const mine = useMemo(() => threads.filter((thread) => thread.supplierId === supplierId), [threads, supplierId]);
  const active = mine.find((thread) => thread.id === activeId) ?? mine[0] ?? null;

  const send = () => {
    if (!active || !draft.trim()) return;
    const next = threads.map((thread) =>
      thread.id === active.id
        ? {
            ...thread,
            state: "waiting" as const,
            messages: [
              ...thread.messages,
              {
                id: `msg-${Date.now()}`,
                author: "You",
                role: "supplier" as const,
                body: draft.trim(),
                at: new Date().toISOString(),
              },
            ],
          }
        : thread,
    );
    setThreads(next);
    writeThreads(next);
    setDraft("");
  };

  return (
    <div className="space-y-8">
      <SupplierIntro
        eyebrow="Messages"
        title="Conversations attached to your work."
        description="Every thread belongs to a booking or request. There are no open channels to members outside the work itself."
      />

      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="border border-border bg-card">
          {mine.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">No conversations yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {mine.map((thread) => (
                <li key={thread.id}>
                  <button
                    type="button"
                    onClick={() => setActiveId(thread.id)}
                    className={`w-full px-5 py-4 text-left transition-colors ${active?.id === thread.id ? "bg-accent" : "hover:bg-accent/60"}`}
                  >
                    <p className="text-[9px] uppercase tracking-[0.14em] text-oxblood">{thread.context}</p>
                    <p className="mt-1.5 font-display text-lg leading-tight">{thread.subject}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-muted-foreground">
                      {thread.messages[thread.messages.length - 1]?.body}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="border border-border bg-card">
          {active ? (
            <>
              <div className="border-b border-border p-6">
                <p className="text-[9px] uppercase tracking-[0.14em] text-oxblood">{active.context}</p>
                <h2 className="mt-2 font-display text-2xl">{active.subject}</h2>
              </div>
              <div className="space-y-4 p-6">
                {active.messages.map((message, index) => (
                  <div
                    key={`${active.id}-${index}`}
                    className={`max-w-[85%] border p-4 text-sm leading-6 ${message.role === "supplier" ? "ml-auto border-oxblood/40 bg-accent" : "border-border bg-background"}`}
                  >
                    <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                      {message.role === "supplier" ? "You" : message.author === "member" ? "Member" : "Concierge desk"}
                    </p>
                    <p className="mt-2">{message.body}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border p-5">
                <Textarea
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  rows={3}
                  placeholder="Reply"
                  className="rounded-none"
                />
                <Button className="mt-3 rounded-none" onClick={send}>
                  Send reply
                </Button>
              </div>
            </>
          ) : (
            <p className="p-6 text-sm text-muted-foreground">Select a conversation.</p>
          )}
        </div>
      </div>
    </div>
  );
}
