import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { PageIntro } from "@/components/private/PrivateShell";
import { Input } from "@/components/ui/input";
import { members } from "@/data/community";
import { getRelationshipContext } from "@/data/relationshipIntelligence";

export const Route = createFileRoute("/member/community")({ component: CommunityPage });

function CommunityPage() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("All");
  const [mode, setMode] = useState<"Browse" | "Who can help?">("Who can help?");

  const sectors = ["All", ...Array.from(new Set(members.map((member) => member.sector)))];
  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return members
      .map((member) => ({ member, context: getRelationshipContext(member.id) }))
      .filter(({ member, context }) => {
        const sectorMatch = sector === "All" || member.sector === sector;
        const text = [member.name, member.role, member.organisation, member.city, member.sector, member.contribution, member.seeking, ...member.expertise, ...member.interests, ...(context?.sharedContexts ?? []), ...(context?.otherCities ?? []), context?.whyRelevant ?? ""].join(" ").toLowerCase();
        return sectorMatch && (!needle || text.includes(needle));
      })
      .sort((a, b) => {
        if (mode === "Browse") return 0;
        const needleTerms = query.toLowerCase().split(/\s+/).filter(Boolean);
        const score = (entry: typeof a) => needleTerms.reduce((total, term) => total + [entry.member.contribution, entry.member.seeking, ...entry.member.expertise, ...entry.member.interests, entry.context?.whyRelevant ?? ""].join(" ").toLowerCase().split(term).length - 1, 0);
        return score(b) - score(a);
      });
  }, [mode, query, sector]);

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Community" title="Who in this room could actually help?" description="Search the lived experience, expertise and relationship context of the community. The aim is not to browse impressive names; it is to understand why somebody may be relevant before asking for a warm introduction." />

      <section className="border border-border bg-card p-4 md:p-5"><div className="grid gap-3 xl:grid-cols-[1fr_auto_auto]"><label className="relative block"><Input value={query} onChange={(event) => setQuery(event.target.value)} className="rounded-none pl-9" placeholder={mode === "Who can help?" ? "Describe the problem: succession, Dubai schools, cyber, hiring…" : "Search expertise, sector, city or interest"} /></label><div className="flex gap-2">{(["Who can help?", "Browse"] as const).map((item) => <button key={item} type="button" onClick={() => setMode(item)} className={`border px-3 py-2 text-[10px] uppercase tracking-[0.12em] ${mode === item ? "border-foreground bg-foreground text-background" : "border-border"}`}>{item}</button>)}</div><div className="flex max-w-full gap-2 overflow-x-auto">{sectors.map((item) => <button key={item} type="button" onClick={() => setSector(item)} className={`shrink-0 border px-3 py-2 text-[10px] transition-colors ${sector === item ? "border-oxblood bg-oxblood text-oxblood-foreground" : "border-border bg-background text-muted-foreground"}`}>{item}</button>)}</div></div></section>

      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {filtered.map(({ member, context }) => (
          <article key={member.id} className="border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-4"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-foreground text-xs font-semibold text-background">{member.initials}</div><span className="text-[9px] uppercase tracking-[0.16em] text-oxblood">{context?.relationship ?? "Member"}</span></div>
            <h2 className="mt-5 font-display text-3xl">{member.name}</h2><p className="mt-1 text-xs leading-5 text-muted-foreground">{member.role} · {member.organisation}</p>
            {context ? <div className="mt-5 border-y border-border py-4"><p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-oxblood">Why this person may be useful</p><p className="mt-2 text-xs leading-6">{context.whyRelevant}</p><div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-muted-foreground">{context.metAt ? <span className="inline-flex items-center gap-1.5">Met at {context.metAt}</span> : null}{context.otherCities.length ? <span className="inline-flex items-center gap-1.5">{context.otherCities.join(" · ")}</span> : null}{context.languages.length ? <span className="inline-flex items-center gap-1.5">{context.languages.join(" · ")}</span> : null}</div>{context.mutualConnections.length ? <p className="mt-3 text-[10px] text-muted-foreground">Mutual context: {context.mutualConnections.join(", ")}</p> : null}</div> : null}
            <div className="mt-4 flex flex-wrap gap-1.5">{member.expertise.map((item) => <span key={item} className="border border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">{item}</span>)}</div>
            <div className="mt-5"><p className="text-[9px] uppercase tracking-[0.16em] text-bronze">Can help with</p><p className="mt-2 text-xs leading-6 text-muted-foreground">{member.contribution}</p></div><div className="mt-4"><p className="text-[9px] uppercase tracking-[0.16em] text-bronze">Thinking about</p><p className="mt-2 text-xs leading-6 text-muted-foreground">{member.seeking}</p></div>
            <Link to="/member/introductions" search={{ person: member.name } as never} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">Request a warm introduction </Link>
          </article>
        ))}
      </div>

      {!filtered.length ? <div className="border border-border bg-card p-8 text-center"><h2 className="mt-4 font-display text-3xl">No obvious match in the community.</h2><p className="mt-3 text-sm text-muted-foreground">If the right expertise sits outside the community, tell us and we will go and find it.</p><Link to="/member/services" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Ask Montvelle to find the right person </Link></div> : null}

      <div className="flex items-start gap-3 border border-border bg-accent/30 p-4 text-xs leading-6 text-muted-foreground">Member profiles and relationship context are for trusted relationship-building inside the community. Exporting, scraping or using them for unsolicited sales is a membership breach.</div>
    </div>
  );
}
