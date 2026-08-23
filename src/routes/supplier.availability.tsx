import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SupplierIntro, useSupplierIdentity } from "@/components/supplier/SupplierShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/supplier/availability")({ component: SupplierAvailability });

type Availability = {
  leadTime: string;
  blackout: string;
  capacity: string;
  notes: string;
};

const empty: Availability = {
  leadTime: "48 hours",
  blackout: "",
  capacity: "Two concurrent engagements",
  notes: "",
};

function SupplierAvailability() {
  const { supplierId } = useSupplierIdentity();
  const [value, setValue] = useState<Availability>(empty);
  const [saved, setSaved] = useState(false);

  const key = `montvelle:supplier-availability:${supplierId}`;

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      setValue(raw ? { ...empty, ...(JSON.parse(raw) as Availability) } : empty);
    } catch {
      setValue(empty);
    }
  }, [key]);

  const save = () => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  return (
    <div className="space-y-8">
      <SupplierIntro
        eyebrow="Availability"
        title="When you can take work."
        description="Keep this current. It shapes what members are shown and what the concierge desk will send you."
      />

      <div className="max-w-3xl space-y-5 border border-border bg-card p-6">
        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Typical lead time</p>
          <Input
            value={value.leadTime}
            onChange={(event) => setValue((current) => ({ ...current, leadTime: event.target.value }))}
            className="mt-1 rounded-none"
          />
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Capacity</p>
          <Input
            value={value.capacity}
            onChange={(event) => setValue((current) => ({ ...current, capacity: event.target.value }))}
            className="mt-1 rounded-none"
          />
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Dates you are unavailable</p>
          <Input
            value={value.blackout}
            onChange={(event) => setValue((current) => ({ ...current, blackout: event.target.value }))}
            placeholder="e.g. 12–20 December"
            className="mt-1 rounded-none"
          />
        </div>
        <div>
          <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Notes for the concierge desk</p>
          <Textarea
            value={value.notes}
            onChange={(event) => setValue((current) => ({ ...current, notes: event.target.value }))}
            rows={4}
            className="mt-1 rounded-none"
          />
        </div>
        <Button className="rounded-none" onClick={save}>
          {saved ? "Saved" : "Save availability"}
        </Button>
      </div>
    </div>
  );
}
