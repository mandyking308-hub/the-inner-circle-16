import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, MessageSquareText, Network, TableProperties, Users } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";

export const Route = createFileRoute("/member/network")({ component: NetworkHubPage });

function NetworkHubPage() {
  const rooms = [
    [TableProperties, "My Table", "Your permanent peer circle, next agenda, confidential challenges and commitments.", "/member/table"],
    [Users, "Community", "Find members by expertise, city, sector and what they can genuinely help with.", "/member/community"],
    [Network, "Introductions", "Request a warm introduction with context, desired outcome and consent on both sides.", "/member/introductions"],
    [MessageSquareText, "Ask & Offer", "Put a real need, useful offer or introduction request in front of the community without cold outreach.", "/member/ask-offer"],
    [BadgeCheck, "Trusted Partners", "Find member-recommended and screened specialists when the problem needs professional expertise.", "/member/partners"],
  ] as const;

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="The Network" title="Useful people, with context" description="The value is not a directory of impressive names. It is knowing who might be relevant, why the introduction makes sense and whether both sides want it." />
      <div className="grid gap-px bg-border md:grid-cols-2 xl:grid-cols-3">
        {rooms.map(([Icon, title, body, to]) => <Link key={title} to={to} className="group bg-card p-6 transition-colors hover:bg-accent"><Icon className="h-5 w-5 text-oxblood" /><h2 className="mt-7 font-display text-3xl">{title}</h2><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p><span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">Open <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" /></span></Link>)}
      </div>
      <section className="border border-border bg-foreground p-6 text-background md:p-8"><p className="eyebrow text-background/50">Relationship rule</p><h2 className="mt-4 max-w-4xl font-display text-4xl leading-tight md:text-5xl">No cold directory. No member list sold sideways.</h2><p className="mt-5 max-w-3xl text-sm leading-7 text-background/65">Profiles are there to help members understand who is in the community. Contact details stay private by default; introductions move through consent and context rather than extraction.</p></section>
    </div>
  );
}
