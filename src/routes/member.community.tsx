import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Search, ShieldCheck } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Input } from "@/components/ui/input";
import { members } from "@/data/community";

export const Route = createFileRoute("/member/community")({
  component: CommunityPage,
});

function CommunityPage() {
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("All");

  const sectors = ["All", ...Array.from(new Set(members.map((member) => member.sector)))];
  const filtered = useMemo(() => {
    const needle = query.toLowerCase().trim();
    return members.filter((member) => {
      const sectorMatch = sector === "All" || member.sector === sector;
      const text = [
        member.name,
        member.role,
        member.organisation,
        member.city,
        member.sector,
        ...member.expertise,
        ...member.interests,
      ]
        .join(" ")
        .toLowerCase();
      return sectorMatch && (!needle || text.includes(needle));
    });
  }, [query, sector]);

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Community"
        title="Useful people, without the cold directory."
        description="Profiles show what members know, what they care about and where they can help. Contact details stay private; use the introduction desk when there is a genuine reason to connect."
      />

      <section className="border border-border bg-card p-4 md:p-5">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <label className="relative block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="rounded-none pl-9"
              placeholder="Search expertise, sector, city or interest"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {sectors.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setSector(item)}
                className={`border px-3 py-2 text-xs transition-colors ${
                  sector === item
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((member) => (
          <article key={member.id} className="border border-border bg-card p-5">
            <div className="flex items-start justify-between gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-xs font-medium">
                {member.initials}
              </div>
              <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{member.city}</span>
            </div>
            <h2 className="mt-5 font-display text-2xl">{member.name}</h2>
            <p className="mt-1 text-xs leading-5 text-muted-foreground">
              {member.role} · {member.organisation}
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {member.expertise.map((item) => (
                <span key={item} className="border border-border bg-background px-2 py-1 text-[11px] text-muted-foreground">
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-5 border-t border-border pt-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-bronze">Can help with</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{member.contribution}</p>
            </div>
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-[0.16em] text-bronze">Thinking about</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{member.seeking}</p>
            </div>
            <a
              href={`/member/introductions?person=${encodeURIComponent(member.name)}`}
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline decoration-bronze/40 underline-offset-4"
            >
              Request a warm introduction
            </a>
          </article>
        ))}
      </div>

      <div className="flex items-start gap-3 border border-border bg-accent/30 p-4 text-xs leading-6 text-muted-foreground">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
        Member profiles are for relationship-building inside the community. Exporting, scraping or using directory information for unsolicited sales is a membership breach.
      </div>
    </div>
  );
}
