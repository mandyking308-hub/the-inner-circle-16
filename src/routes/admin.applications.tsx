import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Inbox, MessageCircle, ShieldCheck, UserCheck } from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { loadApplications, saveApplications, type ApplicationStatus, type MembershipApplication } from "@/data/applicationStore";
import { memberQualification, scoreMeaning, type ReviewScore } from "@/data/qualification";
import { ReferencePanel } from "@/components/admin/ReferencePanel";

export const Route = createFileRoute("/admin/applications")({ component: ApplicationsPage });

const statuses: ApplicationStatus[] = ["New", "Review", "Conversation", "Accepted", "Declined"];
const REVIEW_KEY = "project-table:application-reviews:v2";
type ApplicationReview = { scores: Record<string, ReviewScore>; notes: string; referenceStatus: string; conversationOwner: string };

function ApplicationsPage() {
  const [applications, setApplications] = useState<MembershipApplication[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Record<string, ApplicationReview>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadApplications();
    setApplications(loaded);
    setSelectedId(loaded[0]?.id ?? null);
    try { const raw = window.localStorage.getItem(REVIEW_KEY); if (raw) setReviews(JSON.parse(raw) as Record<string, ApplicationReview>); } catch { /* empty review state */ }
    setHydrated(true);
  }, []);

  useEffect(() => { if (hydrated) { saveApplications(applications); window.localStorage.setItem(REVIEW_KEY, JSON.stringify(reviews)); } }, [applications, hydrated, reviews]);

  const selected = applications.find((application) => application.id === selectedId) ?? applications[0];
  const review = selected ? reviews[selected.id] : undefined;
  const newCount = useMemo(() => applications.filter((application) => application.status === "New").length, [applications]);
  const conversationCount = useMemo(() => applications.filter((application) => application.status === "Conversation").length, [applications]);
  const reviewAverage = review ? Object.values(review.scores).reduce((sum, score) => sum + score, 0) / Math.max(Object.values(review.scores).length, 1) : 0;

  const setStatus = (id: string, status: ApplicationStatus) => setApplications((current) => current.map((application) => application.id === id ? { ...application, status } : application));
  const updateReview = (id: string, updater: (current: ApplicationReview) => ApplicationReview) => setReviews((current) => ({ ...current, [id]: updater(current[id] ?? { scores: {}, notes: "", referenceStatus: "References to check", conversationOwner: "Membership team" }) }));

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Membership operations" title="Applications" description="Review the responsibility a person carries, the complexity they are navigating, what they would contribute and whether adding them makes the room better. Prestige alone is not a qualification." />

      <div className="grid gap-4 sm:grid-cols-4"><StatCard label="Applications" value={String(applications.length)} /><StatCard label="New" value={String(newCount)} /><StatCard label="Conversations" value={String(conversationCount)} /><StatCard label="Selected review" value={reviewAverage ? reviewAverage.toFixed(1) : "—"} note="Structured fit score / 5" /></div>

      <div className="grid gap-5 xl:grid-cols-[0.68fr_1.32fr]">
        <section className="border border-border bg-card"><div className="flex items-center gap-3 border-b border-border p-5"><Inbox className="h-5 w-5 text-oxblood" /><h2 className="font-display text-3xl">Review queue</h2></div><div className="divide-y divide-border">{applications.length ? applications.map((application) => <button key={application.id} type="button" onClick={() => setSelectedId(application.id)} className={`block w-full p-5 text-left transition-colors ${selected?.id === application.id ? "bg-accent" : "hover:bg-accent/50"}`}><div className="flex items-start justify-between gap-4"><div><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-oxblood">{application.membership} · {application.id}</p><h3 className="mt-2 font-display text-2xl">{application.name}</h3><p className="mt-1 text-xs text-muted-foreground">{application.location || application.profile}</p></div><span className="border border-border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em]">{application.status}</span></div></button>) : <p className="p-6 text-sm text-muted-foreground">No applications yet.</p>}</div></section>

        <section className="border border-border bg-card">{selected ? <><div className="border-b border-border p-6"><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="eyebrow text-oxblood">{selected.id}</p><h2 className="mt-2 font-display text-4xl">{selected.name}</h2><p className="mt-2 text-sm text-muted-foreground">{selected.email} · {selected.location || "Location not supplied"}</p></div><span className="border border-border px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em]">{selected.status}</span></div></div><div className="space-y-7 p-6"><div className="grid gap-4 sm:grid-cols-2"><div><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Profile</p><p className="mt-2 text-sm">{selected.profile || "Not supplied"}</p></div><div><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Membership lane</p><p className="mt-2 text-sm">{selected.membership}</p></div></div>{[["What are they building?", selected.building],["What is complicated?", selected.complicated],["What would they bring?", selected.contribution],["Referral", selected.referral || "Not supplied"]].map(([title, body]) => <div key={title} className="border-t border-border pt-5"><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-oxblood">{title}</p><p className="mt-3 text-sm leading-7 text-muted-foreground">{body}</p></div>)}

          <ReferencePanel references={selected.references} />

          <div className="border-t border-border pt-6"><div className="flex items-end justify-between gap-4"><div><p className="eyebrow text-oxblood">Qualification review</p><h3 className="mt-2 font-display text-3xl">Score the fit, then use judgement.</h3></div>{reviewAverage ? <p className="font-display text-4xl text-oxblood">{reviewAverage.toFixed(1)}<span className="text-xl text-muted-foreground">/5</span></p> : null}</div><div className="mt-5 space-y-3">{memberQualification.map((item) => { const score = review?.scores[item.key]; return <div key={item.key} className="grid gap-4 border border-border bg-background p-4 lg:grid-cols-[160px_1fr_210px] lg:items-center"><div><p className="text-sm font-semibold">{item.label}</p>{score ? <p className="mt-1 text-[9px] uppercase tracking-[0.12em] text-oxblood">{scoreMeaning[score]}</p> : null}</div><p className="text-xs leading-6 text-muted-foreground">{item.question}</p><div className="flex gap-1">{([1,2,3,4,5] as ReviewScore[]).map((value) => <button key={value} type="button" onClick={() => updateReview(selected.id, (current) => ({ ...current, scores: { ...current.scores, [item.key]: value } }))} className={`h-8 flex-1 border text-[10px] ${score === value ? "border-oxblood bg-oxblood text-oxblood-foreground" : "border-border"}`}>{value}</button>)}</div></div>; })}</div></div>

          <div className="grid gap-4 border-t border-border pt-6 sm:grid-cols-2"><div><label className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Reference checks</label><select value={review?.referenceStatus ?? "References to check"} onChange={(event) => updateReview(selected.id, (current) => ({ ...current, referenceStatus: event.target.value }))} className="mt-2 h-10 w-full rounded-none border border-input bg-background px-3 text-sm"><option>References to check</option><option>Reference 1 checked</option><option>References checked</option><option>Concern raised</option></select></div><div><label className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Conversation owner</label><input value={review?.conversationOwner ?? "Membership team"} onChange={(event) => updateReview(selected.id, (current) => ({ ...current, conversationOwner: event.target.value }))} className="mt-2 h-10 w-full rounded-none border border-input bg-background px-3 text-sm" /></div><div className="sm:col-span-2"><label className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Private review notes</label><Textarea value={review?.notes ?? ""} onChange={(event) => updateReview(selected.id, (current) => ({ ...current, notes: event.target.value }))} rows={5} className="mt-2 rounded-none" placeholder="What would this person add? What concern needs testing in conversation? Which Table could genuinely help them?" /></div></div>

          <div className="border-t border-border pt-5"><p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Move application</p><div className="mt-3 flex flex-wrap gap-2">{statuses.map((status) => <Button key={status} type="button" variant={selected.status === status ? "default" : "outline"} className="rounded-none" onClick={() => setStatus(selected.id, status)}>{status}</Button>)}</div></div>
        </div></> : <div className="p-8 text-sm text-muted-foreground">Choose an application from the queue.</div>}</section>
      </div>

      <div className="grid gap-4 lg:grid-cols-3"><article className="border border-border bg-card p-6"><ShieldCheck className="h-5 w-5 text-oxblood" /><h2 className="mt-5 font-display text-3xl">Fit before scale</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">A strong founding cohort matters more than a large one. The score creates discipline; it does not replace human judgement.</p></article><article className="border border-border bg-card p-6"><MessageCircle className="h-5 w-5 text-oxblood" /><h2 className="mt-5 font-display text-3xl">Conversation before terms</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">The first conversation should test what the person is really responsible for, what they need help thinking through and whether they would make a permanent peer circle better.</p></article><article className="border border-border bg-card p-6"><UserCheck className="h-5 w-5 text-oxblood" /><h2 className="mt-5 font-display text-3xl">No score buys a seat</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">References, conflicts, conduct and room composition can outweigh an attractive average. Curation remains an operating responsibility.</p></article></div>
    </div>
  );
}
