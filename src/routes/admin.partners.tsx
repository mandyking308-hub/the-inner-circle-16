import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Building2, CalendarClock, ShieldAlert, Star } from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { trustedPartners } from "@/data/infrastructure";
import { partnerAssurance, getPartnerAssurance } from "@/data/partnerAssurance";
import { loadPartnerApplications, savePartnerApplications, type PartnerApplication, type PartnerApplicationStatus } from "@/data/partnerApplicationStore";
import { partnerQualification } from "@/data/qualification";

export const Route = createFileRoute("/admin/partners")({ component: AdminPartnersPage });

const statuses: PartnerApplicationStatus[] = ["New", "Screening", "References", "Conversation", "Approved", "Declined"];

function AdminPartnersPage() {
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const loaded = loadPartnerApplications();
    setApplications(loaded);
    setSelectedId(loaded[0]?.id ?? null);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) savePartnerApplications(applications);
  }, [applications, hydrated]);

  const selected = applications.find((application) => application.id === selectedId) ?? applications[0];
  const reviewDue = useMemo(() => partnerAssurance.filter((item) => item.dueDiligence === "Review due").length, []);

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Partner operations" title="Trusted Partner assurance" description="Run a separate professional screening pipeline, keep diligence current, record commercial disclosures and use member service feedback to decide who remains trusted." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Active partners" value={String(trustedPartners.length)} /><StatCard label="Partner applications" value={String(applications.length)} /><StatCard label="Review due" value={String(reviewDue)} /><StatCard label="Current assurance" value={String(partnerAssurance.filter((item) => item.dueDiligence === "Current").length)} /></div>

      <section className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="border border-border bg-card"><div className="border-b border-border p-5"><p className="eyebrow text-oxblood">Application queue</p><h2 className="mt-2 font-display text-3xl">Professional screening</h2></div><div className="divide-y divide-border">{applications.map((application) => <button key={application.id} type="button" onClick={() => setSelectedId(application.id)} className={`block w-full p-5 text-left ${selected?.id === application.id ? "bg-accent" : "hover:bg-accent/50"}`}><div className="flex items-start justify-between gap-3"><div><p className="text-[9px] uppercase tracking-[0.14em] text-oxblood">{application.category}</p><h3 className="mt-2 font-display text-2xl">{application.firm}</h3><p className="mt-1 text-xs text-muted-foreground">{application.contactName} · {application.locations}</p></div><span className="border border-border px-2 py-1 text-[9px] uppercase tracking-[0.12em]">{application.status}</span></div></button>)}</div></div>

        <div className="border border-border bg-card p-6">{selected ? <><div className="flex flex-wrap items-start justify-between gap-5"><div><p className="eyebrow text-oxblood">{selected.id}</p><h2 className="mt-2 font-display text-4xl">{selected.firm}</h2><p className="mt-2 text-sm text-muted-foreground">{selected.contactName} · {selected.email}</p></div><select value={selected.status} onChange={(event) => setApplications((current) => current.map((application) => application.id === selected.id ? { ...application, status: event.target.value as PartnerApplicationStatus } : application))} className="h-9 rounded-none border border-input bg-background px-3 text-xs">{statuses.map((status) => <option key={status}>{status}</option>)}</select></div><div className="mt-6 grid gap-4 sm:grid-cols-2">{[["Regulatory / professional status", selected.regulatoryStatus],["Relevant family experience", selected.familyExperience],["Why members need them", selected.whyRelevant],["Member benefit", selected.memberBenefit || "None proposed"],["References", selected.references],["Conflicts / commercial disclosure", selected.conflicts || "None supplied"]].map(([label, value]) => <div key={label} className="border-t border-border pt-4"><p className="text-[9px] uppercase tracking-[0.14em] text-oxblood">{label}</p><p className="mt-2 text-xs leading-6 text-muted-foreground">{value}</p></div>)}</div><div className="mt-7 border-t border-border pt-5"><p className="eyebrow text-oxblood">Screening questions</p><div className="mt-4 grid gap-3 sm:grid-cols-2">{partnerQualification.map((item) => <div key={item.key} className="border border-border bg-background p-4"><p className="text-sm font-semibold">{item.label}</p><p className="mt-2 text-xs leading-6 text-muted-foreground">{item.question}</p></div>)}</div></div></> : <p className="text-sm text-muted-foreground">Select a partner application.</p>}</div>
      </section>

      <section className="border border-border bg-card"><div className="border-b border-border p-5"><div className="flex items-center gap-3"><Building2 className="h-5 w-5 text-oxblood" /><h2 className="font-display text-3xl">Active partner register</h2></div></div><div className="divide-y divide-border">{trustedPartners.map((partner) => { const assurance = getPartnerAssurance(partner.id); const score = assurance ? (Object.values(assurance.service).reduce((sum, value) => sum + value, 0) / 4).toFixed(1) : "—"; return <article key={partner.id} className="grid gap-4 p-5 lg:grid-cols-[1fr_160px_150px_150px] lg:items-center"><div><p className="text-[9px] uppercase tracking-[0.16em] text-oxblood">{partner.category}</p><h3 className="mt-1 font-display text-2xl">{partner.name}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{assurance?.regulatoryNote}</p></div><div><p className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Diligence</p><p className="mt-1 text-sm">{assurance?.dueDiligence}</p></div><div><p className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Next review</p><p className="mt-1 flex items-center gap-2 text-sm"><CalendarClock className="h-3.5 w-3.5 text-bronze" />{assurance?.nextReview}</p></div><div><p className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Service</p><p className="mt-1 flex items-center gap-2 text-sm"><Star className="h-3.5 w-3.5 fill-current text-bronze" />{score} / 5</p></div></article>; })}</div></section>

      <section className="border border-border bg-foreground p-6 text-background"><div className="flex items-start gap-3"><ShieldAlert className="mt-0.5 h-5 w-5 text-bronze" /><div><h2 className="font-display text-3xl">Commercial firewall</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-background/70">Partner fees, sponsorships, commissions or benefits must be disclosed where they could influence a recommendation. None may purchase member contact data, private Table access or cold-solicitation rights.</p></div></div></section>
    </div>
  );
}
