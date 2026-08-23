import { type FormEvent, useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Building2, FileText, Globe2, Landmark, ShieldCheck, UserRound } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/member/family-architecture")({ component: FamilyArchitecturePage });

const STORAGE_KEY = "project-table:family-architecture:v2";

type EntityType = "Person" | "Company" | "Trust / Foundation" | "Property / Asset" | "Adviser" | "Jurisdiction" | "Document reference";
type Entity = { id: string; type: EntityType; name: string; note: string };
type Relationship = { id: string; from: string; to: string; label: string };
type ArchitectureState = { entities: Entity[]; relationships: Relationship[]; familyNote: string };

const entityTypes: EntityType[] = ["Person", "Company", "Trust / Foundation", "Property / Asset", "Adviser", "Jurisdiction", "Document reference"];

const starterState: ArchitectureState = {
  familyNote: "The aim is one shared picture: what exists, who owns or advises it, which jurisdiction matters and where the supporting document lives.",
  entities: [
    { id: "person-principal", type: "Person", name: "Family principal", note: "Founder / primary decision-maker" },
    { id: "person-nextgen", type: "Person", name: "Rising generation", note: "Exposure and responsibility staged over time" },
    { id: "company-holdco", type: "Company", name: "Family holding company", note: "Illustrative operating / ownership layer" },
    { id: "trust-family", type: "Trust / Foundation", name: "Family trust", note: "Illustrative protection / succession structure" },
    { id: "property-home", type: "Property / Asset", name: "Family property", note: "Illustrative major asset" },
    { id: "adviser-legal", type: "Adviser", name: "Private client lawyer", note: "Legal structure and succession" },
    { id: "jurisdiction-uk", type: "Jurisdiction", name: "United Kingdom", note: "Residence / company / family relevance" },
    { id: "doc-will", type: "Document reference", name: "Will — secure vault reference", note: "Reference only; no document uploaded here" },
  ],
  relationships: [
    { id: "rel-1", from: "person-principal", to: "company-holdco", label: "owns / controls" },
    { id: "rel-2", from: "trust-family", to: "company-holdco", label: "holds interest in" },
    { id: "rel-3", from: "adviser-legal", to: "trust-family", label: "advises on" },
    { id: "rel-4", from: "company-holdco", to: "jurisdiction-uk", label: "connected to" },
    { id: "rel-5", from: "doc-will", to: "person-principal", label: "supports succession for" },
  ],
};

const typeIcon: Record<EntityType, typeof UserRound> = {
  Person: UserRound,
  Company: Building2,
  "Trust / Foundation": ShieldCheck,
  "Property / Asset": Landmark,
  Adviser: UserRound,
  Jurisdiction: Globe2,
  "Document reference": FileText,
};

