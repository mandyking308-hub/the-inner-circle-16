import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

import { SupplierIntro, useSupplierIdentity } from "@/components/supplier/SupplierShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bookingModeLabel } from "@/data/privateServices";
import { readBookings, writeBookings, type Booking, type BookingStatus } from "@/data/memberWorld";

export const Route = createFileRoute("/supplier/requests")({ component: SupplierRequests });

function SupplierRequests() {
  const { supplierId } = useSupplierIdentity();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [proposal, setProposal] = useState<Record<string, string>>({});
  const [note, setNote] = useState<string | null>(null);

  useEffect(() => {
    setBookings(readBookings());
  }, []);

  const apply = (id: string, patch: Partial<Booking>) => {
    const next = bookings.map((booking) => (booking.id === id ? { ...booking, ...patch } : booking));
    setBookings(next);
    writeBookings(next);
  };

  const requests = bookings.filter((booking) => booking.supplierId === supplierId && booking.status === "awaiting");

  const decide = (booking: Booking, status: BookingStatus, message: string) => {
    apply(booking.id, { status });
    setNote(message);
    window.setTimeout(() => setNote(null), 2800);
  };

  return (
    <div className="space-y-8">
      <SupplierIntro
        eyebrow="Requests"
        title="New work, waiting for an answer."
        description="Accept, decline, or propose an alternative time. A clear no is always better than a slow yes."
      />

      {note ? <div className="border border-border bg-card p-5 text-sm">{note}</div> : null}

      <div className="space-y-5">
        {requests.map((booking) => (
          <article key={booking.id} className="border border-border bg-card">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-oxblood">
                  {booking.city} · {booking.id}
                </p>
                <h2 className="mt-2 font-display text-3xl">{booking.serviceTitle}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {booking.when}
                  {booking.party ? ` · ${booking.party}` : ""}
                </p>
              </div>
              <span className="border border-border px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                {bookingModeLabel[booking.mode]}
              </span>
            </div>

            <div className="border-b border-border bg-accent/30 p-6">
              <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                <ShieldCheck className="h-3.5 w-3.5 text-oxblood" /> Context shared with you
              </p>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">{booking.sharedContext.join(" · ")}</p>
              <p className="mt-2 text-[11px] text-muted-foreground">
                The household is identified to you only as “{booking.household}”. No further member information is
                available through this portal.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 p-5">
              <Button className="rounded-none" onClick={() => decide(booking, "upcoming", `${booking.id} accepted.`)}>
                Accept
              </Button>
              <Button
                variant="outline"
                className="rounded-none"
                onClick={() => decide(booking, "cancelled", `${booking.id} declined.`)}
              >
                Decline
              </Button>
              <Input
                value={proposal[booking.id] ?? ""}
                onChange={(event) => setProposal((current) => ({ ...current, [booking.id]: event.target.value }))}
                placeholder="Propose an alternative time"
                className="w-full rounded-none sm:w-72"
              />
              <Button
                variant="ghost"
                className="rounded-none"
                onClick={() => {
                  const value = proposal[booking.id]?.trim();
                  if (!value) return;
                  apply(booking.id, { when: `Proposed: ${value}` });
                  setNote(`Alternative time proposed for ${booking.id}.`);
                  window.setTimeout(() => setNote(null), 2800);
                }}
              >
                Propose
              </Button>
            </div>
          </article>
        ))}
        {requests.length === 0 ? (
          <p className="border border-border bg-card p-6 text-sm text-muted-foreground">No open requests.</p>
        ) : null}
      </div>
    </div>
  );
}
