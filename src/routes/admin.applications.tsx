import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Inbox, MessageCircle, ShieldCheck, UserCheck } from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { loadApplications, saveApplications, type ApplicationStatus, type MembershipApplication } from "@/data/applicationStore";

export const Route = createFileRoute("/admin/applications")({ component: ApplicationsPage });

const statuses: ApplicationStatus[] = ["New", "Review", "Conversation", "Accepted", "Declined"];

function ApplicationsPage() {
  const [applications, setApplications] = useState<MembershipApplication[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadApplications();
    setApplications(loaded);
    setSelectedId(loaded[0]?.id ?? null);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveApplications(applications);
  }, [applications, hydrated]);

  const selected = applications.find((application) => application.id === selectedId) ?? applications[0];
  const newCount = useMemo(() => applications.filter((application) => application.status === "New").length, [applications]);
  const conversationCount = useMemo(() => applications.filter((application) => application.status === "Conversation").length, [applications]);

  const setStatus = (id: string, status: ApplicationStatus) => {
    setApplications((current) => current.map((application) => application.id === id ? { ...application, status } : application));
  };

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Membership operations" title="Applications" description="Public prototype submissions arrive here on the same browser. Review what the person is actually building, what is complicated and what they would add to the room — not simply their title." />

      <div className="grid gap-4 sm:grid-cols-3"><StatCard label="Applications" value={String(applications.length)} /><StatCard label="New" value={String(newCount)} /><StatCard label="Conversations" value={String(conversationCount)} /></div>

      <div className="grid gap-5 xl:grid-cols-[0.78fr_1.22fr]">
        <section className="border border-border bg-card">
          <div className="flex items-center gap-3 border-b border-border p-5"><Inbox className="h-5 w-5 text-bronze" /><h2 className="font-display text-3xl">Review queue</h2></div>
          <div className="divide-y divide-border">
            {applications.length ? applications.map((application) => (
              <button key={application.id} type="button" onClick={() => setSelectedId(application.id)} className={`block w-full p-5 text-left transition-colors ${selected?.id === application.id ? "bg-accent" : "hover:bg-accent/50"}`}>
                <div className="flex items-start justify-between gap-4"><div><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-bronze">{application.membership} · {application.id}</p><h3 className="mt-2 font-display text-2xl">{application.name}</h3><p className="mt-1 text-xs text-muted-foreground">{application.location || application.profile}</p></div><span className="border border-border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em]">{application.status}</span></div>
              </button>
            )) : <p className="p-6 text-sm text-muted-foreground">No applications yet.</p>}
          </div>
        </section>

        <section className="border border-border bg-card">
          {selected ? (
            <>
              <div className="border-b border-border p-6"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="eyebrow text-bronze">{selected.id}</p><h2 className="mt-2 font-display text-4xl">{selected.name}</h2><p className="mt-2 text-sm text-muted-foreground">{selected.email} · {selected.location || "Location not supplied"}</p></div><span className="border border-border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]">{selected.status}</span></div></div>
              <div className="space-y-6 p-6">
                <div className="grid gap-4 sm:grid-cols-2"><div><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Profile</p><p className="mt-2 text-sm">{selected.profile || "Not supplied"}</p></div><div><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Membership lane</p><p className="mt-2 text-sm">{selected.membership}</p></div></div>
                {[
                  ["What are they building?", selected.building],
                  ["What is complicated?", selected.complicated],
                  ["What would they bring?", selected.contribution],
                  ["Referral", selected.referral || "Not supplied"],
                ].map(([title, body]) => <div key={title} className="border-t border-border pt-5"><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-bronze">{title}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></div>)}

                <div className="border-t border-border pt-5"><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Move application</p><div className="mt-3 flex flex-wrap gap-2">{statuses.map((status) => <Button key={status} type="button" variant={selected.status === status ? "default" : "outline"} className="rounded-none" onClick={() => setStatus(selected.id, status)}>{status}</Button>)}</div></div>
              </div>
            </>
          ) : <div className="p-8 text-sm text-muted-foreground">Choose an application from the queue.</div>}
        </section>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <article className="border border-border bg-card p-6"><ShieldCheck className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">Fit before scale</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">A strong founding cohort matters more than a large one. Review for character, relevance, contribution and whether the current room can actually help.</p></article>
        <article className="border border-border bg-card p-6"><MessageCircle className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">Conversation before checkout</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">The first human interaction should understand the life behind the application and what would make membership useful.</p></article>
        <article className="border border-border bg-card p-6"><UserCheck className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">Production next</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Before public launch this same workflow moves from browser storage to secure authenticated database records with permissions and audit history.</p></article>
      </div>
    </div>
  );
}
