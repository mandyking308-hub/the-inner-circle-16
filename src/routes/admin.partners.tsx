import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Building2, ShieldAlert } from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { trustedPartners } from "@/data/infrastructure";

export const Route = createFileRoute("/admin/partners")({
  component: AdminPartnersPage,
});

function AdminPartnersPage() {
  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Partner operations" title="Trusted Partner Network" description="Screen providers, record references, manage statuses and protect the firewall between commercial partners and confidential member spaces." action={<Button className="rounded-none">Add partner candidate</Button>} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"><StatCard label="Active partners" value={String(trustedPartners.length)} note="Demo records" /><StatCard label="Member recommended" value={String(trustedPartners.filter((p) => p.status === "Member Recommended").length)} /><StatCard label="Vetted" value={String(trustedPartners.filter((p) => p.status === "Vetted Partner").length)} /><StatCard label="Strategic" value={String(trustedPartners.filter((p) => p.status === "Strategic Partner").length)} /></div>
      <section className="border border-border bg-card"><div className="border-b border-border p-5"><div className="flex items-center gap-3"><Building2 className="h-5 w-5 text-bronze" /><h2 className="font-display text-3xl">Partner register</h2></div></div><div className="divide-y divide-border">{trustedPartners.map((partner) => <article key={partner.id} className="grid gap-4 p-5 md:grid-cols-[1fr_180px_180px_auto] md:items-center"><div><p className="text-[10px] uppercase tracking-[0.16em] text-bronze">{partner.category}</p><h3 className="mt-1 font-display text-2xl">{partner.name}</h3><p className="mt-2 text-xs leading-6 text-muted-foreground">{partner.focus}</p></div><div><p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Status</p><p className="mt-1 text-sm">{partner.status}</p></div><div><p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">References</p><p className="mt-1 text-sm">{partner.recommendedBy} member signals</p></div><Button variant="outline" className="rounded-none">Review</Button></article>)}</div></section>
      <section className="border border-border bg-foreground p-6 text-background"><div className="flex items-start gap-3"><ShieldAlert className="mt-0.5 h-5 w-5 text-bronze" /><div><h2 className="font-display text-3xl">Commercial firewall</h2><p className="mt-4 max-w-3xl text-sm leading-7 text-background/70">Partner fees, sponsorships or benefits must never purchase member contact data, access to private Table discussions or the right to cold-solicit. Any future commercial agreement should preserve that rule contractually and operationally.</p></div></div></section>
    </div>
  );
}
