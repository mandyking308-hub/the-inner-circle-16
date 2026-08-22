import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Handshake, ShieldCheck, Star } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { partnerCategories, trustedPartners } from "@/data/infrastructure";

export const Route = createFileRoute("/member/partners")({
  component: MemberPartnersPage,
});

function MemberPartnersPage() {
  const [category, setCategory] = useState("All");
  const filtered = useMemo(() => category === "All" ? trustedPartners : trustedPartners.filter((partner) => partner.category === category), [category]);

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Trusted Partner Network"
        title="Find a specialist with context"
        description="The directory is recommendation-led and curated. Partners do not receive member contact details unless you ask concierge to make an introduction."
        action={<Button className="rounded-none">Request a specialist</Button>}
      />

      <section className="border border-border bg-card p-5">
        <div className="flex items-start gap-3"><ShieldCheck className="mt-0.5 h-5 w-5 text-bronze" /><div><p className="text-sm font-medium">What the status means</p><p className="mt-1 text-xs leading-6 text-muted-foreground">Member Recommended = used and recommended by a member. Vetted Partner = references and screening completed. Strategic Partner = deeper service or benefit relationship. None is a guarantee; members still make their own professional decisions.</p></div></div>
      </section>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {["All", ...partnerCategories].map((item) => <button key={item} type="button" onClick={() => setCategory(item)} className={`shrink-0 border px-3 py-2 text-[10px] uppercase tracking-[0.14em] transition-colors ${category === item ? "border-foreground bg-foreground text-background" : "border-border bg-background text-muted-foreground hover:text-foreground"}`}>{item}</button>)}
      </div>

      <section className="grid gap-4 lg:grid-cols-2">
        {filtered.map((partner) => (
          <article key={partner.id} className="border border-border bg-card p-6">
            <div className="flex items-start justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.17em] text-bronze">{partner.category}</p><h2 className="mt-2 font-display text-3xl">{partner.name}</h2></div><BadgeCheck className="h-5 w-5 text-bronze" /></div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{partner.focus}</p>
            <div className="mt-5 grid gap-3 border-y border-border py-4 sm:grid-cols-2"><div><p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Status</p><p className="mt-1 text-sm">{partner.status}</p></div><div><p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Locations</p><p className="mt-1 text-sm">{partner.locations.join(" · ")}</p></div><div><p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Member recommendations</p><p className="mt-1 flex items-center gap-2 text-sm"><Star className="h-3.5 w-3.5 text-bronze" />{partner.recommendedBy}</p></div><div><p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Response</p><p className="mt-1 text-sm">{partner.responseTime}</p></div></div>
            <div className="mt-5"><p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Member benefit</p><p className="mt-2 text-sm">{partner.benefit}</p></div>
            <Button className="mt-6 w-full rounded-none" variant="outline"><Handshake className="mr-2 h-4 w-4" />Ask concierge for an introduction</Button>
          </article>
        ))}
      </section>
    </div>
  );
}
