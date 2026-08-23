import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SupplierIntro, useSupplierIdentity } from "@/components/supplier/SupplierShell";
import { Button } from "@/components/ui/button";
import { bookingStatusLabel, readBookings, writeBookings, type Booking } from "@/data/memberWorld";

export const Route = createFileRoute("/supplier/bookings")({ component: SupplierBookings });

function SupplierBookings() {
  const { supplierId } = useSupplierIdentity();
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(readBookings());
  }, []);

  const mine = bookings.filter(
    (booking) => booking.supplierId === supplierId && booking.status !== "awaiting",
  );

  const setStatus = (id: string, status: Booking["status"]) => {
    const next = bookings.map((booking) => (booking.id === id ? { ...booking, status } : booking));
    setBookings(next);
    writeBookings(next);
  };

  return (
    <div className="space-y-8">
      <SupplierIntro
        eyebrow="Bookings"
        title="Work you are holding."
        description="Confirmed, in progress and completed. Mark a service complete when the work is genuinely finished."
      />

      <div className="space-y-4">
        {mine.map((booking) => (
          <article key={booking.id} className="border border-border bg-card p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-oxblood">
                  {booking.city} · {booking.id}
                </p>
                <h2 className="mt-2 font-display text-3xl">{booking.serviceTitle}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {booking.when} · {booking.household}
                </p>
              </div>
              <span className="border border-border px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                {bookingStatusLabel[booking.status]}
              </span>
            </div>
            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              Shared context: {booking.sharedContext.join(" · ")}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {booking.status === "upcoming" ? (
                <Button className="rounded-none" onClick={() => setStatus(booking.id, "in_progress")}>
                  Start
                </Button>
              ) : null}
              {booking.status === "in_progress" ? (
                <Button className="rounded-none" onClick={() => setStatus(booking.id, "past")}>
                  Mark service complete
                </Button>
              ) : null}
            </div>
          </article>
        ))}
        {mine.length === 0 ? (
          <p className="border border-border bg-card p-6 text-sm text-muted-foreground">No confirmed work yet.</p>
        ) : null}
      </div>
    </div>
  );
}
