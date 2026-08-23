import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, Handshake, ShieldCheck, UsersRound } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { partnerValue } from "@/data/infrastructure";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/partners")({
  head: () => ({ meta: [{ title: `Partner applications — ${site.name}` }, { name: "description", content: "How professional firms can apply to be considered by Montvelle. Applications create no member visibility and approval does not guarantee referrals." }] }),
  component: PartnersPage,
});

function PartnersPage() {
  return (
    <>
      <section className="relative min-h-[680px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private circle of members and advisers in London" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/78 to-foreground/20" />
        <Container className="relative flex min-h-[680px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Partner applications</p>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">Firms are considered after real work, not before it.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/72">Montvelle sources specialists around a real member matter. Where a firm has done genuinely good work, we may invite it to apply and go through references and assurance.</p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-background/55">There is no directory. Applying does not create visibility to members, and approval does not guarantee referrals.</p>
            <div className="mt-9 flex flex-wrap gap-3"><Button asChild size="lg" className="rounded-none bg-oxblood px-8"><Link to="/partner-application">Apply to be considered <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button asChild size="lg" variant="outline" className="rounded-none border-background/35 bg-transparent px-8 text-background hover:bg-background hover:text-foreground"><Link to="/membership">Member access</Link></Button></div>
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.68fr_1.32fr]">
            <div><div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-oxblood" /><p className="eyebrow text-oxblood">The firewall</p></div><h2 className="mt-5 font-display text-5xl leading-[1.02]">Nobody buys a list of members.</h2><p className="mt-6 text-sm leading-7 text-muted-foreground">An approved firm may receive a genuine brief, teach a useful clinic or create a member benefit. It cannot buy member contact details, appear in a member-facing list, enter confidential peer rooms or cold-pitch the community.</p></div>
            <div className="grid gap-px bg-foreground/15 sm:grid-cols-3">
              {[
                ["Considered", "A firm has done useful work on a real matter, or has been recommended by someone we trust."],
                ["Assured", "Two references, regulatory and insurance checks and conflicts review have been completed."],
                ["Approved", "The firm may be given Supplier Portal access for work Montvelle assigns. Members are never given a list to browse."],
              ].map(([title, body]) => <article key={title} className="bg-background p-6"><BadgeCheck className="h-5 w-5 text-oxblood" /><h3 className="mt-7 font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p></article>)}
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"><div><div className="flex items-center gap-3"><Handshake className="h-5 w-5 text-bronze" /><p className="eyebrow text-bronze">Why a serious firm would want in</p></div><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Because trust is a better market than attention.</h2></div><p className="max-w-xl text-sm leading-7 text-background/62 lg:justify-self-end">The value is not “exposure to wealthy people.” The value is being known for doing excellent work in a community where complicated families regularly need excellent work.</p></div>
          <div className="grid gap-px bg-background/15 md:grid-cols-2 lg:grid-cols-3">
            {partnerValue.map((item) => <article key={item.title} className="bg-foreground p-6"><h3 className="font-display text-3xl leading-tight">{item.title}</h3><p className="mt-4 text-sm leading-7 text-background/62">{item.body}</p></article>)}
          </div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-5 lg:grid-cols-2">
            <article className="border border-foreground/15 bg-card p-7 md:p-9"><UsersRound className="h-5 w-5 text-oxblood" /><h2 className="mt-8 font-display text-4xl">For the member</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Members do not browse firms. They describe the matter, Montvelle sources and checks outside expertise, and only suitable options are brought back. Member context is never released without consent.</p></article>
            <article className="border border-foreground/15 bg-card p-7 md:p-9"><Handshake className="h-5 w-5 text-oxblood" /><h2 className="mt-8 font-display text-4xl">For the partner</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Applying places a firm on record for consideration. Nothing is promised: work is assigned only where a real member matter calls for it, and only after references and assurance are complete.</p></article>
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28">
        <Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">The standard</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">The best firms should want the work, not the listing.</h2></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/partner-application">Apply to be considered <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container>
      </section>
    </>
  );
}
