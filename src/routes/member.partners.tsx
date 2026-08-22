import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Clock3, Handshake, Scale, ShieldCheck, Star } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { partnerCategories, trustedPartners } from "@/data/infrastructure";
import { getPartnerAssurance } from "@/data/partnerAssurance";

export const Route = createFileRoute("/member/partners")({ component: MemberPartnersPage });

const average = (scores: number[]) => (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(1);

function MemberPartnersPage() {
  const [category, setCategory] = useState("All");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const filtered = useMemo(() => category === "All" ? trustedPartners : trustedPartners.filter((partner) => partner.category === category), [category]);
  const selected = trustedPartners.find((partner) => partner.id === selectedId);
  const assurance = selected ? getPartnerAssurance(selected.id) : undefined;

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Trusted Partners" title="Find a specialist with context" description="Recommendation, screening, service feedback and commercial disclosure should sit beside the provider name — so the member can see why somebody is in the network before deciding whether to speak to them." action={<Button asChild className="rounded-none"><Link to="/member/concierge">Ask Concierge to source someone</Link></Button>} />

      <section className="border border-border bg-card p-5"><div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 text-oxblood" /><div><p className="text-sm font-semibold">Status is evidence, not a guarantee.</p><p className="mt-1 text-xs leading-6 text-muted-foreground">Member Recommended means a member has used the firm. Vetted Partner adds references and screening. Strategic Partner means a deeper service or benefit relationship. Members still choose the right professional and scope for their own circumstances.</p></div></div></section>

      <div className="flex gap-2 overflow-x-auto pb-1">{["All", ...partnerCategories].map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 border px-3 py-2 text-[10px] uppercase tracking-[0.14em] transition-colors ${category === item ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground hover:text-foreground"}`}>{item}</button>)}</div>

      <section className="grid gap-4 xl:grid-cols-2">
        {filtered.map((partner) => {
          const partnerAssurance = getPartnerAssurance(partner.id);
          const serviceAverage = partnerAssurance ? average(Object.values(partnerAssurance.service)) : null;
          return <article key={partner.id} className="border border-border bg-card p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.17em] text-oxblood">{partner.category}</p><h2 className="mt-2 font-display text-3xl">{partner.name}</h2></div><BadgeCheck className="h-5 w-5 text-bronze" /></div><p className="mt-4 text-sm leading-7 text-muted-foreground">{partner.focus}</p><div className="mt-5 grid gap-3 border-y border-border py-4 sm:grid-cols-3"><div><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Trust status</p><p className="mt-1 text-sm">{partner.status}</p></div><div><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Due diligence</p><p className="mt-1 text-sm">{partnerAssurance?.dueDiligence ?? "Not recorded"}</p></div><div><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Private service score</p><p className="mt-1 flex items-center gap-2 text-sm"><Star className="h-3.5 w-3.5 fill-current text-bronze" />{serviceAverage ?? "—"} / 5</p></div><div><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Member signals</p><p className="mt-1 text-sm">{partner.recommendedBy}</p></div><div><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Completed briefs</p><p className="mt-1 text-sm">{partnerAssurance?.completedBriefs ?? "—"}</p></div><div><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Response</p><p className="mt-1 text-sm">{partner.responseTime}</p></div></div><div className="mt-5"><p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Member benefit</p><p className="mt-2 text-sm">{partner.benefit}</p></div><div className="mt-6 flex flex-wrap gap-2"><Button className="rounded-none" variant="outline" onClick={() => setSelectedId(partner.id)}>Review assurance</Button><Button asChild className="rounded-none"><Link to="/member/concierge"><Handshake className="mr-2 h-4 w-4" />Request introduction</Link></Button></div></article>;
        })}
      </section>

      {selected && assurance ? <section className="border border-border bg-foreground p-6 text-background md:p-8"><div className="grid gap-8 xl:grid-cols-[0.8fr_1.2fr]"><div><p className="eyebrow text-bronze">Assurance record</p><h2 className="mt-3 font-display text-4xl">{selected.name}</h2><p className="mt-4 text-sm leading-7 text-background/65">{assurance.regulatoryNote}</p><div className="mt-6 flex flex-wrap gap-2">{assurance.jurisdictions.map((jurisdiction) => <span key={jurisdiction} className="border border-background/20 px-2.5 py-1.5 text-[9px] uppercase tracking-[0.12em] text-background/70">{jurisdiction}</span>)}</div></div><div className="grid gap-px bg-background/15 sm:grid-cols-2"><article className="bg-foreground p-5"><Clock3 className="h-4 w-4 text-bronze" /><p className="mt-5 text-[9px] uppercase tracking-[0.14em] text-background/45">Review cycle</p><p className="mt-2 text-sm">Last {assurance.lastReview}</p><p className="mt-1 text-sm text-background/65">Next {assurance.nextReview}</p></article><article className="bg-foreground p-5"><Scale className="h-4 w-4 text-bronze" /><p className="mt-5 text-[9px] uppercase tracking-[0.14em] text-background/45">Conflicts</p><p className="mt-2 text-xs leading-6 text-background/65">{assurance.conflicts}</p></article><article className="bg-foreground p-5 sm:col-span-2"><ShieldCheck className="h-4 w-4 text-bronze" /><p className="mt-5 text-[9px] uppercase tracking-[0.14em] text-background/45">Referral disclosure</p><p className="mt-2 text-xs leading-6 text-background/65">{assurance.referralDisclosure}</p></article></div></div></section> : null}

      <section className="border border-border bg-card p-6"><p className="text-xs leading-6 text-muted-foreground">Service scores are private community feedback signals, not professional rankings or guarantees. They should only be published once enough genuine completed-member feedback exists to make the number meaningful.</p></section>
    </div>
  );
}
