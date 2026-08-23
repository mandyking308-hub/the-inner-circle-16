import { type FormEvent, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Trash2, UserPlus } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/member/household-access")({
  component: HouseholdAccessPage,
});

const STORAGE_KEY = "montvelle:household-access:v1";

const AREAS = [
  "Requests",
  "Decision Rooms",
  "Invitations",
  "Community",
  "Family",
  "Messages",
  "Household administration",
] as const;
type Area = (typeof AREAS)[number];

const ROLES = [
  "Household Principal",
  "Adult Household Member",
  "Next Generation",
  "Household Delegate",
] as const;
type Role = (typeof ROLES)[number];

const roleNotes: Record<Role, string> = {
  "Household Principal":
    "The contractual member. Administers household access and membership-level settings by default.",
  "Adult Household Member":
    "A spouse, partner or approved adult family member with their own login and their own private matters.",
  "Next Generation":
    "Age-appropriate access. No automatic sight of private financial, succession or Decision Room material.",
  "Household Delegate":
    "An EA, family-office or household delegate. Sees only the matters specifically delegated to them.",
};

const roleDefaults: Record<Role, Area[]> = {
  "Household Principal": [...AREAS],
  "Adult Household Member": ["Requests", "Invitations", "Community", "Family", "Messages"],
  "Next Generation": ["Invitations", "Family"],
  "Household Delegate": ["Requests", "Messages"],
};

type HouseholdPerson = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "Active" | "Pending";
  areas: Area[];
  scope: "Private to me" | "Shared with household";
};

const demoHousehold: HouseholdPerson[] = [
  {
    id: "hh-principal",
    name: "DEMO Household Principal",
    email: "principal@demo.montvelle",
    role: "Household Principal",
    status: "Active",
    areas: [...AREAS],
    scope: "Shared with household",
  },
  {
    id: "hh-adult",
    name: "DEMO Adult Household Member",
    email: "adult@demo.montvelle",
    role: "Adult Household Member",
    status: "Active",
    areas: roleDefaults["Adult Household Member"],
    scope: "Private to me",
  },
  {
    id: "hh-delegate",
    name: "DEMO Household Delegate",
    email: "delegate@demo.montvelle",
    role: "Household Delegate",
    status: "Pending",
    areas: roleDefaults["Household Delegate"],
    scope: "Shared with household",
  },
];

function HouseholdAccessPage() {
  const [people, setPeople] = useState<HouseholdPerson[]>(demoHousehold);
  const [hydrated, setHydrated] = useState(false);
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

  const invite = (event: FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;
    setPeople((current) => [
      ...current,
      {
        id: `hh-${Date.now()}`,
        name: form.name.trim(),
        email: form.email.trim(),
        role: form.role,
        status: "Pending",
        areas: roleDefaults[form.role],
        scope: form.role === "Household Delegate" ? "Shared with household" : "Private to me",
      },
    ]);
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

  const revoke = (id: string) =>
    setPeople((current) => current.filter((person) => person.id !== id));

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Your household"
        title="Who else is part of this membership."
        description="One Montvelle membership may be held by an individual or by a household. Everyone approved has their own login, and each person sees only what has been granted to them. Approved household access is recorded in your Membership Schedule."
      />

      <section className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-4">
        {ROLES.map((role) => (
          <article key={role} className="bg-card p-5">
            <ShieldCheck className="h-4 w-4 text-oxblood" />
            <h2 className="mt-5 font-display text-2xl leading-tight">{role}</h2>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">{roleNotes[role]}</p>
          </article>
        ))}
      </section>

      <section className="border border-border bg-card p-5 md:p-6">
        <p className="eyebrow text-oxblood">Invite someone to the household</p>
        <form
          onSubmit={invite}
          className="mt-5 grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end"
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
            <Label htmlFor="hh-role">Role</Label>
            <select
              id="hh-role"
              value={form.role}
              onChange={(event) => setForm((c) => ({ ...c, role: event.target.value as Role }))}
              className="h-10 w-full border border-input bg-background px-3 text-sm"
            >
              {ROLES.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
          <Button type="submit" className="rounded-none">
            <UserPlus className="mr-2 h-4 w-4" />
            Send invitation
          </Button>
        </form>
        <p className="mt-4 text-[11px] leading-6 text-muted-foreground">
          Invitations are preview-only in this environment. Nothing is emailed and no live account
          is created.
        </p>
      </section>

      <section className="space-y-4">
        {people.map((person) => (
          <article key={person.id} className="border border-border bg-card p-5 md:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-oxblood">{person.role}</p>
                <h3 className="mt-2 font-display text-3xl leading-tight">{person.name}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{person.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="border border-border px-2.5 py-1 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  {person.status}
                </span>
                {person.role === "Household Principal" ? null : (
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-none"
                    onClick={() => revoke(person.id)}
                  >
                    <Trash2 className="mr-2 h-3.5 w-3.5" />
                    Revoke
                  </Button>
                )}
              </div>
            </div>

            <div className="mt-5 border-t border-border pt-4">
              <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Areas they can see
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {AREAS.map((area) => {
                  const on = person.areas.includes(area);
                  return (
                    <button
                      key={area}
                      type="button"
                      disabled={person.role === "Household Principal"}
                      onClick={() => toggleArea(person.id, area)}
                      className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] transition-colors disabled:opacity-60 ${on ? "border-oxblood bg-oxblood text-oxblood-foreground" : "border-border text-muted-foreground hover:bg-accent"}`}
                    >
                      {area}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-[11px] text-muted-foreground">
                Their own requests and messages are <strong>{person.scope.toLowerCase()}</strong>.
                Nobody in the household sees another person&apos;s private matters unless it has
                been shared deliberately.
              </p>
            </div>
          </article>
        ))}
      </section>

      <section className="border border-border bg-foreground p-6 text-background md:p-8">
        <p className="eyebrow text-background/50">The household rule</p>
        <h2 className="mt-4 max-w-4xl font-display text-4xl leading-tight">
          Not everyone in a family should see everything.
        </h2>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-background/65">
          A spouse or partner can be given broad access if you wish. A next-generation member sees
          an age-appropriate part of the house. An assistant or family-office delegate sees only the
          matters you delegate. You can change or withdraw any of it here at any time.
        </p>
      </section>
    </div>
  );
}
