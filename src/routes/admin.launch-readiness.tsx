import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle2, Circle, LockKeyhole, ShieldCheck } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";

export const Route = createFileRoute("/admin/launch-readiness")({ component: LaunchReadinessPage });

const STORAGE_KEY = "project-table:launch-readiness:v1";

type Gate = {
  id: string;
  group: "Security" | "Data" | "Operations" | "Legal" | "Proof";
  label: string;
  detail: string;
  blocker: boolean;
  defaultComplete?: boolean;
};

const gates: Gate[] = [
  { id: "repo-private", group: "Security", label: "Repository is private", detail: "No real member, household or security-sensitive implementation data enters a public repository.", blocker: true },
  { id: "mfa", group: "Security", label: "Production authentication + MFA", detail: "Member, family, concierge, partner, operator and admin roles are enforced by the identity provider — not by hidden links.", blocker: true },
  { id: "rls-tested", group: "Security", label: "RLS policy tests pass", detail: "Member A cannot read Member B's household; partner accounts cannot enter member space; under-18 data stays guardian-controlled.", blocker: true },
  { id: "vault", group: "Security", label: "Private vault object policies tested", detail: "Restricted documents are private, signed-URL only, household-scoped and unavailable to partners by default.", blocker: true },
  { id: "secrets", group: "Security", label: "Secrets + key rotation documented", detail: "No service-role keys in client code or Git history. Rotation owner and emergency procedure are known.", blocker: true },

  { id: "schema", group: "Data", label: "Production schema + role boundaries drafted", detail: "Households, decisions, concierge, partners, family graph, learning, gatherings, consent and audit trail have a coherent model.", blocker: false, defaultComplete: true },
  { id: "migration", group: "Data", label: "Migrations applied to non-production environment", detail: "Schema is actually executed against a clean project before production, with security and performance advisors reviewed.", blocker: true },
  { id: "backup", group: "Data", label: "Backup + restore rehearsal", detail: "A backup is not trusted until a restore has been tested and the recovery owner/timing is known.", blocker: true },
  { id: "retention", group: "Data", label: "Retention / deletion rules implemented", detail: "Applications, former members, event records, case history and restricted documents have explicit retention and deletion behaviour.", blocker: true },
  { id: "export", group: "Data", label: "Member data export and correction route", detail: "The team can answer access/correction/deletion requests without manually searching five systems.", blocker: false },

  { id: "ci", group: "Operations", label: "Production build verification", detail: "Every merge must pass the GitHub production build before it can reach main.", blocker: true, defaultComplete: true },
  { id: "incident", group: "Operations", label: "Incident response runbook", detail: "Who is called, who can revoke access, how members are informed and how evidence is preserved after a security event.", blocker: true },
  { id: "monitoring", group: "Operations", label: "Auth, database and application monitoring", detail: "Failed logins, privileged actions, error spikes, storage failures and unusual access patterns are observable.", blocker: true },
  { id: "support", group: "Operations", label: "Concierge service standard", detail: "Case ownership, first-response expectation, escalation, out-of-hours boundary and complaint handling are written down.", blocker: false },

  { id: "privacy", group: "Legal", label: "Final privacy notice + data map reviewed", detail: "Actual processors, lawful bases, special-category handling, international transfers and retention are reflected in the notice.", blocker: true },
  { id: "terms", group: "Legal", label: "Membership terms reviewed", detail: "Fees, renewal, cancellation, events, liability, professional-advice boundary, conduct and suspension are legally reviewed.", blocker: true },
  { id: "children", group: "Legal", label: "Under-18 safeguarding design signed off", detail: "Guardian permissions, messaging boundaries, mentor checks and lawful education positioning are operationally clear.", blocker: true },
  { id: "partner-commercial", group: "Legal", label: "Partner commercial-disclosure standard", detail: "Referral fees, sponsorship and benefits can never quietly distort recommendations.", blocker: false },

  { id: "founding-members", group: "Proof", label: "Real founding members confirmed", detail: "No fabricated social proof. The founding room contains real people who understand and improve the proposition.", blocker: false },
  { id: "partner-proof", group: "Proof", label: "First real Trusted Partners screened", detail: "References, regulation/insurance where relevant, conflicts and member-value proposition are recorded.", blocker: false },
  { id: "event-proof", group: "Proof", label: "First real gathering completed", detail: "Real room, real host, real feedback, real photography only with appropriate consent.", blocker: false },
  { id: "outcome-proof", group: "Proof", label: "First service outcomes captured", detail: "Evidence that Decision Room / Concierge / Table solved or accelerated something meaningful, without exposing private facts.", blocker: false },
];

