import { type FormEvent, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Landmark, Lock, ShieldCheck, Trash2, UserPlus } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/member/household-access")({
  component: HouseholdAccessPage,
});

const STORAGE_KEY = "montvelle:household-access:v2";

const AREAS = [
  "Requests",
  "Arrangements",
  "Messages",
  "Invitations",
  "Community",
  "Family",
  "Decision Rooms",
] as const;
type Area = (typeof AREAS)[number];

const ROLES = [
  "Household Principal",
  "Adult Household Member",
  "Next Generation",
  "Household Delegate",
] as const;
type Role = (typeof ROLES)[number];

/** Roles a Principal may request. The Principal role itself is contractual and cannot be added here. */
const REQUESTABLE_ROLES = ROLES.filter((role) => role !== "Household Principal");

const roleCards: Record<Role, { line: string; may: string[]; never: string[] }> = {
  "Household Principal": {
    line: "The primary, contractual member — and the household administrator by default.",
    may: [
      "Request access for others",
      "Hold membership-level settings",
      "See what is shared with the household",
    ],
    never: ["Read another approved adult's private requests, messages or matters"],
  },
  "Adult Household Member": {
    line: "A spouse, partner or approved adult family member, with their own identity and their own login.",
    may: [
      "Their own requests, messages, profile and privacy",
      "Broad access where agreed",
      "Optionally act as household co-admin",
    ],
    never: ["Become the contractual payer unless the Membership Schedule says so"],
  },
  "Next Generation": {
    line: "Age-appropriate access to the part of the house that is right for them.",
    may: ["Invitations and family programme where agreed", "Their own learning and messages"],
    never: ["Decision Rooms, succession, financial or private adult matters by default"],
  },
  "Household Delegate": {
    line: "An assistant, family-office or household delegate acting on instruction. Delegated access is not membership.",
    may: ["Selected Requests", "Arrangements and bookings", "Messages relating to those matters"],
    never: [
      "Community, My Table, personal invitations, family-sensitive material or Decision Rooms",
    ],
  },
};

const roleDefaults: Record<Role, Area[]> = {
  "Household Principal": [...AREAS],
  "Adult Household Member": [
    "Requests",
    "Arrangements",
    "Messages",
    "Invitations",
    "Community",
    "Family",
  ],
  "Next Generation": ["Invitations", "Family"],
  "Household Delegate": ["Requests", "Arrangements", "Messages"],
};

/** Areas a role may never hold, however the household chooses to configure it. */
const roleForbidden: Record<Role, Area[]> = {
  "Household Principal": [],
  "Adult Household Member": [],
  "Next Generation": ["Decision Rooms", "Requests"],
  "Household Delegate": ["Community", "Invitations", "Family", "Decision Rooms"],
};

type HouseholdPerson = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Pending review";
  areas: Area[];
  scope: "Private to them" | "Shared with household";
  coAdmin: boolean;
};

/** Preview fixtures only — deliberately neutral, never real people. */
const demoHousehold: HouseholdPerson[] = [
  {
    id: "hh-principal",
    name: "DEMO Household Principal",
    email: "principal@demo.montvelle",
    role: "Household Principal",
    status: "Active",
    areas: [...AREAS],
    scope: "Shared with household",
    coAdmin: true,
  },
  {
    id: "hh-adult",
    name: "DEMO Adult Household Member",
    email: "adult@demo.montvelle",
    role: "Adult Household Member",
    status: "Active",
    areas: roleDefaults["Adult Household Member"],
    scope: "Private to them",
    coAdmin: false,
  },
  {
    id: "hh-delegate",
    name: "DEMO Household Delegate",
    email: "delegate@demo.montvelle",
    role: "Household Delegate",
    status: "Pending review",
    areas: roleDefaults["Household Delegate"],
    scope: "Shared with household",
    coAdmin: false,
  },
];

