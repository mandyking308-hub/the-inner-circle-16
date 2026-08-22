import { useEffect, useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Landmark, LockKeyhole, Plus, ShieldCheck, Trash2 } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { familyArchitecture } from "@/data/infrastructure";

export const Route = createFileRoute("/member/family-architecture")({ component: FamilyArchitecturePage });

const STORAGE_KEY = "project-table:family-architecture";
type LayerName = (typeof familyArchitecture)[number]["layer"];
type CustomItem = { id: string; layer: LayerName; label: string };
type StoredArchitecture = { items: CustomItem[]; notes: Record<string, string> };

function FamilyArchitecturePage() {
  const [items, setItems] = useState<CustomItem[]>([]);
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [selectedLayer, setSelectedLayer] = useState<LayerName>(familyArchitecture[0]!.layer);
  const [label, setLabel] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const stored = JSON.parse(raw) as StoredArchitecture;
        setItems(stored.items ?? []);
        setNotes(stored.notes ?? {});
      }
    } catch {
      // Keep the empty custom layer if local storage is unavailable.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, notes } satisfies StoredArchitecture));
  }, [hydrated, items, notes]);

  const customByLayer = useMemo(() => Object.fromEntries(familyArchitecture.map((layer) => [layer.layer, items.filter((item) => item.layer === layer.layer)])), [items]);

  const addItem = () => {
    const clean = label.trim();
    if (!clean) return;
    setItems((current) => [...current, { id: `ARCH-${Date.now()}`, layer: selectedLayer, label: clean }]);
    setLabel("");
  };

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Family Architecture"
        title="See the family enterprise as one system"
        description="Map the people, ownership, protection, purpose and advisers that need to keep working together. Custom additions and working notes are saved on this device in the prototype."
      />

      <section className="grid gap-5 xl:grid-cols-[1fr_340px]">
        <div className="border border-border bg-card p-5 md:p-7">
          <div className="flex items-start gap-4"><Landmark className="mt-1 h-5 w-5 text-bronze" /><div><p className="eyebrow text-bronze">Architecture map</p><h2 className="mt-2 font-display text-3xl">Five layers. One family.</h2></div></div>
          <div className="mt-7 space-y-3">
            {familyArchitecture.map((layer, index) => (
              <article key={layer.layer} className="border border-border bg-background p-5">
                <div className="grid gap-4 md:grid-cols-[64px_150px_1fr] md:items-start">
                  <span className="font-display text-2xl text-bronze">0{index + 1}</span>
                  <div><h3 className="font-display text-2xl">{layer.layer}</h3><p className="mt-2 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">What belongs here?</p></div>
                  <div>
                    <div className="flex flex-wrap gap-2">{layer.items.map((item) => <span key={item} className="border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{item}</span>)}{(customByLayer[layer.layer] ?? []).map((item: CustomItem) => <span key={item.id} className="inline-flex items-center gap-1 border border-bronze/40 bg-accent px-2.5 py-1 text-[10px] uppercase tracking-[0.12em]"><span>{item.label}</span><button type="button" aria-label={`Remove ${item.label}`} onClick={() => setItems((current) => current.filter((candidate) => candidate.id !== item.id))}><Trash2 className="h-3 w-3 text-muted-foreground" /></button></span>)}</div>
                    <Textarea value={notes[layer.layer] ?? ""} onChange={(event) => setNotes((current) => ({ ...current, [layer.layer]: event.target.value }))} rows={3} className="mt-4 rounded-none" placeholder={`Working notes for ${layer.layer.toLowerCase()} — open questions, gaps, decisions or adviser actions.`} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <div className="border border-border bg-card p-6">
            <div className="flex items-center gap-3"><Plus className="h-5 w-5 text-bronze" /><div><p className="eyebrow text-bronze">Add to the map</p><h2 className="mt-2 font-display text-3xl">Make it yours</h2></div></div>
            <div className="mt-6 space-y-4">
              <div className="space-y-2"><Label htmlFor="architecture-layer">Layer</Label><select id="architecture-layer" value={selectedLayer} onChange={(event) => setSelectedLayer(event.target.value as LayerName)} className="h-10 w-full rounded-none border border-input bg-background px-3 text-sm">{familyArchitecture.map((layer) => <option key={layer.layer} value={layer.layer}>{layer.layer}</option>)}</select></div>
              <div className="space-y-2"><Label htmlFor="architecture-item">Item</Label><Input id="architecture-item" value={label} onChange={(event) => setLabel(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") { event.preventDefault(); addItem(); } }} placeholder="e.g. Holding company, trustee, property SPV" className="rounded-none" /></div>
              <Button type="button" className="w-full rounded-none" onClick={addItem}><Plus className="mr-2 h-4 w-4" />Add item</Button>
            </div>
          </div>

          <div className="border border-border bg-foreground p-6 text-background"><LockKeyhole className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">Security before documents</h2><p className="mt-4 text-sm leading-7 text-background/68">Use this prototype for structure labels and working notes only. Actual trust deeds, wills, IDs, bank data, ownership documents and other sensitive records wait for production authentication, permissions and encrypted storage.</p></div>
        </aside>
      </section>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="border border-border bg-card p-6"><ShieldCheck className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">Questions the map should expose</h2><div className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground"><p>Who owns what — and who can actually decide?</p><p>What happens on death, incapacity, relocation or a founder stepping back?</p><p>Do company documents, wills, trusts, insurance and family expectations point in the same direction?</p><p>Which adviser owns each issue, and which gaps are currently nobody’s job?</p></div></section>
        <section className="border border-border bg-card p-6"><Landmark className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">The point is not a prettier org chart</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">The map should make the next family conversation easier: what exists, why it exists, what is unresolved and which decisions need to happen before something changes.</p></section>
      </div>
    </div>
  );
}