function LaunchReadinessPage() {
  const [complete, setComplete] = useState<Record<string, boolean>>(() => Object.fromEntries(gates.map((gate) => [gate.id, Boolean(gate.defaultComplete)])));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setComplete((current) => ({ ...current, ...(JSON.parse(raw) as Record<string, boolean>) }));
    } catch { /* keep defaults */ }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(complete));
  }, [complete, hydrated]);

  const blockerCount = useMemo(() => gates.filter((gate) => gate.blocker && !complete[gate.id]).length, [complete]);
  const completeCount = useMemo(() => gates.filter((gate) => complete[gate.id]).length, [complete]);
  const groups = ["Security", "Data", "Operations", "Legal", "Proof"] as const;

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Launch control" title="The door does not open while a hard blocker is red" description="This is the operating checklist that protects the institution from being seduced by its own design. A beautiful site is not launch-ready if identity, permissions, privacy, recovery or safeguarding are still assumptions." />

      <section className={`border p-6 md:p-8 ${blockerCount ? "border-oxblood bg-oxblood text-oxblood-foreground" : "border-forest bg-forest text-forest-foreground"}`}>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>{blockerCount ? <AlertTriangle className="h-6 w-6 text-bronze" /> : <CheckCircle2 className="h-6 w-6 text-bronze" />}<p className="mt-6 text-[9px] font-semibold uppercase tracking-[0.2em] opacity-55">Current launch state</p><h2 className="mt-3 max-w-4xl font-display text-5xl leading-[0.98] md:text-6xl">{blockerCount ? `${blockerCount} hard blocker${blockerCount === 1 ? "" : "s"} remain.` : "Hard gates cleared."}</h2><p className="mt-5 max-w-2xl text-sm leading-7 opacity-68">Proof items can mature after a controlled founding launch. Security, privacy, recovery and under-18 safeguards cannot.</p></div>
          <div className="border border-current/20 p-5 text-right"><p className="font-display text-5xl">{completeCount}/{gates.length}</p><p className="mt-2 text-[9px] uppercase tracking-[0.16em] opacity-55">controls evidenced</p></div>
        </div>
      </section>

      {groups.map((group) => (
        <section key={group} className="border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border p-5 md:p-6"><div className="flex items-center gap-3">{group === "Security" ? <LockKeyhole className="h-5 w-5 text-oxblood" /> : <ShieldCheck className="h-5 w-5 text-oxblood" />}<div><p className="eyebrow text-oxblood">{group}</p><h2 className="mt-1 font-display text-3xl">{group === "Proof" ? "Earned credibility" : "Launch controls"}</h2></div></div><span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{gates.filter((gate) => gate.group === group && complete[gate.id]).length}/{gates.filter((gate) => gate.group === group).length}</span></div>
          <div className="divide-y divide-border">{gates.filter((gate) => gate.group === group).map((gate) => { const done = Boolean(complete[gate.id]); return <button key={gate.id} type="button" onClick={() => setComplete((current) => ({ ...current, [gate.id]: !current[gate.id] }))} className="grid w-full gap-4 p-5 text-left transition-colors hover:bg-accent/50 md:grid-cols-[34px_1fr_auto] md:items-start md:p-6">{done ? <CheckCircle2 className="mt-1 h-5 w-5 text-forest" /> : <Circle className="mt-1 h-5 w-5 text-muted-foreground" />}<div><div className="flex flex-wrap items-center gap-2"><h3 className={`font-display text-2xl ${done ? "text-muted-foreground" : "text-foreground"}`}>{gate.label}</h3>{gate.blocker ? <span className="border border-oxblood/30 px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.15em] text-oxblood">Hard gate</span> : null}</div><p className="mt-2 max-w-4xl text-xs leading-6 text-muted-foreground">{gate.detail}</p></div><span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">{done ? "Evidence recorded" : "Open"}</span></button>; })}</div>
        </section>
      ))}

      <section className="border border-border bg-foreground p-6 text-background md:p-8"><p className="eyebrow text-bronze">Rule</p><h2 className="mt-4 font-display text-4xl">No sensitive family data as a launch shortcut.</h2><p className="mt-4 max-w-4xl text-sm leading-7 text-background/65">Until the hard controls above are evidenced, test with fictional or sanitised data only. Restricted documents belong in the production private vault after role policies, signed URLs, auditability and deletion behaviour have been tested.</p></section>
    </div>
  );
}
