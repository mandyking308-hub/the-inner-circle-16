import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { bookingStatusLabel, bookingStatusOrder, readBookings, type Booking } from "@/data/memberWorld";

export const Route = createFileRoute("/admin/bookings")({ component: AdminBookings });

function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    setBookings(readBookings());
  }, []);

  const count = (status: Booking["status"]) => bookings.filter((booking) => booking.status === status).length;

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Bookings"
        title="Every arrangement the house is holding."
        description="Operational oversight only: status, supplier and owner. Household detail stays inside the member's private office."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Awaiting" value={String(count("awaiting"))} note="Requests with a supplier." />
        <StatCard label="Upcoming" value={String(count("upcoming"))} note="Confirmed and in the diary." />
        <StatCard label="In progress" value={String(count("in_progress"))} note="Being delivered now." />
        <StatCard label="Completed" value={String(count("past"))} note="Closed, awaiting private feedback." />
      </div>

      {bookingStatusOrder.map((status) => {
        const rows = bookings.filter((booking) => booking.status === status);
        if (rows.length === 0) return null;
        return (
          <section key={status} className="border border-border bg-card">
            <div className="border-b border-border p-6">
              <p className="eyebrow text-oxblood">{bookingStatusLabel[status]}</p>
              <h2 className="mt-2 font-display text-3xl">{rows.length} in this state</h2>
            </div>
            <div className="divide-y divide-border">
              {rows.map((booking) => (
                <div key={booking.id} className="grid gap-2 p-6 lg:grid-cols-[1.3fr_1fr_1fr] lg:items-center">
                  <div>
                    <p className="text-[9px] uppercase tracking-[0.16em] text-oxblood">{booking.id}</p>
                    <h3 className="mt-1.5 font-display text-2xl">{booking.serviceTitle}</h3>
                  </div>
                  <p className="text-xs leading-6 text-muted-foreground">
                    {booking.supplier}
                    <br />
                    {booking.city} · {booking.when}
                  </p>
                  <p className="text-xs leading-6 text-muted-foreground">
                    {booking.household}
                    <br />
                    {booking.conciergeOwner ? `Owner: ${booking.conciergeOwner}` : "Unassigned"}
                  </p>
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
