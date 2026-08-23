import { createFileRoute } from "@tanstack/react-router";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import {
  bookingModeLabel,
  serviceCategories,
  serviceOfferings,
  supplierOrgs,
} from "@/data/privateServices";

export const Route = createFileRoute("/admin/services")({ component: AdminServices });

function AdminServices() {
  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Private Services"
        title="Demo service records, for internal checks only."
        description="Every offering carries a named supplier, a service standard and a booking route. Nothing reaches a member without both."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Suppliers" value={String(supplierOrgs.length)} note="Vetted, recommended and strategic partners." />
        <StatCard label="Offerings" value={String(serviceOfferings.length)} note="Published to the member environment." />
        <StatCard label="Categories" value={String(serviceCategories.length)} note="From travel to professional advice." />
        <StatCard
          label="Introduction-only"
          value={String(serviceOfferings.filter((service) => service.mode === "introduction").length)}
          note="Made personally, with member consent."
        />
      </div>

      <section className="border border-border bg-card">
        <div className="border-b border-border p-6">
          <p className="eyebrow text-oxblood">Catalogue</p>
          <h2 className="mt-2 font-display text-3xl">Offerings by category</h2>
        </div>
        <div className="divide-y divide-border">
          {serviceOfferings.map((service) => (
            <article key={service.id} className="grid gap-3 p-6 lg:grid-cols-[1.4fr_1fr_auto] lg:items-start">
              <div>
                <p className="text-[9px] uppercase tracking-[0.16em] text-oxblood">{service.category}</p>
                <h3 className="mt-2 font-display text-2xl">{service.title}</h3>
                <p className="mt-2 max-w-2xl text-xs leading-6 text-muted-foreground">{service.summary}</p>
              </div>
              <div className="text-xs leading-6 text-muted-foreground">
                <p>{service.supplier}</p>
                <p>{service.cities.join(" · ")}</p>
                <p>{service.indicative}</p>
              </div>
              <span className="shrink-0 border border-border px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                {bookingModeLabel[service.mode]}
              </span>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
