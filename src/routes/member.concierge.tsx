import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, Clock3, Compass, MapPinned, Send } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { conciergeCategories, conciergeRequests, reciprocalPlaces } from "@/data/infrastructure";

export const Route = createFileRoute("/member/concierge")({
  component: MemberConciergePage,
});

function MemberConciergePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Concierge & Execution"
        title="Give the complicated job one owner"
        description="Tell the desk what outcome you need. Concierge clarifies the request, identifies dependencies, finds the right partner or resource and keeps a visible next action until the job is closed."
      />

      <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
        <section className="border border-border bg-card p-6">
          <div className="flex items-center gap-3"><Compass className="h-5 w-5 text-bronze" /><div><p className="eyebrow text-bronze">New request</p><h2 className="mt-2 font-display text-3xl">What are you trying to get done?</h2></div></div>
          {submitted ? (
            <div className="mt-7 border border-border bg-background p-5"><CheckCircle2 className="h-5 w-5 text-bronze" /><h3 className="mt-4 font-display text-2xl">Request captured.</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">In production, a concierge owner would review the brief, clarify anything missing and set the first next action.</p><Button type="button" variant="outline" className="mt-5 rounded-none" onClick={() => setSubmitted(false)}>Create another</Button></div>
          ) : (
            <form className="mt-7 space-y-5" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
              <div className="space-y-2"><Label htmlFor="outcome">Outcome</Label><Input id="outcome" required placeholder="e.g. Find and coordinate the right advisers for a family move" className="rounded-none" /></div>
              <div className="space-y-2"><Label htmlFor="deadline">When do you need it?</Label><Input id="deadline" placeholder="Date or urgency" className="rounded-none" /></div>
              <div className="space-y-2"><Label htmlFor="context">Context</Label><Textarea id="context" rows={6} placeholder="What has already happened? What constraints matter? Who is already involved?" className="rounded-none" /></div>
              <Button type="submit" className="w-full rounded-none"><Send className="mr-2 h-4 w-4" />Send to concierge</Button>
            </form>
          )}
        </section>

        <section className="border border-border bg-card">
          <div className="border-b border-border p-5 md:p-6"><p className="eyebrow text-bronze">Open requests</p><h2 className="mt-2 font-display text-3xl">A next action for every job</h2></div>
          <div className="divide-y divide-border">
            {conciergeRequests.map((request) => (
              <article key={request.id} className="p-5 md:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4"><div><p className="text-[10px] uppercase tracking-[0.16em] text-bronze">{request.category} · {request.id}</p><h3 className="mt-2 font-display text-2xl">{request.title}</h3></div><span className="border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em]">{request.status}</span></div>
                <div className="mt-4 grid gap-3 text-xs text-muted-foreground sm:grid-cols-3"><div><span className="block uppercase tracking-[0.12em]">Urgency</span><span className="mt-1 block text-foreground">{request.urgency}</span></div><div><span className="block uppercase tracking-[0.12em]">Owner</span><span className="mt-1 block text-foreground">{request.owner}</span></div><div><span className="block uppercase tracking-[0.12em]">Next action</span><span className="mt-1 block text-foreground">{request.nextStep}</span></div></div>
              </article>
            ))}
          </div>
        </section>
      </div>

      <section>
        <div className="flex items-center gap-3"><Clock3 className="h-5 w-5 text-bronze" /><div><p className="eyebrow text-bronze">Common request types</p><h2 className="mt-2 font-display text-3xl">The things that steal time because they cross categories</h2></div></div>
        <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3">{conciergeCategories.map(([title, body]) => <article key={title} className="border border-border bg-card p-5"><h3 className="font-display text-2xl">{title}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{body}</p></article>)}</div>
      </section>

      <section>
        <div className="flex items-center gap-3"><MapPinned className="h-5 w-5 text-bronze" /><div><p className="eyebrow text-bronze">Places & reciprocal relationships</p><h2 className="mt-2 font-display text-3xl">A useful global network needs somewhere to land.</h2></div></div>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">Over time the community can build formal relationships with clubs, workspaces, hotels and hosting venues. Until an agreement is signed, the platform records a relationship stage rather than promising access.</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">{reciprocalPlaces.map((place) => <article key={`${place.city}-${place.name}`} className="border border-border bg-card p-5"><p className="text-[10px] uppercase tracking-[0.16em] text-bronze">{place.city}</p><h3 className="mt-2 font-display text-2xl">{place.name}</h3><p className="mt-3 text-xs leading-6 text-muted-foreground">{place.type}</p><p className="mt-4 border-t border-border pt-3 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{place.status}</p></article>)}</div>
      </section>
    </div>
  );
}