function HouseholdAccessPage() {
  const [people, setPeople] = useState<HouseholdPerson[]>(demoHousehold);
  const [hydrated, setHydrated] = useState(false);
  const [submitted, setSubmitted] = useState("");
  const [form, setForm] = useState<{ name: string; email: string; role: Role }>({
    name: "",
    email: "",
    role: "Adult Household Member",
  });

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setPeople(JSON.parse(raw) as HouseholdPerson[]);
    } catch {
      // preview data remains usable without persistence
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(people));
  }, [hydrated, people]);

  const requestAccess = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setPeople((current) => [
      {
        id: `hh-${Date.now()}`,
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        status: "Pending review",
        areas: roleDefaults[form.role],
        scope: form.role === "Household Delegate" ? "Shared with household" : "Private to them",
        coAdmin: false,
      },
      ...current,
    ]);
    setSubmitted(form.name.trim());
    setForm({ name: "", email: "", role: "Adult Household Member" });
  };

  const toggleArea = (id: string, area: Area) =>
    setPeople((current) =>
      current.map((person) =>
        person.id === id
          ? {
              ...person,
              areas: person.areas.includes(area)
                ? person.areas.filter((item) => item !== area)
                : [...person.areas, area],
            }
          : person,
      ),
    );

  const toggleCoAdmin = (id: string) =>
    setPeople((current) =>
      current.map((person) =>
        person.id === id ? { ...person, coAdmin: !person.coAdmin } : person,
      ),
    );

  const withdraw = (id: string) =>
    setPeople((current) => current.filter((person) => person.id !== id));

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Your household"
        title="Who has access to your household world."
        description="One Montvelle membership, held by an individual or by a household. Every approved person has their own login and sees only what has been agreed for them. Approved household access is subject to Montvelle review and recorded in your Membership Schedule."
      />

      <section className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-4">
        {ROLES.map((role) => {
          const card = roleCards[role];
          return (
            <article key={role} className="flex flex-col bg-card p-5">
              <ShieldCheck className="h-4 w-4 text-oxblood" />
              <h2 className="mt-5 font-display text-2xl leading-tight">{role}</h2>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">{card.line}</p>
              <ul className="mt-5 space-y-2 border-t border-border pt-4 text-xs leading-6">
                {card.may.map((item) => (
                  <li key={item} className="text-foreground/80">
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="mt-4 space-y-2 border-t border-border pt-4 text-xs leading-6 text-muted-foreground">
                {card.never.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Lock className="mt-1 h-3 w-3 shrink-0 text-oxblood" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </section>

      <section className="border border-border bg-card p-5 md:p-6">
        <p className="eyebrow text-oxblood">Request household access</p>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
          As Household Principal you may ask Montvelle to extend access to a spouse or partner, an
          adult family member, a next-generation user or a household delegate. Approved adult family
          membership is subject to Montvelle approval and the Membership Schedule — a request does
          not make someone a member.
        </p>
        <form
          onSubmit={requestAccess}
          className="mt-6 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
        >
          <div className="space-y-2">
            <Label htmlFor="hh-name">Name</Label>
            <Input
              id="hh-name"
              value={form.name}
              onChange={(event) => setForm((c) => ({ ...c, name: event.target.value }))}
              className="rounded-none"
              placeholder="Full name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hh-email">Email</Label>
            <Input
              id="hh-email"
              type="email"
              value={form.email}
              onChange={(event) => setForm((c) => ({ ...c, email: event.target.value }))}
              className="rounded-none"
              placeholder="Their own login"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hh-role">Access requested</Label>
            <select
              id="hh-role"
              value={form.role}
              onChange={(event) => setForm((c) => ({ ...c, role: event.target.value as Role }))}
              className="h-10 w-full border border-input bg-background px-3 text-sm"
            >
              {REQUESTABLE_ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="rounded-none">
            <UserPlus className="mr-2 h-4 w-4" />
            Request household access
          </Button>
        </form>
        {submitted ? (
          <p
            className="mt-4 border border-oxblood/25 bg-oxblood/5 p-3 text-xs leading-6 text-oxblood"
            role="status"
          >
            Request noted for {submitted}. It sits as pending review until Montvelle confirms it.
          </p>
        ) : null}
        <p className="mt-4 text-[11px] leading-6 text-muted-foreground">
          Preview only in this environment: nothing is emailed, no live account is created, and
          nothing here approves itself.
        </p>
      </section>

      <section className="space-y-4">
        {people.map((person) => {
          const pending = person.status === "Pending review";
          const forbidden = roleForbidden[person.role];
          return (
            <article key={person.id} className="border border-border bg-card p-5 md:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.16em] text-oxblood">
                    {person.role}
                  </p>
                  <h3 className="mt-2 font-display text-3xl leading-tight">{person.name}</h3>
                  <p className="mt-2 text-xs text-muted-foreground">{person.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`border px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] ${pending ? "border-oxblood/40 bg-oxblood/5 text-oxblood" : "border-border text-muted-foreground"}`}
                  >
                    {person.status}
                  </span>
                  {person.role === "Household Principal" ? null : (
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-none"
                      onClick={() => withdraw(person.id)}
                    >
                      <Trash2 className="mr-2 h-3.5 w-3.5" />
                      {pending ? "Withdraw request" : "Remove access"}
                    </Button>
                  )}
                </div>
              </div>

              {pending ? (
                <p className="mt-4 text-xs leading-6 text-muted-foreground">
                  Awaiting Montvelle review. Until it is confirmed and recorded in the Membership
                  Schedule, this person has no access and is not a Montvelle member.
                </p>
              ) : null}

              <div className="mt-5 border-t border-border pt-4">
                <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  {pending ? "Access requested" : "Areas agreed"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {AREAS.map((area) => {
                    const blocked = forbidden.includes(area);
                    const on = person.areas.includes(area) && !blocked;
                    return (
                      <button
                        key={area}
                        type="button"
                        disabled={person.role === "Household Principal" || blocked}
                        title={blocked ? `Not available to a ${person.role}` : undefined}
                        onClick={() => toggleArea(person.id, area)}
                        className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition-colors disabled:cursor-not-allowed ${blocked ? "border-dashed border-border text-muted-foreground/50" : on ? "border-oxblood bg-oxblood text-oxblood-foreground" : "border-border text-muted-foreground hover:bg-accent"}`}
                      >
                        {area}
                      </button>
                    );
                  })}
                </div>

                {person.role === "Adult Household Member" ? (
                  <label className="mt-5 flex cursor-pointer items-start gap-3 border-t border-border pt-4 text-xs leading-6">
                    <input
                      type="checkbox"
                      checked={person.coAdmin}
                      onChange={() => toggleCoAdmin(person.id)}
                      className="mt-1"
                    />
                    <span className="text-muted-foreground">
                      <strong className="text-foreground">Household co-admin.</strong> An access
                      role only — it does not make this person the contractual payer unless the
                      Membership Schedule says so, and it does not open another adult&apos;s private
                      matters.
                    </span>
                  </label>
                ) : null}

                <p className="mt-4 text-[11px] leading-6 text-muted-foreground">
                  Their own requests and messages are <strong>{person.scope.toLowerCase()}</strong>.
                  Sharing across the household happens matter by matter, deliberately — never
                  automatically, and never in either direction by seniority.
                </p>
              </div>
            </article>
          );
        })}
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="border border-border bg-foreground p-6 text-background md:p-8">
          <Landmark className="h-5 w-5 text-bronze" />
          <p className="mt-6 eyebrow text-background/50">The household rule</p>
          <h2 className="mt-4 max-w-4xl font-display text-4xl leading-tight">
            Not everyone in a family should see everything.
          </h2>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-background/65">
            A spouse or partner may be given broad access if you both wish it. A next-generation
            member sees an age-appropriate part of the house. A delegate sees only the matters
            delegated to them. Being the Household Principal does not give sight of another approved
            adult&apos;s private requests, messages or decisions.
          </p>
          <p className="mt-6 border-t border-background/15 pt-5 text-xs leading-6 text-background/55">
            An authorised delegate is not a Montvelle member.
          </p>
        </div>
        <div className="border border-border bg-card p-6">
          <ShieldCheck className="h-5 w-5 text-oxblood" />
          <p className="mt-6 font-display text-2xl leading-tight">
            Your own privacy sits with you.
          </p>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">
            What you keep private to yourself, and what you choose to share with the household, is
            set in your own account.
          </p>
          <Link
            to="/member/profile"
            className="mt-6 inline-block border-b border-oxblood pb-1 text-xs font-semibold uppercase tracking-[0.14em] text-oxblood"
          >
            Account &amp; privacy →
          </Link>
        </div>
      </section>
    </div>
  );
}
