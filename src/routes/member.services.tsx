import { type FormEvent, useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Clock3, Lock, MessageSquareText, Send } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  formatReceived,
  memberRequestStatuses,
  memberStatusNote,
  neutralBriefFor,
  neutralTitle,
  readMemberRequests,
  writeMemberRequests,
  type MemberSourcingRequest,
} from "@/data/memberSourcing";

export const Route = createFileRoute("/member/services")({ component: MemberServicesPage });

function MemberServicesPage() {
  const [requests, setRequests] = useState<MemberSourcingRequest[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [confirmation, setConfirmation] = useState<MemberSourcingRequest | null>(null);

  useEffect(() => {
    const loaded = readMemberRequests();
    setRequests(loaded);
    setSelectedId(loaded[0]?.id ?? "");
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeMemberRequests(requests);
  }, [hydrated, requests]);

  const selected = requests.find((request) => request.id === selectedId) ?? requests[0];

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const need = String(data.get("need") ?? "").trim();
    if (!need) return;
    const city = String(data.get("city") ?? "").trim();
    const now = new Date().toISOString();
    const base = {
      need,
      city: city || "Not stated",
      timeframe: String(data.get("timeframe") ?? "").trim() || "Not stated",
      logistics: String(data.get("logistics") ?? "").trim() || "Not stated",
    };
    const request: MemberSourcingRequest = {
      id: `MR-${Date.now().toString().slice(-4)}`,
      title: neutralTitle(need, city),
      ...base,
      preferences: String(data.get("preferences") ?? "").trim() || "Not stated",
      budget: String(data.get("budget") ?? "").trim() || "Not stated",
      fullHandling: data.get("fullHandling") === "on",
      status: "Received",
      receivedAt: now,
      nextUpdate: "We will come back to you within 24 hours.",
      updates: [{ id: `u-${Date.now()}`, at: now.slice(0, 10), note: "Received. We will come back to you within 24 hours." }],
      options: [],
      internalStage: "New request",
      owner: "Unassigned",
      neutralBrief: neutralBriefFor(base),
    };
    setRequests((current) => [request, ...current]);
    setSelectedId(request.id);
    setConfirmation(request);
    form.reset();
  };

  const chooseOption = (requestId: string, optionId: string) =>
    setRequests((current) =>
      current.map((request) =>
        request.id === requestId
          ? {
              ...request,
              options: request.options.map((option) =>
                option.id === optionId ? { ...option, status: "Chosen" as const } : { ...option, status: "Set aside" as const },
              ),
              nextUpdate: "We are arranging your choice and will confirm.",
              updates: [
                ...request.updates,
                { id: `u-${Date.now()}`, at: new Date().toISOString().slice(0, 10), note: "You chose an option. We will arrange it and confirm." },
              ],
            }
          : request,
      ),
    );

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Requests"
        title="Tell us what you need. We'll take it from here."
        description="There is nothing to browse. You describe what you are trying to arrange, in your own words. We acknowledge it straight away and come back to you within 24 hours — with an answer, a real progress update, or carefully checked options."
        action={
          <Button asChild variant="outline" className="rounded-none">
            <Link to="/member/messages">Your messages</Link>
          </Button>
        }
      />

      {confirmation ? (
        <div className="border border-border bg-foreground p-6 text-background md:p-7">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-bronze" />
            <div>
              <p className="text-[9px] uppercase tracking-[0.16em] text-bronze">
                {confirmation.id} · received {formatReceived(confirmation.receivedAt)}
              </p>
              <h2 className="mt-3 font-display text-3xl leading-tight">We have this. We'll come back to you within 24 hours.</h2>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-background/65">
                Someone will be with it today. Where a request is complex, the 24 hours is our promise of a meaningful reply — not a claim that
                everything can be solved by then.
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <section className="grid gap-px border border-border bg-border md:grid-cols-3">
        {[
          ["You tell us", "In your own words, with whatever constraints actually matter."],
          ["We take it from here", "We go out and make the enquiries ourselves, with the minimum anyone needs to know."],
          ["Within 24 hours", "An answer, a progress update, or checked options — always something real."],
        ].map(([title, note]) => (
          <article key={title} className="bg-card p-6">
            <p className="text-[9px] uppercase tracking-[0.16em] text-oxblood">{title}</p>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">{note}</p>
          </article>
        ))}
      </section>

      <form onSubmit={submit} className="grid gap-5 border border-border bg-card p-6 md:grid-cols-2 md:p-8">
        <div className="md:col-span-2">
          <p className="eyebrow text-oxblood">A new request</p>
          <h2 className="mt-3 font-display text-3xl">What do you need?</h2>
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="need">What do you need?</Label>
          <Textarea id="need" name="need" required rows={4} className="rounded-none" placeholder="Describe the thing itself, and anything that cannot change." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Where</Label>
          <Input id="city" name="city" className="rounded-none" placeholder="City or country, if it applies" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeframe">When</Label>
          <Input id="timeframe" name="timeframe" className="rounded-none" placeholder="Fixed dates, or a window" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logistics">Who is this for</Label>
          <Input id="logistics" name="logistics" className="rounded-none" placeholder="Numbers, household, luggage, access" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Budget range (optional)</Label>
          <Input id="budget" name="budget" className="rounded-none" placeholder="Leave blank if you would rather see the market" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="preferences">Anything we should know</Label>
          <Textarea id="preferences" name="preferences" rows={3} className="rounded-none" placeholder="Standards, dislikes, discretion requirements, anyone already involved." />
        </div>

        <label className="flex items-start gap-3 border-t border-border pt-4 text-xs leading-6 md:col-span-2">
          <input type="checkbox" name="fullHandling" className="mt-1" defaultChecked />
          <span>
            <strong>Please handle this for me.</strong> Montvelle should make the enquiries, arrange it and stay with it through to the day,
            rather than returning options for me to organise myself.
          </span>
        </label>

        <div className="md:col-span-2">
          <Button type="submit" className="rounded-none bg-oxblood">
            <Send className="mr-2 h-4 w-4" />
            Send this to Montvelle
          </Button>
        </div>
      </form>

      <section className="border border-border bg-card p-6">
        <div className="flex items-start gap-3">
          <Lock className="mt-0.5 h-5 w-5 text-oxblood" />
          <div>
            <p className="text-sm font-semibold">How we make enquiries</p>
            <p className="mt-2 max-w-4xl text-xs leading-6 text-muted-foreground">
              We approach people on your behalf with only what they need in order to answer — the shape of the request, the place and the
              timing. Your name, your household and the reason behind the request stay with us unless you tell us otherwise.
            </p>
            <p className="mt-3 max-w-4xl text-xs leading-6 text-muted-foreground">
              A request you make is private to you by default. Sharing one with another approved member of your household is a deliberate
              choice, matter by matter — you can ask us to open it up at any point.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[320px_1fr]">
        <aside className="border border-border bg-card xl:self-start">
          <div className="border-b border-border p-4">
            <p className="eyebrow text-oxblood">Your requests</p>
          </div>
          <div className="divide-y divide-border">
            {requests.map((request) => (
              <button
                key={request.id}
                type="button"
                onClick={() => setSelectedId(request.id)}
                className={`block w-full p-4 text-left transition-colors ${selected?.id === request.id ? "bg-foreground text-background" : "hover:bg-accent"}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-[9px] uppercase tracking-[0.14em] ${selected?.id === request.id ? "text-bronze" : "text-oxblood"}`}>
                    {request.status}
                  </span>
                  <span className="text-[9px] opacity-55">{request.receivedAt.slice(0, 10)}</span>
                </div>
                <h2 className="mt-2 font-display text-xl leading-tight">{request.title}</h2>
                <p className={`mt-2 text-[11px] leading-5 ${selected?.id === request.id ? "text-background/60" : "text-muted-foreground"}`}>
                  {request.respondedAt ? request.nextUpdate : "Next update: within 24 hours of receipt"}
                </p>
              </button>
            ))}
            {requests.length === 0 ? <p className="p-5 text-sm text-muted-foreground">Nothing open yet.</p> : null}
          </div>
        </aside>

        {selected ? (
          <section className="min-w-0 space-y-5">
            <article className="border border-border bg-foreground p-6 text-background md:p-8">
              <p className="text-[9px] uppercase tracking-[0.16em] text-bronze">
                {selected.id} · received {formatReceived(selected.receivedAt)}
                {selected.fullHandling ? " · handled for you" : ""}
              </p>
              <h2 className="mt-3 font-display text-4xl leading-tight">{selected.title}</h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-background/65">{selected.need}</p>
              <dl className="mt-7 grid gap-4 border-t border-background/15 pt-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["Where", selected.city],
                  ["When", selected.timeframe],
                  ["Who for", selected.logistics],
                  ["Budget", selected.budget],
                ].map(([label, value]) => (
                  <div key={label}>
                    <dt className="text-[9px] uppercase tracking-[0.14em] text-background/45">{label}</dt>
                    <dd className="mt-1.5 text-sm leading-6">{value}</dd>
                  </div>
                ))}
              </dl>
            </article>

            <article className="border border-border bg-card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Clock3 className="h-5 w-5 text-oxblood" />
                  <h3 className="font-display text-3xl">Where this has got to</h3>
                </div>
                <Button asChild variant="ghost" className="rounded-none">
                  <Link to="/member/messages">
                    <MessageSquareText className="mr-2 h-4 w-4" />
                    Open the thread
                  </Link>
                </Button>
              </div>
              <ol className="mt-6 grid gap-px bg-border sm:grid-cols-3 lg:grid-cols-6">
                {memberRequestStatuses.map((status) => {
                  const reached = memberRequestStatuses.indexOf(status) <= memberRequestStatuses.indexOf(selected.status);
                  return (
                    <li key={status} className={`bg-card p-4 ${reached ? "" : "opacity-45"}`}>
                      <p className={`text-[9px] uppercase tracking-[0.13em] ${reached ? "text-oxblood" : "text-muted-foreground"}`}>{status}</p>
                    </li>
                  );
                })}
              </ol>
              <p className="mt-5 text-sm leading-7 text-muted-foreground">{memberStatusNote[selected.status]}</p>
              <p className="mt-2 text-sm leading-7">
                <span className="text-[10px] uppercase tracking-[0.14em] text-oxblood">Next update · </span>
                {selected.respondedAt ? selected.nextUpdate : "Within 24 hours of receipt"}
              </p>

              <div className="mt-6 space-y-3 border-t border-border pt-5">
                {selected.updates.map((update) => (
                  <div key={update.id} className="flex gap-4">
                    <p className="w-24 shrink-0 text-[10px] uppercase tracking-[0.12em] text-muted-foreground">{update.at}</p>
                    <p className="text-xs leading-6">{update.note}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="border border-border bg-card p-6">
              <h3 className="font-display text-3xl">Options from Montvelle</h3>
              {selected.options.length ? (
                <div className="mt-5 space-y-3">
                  {selected.options.map((option) => (
                    <div key={option.id} className="border border-border bg-background p-5">
                      <div className="flex flex-wrap items-start justify-between gap-4">
                        <div className="max-w-2xl">
                          <p className="text-[9px] uppercase tracking-[0.14em] text-oxblood">{option.label}</p>
                          <p className="mt-2 text-sm leading-6">{option.note}</p>
                          <p className="mt-3 text-xs text-muted-foreground">
                            {option.indicative} · {option.availability}
                          </p>
                        </div>
                        {option.status === "Chosen" ? (
                          <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-oxblood">
                            <CheckCircle2 className="h-4 w-4" />
                            Chosen
                          </span>
                        ) : option.status === "Set aside" ? (
                          <span className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Set aside</span>
                        ) : (
                          <Button variant="outline" className="rounded-none" onClick={() => chooseOption(selected.id, option.id)}>
                            Take this one
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
                  Nothing here yet. Options appear only once we have spoken to whoever is behind them and checked what they said.
                </p>
              )}
            </article>
          </section>
        ) : null}
      </div>

      <section className="border border-border bg-foreground p-6 text-background md:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-background/50">Something larger than a single arrangement?</p>
            <h2 className="mt-3 font-display text-3xl">Give the whole problem to Private Office.</h2>
          </div>
          <Button asChild variant="outline" className="rounded-none border-background/30 bg-transparent text-background hover:bg-background hover:text-foreground">
            <Link to="/member/concierge">
              Open a case <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
