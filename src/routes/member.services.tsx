import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Clock3, MapPin, ShieldCheck } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  bookingModeLabel,
  bookingModeNote,
  getSupplier,
  serviceCategories,
  serviceNeeds,
  serviceOfferings,
  type ServiceOffering,
} from "@/data/privateServices";
import { readBookings, writeBookings, type Booking } from "@/data/memberWorld";

export const Route = createFileRoute("/member/services")({ component: MemberServicesPage });

const cities = ["All", ...Array.from(new Set(serviceOfferings.flatMap((service) => service.cities))).sort()];

function MemberServicesPage() {
  const [need, setNeed] = useState<string>("");
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("All");
  const [category, setCategory] = useState("All");
  const [mode, setMode] = useState("All");
  const [selected, setSelected] = useState<ServiceOffering | null>(null);
  const [placed, setPlaced] = useState<string | null>(null);

  const results = useMemo(() => {
    const text = query.trim().toLowerCase();
    return serviceOfferings.filter((service) => {
      if (need && !service.needs.includes(need)) return false;
      if (city !== "All" && !service.cities.includes(city)) return false;
      if (category !== "All" && service.category !== category) return false;
      if (mode !== "All" && bookingModeLabel[service.mode] !== mode) return false;
      if (!text) return true;
      return `${service.title} ${service.summary} ${service.supplier} ${service.category}`.toLowerCase().includes(text);
    });
  }, [need, query, city, category, mode]);

  const started = Boolean(need || query || city !== "All" || category !== "All" || mode !== "All");
  const shown = started ? results.slice(0, 8) : [];

  const place = (service: ServiceOffering) => {
    const id = `BKG-${Date.now().toString().slice(-4)}`;
    const booking: Booking = {
      id,
      serviceId: service.id,
      serviceTitle: service.title,
      supplierId: service.supplierId,
      supplier: service.supplier,
      mode: service.mode,
      city: service.cities[0] ?? "London",
      when: "To be agreed",
      household: "Hart household",
      sharedContext: ["City", "Preferred dates", "Party size where relevant"],
      quote: service.indicative,
      payment: service.indicative.toLowerCase().includes("quote") ? "quote_pending" : "not_required",
      cancellation: service.terms,
      arrival: "To be confirmed once the provider replies.",
      status: "awaiting",
      conciergeOwner: service.mode === "introduction" ? "Concierge desk" : undefined,
      threadId: `THR-${id}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    writeBookings([booking, ...readBookings()]);
    setPlaced(`${bookingModeLabel[service.mode]} placed with ${service.supplier}. It is now in your bookings.`);
    setSelected(null);
  };

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Private Services"
        title="Start with what you need."
        description="Rather than a directory, this begins with the thing you are trying to arrange. A small number of routes we already trust will follow — and serious matters are introduced personally, not booked instantly."
        action={
          <Button asChild variant="outline" className="rounded-none">
            <Link to="/member/partners">Professional bench</Link>
          </Button>
        }
      />

      {placed ? (
        <div className="border border-border bg-card p-5 text-sm">
          {placed}{" "}
          <Link to="/member/bookings" className="font-semibold underline underline-offset-4">
            Open bookings
          </Link>
        </div>
      ) : null}

      <section className="border border-border bg-card p-6 md:p-7">
        <p className="eyebrow text-oxblood">What do you need?</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {serviceNeeds.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setNeed(need === item ? "" : item)}
              className={`border px-3 py-2 text-xs transition-colors ${need === item ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1.4fr_0.9fr_1.1fr_1fr]">
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Or describe it in your own words"
            className="rounded-none"
          />
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="border border-border bg-background px-3 py-2 text-sm"
            aria-label="City"
          >
            {cities.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="border border-border bg-background px-3 py-2 text-sm"
            aria-label="Category"
          >
            {["All", ...serviceCategories].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <select
            value={mode}
            onChange={(event) => setMode(event.target.value)}
            className="border border-border bg-background px-3 py-2 text-sm"
            aria-label="Booking mode"
          >
            {["All", "Book now", "Request availability", "Private introduction"].map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </div>
      </section>

      {!started ? (
        <section className="border border-border bg-foreground p-7 text-background md:p-9">
          <p className="eyebrow text-bronze">How this works</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl leading-tight">
            A small number of good routes, not a marketplace.
          </h2>
          <div className="mt-8 grid gap-px bg-background/15 md:grid-cols-3">
            {(["book", "request", "introduction"] as const).map((item) => (
              <article key={item} className="bg-foreground p-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-bronze">
                  {bookingModeLabel[item]}
                </p>
                <p className="mt-3 text-xs leading-6 text-background/62">{bookingModeNote[item]}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-6 text-background/55">
            Legal, tax, fiduciary and medical matters are always routed as a private introduction. They are never
            offered as an instant booking.
          </p>
        </section>
      ) : (
        <section className="space-y-4">
          <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {results.length} route{results.length === 1 ? "" : "s"} we would suggest
          </p>
          {shown.map((service) => {
            const supplier = getSupplier(service.supplierId);
            return (
              <article key={service.id} className="border border-border bg-card p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.17em] text-oxblood">{service.category}</p>
                    <h2 className="mt-2 font-display text-3xl">{service.title}</h2>
                    <p className="mt-1 text-xs text-muted-foreground">{service.supplier}</p>
                  </div>
                  <span className="border border-border px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                    {bookingModeLabel[service.mode]}
                  </span>
                </div>
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">{service.summary}</p>
                <div className="mt-5 grid gap-4 border-y border-border py-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Where</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm">
                      <MapPin className="h-3.5 w-3.5 text-bronze" />
                      {service.cities.join(" · ")}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Standard</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm">
                      <Clock3 className="h-3.5 w-3.5 text-bronze" />
                      {supplier?.responseTime ?? "By arrangement"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Member benefit</p>
                    <p className="mt-1 text-sm">{service.benefit}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Indicative</p>
                    <p className="mt-1 text-sm">{service.indicative}</p>
                  </div>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <Button className="rounded-none" onClick={() => place(service)}>
                    {bookingModeLabel[service.mode]}
                  </Button>
                  <Button variant="outline" className="rounded-none" onClick={() => setSelected(service)}>
                    More about this
                  </Button>
                  <Button asChild variant="ghost" className="rounded-none">
                    <Link to="/member/concierge">Ask Montvelle to handle this</Link>
                  </Button>
                </div>
              </article>
            );
          })}
          {results.length === 0 ? (
            <div className="border border-border bg-card p-6 text-sm text-muted-foreground">
              Nothing on the bench matches that yet.{" "}
              <Link to="/member/concierge" className="font-semibold text-foreground underline underline-offset-4">
                Ask the concierge desk to source someone.
              </Link>
            </div>
          ) : null}
        </section>
      )}

      {selected ? (
        <section className="border border-border bg-foreground p-6 text-background md:p-8">
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow text-bronze">{selected.supplier}</p>
              <h2 className="mt-3 font-display text-4xl">{selected.title}</h2>
              <p className="mt-4 text-sm leading-7 text-background/65">{selected.summary}</p>
              <p className="mt-6 flex items-start gap-3 text-xs leading-6 text-background/62">
                <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-bronze" />
                {selected.whyTrusted}
              </p>
            </div>
            <div className="grid gap-px bg-background/15 sm:grid-cols-2">
              <article className="bg-foreground p-5">
                <p className="text-[9px] uppercase tracking-[0.14em] text-background/45">Service standard</p>
                <p className="mt-2 text-xs leading-6 text-background/70">{selected.standard}</p>
              </article>
              <article className="bg-foreground p-5">
                <p className="text-[9px] uppercase tracking-[0.14em] text-background/45">Booking route</p>
                <p className="mt-2 text-xs leading-6 text-background/70">{bookingModeNote[selected.mode]}</p>
              </article>
              <article className="bg-foreground p-5">
                <p className="text-[9px] uppercase tracking-[0.14em] text-background/45">Indicative</p>
                <p className="mt-2 text-xs leading-6 text-background/70">{selected.indicative}</p>
              </article>
              <article className="bg-foreground p-5">
                <p className="text-[9px] uppercase tracking-[0.14em] text-background/45">Terms</p>
                <p className="mt-2 text-xs leading-6 text-background/70">{selected.terms}</p>
              </article>
              <article className="bg-foreground p-5 sm:col-span-2">
                <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-background/45">
                  <ShieldCheck className="h-3.5 w-3.5 text-bronze" /> What the provider sees
                </p>
                <p className="mt-2 text-xs leading-6 text-background/70">
                  Only the minimum a booking requires — city, date, party size and any preference you choose to share.
                  Your private preferences are never passed on by default.
                </p>
              </article>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap gap-2">
            <Button className="rounded-none bg-background text-foreground hover:bg-background/90" onClick={() => place(selected)}>
              {bookingModeLabel[selected.mode]} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="rounded-none border-background/35 bg-transparent text-background hover:bg-background hover:text-foreground"
              onClick={() => setSelected(null)}
            >
              Close
            </Button>
          </div>
        </section>
      ) : null}
    </div>
  );
}
