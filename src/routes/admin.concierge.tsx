import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock3, Compass, FileSearch, UserRoundCheck } from "lucide-react";

import { PageIntro, StatCard } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { conciergeRequests } from "@/data/infrastructure";

export const Route = createFileRoute("/admin/concierge")({
  component: AdminConciergePage,
});

function AdminConciergePage() {
  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Concierge operations" title="Execution queue" description="Every request needs a clear owner, current status, next action and consent record where a third party is involved." action={<Button className="rounded-none">Create internal request</Button>} />
      <div className="grid gap-4 sm:grid-cols-3"><StatCard label="Open requests" value={String(conciergeRequests.length)} /><StatCard label="Awaiting member" value="1" note="Consent or clarification" /><StatCard label="Awaiting partner" value="2" note="Options or response" /></div>
      <section className="border border-border bg-card"><div className="border-b border-border p-5"><div className="flex items-center gap-3"><Compass className="h-5 w-5 text-bronze" /><h2 className="font-display text-3xl">Request queue</h2></div></div><div className="divide-y divide-border">{conciergeRequests.map((request) => <article key={request.id} className="grid gap-4 p-5 md:grid-cols-[1fr_140px_150px_210px_auto] md:items-center"><div><p className="text-[10px] uppercase tracking-[0.15em] text-bronze">{request.id} · {request.category}</p><h3 className="mt-1 font-display text-2xl">{request.title}</h3><p className="mt-2 text-xs text-muted-foreground">Member: {request.member}</p></div><div><p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Owner</p><p className="mt-1 text-sm">{request.owner}</p></div><div><p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Status</p><p className="mt-1 text-sm">{request.status}</p></div><div><p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">Next action</p><p className="mt-1 text-xs leading-5">{request.nextStep}</p></div><div className="flex flex-wrap gap-2"><Button asChild variant="outline" className="rounded-none"><Link to="/admin/sourcing"><FileSearch className="mr-2 h-4 w-4" />Sourcing desk</Link></Button><Button variant="ghost" className="rounded-none">Open</Button></div></article>)}</div></section>
      <div className="grid gap-4 lg:grid-cols-2"><section className="border border-border bg-card p-6"><Clock3 className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">Service standard</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">Acknowledge immediately and come back to the member within 24 hours with an answer, a real progress update or checked options. That is a response standard, not a promise that complex requests are resolved in a day. One owner per request, always a next action, and the loop closed explicitly when the member agrees the job is done.</p></section><section className="border border-border bg-card p-6"><UserRoundCheck className="h-5 w-5 text-bronze" /><h2 className="mt-5 font-display text-3xl">Consent standard</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">No partner receives more member context than necessary before consent. Sensitive details stay inside the member relationship until the member chooses to instruct or connect.</p></section></div>
    </div>
  );
}
