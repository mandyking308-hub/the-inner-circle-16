import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Landmark, Network, ShieldCheck, UsersRound } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/legacy")({
  head: () => ({ meta: [{ title: `Family enterprise & legacy — ${site.name}` }, { name: "description", content: "Governance, succession, protection, family dynamics and purpose for entrepreneurial families." }] }),
  component: LegacyPage,
});

const architecture = [
  ["Family", "Roles · communication · guardianship · next generation"],
  ["Ownership", "Companies · property · investments · voting rights"],
  ["Protection", "Wills · trusts · insurance · powers · contingency"],
  ["Purpose", "Philanthropy · values · family projects · legacy"],
  ["Advisers", "Legal · tax · accounting · fiduciary · investment · education"],
] as const;

function LegacyPage() {
  return (
    <>
      <section className="relative min-h-[720px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.command} alt="A private family office decision room overlooking London" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/76 to-foreground/16" />
        <Container className="relative flex min-h-[720px] items-center py-20">
          <div className="max-w-3xl"><p className="eyebrow text-bronze">Family enterprise & legacy</p><h1 className="mt-6 max-w-[10ch] font-display text-6xl leading-[0.93] md:text-8xl">Build the structure before the crisis builds it for you.</h1><p className="mt-7 max-w-2xl text-base leading-8 text-background/72">At first the founder can hold the whole picture in their head. Then the family grows, ownership changes, advisers multiply and one person's memory quietly becomes an institutional risk.</p><Button asChild size="lg" className="mt-9 rounded-none bg-oxblood px-8"><Link to="/membership">Family membership <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 bg-linen py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.64fr_1.36fr]">
            <div><Landmark className="h-5 w-5 text-oxblood" /><p className="mt-7 eyebrow text-oxblood">Family architecture</p><h2 className="mt-4 font-display text-5xl leading-[1.02]">One family. Five layers that should agree with one another.</h2></div>
            <div className="space-y-3">{architecture.map(([title, body], index) => <div key={title} className="grid gap-3 border border-foreground/15 bg-background p-5 md:grid-cols-[60px_150px_1fr] md:items-center"><span className="font-display text-2xl text-oxblood">0{index + 1}</span><h3 className="font-display text-2xl">{title}</h3><p className="text-sm leading-7 text-muted-foreground">{body}</p></div>)}</div>
          </div>
        </Container>
      </section>

      <section className="border-b border-background/10 bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="mb-12 grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-end"><div><p className="eyebrow text-bronze">The questions that matter</p><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">Succession is not a document. It is a transfer of judgement.</h2></div><p className="max-w-xl text-sm leading-7 text-background/62 lg:justify-self-end">Legal documents matter. So do decision rights, family expectations, capability, adviser continuity and what happens if responsibility moves earlier than anyone expected.</p></div>
          <div className="grid gap-px bg-background/15 md:grid-cols-2 lg:grid-cols-4">{[
            ["Who decides?", "Separate ownership, board authority, executive responsibility, trustee powers and family influence before they collide."],
            ["Who knows?", "Make critical structures, documents, advisers and obligations visible to the right people without oversharing confidential information."],
            ["Who is ready?", "Stage exposure, learning, participation and authority so the next generation builds capability before receiving control."],
            ["What survives absence?", "Test what happens if a key family member is unavailable for ninety days. Continuity should not depend on one inbox."],
          ].map(([title, body]) => <article key={title} className="bg-foreground p-6"><h3 className="font-display text-3xl">{title}</h3><p className="mt-4 text-sm leading-7 text-background/62">{body}</p></article>)}</div>
        </Container>
      </section>

      <section className="border-b border-foreground/15 py-20 md:py-28">
        <Container>
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="border border-foreground/15 bg-card p-7"><Network className="h-5 w-5 text-oxblood" /><h2 className="mt-7 font-display text-4xl">Adviser coordination</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">A family can have excellent lawyers, accountants, trustees and investment advisers and still have nobody reconciling the gaps between them. The operating layer keeps questions, dependencies and decisions visible.</p></article>
            <article className="border border-foreground/15 bg-card p-7"><UsersRound className="h-5 w-5 text-oxblood" /><h2 className="mt-7 font-display text-4xl">Family dynamics</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Money does not simplify relationships. Good governance gives families a way to discuss fairness, participation, conflict, responsibility and purpose before every question becomes emotionally expensive.</p></article>
            <article className="border border-foreground/15 bg-card p-7"><ShieldCheck className="h-5 w-5 text-oxblood" /><h2 className="mt-7 font-display text-4xl">Protection</h2><p className="mt-5 text-sm leading-7 text-muted-foreground">Incapacity, cyber risk, key-person dependency, undocumented arrangements, insurance gaps and adviser concentration deserve the same seriousness as investment risk.</p></article>
          </div>
        </Container>
      </section>

      <section className="bg-oxblood py-20 text-oxblood-foreground md:py-28"><Container><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="eyebrow text-bronze">The principle</p><h2 className="mt-5 max-w-4xl font-display text-5xl leading-[1.02] md:text-6xl">Prepare the people, align the structure, then let the paperwork support the plan.</h2><p className="mt-6 max-w-2xl text-sm leading-7 text-oxblood-foreground/68">The community helps principals become better prepared for professional advice; legal, tax, fiduciary and investment work remains with appropriately qualified professionals.</p></div><Button asChild size="lg" className="rounded-none bg-background px-8 text-foreground hover:bg-bronze"><Link to="/apply">Request a seat <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div></Container></section>
    </>
  );
}