function FamilyArchitecturePage() {
  const [state, setState] = useState<ArchitectureState>(starterState);
  const [hydrated, setHydrated] = useState(false);
  const [selectedType, setSelectedType] = useState<EntityType>("Person");

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setState(JSON.parse(raw) as ArchitectureState);
    } catch {
      // Keep the starter architecture when local persistence is unavailable.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [hydrated, state]);

  const grouped = useMemo(() => entityTypes.map((type) => ({ type, entities: state.entities.filter((entity) => entity.type === type) })), [state.entities]);
  const entityById = useMemo(() => Object.fromEntries(state.entities.map((entity) => [entity.id, entity])), [state.entities]);

  const addEntity = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    if (!name) return;
    const entity: Entity = { id: `entity-${Date.now()}`, type: selectedType, name, note: String(form.get("note") ?? "").trim() };
    setState((current) => ({ ...current, entities: [...current.entities, entity] }));
    event.currentTarget.reset();
  };

  const addRelationship = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const from = String(form.get("from") ?? "");
    const to = String(form.get("to") ?? "");
    const label = String(form.get("relationship") ?? "").trim();
    if (!from || !to || from === to || !label) return;
    const relationship: Relationship = { id: `rel-${Date.now()}`, from, to, label };
    setState((current) => ({ ...current, relationships: [...current.relationships, relationship] }));
    event.currentTarget.reset();
  };

  const removeEntity = (id: string) => setState((current) => ({ ...current, entities: current.entities.filter((entity) => entity.id !== id), relationships: current.relationships.filter((relationship) => relationship.from !== id && relationship.to !== id) }));

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Family Architecture" title="One picture of the family enterprise" description="Map people, companies, trusts, assets, advisers, jurisdictions and document references — then show how they relate. The point is not a prettier org chart; it is to expose ownership, dependency and gaps before a decision or crisis makes them urgent." />

      <section className="border border-border bg-foreground p-6 text-background md:p-8">
        <div className="grid gap-7 lg:grid-cols-[0.75fr_1.25fr] lg:items-end"><div><p className="eyebrow text-background/50">Family note</p><h2 className="mt-4 font-display text-4xl leading-tight">What should everybody authorised to see this map understand?</h2></div><Textarea value={state.familyNote} onChange={(event) => setState((current) => ({ ...current, familyNote: event.target.value }))} rows={5} className="rounded-none border-background/20 bg-background/8 text-background placeholder:text-background/35" /></div>
      </section>

      <section>
        <div className="flex items-end justify-between gap-5"><div><p className="eyebrow text-oxblood">Architecture graph</p><h2 className="mt-2 font-display text-4xl">The entities</h2></div><span className="text-xs text-muted-foreground">{state.entities.length} entities · {state.relationships.length} relationships</span></div>
        <div className="mt-5 grid gap-4 xl:grid-cols-3">
          {grouped.map(({ type, entities }) => {
            const Icon = typeIcon[type];
            return <article key={type} className="border border-border bg-card"><div className="flex items-center justify-between border-b border-border p-4"><div className="flex items-center gap-3"><Icon className="h-4 w-4 text-oxblood" /><h3 className="font-display text-2xl">{type}</h3></div><span className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{entities.length}</span></div><div className="divide-y divide-border">{entities.length ? entities.map((entity) => <div key={entity.id} className="group p-4"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold">{entity.name}</p>{entity.note ? <p className="mt-2 text-xs leading-6 text-muted-foreground">{entity.note}</p> : null}</div><button type="button" onClick={() => removeEntity(entity.id)} aria-label={`Remove ${entity.name}`} className="opacity-40 transition-opacity hover:opacity-100"></button></div></div>) : <p className="p-4 text-xs text-muted-foreground">Nothing added yet.</p>}</div></article>;
          })}
        </div>
      </section>

      <section className="grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
        <article className="border border-border bg-card p-6">
          <div className="flex items-center gap-3"><h2 className="font-display text-3xl">Add an entity</h2></div>
          <form onSubmit={addEntity} className="mt-6 space-y-4"><div className="space-y-2"><Label htmlFor="entity-type">Type</Label><select id="entity-type" value={selectedType} onChange={(event) => setSelectedType(event.target.value as EntityType)} className="h-10 w-full rounded-none border border-input bg-background px-3 text-sm">{entityTypes.map((type) => <option key={type}>{type}</option>)}</select></div><div className="space-y-2"><Label htmlFor="entity-name">Name / label</Label><Input id="entity-name" name="name" required className="rounded-none" placeholder="e.g. UK Holding Ltd, Trustee, Family Home" /></div><div className="space-y-2"><Label htmlFor="entity-note">Why it matters</Label><Textarea id="entity-note" name="note" rows={3} className="rounded-none" placeholder="Ownership, purpose, role or secure document location — no passwords or sensitive document content." /></div><Button type="submit" className="w-full rounded-none">Add to architecture</Button></form>
        </article>

        <article className="border border-border bg-card p-6">
          <div className="flex items-center gap-3"><h2 className="font-display text-3xl">Connect the map</h2></div>
          <form onSubmit={addRelationship} className="mt-6 grid gap-4 sm:grid-cols-2"><div className="space-y-2"><Label htmlFor="relationship-from">From</Label><select id="relationship-from" name="from" className="h-10 w-full rounded-none border border-input bg-background px-3 text-sm">{state.entities.map((entity) => <option key={entity.id} value={entity.id}>{entity.name}</option>)}</select></div><div className="space-y-2"><Label htmlFor="relationship-to">To</Label><select id="relationship-to" name="to" className="h-10 w-full rounded-none border border-input bg-background px-3 text-sm">{state.entities.map((entity) => <option key={entity.id} value={entity.id}>{entity.name}</option>)}</select></div><div className="space-y-2 sm:col-span-2"><Label htmlFor="relationship-label">Relationship</Label><Input id="relationship-label" name="relationship" required className="rounded-none" placeholder="owns, controls, advises, trustee of, insured by, governed in…" /></div><div className="sm:col-span-2"><Button type="submit" variant="outline" className="rounded-none">Add relationship</Button></div></form>

          <div className="mt-7 divide-y divide-border border-y border-border">{state.relationships.length ? state.relationships.map((relationship) => <div key={relationship.id} className="grid gap-3 py-4 sm:grid-cols-[1fr_auto_1fr_auto] sm:items-center"><p className="text-sm font-semibold">{entityById[relationship.from]?.name ?? "Removed entity"}</p><div><p className="text-[9px] uppercase tracking-[0.14em] text-oxblood">{relationship.label}</p><p className="mt-1 text-sm font-semibold">{entityById[relationship.to]?.name ?? "Removed entity"}</p></div><button type="button" onClick={() => setState((current) => ({ ...current, relationships: current.relationships.filter((item) => item.id !== relationship.id) }))} className="justify-self-start opacity-40 hover:opacity-100 sm:justify-self-end"></button></div>) : <p className="py-4 text-xs text-muted-foreground">Create the first relationship to turn the inventory into a map.</p>}</div>
        </article>
      </section>

      <section className="grid gap-4 lg:grid-cols-3">
        <article className="border border-border bg-card p-6"><h2 className="mt-5 font-display text-3xl">What breaks if somebody disappears?</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Use the graph to find structures or decisions with one key person, one adviser or one undocumented dependency.</p></article>
        <article className="border border-border bg-card p-6"><h2 className="mt-5 font-display text-3xl">What changes if residence changes?</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Jurisdiction links make it easier to identify which companies, trusts, property, advisers and documents belong in a Global Life review.</p></article>
        <article className="border border-border bg-card p-6"><h2 className="mt-5 font-display text-3xl">Reference documents without exposing them</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Until encrypted document storage is live, record only the document name and where the authorised family can find it securely. Do not put IDs, bank data, passwords or deed contents here.</p></article>
      </section>
    </div>
  );
}
