import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { needsReplyCount, readThreads, threadStateLabel, type Thread } from "@/data/memberWorld";

export const Route = createFileRoute("/admin/messages")({ component: AdminMessages });

function AdminMessages() {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    setThreads(readThreads());
  }, []);

  const conciergeThreads = threads.filter((thread) => thread.kind !== "montvelle");

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Messages"
        title="Conversations the desk is responsible for."
        description="Operational visibility is limited to threads where the concierge desk is a participant. Member-to-member conversation is never surfaced here."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open threads" value={String(conciergeThreads.length)} note="Across concierge, bookings and partners." />
        <StatCard label="Needs reply" value={String(needsReplyCount(conciergeThreads))} note="A member or supplier is waiting." />
        <StatCard
          label="With suppliers"
          value={String(conciergeThreads.filter((thread) => thread.supplierId).length)}
          note="Attached to a specific piece of work."
        />
        <StatCard
          label="Closed"
          value={String(conciergeThreads.filter((thread) => thread.state === "closed").length)}
          note="Concluded and archived."
        />
      </div>

      <section className="border border-border bg-card">
        <div className="border-b border-border p-6">
          <p className="eyebrow text-oxblood">Thread register</p>
          <h2 className="mt-2 font-display text-3xl">Where a reply is owed</h2>
        </div>
        <div className="divide-y divide-border">
          {conciergeThreads.map((thread) => (
            <div key={thread.id} className="grid gap-2 p-6 lg:grid-cols-[1.4fr_1fr_auto] lg:items-center">
              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-oxblood">{thread.context}</p>
                <h3 className="mt-1.5 font-display text-2xl">{thread.subject}</h3>
              </div>
              <p className="text-xs leading-6 text-muted-foreground">{thread.participants.join(" · ")}</p>
              <span className="shrink-0 border border-border px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                {threadStateLabel[thread.state]}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-border bg-foreground p-6 text-background">
        <ShieldCheck className="h-5 w-5 text-bronze" />
        <p className="mt-5 max-w-3xl font-display text-2xl leading-snug">
          Message content is read only where the desk is operationally responsible for the outcome.
        </p>
      </section>
    </div>
  );
}
