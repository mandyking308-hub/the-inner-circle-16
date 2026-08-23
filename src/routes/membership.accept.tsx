import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, LockKeyhole, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";

const paymentUrl = (import.meta.env as Record<string, string | undefined>)["VITE_MONTVELLE_PAYMENT_URL"]?.trim();

const included = [
  "Montvelle private membership for the approved member / household",
  "The Table and curated peer relationships",
  "Private gatherings and member introductions",
  "Global Life and private-service coordination",
  "Family and rising-generation access where included in the Membership Schedule",
  "Private-office technology and Decision Room access",
] as const;

export const Route = createFileRoute("/membership/accept")({
  head: () => ({
    meta: [
      { title: `Private membership acceptance — ${site.name}` },
      { name: "description", content: "Private Montvelle membership acceptance and annual payment." },
      { name: "robots", content: "noindex,nofollow,noarchive" },
    ],
  }),
  component: MembershipAcceptancePage,
});

function MembershipAcceptancePage() {
  return (
    <div className="bg-[#f6f1e8] text-foreground">
      <section className="border-b border-foreground/10 bg-[#171716] text-white">
        <Container className="py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#c9a56d]">Private acceptance · invitation only</p>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.94] md:text-8xl">Welcome to Montvelle.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/68">This page is reserved for approved members. Your final Membership Schedule controls the exact member name, billing currency, start date and any bespoke terms.</p>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-oxblood">Proposed standard membership</p>
              <div className="mt-6 border-y border-foreground/15 py-8">
                <p className="font-display text-6xl leading-none">£35,000</p>
                <p className="mt-3 text-sm text-muted-foreground">per 12-month membership · paid annually in advance</p>
              </div>
              <div className="border-b border-foreground/15 py-7">
                <div className="flex items-end justify-between gap-6"><div><p className="font-display text-3xl">£7,500</p><p className="mt-2 text-sm text-muted-foreground">one-time admission & onboarding fee</p></div><p className="text-right text-[10px] uppercase tracking-[0.18em] text-muted-foreground">subject to final schedule</p></div>
              </div>
              <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">Equivalent fixed pricing may be quoted in another billing currency in your invitation. Third-party goods, travel, professional services and other externally supplied costs are separate unless your Membership Schedule expressly says otherwise.</p>

              <div className="mt-10 space-y-4">
                {included.map((item) => <div key={item} className="flex gap-3 border-t border-foreground/10 pt-4"><Check className="mt-0.5 h-4 w-4 shrink-0 text-oxblood" /><p className="text-sm leading-6">{item}</p></div>)}
              </div>
            </div>

            <aside className="border border-foreground/15 bg-white/55 p-7 md:p-9">
              <LockKeyhole className="h-5 w-5 text-oxblood" />
              <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.22em] text-oxblood">Before membership activates</p>
              <h2 className="mt-4 font-display text-4xl leading-[1.04]">Agreement. Payment. Clearance.</h2>
              <div className="mt-7 space-y-5 text-sm leading-7 text-muted-foreground">
                <p>Membership begins only after the Membership Agreement and Schedule have been accepted, any required admission/compliance checks are complete, and cleared funds have been received.</p>
                <p>No raw card or bank credentials are collected by this Montvelle page. Payment should be completed through the secure invoice, bank-transfer instructions or regulated payment provider supplied with the invitation.</p>
                <p>Mandatory consumer, privacy and other rights that apply in your jurisdiction remain unaffected.</p>
              </div>

              <div className="mt-8 border-t border-foreground/12 pt-7">
                {paymentUrl ? (
                  <Button asChild size="lg" className="w-full rounded-full bg-foreground text-background hover:bg-foreground/88"><a href={paymentUrl} rel="nofollow">Continue to secure annual payment <ArrowRight className="ml-2 h-4 w-4" /></a></Button>
                ) : (
                  <Button size="lg" disabled className="w-full rounded-full">Secure payment link issued on acceptance</Button>
                )}
                <p className="mt-4 text-center text-[10px] leading-5 text-muted-foreground">For high-value annual memberships, bank transfer / wire should remain available as the default route.</p>
              </div>

              <div className="mt-8 border-t border-foreground/12 pt-7">
                <div className="flex gap-3"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-oxblood" /><p className="text-xs leading-6 text-muted-foreground">Montvelle is operated by {site.operator}. The Membership Agreement and Membership Schedule govern the paid relationship.</p></div>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <section className="border-t border-foreground/10 bg-[#eee6da] py-12">
        <Container>
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div><p className="font-display text-3xl">Review before accepting.</p><p className="mt-2 text-xs leading-6 text-muted-foreground">Final counsel-approved documents will sit behind every accepted membership invitation.</p></div>
            <div className="flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold">
              <Link to="/terms">Terms</Link><Link to="/privacy">Privacy</Link><Link to="/confidentiality">Confidentiality</Link><Link to="/legal">Legal notice</Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
