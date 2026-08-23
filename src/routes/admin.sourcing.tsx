import { type FormEvent, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { BadgeCheck, Compass, FileSearch, Landmark, Lock, Mail, ShieldCheck } from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { serviceCategories } from "@/data/privateServices";
import {
  draftInvitation,
  matchBench,
  prospectsForCase,
  readProspects,
  readReadyState,
  readSearchRuns,
  readSourcingCases,
  readyForBench,
  runsForCase,
  writeProspects,
  writeSearchRuns,
  writeSourcingCases,
  type SourcingCase,
  type SourcingStage,
  type SupplierProspect,
} from "@/data/sourcing";
import {
  memberRequestStatuses,
  readMemberRequests,
  writeMemberRequests,
  type MemberRequestStatus,
  type MemberSourcingRequest,
} from "@/data/memberSourcing";

export const Route = createFileRoute("/admin/sourcing")({ component: SourcingDesk });

const lanes = [
  { key: "open", label: "Open sourcing" },
  { key: "bench", label: "Bench matches" },
  { key: "external", label: "External prospects" },
  { key: "awaiting", label: "Awaiting replies" },
  { key: "assurance", label: "Assurance" },
  { key: "network", label: "Added to network" },
] as const;

type Lane = (typeof lanes)[number]["key"];

const today = () => new Date().toISOString().slice(0, 10);

function SourcingDesk() {
  const [cases, setCases] = useState<SourcingCase[]>([]);
  const [prospects, setProspects] = useState<SupplierProspect[]>([]);
  const [runs, setRuns] = useState(readSearchRuns());
  const [hydrated, setHydrated] = useState(false);
  const [lane, setLane] = useState<Lane>("open");
  const [selectedId, setSelectedId] = useState<string>("");
  const [draft, setDraft] = useState<{ name: string; body: string } | null>(null);
  const [memberRequests, setMemberRequests] = useState<MemberSourcingRequest[]>([]);

  useEffect(() => {
    const loadedCases = readSourcingCases();
    setCases(loadedCases);
    setProspects(readProspects());
    setRuns(readSearchRuns());
    setMemberRequests(readMemberRequests());
    setSelectedId(loadedCases[0]?.id ?? "");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeSourcingCases(cases);
    writeProspects(prospects);
    writeSearchRuns(runs);
    writeMemberRequests(memberRequests);
  }, [hydrated, cases, prospects, runs, memberRequests]);

  const updateMemberRequest = (id: string, updater: (item: MemberSourcingRequest) => MemberSourcingRequest) =>
    setMemberRequests((current) => current.map((item) => (item.id === id ? updater(item) : item)));

  const setMemberStatus = (id: string, status: MemberRequestStatus) =>
    updateMemberRequest(id, (item) => ({
      ...item,
      status,
      updates: [...item.updates, { id: `u-${Date.now()}`, at: today(), note: `Status set to ${status.toLowerCase()}.` }],
    }));

  const publishOption = (id: string, event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const note = String(data.get("note") ?? "").trim();
    if (!note) return;
    updateMemberRequest(id, (item) => ({
      ...item,
      status: "Options ready",
      options: [
        ...item.options,
        {
          id: `opt-${Date.now()}`,
          label: `Option ${String.fromCharCode(65 + item.options.length)}`,
          note,
          indicative: String(data.get("indicative") ?? "").trim() || "Indicative price to follow",
          availability: String(data.get("availability") ?? "").trim() || "Availability being confirmed",
          status: "Proposed",
        },
      ],
      updates: [...item.updates, { id: `u-${Date.now()}`, at: today(), note: "An option was checked and released to you." }],
    }));
    form.reset();
  };

  const selected = cases.find((item) => item.id === selectedId) ?? cases[0];
  const bench = useMemo(() => (selected ? matchBench(selected) : []), [selected]);
  const caseProspects = selected ? prospectsForCase(prospects, selected.id) : [];
  const caseRuns = selected ? runsForCase(runs, selected.id) : [];

  const updateCase = (id: string, updater: (item: SourcingCase) => SourcingCase) =>
    setCases((current) => current.map((item) => (item.id === id ? updater(item) : item)));

  const updateProspect = (id: string, updater: (item: SupplierProspect) => SupplierProspect) =>
    setProspects((current) => current.map((item) => (item.id === id ? updater(item) : item)));

  const setStage = (id: string, stage: SourcingStage) => updateCase(id, (item) => ({ ...item, stage }));

  const useBenchMatch = (supplierId: string, title: string, note: string) => {
    if (!selected) return;
    updateCase(selected.id, (item) => ({
      ...item,
      benchReviewed: true,
      stage: item.stage === "Open" ? "Bench review" : item.stage,
      shortlist: item.shortlist.some((entry) => entry.refId === supplierId)
        ? item.shortlist
        : [...item.shortlist, { id: `SL-${Date.now()}`, kind: "bench", refId: supplierId, title, note, sharedWithMember: true }],
    }));
  };

  const useProspect = (prospect: SupplierProspect) => {
    if (!selected) return;
    updateCase(selected.id, (item) => ({
      ...item,
      shortlist: item.shortlist.some((entry) => entry.refId === prospect.id)
        ? item.shortlist
        : [
            ...item.shortlist,
            {
              id: `SL-${Date.now()}`,
              kind: "prospect",
              refId: prospect.id,
              title: prospect.name,
              note: prospect.whyRelevant,
              sharedWithMember: true,
            },
          ],
    }));
  };

  const toggleShared = (shortlistId: string) => {
    if (!selected) return;
    updateCase(selected.id, (item) => ({
      ...item,
      shortlist: item.shortlist.map((entry) =>
        entry.id === shortlistId ? { ...entry, sharedWithMember: !entry.sharedWithMember } : entry,
      ),
    }));
  };

  const addProspect = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    if (!name) return;
    const prospect: SupplierProspect = {
      id: `PRO-${Date.now().toString().slice(-6)}`,
      name,
      category: (String(form.get("category")) as SupplierProspect["category"]) || selected.category,
      locations: String(form.get("locations") ?? "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
      website: String(form.get("website") ?? "").trim() || "Held by the desk",
      contactRoute: String(form.get("contactRoute") ?? "").trim(),
      sourceNotes: String(form.get("sourceNotes") ?? "").trim(),
      whyRelevant: String(form.get("whyRelevant") ?? "").trim(),
      sourcingId: selected.id,
      caseId: selected.caseId,
      response: "Not contacted",
      indicativeTerms: "Not yet quoted",
      availability: "Not yet confirmed",
      dueDiligence: "Not started",
      references: "Not started",
      relationship: "Prospect",
      invitedToApply: false,
      addedAt: today(),
    };
    setProspects((current) => [prospect, ...current]);
    setStage(selected.id, "External research");
    event.currentTarget.reset();
  };

  const logRun = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    const form = new FormData(event.currentTarget);
    const query = String(form.get("query") ?? "").trim();
    if (!query) return;
    setRuns((current) => [
      {
        id: `RUN-${Date.now().toString().slice(-6)}`,
        sourcingId: selected.id,
        at: today(),
        by: selected.owner,
        method: String(form.get("method")) as (typeof runs)[number]["method"],
        query,
        outcome: String(form.get("outcome") ?? "").trim() || "Recorded, outcome pending.",
      },
      ...current,
    ]);
    event.currentTarget.reset();
  };

  const laneCount: Record<Lane, number> = {
    open: cases.filter((item) => item.stage === "Open" || item.stage === "Bench review").length,
    bench: cases.filter((item) => item.benchReviewed).length,
    external: prospects.filter((item) => item.relationship === "Prospect" || item.relationship === "In conversation").length,
    awaiting: prospects.filter((item) => item.response === "Awaiting reply" || item.response === "Brief sent").length,
    assurance: prospects.filter((item) => item.dueDiligence === "In progress" || item.references === "Requested").length,
    network: prospects.filter((item) => item.relationship === "Approved bench").length,
  };

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Sourcing desk"
        title="Solve the request. Keep what you learn."
        description="Every enquiry marked for sourcing is answered from the approved bench first. Where the bench is thin, the desk opens an external lane and records what it finds, so the research outlives the request. Nothing here approves a supplier."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Open sourcing cases" value={String(laneCount.open)} note="Bench-first, before anything external." />
        <StatCard label="External prospects" value={String(prospects.length)} note="Held in the prospect pool, reusable." />
        <StatCard label="Awaiting replies" value={String(laneCount.awaiting)} note="Neutral brief sent, no member detail." />
        <StatCard label="In the network" value={String(laneCount.network)} note="Through assurance and the partner path." />
      </div>

      <div className="flex flex-wrap gap-2 border-b border-border pb-4">
        {lanes.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setLane(item.key)}
            className={`border px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.14em] transition-colors ${
              lane === item.key ? "border-oxblood bg-oxblood text-oxblood-foreground" : "border-border hover:bg-accent"
            }`}
          >
            {item.label} · {laneCount[item.key]}
          </button>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[300px_1fr]">
        <aside className="border border-border bg-card xl:self-start">
          <div className="border-b border-border p-4">
            <p className="eyebrow text-oxblood">Sourcing cases</p>
          </div>
          <div className="divide-y divide-border">
            {cases.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedId(item.id)}
                className={`block w-full p-4 text-left transition-colors ${selected?.id === item.id ? "bg-foreground text-background" : "hover:bg-accent"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-[9px] uppercase tracking-[0.14em] ${selected?.id === item.id ? "text-bronze" : "text-oxblood"}`}>
                    {item.stage}
                  </span>
                  <span className="text-[9px] opacity-55">{item.caseId}</span>
                </div>
                <h2 className="mt-2 font-display text-xl leading-tight">{item.need}</h2>
                <p className="mt-2 text-[10px] opacity-60">
                  {item.category} · {item.cities.join(", ")} · {item.owner}
                </p>
              </button>
            ))}
          </div>
        </aside>

        {selected ? (
          <section className="min-w-0 space-y-5">
            <article className="border border-border bg-foreground p-6 text-background md:p-8">
              <p className="text-[9px] uppercase tracking-[0.16em] text-bronze">
                {selected.id} · concierge case {selected.caseId} · opened {selected.opened}
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight">{selected.need}</h2>
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-background/45">Research state</p>
                  <select
                    value={selected.research}
                    onChange={(event) => updateCase(selected.id, (item) => ({ ...item, research: event.target.value as SourcingCase["research"] }))}
                    className="mt-2 h-9 w-full border border-background/25 bg-transparent px-2 text-sm text-background"
                  >
                    {["Research required", "Research in progress", "Research complete"].map((value) => (
                      <option key={value} value={value} className="bg-[#f6f1e8] text-[#171716]">
                        {value}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-[10px] leading-5 text-background/45">
                    Set by the desk. Montvelle has no automated external search; research is done by a person and recorded below.
                  </p>
                </div>
                <div>
                  <p className="text-[9px] uppercase tracking-[0.15em] text-background/45">Stage</p>
                  <select
                    value={selected.stage}
                    onChange={(event) => setStage(selected.id, event.target.value as SourcingStage)}
                    className="mt-2 h-9 w-full border border-background/25 bg-transparent px-2 text-sm text-background"
                  >
                    {(["Open", "Bench review", "External research", "Awaiting replies", "Assurance", "Added to network", "Closed"] as SourcingStage[]).map((value) => (
                      <option key={value} value={value} className="bg-[#f6f1e8] text-[#171716]">
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </article>

            <section className="border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-bronze" />
                <h3 className="font-display text-2xl">What may leave the house</h3>
              </div>
              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <div className="border border-border bg-background p-4">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-oxblood">Member context · never shared</p>
                  <p className="mt-3 text-xs leading-6 text-muted-foreground">{selected.memberContext}</p>
                </div>
                <div className="border border-border bg-background p-4">
                  <p className="text-[9px] uppercase tracking-[0.14em] text-oxblood">Neutral brief · sent to prospects</p>
                  <Textarea
                    value={selected.neutralBrief}
                    onChange={(event) => updateCase(selected.id, (item) => ({ ...item, neutralBrief: event.target.value }))}
                    rows={5}
                    className="mt-3 rounded-none text-xs"
                  />
                  <label className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-muted-foreground">
                    <input
                      type="checkbox"
                      checked={selected.consent === "extended"}
                      onChange={(event) => updateCase(selected.id, (item) => ({ ...item, consent: event.target.checked ? "extended" : "neutral" }))}
                      className="mt-0.5"
                    />
                    The member has explicitly consented to share more than the neutral brief.
                  </label>
                </div>
              </div>
            </section>

            <section className="border border-border bg-card">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
                <div className="flex items-center gap-3">
                  <BadgeCheck className="h-4 w-4 text-bronze" />
                  <h3 className="font-display text-2xl">Bench first</h3>
                </div>
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                  {bench.length} approved {bench.length === 1 ? "match" : "matches"}
                </p>
              </div>
              <div className="divide-y divide-border">
                {bench.length ? (
                  bench.map((match) => (
                    <article key={match.supplierId} className="grid gap-3 p-5 lg:grid-cols-[1.5fr_1fr_auto] lg:items-center">
                      <div>
                        <h4 className="font-display text-xl">{match.supplier}</h4>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {match.category} · {match.locations.join(", ")}
                          {match.offering ? ` · ${match.offering}` : ""}
                        </p>
                      </div>
                      <p className="text-[11px] leading-5 text-muted-foreground">{match.reason.join(" · ")}</p>
                      <Button
                        variant="outline"
                        className="rounded-none"
                        onClick={() => useBenchMatch(match.supplierId, match.supplier, match.reason.join(" · "))}
                      >
                        Use for this request
                      </Button>
                    </article>
                  ))
                ) : (
                  <p className="p-5 text-sm leading-7 text-muted-foreground">
                    Nothing on the approved bench answers this brief. That is the signal to open the external lane below.
                  </p>
                )}
              </div>
            </section>

            <section className="border border-border bg-card">
              <div className="border-b border-border p-5">
                <div className="flex items-center gap-3">
                  <FileSearch className="h-4 w-4 text-bronze" />
                  <h3 className="font-display text-2xl">External lane · prospect pool</h3>
                </div>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Prospects stay prospects. Nothing here is approved, and none of it is visible to the member.
                </p>
              </div>
              <div className="divide-y divide-border">
                {caseProspects.map((prospect) => (
                  <article key={prospect.id} className="space-y-4 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.14em] text-oxblood">
                          {prospect.id} · {prospect.category} · {prospect.locations.join(", ")}
                        </p>
                        <h4 className="mt-1 font-display text-2xl">{prospect.name}</h4>
                        <p className="mt-2 max-w-2xl text-xs leading-6 text-muted-foreground">{prospect.whyRelevant}</p>
                        <p className="mt-1 max-w-2xl text-[11px] leading-5 text-muted-foreground">
                          Source: {prospect.sourceNotes} · Contact: {prospect.contactRoute}
                        </p>
                      </div>
                      <span className="border border-border px-3 py-1 text-[9px] uppercase tracking-[0.14em]">{prospect.relationship}</span>
                    </div>

                    <dl className="grid gap-3 text-[11px] leading-5 sm:grid-cols-2 lg:grid-cols-4">
                      {[
                        ["Response", prospect.response],
                        ["Last contacted", prospect.lastContacted ?? "—"],
                        ["Indicative terms", prospect.indicativeTerms],
                        ["Availability", prospect.availability],
                        ["Due diligence", prospect.dueDiligence],
                        ["References", prospect.references],
                        ["Invited to apply", prospect.invitedToApply ? "Yes" : "No"],
                        ["Partner application", prospect.partnerApplicationRef ?? "—"],
                      ].map(([label, value]) => (
                        <div key={label} className="border-t border-border pt-2">
                          <dt className="text-[9px] uppercase tracking-[0.13em] text-muted-foreground">{label}</dt>
                          <dd className="mt-1">{value}</dd>
                        </div>
                      ))}
                    </dl>

                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm" className="rounded-none" onClick={() => useProspect(prospect)}>
                        Use for this request
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-none"
                        onClick={() => setDraft({ name: prospect.name, body: draftInvitation(prospect, selected) })}
                      >
                        <Mail className="mr-2 h-3.5 w-3.5" />
                        Draft supplier invitation
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-none"
                        onClick={() =>
                          updateProspect(prospect.id, (item) => ({
                            ...item,
                            response: "Awaiting reply",
                            lastContacted: today(),
                            relationship: item.relationship === "Prospect" ? "In conversation" : item.relationship,
                          }))
                        }
                      >
                        Request availability
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-none"
                        onClick={() =>
                          updateProspect(prospect.id, (item) => ({
                            ...item,
                            invitedToApply: true,
                            relationship: "Invited to apply",
                            partnerApplicationRef: item.partnerApplicationRef ?? "Awaiting submission",
                            lastContacted: today(),
                          }))
                        }
                      >
                        Invite to apply
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-none"
                        onClick={() => {
                          updateProspect(prospect.id, (item) => ({
                            ...item,
                            dueDiligence: item.dueDiligence === "Not started" ? "In progress" : item.dueDiligence,
                            references: item.references === "Not started" ? "Requested" : item.references,
                          }));
                          setStage(selected.id, "Assurance");
                        }}
                      >
                        Move to assurance
                      </Button>
                      <Button
                        size="sm"
                        className="rounded-none bg-oxblood"
                        disabled={!readyForBench(prospect)}
                        title={readyForBench(prospect) ? undefined : "Assurance, references and an application are required first."}
                        onClick={() => {
                          updateProspect(prospect.id, (item) => ({ ...item, relationship: "Approved bench" }));
                          setStage(selected.id, "Added to network");
                        }}
                      >
                        Add to approved bench
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-none text-muted-foreground"
                        onClick={() => updateProspect(prospect.id, (item) => ({ ...item, relationship: "Not suitable" }))}
                      >
                        Not suitable
                      </Button>
                    </div>

                    {!readyForBench(prospect) ? (
                      <p className="text-[10px] leading-5 text-muted-foreground">
                        {readReadyState(prospect)} Approved organisations join through the existing{" "}
                        <Link to="/partner-application" className="underline underline-offset-4">
                          partner application
                        </Link>{" "}
                        rather than a second supplier record.
                      </p>
                    ) : null}
                  </article>
                ))}
                {caseProspects.length === 0 ? (
                  <p className="p-5 text-sm leading-7 text-muted-foreground">No external prospects recorded for this case yet.</p>
                ) : null}
              </div>

              <form onSubmit={addProspect} className="grid gap-4 border-t border-border p-5 md:grid-cols-2">
                <p className="md:col-span-2 text-[9px] uppercase tracking-[0.14em] text-oxblood">Record a prospect</p>
                <div className="space-y-2">
                  <Label htmlFor="pro-name">Organisation or venue</Label>
                  <Input id="pro-name" name="name" required className="rounded-none" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pro-category">Category</Label>
                  <select id="pro-category" name="category" defaultValue={selected.category} className="h-10 w-full rounded-none border border-input bg-background px-3 text-sm">
                    {serviceCategories.map((category) => (
                      <option key={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pro-locations">Cities or countries</Label>
                  <Input id="pro-locations" name="locations" placeholder="London, Paris" className="rounded-none" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pro-website">Website or contact route</Label>
                  <Input id="pro-website" name="website" className="rounded-none" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pro-contact">How we reach them</Label>
                  <Input id="pro-contact" name="contactRoute" placeholder="Introduced by, or direct line" className="rounded-none" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pro-source">Where this came from</Label>
                  <Input id="pro-source" name="sourceNotes" placeholder="Relationship enquiry, manual research" className="rounded-none" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="pro-why">Why relevant</Label>
                  <Textarea id="pro-why" name="whyRelevant" rows={2} className="rounded-none" />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" className="rounded-none">Add to prospect pool</Button>
                </div>
              </form>
            </section>

            <section className="border border-border bg-card">
              <div className="border-b border-border p-5">
                <div className="flex items-center gap-3">
                  <Compass className="h-4 w-4 text-bronze" />
                  <h3 className="font-display text-2xl">Curated shortlist for the member</h3>
                </div>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  Only what is marked shared appears on the member's concierge case. The pool and the search notes stay here.
                </p>
              </div>
              <div className="divide-y divide-border">
                {selected.shortlist.length ? (
                  selected.shortlist.map((entry) => (
                    <div key={entry.id} className="flex flex-wrap items-center justify-between gap-3 p-5">
                      <div>
                        <p className="text-[9px] uppercase tracking-[0.14em] text-oxblood">{entry.kind === "bench" ? "Approved bench" : "Prospect"}</p>
                        <h4 className="mt-1 font-display text-xl">{entry.title}</h4>
                        <p className="mt-1 max-w-2xl text-xs leading-5 text-muted-foreground">{entry.note}</p>
                      </div>
                      <Button variant="outline" size="sm" className="rounded-none" onClick={() => toggleShared(entry.id)}>
                        {entry.sharedWithMember ? "Shared with member" : "Held back"}
                      </Button>
                    </div>
                  ))
                ) : (
                  <p className="p-5 text-sm leading-7 text-muted-foreground">Nothing curated yet.</p>
                )}
              </div>
            </section>

            <section className="border border-border bg-card">
              <div className="border-b border-border p-5">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="h-4 w-4 text-bronze" />
                  <h3 className="font-display text-2xl">Search runs</h3>
                </div>
                <p className="mt-2 text-xs leading-6 text-muted-foreground">
                  A written record of what was actually searched, by whom. Montvelle does not run automated internet sourcing.
                </p>
              </div>
              <div className="divide-y divide-border">
                {caseRuns.map((run) => (
                  <div key={run.id} className="p-5">
                    <p className="text-[9px] uppercase tracking-[0.14em] text-oxblood">
                      {run.at} · {run.method} · {run.by}
                    </p>
                    <p className="mt-2 text-sm">{run.query}</p>
                    <p className="mt-1 text-xs leading-6 text-muted-foreground">{run.outcome}</p>
                  </div>
                ))}
                {caseRuns.length === 0 ? <p className="p-5 text-sm text-muted-foreground">No search recorded yet.</p> : null}
              </div>
              <form onSubmit={logRun} className="grid gap-4 border-t border-border p-5 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="run-method">Method</Label>
                  <select id="run-method" name="method" className="h-10 w-full rounded-none border border-input bg-background px-3 text-sm">
                    <option>Bench search</option>
                    <option>Manual research</option>
                    <option>Relationship enquiry</option>
                    <option>Member suggestion</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="run-query">What was searched</Label>
                  <Input id="run-query" name="query" required className="rounded-none" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="run-outcome">Outcome</Label>
                  <Input id="run-outcome" name="outcome" className="rounded-none" />
                </div>
                <div className="md:col-span-2">
                  <Button type="submit" variant="outline" className="rounded-none">Record the search</Button>
                </div>
              </form>
            </section>

            {draft ? (
              <section className="border border-border bg-card p-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Landmark className="h-4 w-4 text-bronze" />
                    <h3 className="font-display text-2xl">Draft invitation · {draft.name}</h3>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-none" onClick={() => setDraft(null)}>
                    Close
                  </Button>
                </div>
                <Textarea value={draft.body} readOnly rows={14} className="mt-5 rounded-none text-xs leading-6" />
                <p className="mt-3 text-[10px] leading-5 text-muted-foreground">
                  This draft carries the {selected.consent === "extended" ? "extended" : "neutral"} brief only. Nothing identifies the member.
                </p>
              </section>
            ) : null}
          </section>
        ) : (
          <p className="text-sm text-muted-foreground">No sourcing cases open.</p>
        )}
      </div>
    </div>
  );
}
