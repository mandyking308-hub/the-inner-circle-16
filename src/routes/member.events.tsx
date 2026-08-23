import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { gatherings } from "@/data/community";
import { luxuryImages } from "@/data/luxuryImages";

export const Route = createFileRoute("/member/events")({ component: EventsPage });

const STORAGE_KEY = "project-table:event-responses:v2";
type EventResponse = { response: string; dietary: string; guest: string };

const details: Record<string, { host: string; purpose: string; dress: string; usefulFor: string }> =
  {
    "table-september": {
      host: "London Table host",
      purpose: "Bring one founder-dependency question you have not solved cleanly yet.",
      dress: "Dinner · quietly smart",
      usefulFor: "Founders moving from operator to owner, chair or steward.",
    },
    "ai-salon": {
      host: "Technology Council",
      purpose: "Separate AI theatre from the systems a family enterprise could safely use now.",
      dress: "Salon · business casual",
      usefulFor: "Principals, operators and advisers responsible for data, privacy or automation.",
    },
    "breakfast-governance": {
      host: "Family Enterprise Council",
      purpose:
        "Leave with one governance decision to formalise before the business needs it urgently.",
      dress: "Breakfast · business",
      usefulFor:
        "Founder-led companies introducing boards, family councils or clearer decision rights.",
    },
    "impact-visit": {
      host: "Impact Council",
      purpose:
        "Understand a delivery problem before deciding whether expertise, relationships or funding would be useful.",
      dress: "Working visit · comfortable",
      usefulFor: "Members interested in practical contribution rather than performative access.",
    },
  };

const calendarHref = (event: (typeof gatherings)[number]) => {
  const body = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${event.title}\nDESCRIPTION:${event.description.replace(/\n/g, " ")}\nLOCATION:${event.location}\nEND:VEVENT\nEND:VCALENDAR`;
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(body)}`;
};

function EventsPage() {
  const [responses, setResponses] = useState<Record<string, EventResponse>>({});
  const [selectedId, setSelectedId] = useState(gatherings[0]?.id ?? "");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setResponses(JSON.parse(raw) as Record<string, EventResponse>);
    } catch {
      // Event response remains usable without persistence.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(responses));
  }, [hydrated, responses]);

  const selected = gatherings.find((event) => event.id === selectedId) ?? gatherings[0];

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Montvelle Invitations"
        title="Rooms worth showing up for"
        description="Every invitation explains why the room exists, who it is useful for and what is expected. Exact private venues are released only when attendance is confirmed."
      />

      <p className="border-l-2 border-bronze pl-4 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        Preview invitations shown here are illustrative
      </p>

      {selected ? (
        <section className="relative min-h-[430px] overflow-hidden border border-border bg-foreground text-background">
          <img
            src={luxuryImages.table}
            alt="A private members gathering"
            className="absolute inset-0 h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/72 to-foreground/16" />
          <div className="relative grid min-h-[430px] gap-8 p-7 md:p-9 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-bronze">
                Private invitation · {selected.type}
              </p>
              <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[0.98] md:text-6xl">
                {selected.title}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-background/70">
                {selected.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-background/65">
                <span className="inline-flex items-center gap-2">
                  {selected.date} · {selected.time}
                </span>
                <span className="inline-flex items-center gap-2">
                  {selected.seats}
                </span>
                <span className="inline-flex items-center gap-2">
                  Private venue on confirmation
                </span>
              </div>
            </div>
            <div className="border border-background/20 bg-foreground/65 p-5 backdrop-blur-md">
              <p className="text-[9px] uppercase tracking-[0.16em] text-background/45">
                Why this room exists
              </p>
              <p className="mt-3 text-sm leading-7">{details[selected.id]?.purpose}</p>
              <p className="mt-5 border-t border-background/15 pt-4 text-[9px] uppercase tracking-[0.16em] text-background/45">
                Useful for
              </p>
              <p className="mt-2 text-xs leading-6 text-background/70">
                {details[selected.id]?.usefulFor}
              </p>
              <p className="mt-4 text-xs text-background/55">Host · {details[selected.id]?.host}</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="grid gap-4 xl:grid-cols-[0.72fr_1.28fr]">
        <div className="space-y-2">
          {gatherings.map((event) => {
            const response = responses[event.id];
            return (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedId(event.id)}
                className={`block w-full border p-5 text-left transition-colors ${selectedId === event.id ? "border-foreground bg-foreground text-background" : "border-border bg-card hover:bg-accent"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p
                      className={`text-[9px] uppercase tracking-[0.15em] ${selectedId === event.id ? "text-bronze" : "text-oxblood"}`}
                    >
                      {event.type}
                    </p>
                    <h3 className="mt-2 font-display text-2xl">{event.title}</h3>
                  </div>
                  
                </div>
                <p className="mt-3 text-xs opacity-60">
                  {event.date} · {event.time}
                </p>
              </button>
            );
          })}
        </div>

        {selected ? (
          <article className="border border-border bg-card p-6 md:p-8">
            <div className="grid gap-6 lg:grid-cols-2">
              <div>
                <p className="eyebrow text-oxblood">Your response</p>
                <h2 className="mt-3 font-display text-4xl">
                  {responses[selected.id]?.response || "Not yet responded"}
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{selected.location}</p>
                <p className="mt-2 text-xs text-muted-foreground">{details[selected.id]?.dress}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Button
                    type="button"
                    className="rounded-none"
                    onClick={() =>
                      setResponses((current) => ({
                        ...current,
                        [selected.id]: {
                          ...(current[selected.id] ?? { dietary: "", guest: "" }),
                          response:
                            selected.status === "Waitlist" ? "Joined waitlist" : "Place requested",
                        },
                      }))
                    }
                  >
                    {selected.status === "Waitlist" ? "Join waitlist" : "Request a place"}
                  </Button>
                  <a
                    href={calendarHref(selected)}
                    download={`${selected.id}.ics`}
                    className="inline-flex h-10 items-center justify-center border border-border px-4 text-sm font-medium"
                  >
                    Add calendar hold
                  </a>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="event-dietary" className="text-xs font-medium">
                    Dietary / access note
                  </label>
                  <Input
                    id="event-dietary"
                    value={responses[selected.id]?.dietary ?? ""}
                    onChange={(event) =>
                      setResponses((current) => ({
                        ...current,
                        [selected.id]: {
                          ...(current[selected.id] ?? { response: "", guest: "" }),
                          dietary: event.target.value,
                        },
                      }))
                    }
                    className="rounded-none"
                    placeholder="Only if relevant to the host"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="event-guest" className="text-xs font-medium">
                    Guest / plus-one request
                  </label>
                  <Input
                    id="event-guest"
                    value={responses[selected.id]?.guest ?? ""}
                    onChange={(event) =>
                      setResponses((current) => ({
                        ...current,
                        [selected.id]: {
                          ...(current[selected.id] ?? { response: "", dietary: "" }),
                          guest: event.target.value,
                        },
                      }))
                    }
                    className="rounded-none"
                    placeholder="Name and why they would add to the room"
                  />
                </div>
                <p className="text-[10px] leading-5 text-muted-foreground">
                  Private venue details and attendee context are shared only after approval and on
                  the minimum-necessary basis.
                </p>
              </div>
            </div>
          </article>
        ) : null}
      </section>
    </div>
  );
}
