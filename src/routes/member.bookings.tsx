import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { bookingModeLabel } from "@/data/privateServices";
import {
  bookingStatusLabel,
  bookingStatusOrder,
  readBookings,
  writeBookings,
  type Booking,
  type BookingStatus,
} from "@/data/memberWorld";

export const Route = createFileRoute("/member/bookings")({ component: MemberBookingsPage });

const paymentLabel: Record<Booking["payment"], string> = {
  not_required: "No payment recorded",
  quote_pending: "Quote pending",
  recorded: "Recorded — settled directly with the provider",
  settled: "Settled",
};

function MemberBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tab, setTab] = useState<BookingStatus>("upcoming");

  useEffect(() => {
    setBookings(readBookings());
  }, []);

  const update = (next: Booking[]) => {
    setBookings(next);
    writeBookings(next);
  };

  const counts = useMemo(() => {
    const map = {} as Record<BookingStatus, number>;
    bookingStatusOrder.forEach((status) => {
      map[status] = bookings.filter((booking) => booking.status === status).length;
    });
    return map;
  }, [bookings]);

  const visible = bookings.filter((booking) => booking.status === tab);

  const setStatus = (id: string, status: BookingStatus) =>
    update(bookings.map((booking) => (booking.id === id ? { ...booking, status } : booking)));

  const bookAgain = (booking: Booking) => {
    const id = `BKG-${Date.now().toString().slice(-4)}`;
    update([
      {
        ...booking,
        id,
        status: "awaiting",
        when: "To be agreed",
        payment: "quote_pending",
        threadId: `THR-${id}`,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...bookings,
    ]);
    setTab("awaiting");
  };

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Bookings"
        title="Everything arranged, in one place."
        description="What is confirmed, what is waiting on somebody, and what has already been done — with the terms, the arrival note and the conversation kept beside it."
        action={
          <Button asChild className="rounded-none">
            <Link to="/member/services">Arrange something</Link>
          </Button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {bookingStatusOrder.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setTab(status)}
            className={`border px-4 py-2 text-[10px] uppercase tracking-[0.14em] transition-colors ${tab === status ? "border-foreground bg-foreground text-background" : "border-border text-muted-foreground hover:text-foreground"}`}
          >
            {bookingStatusLabel[status]} · {counts[status] ?? 0}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <section className="border border-border bg-card p-7 text-sm text-muted-foreground">
          Nothing here at the moment.
        </section>
      ) : null}

      <div className="space-y-5">
        {visible.map((booking) => (
          <article key={booking.id} className="border border-border bg-card">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border p-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-oxblood">
                  {booking.city} · {booking.supplier}
                </p>
                <h2 className="mt-2 font-display text-3xl">{booking.serviceTitle}</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  {booking.when}
                  {booking.party ? ` · ${booking.party}` : ""} · {booking.household}
                </p>
              </div>
              <div className="text-right">
                <span className="border border-border px-3 py-1.5 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  {bookingModeLabel[booking.mode]}
                </span>
                <p className="mt-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{booking.id}</p>
              </div>
            </div>

            <div className="grid gap-5 p-6 md:grid-cols-2 xl:grid-cols-4">
              <div>
                <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Quote</p>
                <p className="mt-1 text-sm">{booking.quote}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">{paymentLabel[booking.payment]}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Cancellation</p>
                <p className="mt-1 text-sm leading-6">{booking.cancellation}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Arrival & contact</p>
                <p className="mt-1 text-sm leading-6">{booking.arrival}</p>
              </div>
              <div>
                <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Held by</p>
                <p className="mt-1 text-sm">{booking.conciergeOwner ?? "Arranged directly"}</p>
              </div>
            </div>

            <div className="border-t border-border bg-accent/30 p-6">
              <p className="flex items-center gap-2 text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                Shared with the provider
              </p>
              <p className="mt-2 text-xs leading-6 text-muted-foreground">
                {booking.sharedContext.join(" · ")}. Nothing else from your preferences has been passed on.
              </p>
            </div>

            <div className="flex flex-wrap gap-2 border-t border-border p-5">
              {booking.status === "awaiting" ? (
                <>
                  <Button className="rounded-none" onClick={() => setStatus(booking.id, "upcoming")}>
                    Confirm
                  </Button>
                  <Button variant="outline" className="rounded-none" onClick={() => setStatus(booking.id, "cancelled")}>
                    Decline
                  </Button>
                </>
              ) : null}
              {booking.status === "upcoming" || booking.status === "in_progress" ? (
                <Button variant="outline" className="rounded-none" onClick={() => setStatus(booking.id, "cancelled")}>
                  Cancel request
                </Button>
              ) : null}
              {booking.status === "past" ? (
                <Button className="rounded-none" onClick={() => bookAgain(booking)}>
                  Book again
                </Button>
              ) : null}
              <Button asChild variant="outline" className="rounded-none">
                <Link to="/member/messages">
                  Message
                </Link>
              </Button>
              {booking.status === "upcoming" ? (
                <Button variant="ghost" className="rounded-none">
                  Add to calendar
                </Button>
              ) : null}
              <Button asChild variant="ghost" className="rounded-none">
                <Link to="/member/concierge">Ask Montvelle to handle this</Link>
              </Button>
            </div>
          </article>
        ))}
      </div>

      <section className="border border-border bg-card p-6">
        <p className="text-xs leading-6 text-muted-foreground">
          Payment status is held as a record only. Montvelle does not take payment for supplier services; fees are
          settled directly with the provider under their own terms.
        </p>
      </section>
    </div>
  );
}
