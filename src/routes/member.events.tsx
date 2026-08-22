import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CalendarCheck2, Clock3, MapPin, UsersRound } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { gatherings } from "@/data/community";

export const Route = createFileRoute("/member/events")({
  component: EventsPage,
});

function EventsPage() {
  const [rsvps, setRsvps] = useState<Record<string, string>>({});

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Gatherings"
        title="Rooms worth showing up for."
        description="Small dinners, working breakfasts, salons, masterclasses, retreats and impact visits. Exact venues stay private until attendance is approved."
      />

      <div className="space-y-4">
        {gatherings.map((event) => {
          const response = rsvps[event.id];
          return (
            <article key={event.id} className="border border-border bg-card">
              <div className="grid md:grid-cols-[180px_1fr_auto]">
                <div className="border-b border-border p-5 md:border-b-0 md:border-r md:p-6">
                  <p className="eyebrow text-bronze">{event.type}</p>
                  <p className="mt-4 font-display text-3xl leading-none">{event.date.split(" ")[0]}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{event.date.split(" ").slice(1).join(" ")}</p>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h2 className="font-display text-3xl">{event.title}</h2>
                      <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">{event.description}</p>
                    </div>
                    <span className="border border-border px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{event.status}</span>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-2"><Clock3 className="h-3.5 w-3.5" />{event.time}</span>
                    <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
                    <span className="inline-flex items-center gap-2"><UsersRound className="h-3.5 w-3.5" />{event.seats}</span>
                  </div>
                </div>
                <div className="flex items-center border-t border-border p-5 md:border-l md:border-t-0 md:p-6">
                  {response ? (
                    <div className="min-w-[150px] text-center">
                      <CalendarCheck2 className="mx-auto h-5 w-5 text-bronze" />
                      <p className="mt-2 text-sm font-medium">{response}</p>
                      <button className="mt-2 text-xs text-muted-foreground underline underline-offset-4" onClick={() => setRsvps((current) => ({ ...current, [event.id]: "" }))}>Change</button>
                    </div>
                  ) : (
                    <Button
                      className="w-full rounded-none md:w-auto"
                      variant={event.status === "Waitlist" ? "outline" : "default"}
                      onClick={() => setRsvps((current) => ({ ...current, [event.id]: event.status === "Waitlist" ? "Joined waitlist" : "RSVP requested" }))}
                    >
                      {event.status === "Waitlist" ? "Join waitlist" : "Request a place"}
                    </Button>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
