import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { SupplierIntro, useSupplierIdentity } from "@/components/supplier/SupplierShell";
import { serviceOfferings } from "@/data/privateServices";
import { readBookings, readThreads, type Booking, type Thread } from "@/data/memberWorld";

export const Route = createFileRoute("/supplier/")({ component: SupplierToday });

function SupplierToday() {
  const { supplierId, supplier } = useSupplierIdentity();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    setBookings(readBookings());
    setThreads(readThreads());
  }, []);

  const mine = bookings.filter((booking) => booking.supplierId === supplierId);
  const requests = mine.filter((booking) => booking.status === "awaiting");
  const upcoming = mine.filter((booking) => booking.status === "upcoming" || booking.status === "in_progress");
  const myThreads = threads.filter((thread) => thread.supplierId === supplierId);
  const services = serviceOfferings.filter((service) => service.supplierId === supplierId);

  const tiles = [
    { label: "New requests", value: requests.length, to: "/supplier/requests" as const },
    { label: "Confirmed work", value: upcoming.length, to: "/supplier/bookings" as const },
    { label: "Conversations", value: myThreads.length, to: "/supplier/messages" as const },
    { label: "Live services", value: services.length, to: "/supplier/services" as const },
  ];

  return (
    <div className="space-y-8">
      <SupplierIntro
        eyebrow="Today"
        title={`Good morning, ${supplier?.name ?? "partner"}.`}
        description="What has come in, what is confirmed, and what is waiting on you. Nothing else."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {tiles.map((tile) => (
          <Link key={tile.label} to={tile.to} className="border-t-2 border-oxblood bg-card p-5 transition-colors hover:bg-accent">
            <p className="text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{tile.label}</p>
            <p className="mt-4 font-display text-4xl leading-none">{tile.value}</p>
          </Link>
        ))}
      </div>

      <section className="border border-border bg-card">
        <div className="border-b border-border p-6">
          <p className="eyebrow text-oxblood">Waiting on you</p>
          <h2 className="mt-2 font-display text-3xl">Requests to answer</h2>
        </div>
        <div className="divide-y divide-border">
          {requests.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">Nothing outstanding.</p>
          ) : (
            requests.map((booking) => (
              <Link key={booking.id} to="/supplier/requests" className="block p-6 transition-colors hover:bg-accent">
                <p className="text-[10px] uppercase tracking-[0.16em] text-oxblood">
                  {booking.city} · {booking.id}
                </p>
                <h3 className="mt-2 font-display text-2xl">{booking.serviceTitle}</h3>
                <p className="mt-2 text-xs text-muted-foreground">{booking.when}</p>
              </Link>
            ))
          )}
        </div>
      </section>

      <section className="border border-border bg-foreground p-6 text-background">
        <p className="text-[9px] uppercase tracking-[0.18em] text-background/45">Standard</p>
        <p className="mt-3 max-w-3xl font-display text-2xl leading-snug">
          {supplier?.responseTime ?? "Respond promptly"} — and a considered alternative when the answer is no.
        </p>
      </section>
    </div>
  );
}
