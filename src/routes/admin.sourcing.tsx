import { type FormEvent, useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Building2, Clock3, Copy, Search, Send, UserRoundCheck } from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  formatReceived,
  internalStages,
  inviteDraft,
  memberRequestStatuses,
  readMemberRequests,
  readProspects,
  responseSla,
  writeMemberRequests,
  writeProspects,
  type InternalStage,
  type MemberRequestStatus,
  type MemberSourcingRequest,
  type Prospect,
  type ProspectStatus,
} from "@/data/memberSourcing";

export const Route = createFileRoute("/admin/sourcing")({ component: AdminSourcingPage });

const today = () => new Date().toISOString().slice(0, 10);

function AdminSourcingPage() {
  const [requests, setRequests] = useState<MemberSourcingRequest[]>([]);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [tab, setTab] = useState<"requests" | "prospects" | "network">("requests");
  const [copied, setCopied] = useState("");

  useEffect(() => {
    const loadedRequests = readMemberRequests();
    setRequests(loadedRequests);
    setProspects(readProspects());
    setSelectedId(loadedRequests[0]?.id ?? "");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeMemberRequests(requests);
    writeProspects(prospects);
  }, [hydrated, requests, prospects]);

  const selected = requests.find((request) => request.id === selectedId) ?? requests[0];
  const selectedProspects = prospects.filter((prospect) => prospect.requestId === selected?.id);

  const overdue = useMemo(
    () => requests.filter((request) => !request.respondedAt && responseSla(request).tone === "overdue").length,
    [requests],
  );
  const awaitingResponse = requests.filter((request) => !request.respondedAt).length;
  const network = prospects.filter((prospect) => prospect.status === "Approved");

  const patch = (id: string, change: Partial<MemberSourcingRequest>, note?: string) =>
    setRequests((current) =>
      current.map((request) =>
        request.id === id
          ? {
              ...request,
              ...change,
              updates: note ? [...request.updates, { id: `u-${Date.now()}`, at: today(), note }] : request.updates,
            }
          : request,
      ),
    );

  const markResponded = (request: MemberSourcingRequest) =>
    patch(
      request.id,
      { respondedAt: new Date().toISOString(), status: request.status === "Received" ? "In hand" : request.status },
      "In hand. We are making enquiries on your behalf.",
    );

  const patchProspect = (id: string, change: Partial<Prospect>) =>
    setProspects((current) => current.map((prospect) => (prospect.id === id ? { ...prospect, ...change } : prospect)));

  const addProspect = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selected) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    if (!name) return;
    const prospect: Prospect = {
      id: `PR-${Date.now().toString().slice(-5)}`,
      requestId: selected.id,
      name,
      contactRoute: String(data.get("contactRoute") ?? "").trim(),
      website: String(data.get("website") ?? "").trim(),
      category: String(data.get("category") ?? "").trim(),
      location: String(data.get("location") ?? "").trim() || selected.city,
      whySuitable: String(data.get("whySuitable") ?? "").trim(),
      response: "",
      availability: "",
      indicativeTerms: "",
      shortlisted: false,
      used: false,
      outcome: "",
      considerForNetwork: false,
      status: "Found",
      addedAt: today(),
    };
    setProspects((current) => [prospect, ...current]);
    if (selected.internalStage === "New request") patch(selected.id, { internalStage: "Researching" });
    form.reset();
  };

  const releaseOption = (prospect: Prospect) => {
    if (!selected) return;
    const label = `Option ${String.fromCharCode(65 + selected.options.length)}`;
    patch(
      selected.id,
      {
        status: "Ready for you",
        internalStage: "Member decision",
        nextUpdate: "Checked options are with you. Tell us which one and we will arrange it.",
        options: [
          ...selected.options,
          {
            id: `opt-${Date.now()}`,
            label,
            note: prospect.whySuitable || "Checked by us for suitability, terms and availability.",
            indicative: prospect.indicativeTerms || "Terms to confirm",
            availability: prospect.availability || "Availability to confirm",
            status: "Proposed",
          },
        ],
      },
      "Options checked and ready for you.",
    );
    patchProspect(prospect.id, { shortlisted: true, status: "Shortlisted" });
  };

  const copyBrief = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      window.setTimeout(() => setCopied(""), 2000);
    } catch {
      setCopied("");
    }
  };

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Sourcing desk"
        title="Demand first. Every member request is a sourcing job."
        description="Montvelle holds no supplier base. Each request that arrives becomes an internal job: research, contact, compare, come back. The 24-hour clock is our standard for a first meaningful response to the member — not a promise that the request is solved."
        action={
          <Button asChild variant="outline" className="rounded-none">
            <Link to="/admin/concierge">Concierge queue</Link>
          </Button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard label="Live requests" value={String(requests.filter((r) => r.status !== "Closed").length)} />
        <StatCard label="Awaiting first response" value={String(awaitingResponse)} note="24-hour standard" />
        <StatCard label="Overdue or close" value={String(overdue)} note="Act now" />
        <StatCard label="Approved suppliers" value={String(network.length)} note="After assurance only" />
      </div>

      <div className="flex flex-wrap gap-px border border-border bg-border">
        {(
          [
            ["requests", "Member requests"],
            ["prospects", "Prospects"],
            ["network", "Approved network"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`px-5 py-3 text-[10px] uppercase tracking-[0.16em] ${tab === key ? "bg-foreground text-background" : "bg-card hover:bg-accent"}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === "requests" ? (
        <div className="grid gap-5 xl:grid-cols-[340px_1fr]">
          <aside className="border border-border bg-card xl:self-start">
            <div className="border-b border-border p-4">
              <p className="eyebrow text-bronze">Queue</p>
            </div>
            <div className="divide-y divide-border">
              {requests.map((request) => {
                const sla = responseSla(request);
                const active = selected?.id === request.id;
                return (
                  <button
                    key={request.id}
                    type="button"
                    onClick={() => setSelectedId(request.id)}
                    className={`block w-full p-4 text-left transition-colors ${active ? "bg-foreground text-background" : "hover:bg-accent"}`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className={`text-[9px] uppercase tracking-[0.14em] ${active ? "text-bronze" : "text-bronze"}`}>{request.internalStage}</span>
                      <span
                        className={`text-[9px] uppercase tracking-[0.14em] ${
                          sla.tone === "overdue" ? "text-oxblood" : sla.tone === "met" ? "opacity-55" : "opacity-75"
                        }`}
                      >
                        {sla.label}
                      </span>
                    </div>
                    <h2 className="mt-2 font-display text-xl leading-tight">{request.title}</h2>
                    <p className={`mt-1 text-[10px] ${active ? "text-background/55" : "text-muted-foreground"}`}>
                      {request.id} · {formatReceived(request.receivedAt)}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>

          {selected ? (
            <section className="min-w-0 space-y-5">
              <article className="border border-border bg-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-3xl">
                    <p className="text-[9px] uppercase tracking-[0.16em] text-bronze">
                      {selected.id} · received {formatReceived(selected.receivedAt)} · owner {selected.owner}
                    </p>
                    <h2 className="mt-3 font-display text-3xl leading-tight">{selected.title}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{selected.need}</p>
                  </div>
                  <SlaBadge request={selected} />
                </div>

                <dl className="mt-6 grid gap-4 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["Where", selected.city],
                    ["When", selected.timeframe],
                    ["Who for", selected.logistics],
                    ["Budget", selected.budget],
                  ].map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{label}</dt>
                      <dd className="mt-1.5 text-sm leading-6">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 border-t border-border pt-5 text-xs leading-6 text-muted-foreground">
                  <span className="text-[10px] uppercase tracking-[0.14em] text-oxblood">Member private · </span>
                  {selected.preferences}
                </p>

                <div className="mt-6 grid gap-4 border-t border-border pt-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="stage">Internal stage</Label>
                    <select
                      id="stage"
                      value={selected.internalStage}
                      onChange={(event) => patch(selected.id, { internalStage: event.target.value as InternalStage })}
                      className="w-full rounded-none border border-border bg-background px-3 py-2 text-sm"
                    >
                      {internalStages.map((stage) => (
                        <option key={stage} value={stage}>
                          {stage}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="member-status">Member-visible status</Label>
                    <select
                      id="member-status"
                      value={selected.status}
                      onChange={(event) => patch(selected.id, { status: event.target.value as MemberRequestStatus })}
                      className="w-full rounded-none border border-border bg-background px-3 py-2 text-sm"
                    >
                      {memberRequestStatuses.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="next-update">Next update shown to the member</Label>
                    <Input
                      id="next-update"
                      value={selected.nextUpdate}
                      onChange={(event) => patch(selected.id, { nextUpdate: event.target.value })}
                      className="rounded-none"
                    />
                  </div>
                  <div className="flex flex-wrap gap-2 md:col-span-2">
                    {selected.respondedAt ? (
                      <span className="border border-border px-4 py-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        First response sent {selected.respondedAt.slice(0, 10)}
                      </span>
                    ) : (
                      <Button className="rounded-none bg-oxblood" onClick={() => markResponded(selected)}>
                        <Send className="mr-2 h-4 w-4" />
                        Log first member response
                      </Button>
                    )}
                    <Button variant="outline" className="rounded-none" onClick={() => patch(selected.id, { status: "Arranged", internalStage: "Arranged" }, "Arranged. We stay with it until the day itself.")}>
                      Mark arranged
                    </Button>
                  </div>
                </div>
              </article>

              <article className="border border-border bg-card p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="eyebrow text-bronze">Neutral brief for external enquiries</p>
                  <Button variant="ghost" className="rounded-none" onClick={() => void copyBrief(selected.neutralBrief, selected.id)}>
                    <Copy className="mr-2 h-4 w-4" />
                    {copied === selected.id ? "Copied" : "Copy"}
                  </Button>
                </div>
                <Textarea
                  rows={4}
                  value={selected.neutralBrief}
                  onChange={(event) => patch(selected.id, { neutralBrief: event.target.value })}
                  className="mt-4 rounded-none"
                />
                <p className="mt-3 text-xs leading-6 text-muted-foreground">
                  Minimum necessary only. The member's name, household and reasons never leave the desk without explicit consent.
                </p>
              </article>

              <article className="border border-border bg-card p-6">
                <div className="flex items-center gap-3">
                  <Search className="h-5 w-5 text-bronze" />
                  <h3 className="font-display text-2xl">External prospects for this request</h3>
                </div>

                <form onSubmit={addProspect} className="mt-5 grid gap-4 border border-border bg-background p-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Organisation or person</Label>
                    <Input id="name" name="name" required className="rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactRoute">Contact route</Label>
                    <Input id="contactRoute" name="contactRoute" className="rounded-none" placeholder="Direct line, introduction, form" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="website">Website</Label>
                    <Input id="website" name="website" className="rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" name="category" className="rounded-none" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" className="rounded-none" defaultValue={selected.city} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="whySuitable">Why potentially suitable</Label>
                    <Input id="whySuitable" name="whySuitable" className="rounded-none" />
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit" variant="outline" className="rounded-none">
                      Record prospect
                    </Button>
                  </div>
                </form>

                <div className="mt-5 space-y-4">
                  {selectedProspects.map((prospect) => (
                    <ProspectRow
                      key={prospect.id}
                      prospect={prospect}
                      onPatch={patchProspect}
                      onRelease={() => releaseOption(prospect)}
                      onCopyInvite={() => void copyBrief(inviteDraft(prospect), prospect.id)}
                      copied={copied === prospect.id}
                    />
                  ))}
                  {selectedProspects.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Nothing recorded yet. Research starts here.</p>
                  ) : null}
                </div>
              </article>
            </section>
          ) : null}
        </div>
      ) : null}

      {tab === "prospects" ? (
        <section className="border border-border bg-card">
          <div className="border-b border-border p-5">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-bronze" />
              <h2 className="font-display text-2xl">All prospects</h2>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Internal only. Nobody here is a Montvelle supplier until they have been used, invited and cleared assurance with two references.
            </p>
          </div>
          <div className="divide-y divide-border">
            {prospects.map((prospect) => (
              <div key={prospect.id} className="grid gap-3 p-5 md:grid-cols-[1fr_180px_150px]">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-bronze">
                    {prospect.requestId} · {prospect.category || "Uncategorised"} · {prospect.location}
                  </p>
                  <h3 className="mt-1 font-display text-xl">{prospect.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{prospect.whySuitable}</p>
                </div>
                <p className="text-sm">{prospect.status}</p>
                <p className="text-xs text-muted-foreground">{prospect.used ? "Used" : prospect.shortlisted ? "Shortlisted" : "Research"}</p>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {tab === "network" ? (
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-3">
            <UserRoundCheck className="h-5 w-5 text-bronze" />
            <h2 className="font-display text-2xl">Approved network</h2>
          </div>
          {network.length ? (
            <ul className="mt-5 divide-y divide-border border border-border">
              {network.map((prospect) => (
                <li key={prospect.id} className="p-4 text-sm">
                  {prospect.name} · {prospect.category} · {prospect.location}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
              No approved suppliers yet, and that is correct at this stage. A provider joins only after being used successfully, invited, and
              completing the partner application with two references and assurance.
            </p>
          )}
          <Button asChild variant="outline" className="mt-6 rounded-none">
            <Link to="/admin/partners">Partner applications & assurance</Link>
          </Button>
        </section>
      ) : null}
    </div>
  );
}

function SlaBadge({ request }: { request: MemberSourcingRequest }) {
  const sla = responseSla(request);
  const tone =
    sla.tone === "overdue" ? "border-oxblood text-oxblood" : sla.tone === "met" ? "border-border text-muted-foreground" : "border-bronze text-bronze";
  return (
    <span className={`flex items-center gap-2 border px-4 py-2 text-[10px] uppercase tracking-[0.14em] ${tone}`}>
      {sla.tone === "overdue" ? <AlertTriangle className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
      24h response · {sla.label}
    </span>
  );
}

function ProspectRow({
  prospect,
  onPatch,
  onRelease,
  onCopyInvite,
  copied,
}: {
  prospect: Prospect;
  onPatch: (id: string, change: Partial<Prospect>) => void;
  onRelease: () => void;
  onCopyInvite: () => void;
  copied: boolean;
}) {
  return (
    <div className="border border-border bg-background p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[10px] uppercase tracking-[0.14em] text-bronze">
            {prospect.status} · added {prospect.addedAt}
            {prospect.demo ? " · DEMO" : ""}
          </p>
          <h4 className="mt-1 font-display text-xl">{prospect.name}</h4>
          <p className="mt-1 text-xs text-muted-foreground">
            {prospect.contactRoute || "No contact route recorded"} · {prospect.website || "No website recorded"}
          </p>
        </div>
        <select
          value={prospect.status}
          onChange={(event) => onPatch(prospect.id, { status: event.target.value as ProspectStatus })}
          className="rounded-none border border-border bg-card px-3 py-2 text-xs"
        >
          {["Found", "Contacted", "Responded", "Shortlisted", "Used", "Invite considered", "Invited", "Assurance", "Approved", "Declined"].map(
            (status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <Field label="Contacted on" value={prospect.contactedAt ?? ""} onChange={(value) => onPatch(prospect.id, { contactedAt: value })} />
        <Field label="Response" value={prospect.response} onChange={(value) => onPatch(prospect.id, { response: value })} />
        <Field label="Availability" value={prospect.availability} onChange={(value) => onPatch(prospect.id, { availability: value })} />
        <Field label="Indicative price / terms" value={prospect.indicativeTerms} onChange={(value) => onPatch(prospect.id, { indicativeTerms: value })} />
        <Field label="Outcome after service" value={prospect.outcome} onChange={(value) => onPatch(prospect.id, { outcome: value })} />
        <Field label="Why suitable" value={prospect.whySuitable} onChange={(value) => onPatch(prospect.id, { whySuitable: value })} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
        <Button variant="outline" className="rounded-none" onClick={onRelease}>
          Release as member option
        </Button>
        <Button
          variant="outline"
          className="rounded-none"
          onClick={() => onPatch(prospect.id, { used: true, shortlisted: true, status: "Used" })}
        >
          Mark used
        </Button>
        {prospect.used ? (
          <Button
            variant="outline"
            className="rounded-none"
            onClick={() => onPatch(prospect.id, { considerForNetwork: true, status: "Invite considered" })}
          >
            Consider for supplier network
          </Button>
        ) : null}
        {prospect.considerForNetwork ? (
          <>
            <Button className="rounded-none bg-oxblood" onClick={() => onPatch(prospect.id, { status: "Invited" })}>
              Invite to apply
            </Button>
            <Button variant="ghost" className="rounded-none" onClick={onCopyInvite}>
              <Copy className="mr-2 h-4 w-4" />
              {copied ? "Invitation copied" : "Copy invitation"}
            </Button>
          </>
        ) : null}
        <Button variant="ghost" className="rounded-none" onClick={() => onPatch(prospect.id, { status: "Declined" })}>
          Not suitable
        </Button>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{label}</span>
      <Input value={value} onChange={(event) => onChange(event.target.value)} className="mt-1.5 rounded-none" />
    </label>
  );
}
