import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SupplierIntro, useSupplierIdentity } from "@/components/supplier/SupplierShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { bookingModeLabel, serviceOfferings, type BookingMode, type ServiceOffering } from "@/data/privateServices";

export const Route = createFileRoute("/supplier/services")({ component: SupplierServices });

type Draft = Pick<ServiceOffering, "id" | "title" | "summary" | "cities" | "mode" | "indicative" | "terms" | "standard">;

const STORAGE_KEY = "montvelle:supplier-services:v1";

function SupplierServices() {
  const { supplierId } = useSupplierIdentity();
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const base: Draft[] = serviceOfferings
      .filter((service) => service.supplierId === supplierId)
      .map(({ id, title, summary, cities, mode, indicative, terms, standard }) => ({
        id,
        title,
        summary,
        cities: [...cities],
        mode,
        indicative,
        terms,
        standard,
      }));
    try {
      const raw = window.localStorage.getItem(`${STORAGE_KEY}:${supplierId}`);
      setDrafts(raw ? (JSON.parse(raw) as Draft[]) : base);
    } catch {
      setDrafts(base);
    }
  }, [supplierId]);

  const update = (id: string, patch: Partial<Draft>) =>
    setDrafts((current) => current.map((draft) => (draft.id === id ? { ...draft, ...patch } : draft)));

  const save = () => {
    window.localStorage.setItem(`${STORAGE_KEY}:${supplierId}`, JSON.stringify(drafts));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  const add = () =>
    setDrafts((current) => [
      {
        id: `svc-new-${Date.now()}`,
        title: "New service",
        summary: "",
        cities: [],
        mode: "request",
        indicative: "Quote required",
        terms: "",
        standard: "",
      },
      ...current,
    ]);

  return (
    <div className="space-y-8">
      <SupplierIntro
        eyebrow="Services"
        title="What you offer Montvelle households."
        description="Keep each offering honest and specific. How it is booked, where it is available and what it is likely to cost."
      />

      <div className="flex flex-wrap gap-2">
        <Button className="rounded-none" onClick={add}>
          Add a service
        </Button>
        <Button variant="outline" className="rounded-none" onClick={save}>
          {saved ? "Saved" : "Save changes"}
        </Button>
      </div>

      <div className="space-y-5">
        {drafts.map((draft) => (
          <article key={draft.id} className="border border-border bg-card p-6">
            <Input
              value={draft.title}
              onChange={(event) => update(draft.id, { title: event.target.value })}
              className="rounded-none font-display text-xl"
              aria-label="Service title"
            />
            <Textarea
              value={draft.summary}
              onChange={(event) => update(draft.id, { summary: event.target.value })}
              rows={2}
              placeholder="What it is, in one or two sentences."
              className="mt-3 rounded-none"
            />
            <div className="mt-4 grid gap-3 lg:grid-cols-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Locations</p>
                <Input
                  value={draft.cities.join(", ")}
                  onChange={(event) => update(draft.id, { cities: event.target.value.split(",").map((city) => city.trim()).filter(Boolean) })}
                  className="mt-1 rounded-none"
                />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Booking mode</p>
                <select
                  value={draft.mode}
                  onChange={(event) => update(draft.id, { mode: event.target.value as BookingMode })}
                  className="mt-1 w-full border border-border bg-background px-3 py-2 text-sm"
                >
                  {(["book", "request", "introduction"] as BookingMode[]).map((mode) => (
                    <option key={mode} value={mode}>
                      {bookingModeLabel[mode]}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Indicative price</p>
                <Input
                  value={draft.indicative}
                  onChange={(event) => update(draft.id, { indicative: event.target.value })}
                  className="mt-1 rounded-none"
                />
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Service standard</p>
                <Input
                  value={draft.standard}
                  onChange={(event) => update(draft.id, { standard: event.target.value })}
                  className="mt-1 rounded-none"
                />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Cancellation & terms</p>
              <Input
                value={draft.terms}
                onChange={(event) => update(draft.id, { terms: event.target.value })}
                className="mt-1 rounded-none"
              />
            </div>
          </article>
        ))}
        {drafts.length === 0 ? (
          <p className="border border-border bg-card p-6 text-sm text-muted-foreground">No services listed yet.</p>
        ) : null}
      </div>
    </div>
  );
}
