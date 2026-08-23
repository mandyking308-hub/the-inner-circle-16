import { type FormEvent, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { membershipPricing } from "@/config/membershipPricing";
import { site } from "@/config/site";
import { luxuryImages } from "@/data/luxuryImages";
import { createMembershipCheckoutFn } from "@/functions/membershipCheckout";

const included = [
  "Montvelle private membership for the approved member or household",
  "Curated peer relationships, private gatherings and member introductions",
  "Global Life and private-service coordination",
  "Family and rising-generation access where included in the Membership Schedule",
  "Private Office tools and Decision Room access",
  "A 12-month membership term from the agreed activation date",
] as const;

export const Route = createFileRoute("/membership")({
  head: () => ({
    meta: [
      { title: `Membership — ${site.name}` },
      { name: "description", content: `Montvelle founding membership: ${membershipPricing.annualDisplay} per 12 months plus a one-time ${membershipPricing.joiningDisplay} admission and onboarding fee.` },
    ],
  }),
  component: MembershipPage,
});

function MembershipPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const beginCheckout = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const form = new FormData(event.currentTarget);

    try {
      const result = await createMembershipCheckoutFn({
        data: {
          name: String(form.get("name") ?? "").trim(),
          email: String(form.get("email") ?? "").trim(),
          ...(String(form.get("country") ?? "").trim() ? { country: String(form.get("country") ?? "").trim() } : {}),
          acceptedTerms: true,
          requestedImmediateService: true,
        },
      });
      window.location.assign(result.checkoutUrl);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Secure checkout could not be started. Please try again shortly.");
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative min-h-[74vh] overflow-hidden bg-[#11110f] text-white">
        <img src={luxuryImages.hero} alt="A family arriving for private aviation travel" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,8,0.82)_0%,rgba(9,9,8,0.52)_42%,rgba(9,9,8,0.12)_78%)]" />
        <Container className="relative flex min-h-[74vh] items-end py-20 md:py-28">
          <div className="max-w-4xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d8b36c]">Founding membership · {membershipPricing.pricingYear}</p>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">A private world worth belonging to.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/78 md:text-lg">People, places, family, private service and a serious private office behind it all — built as one global membership.</p>
            <a href="#join" className="mt-9 inline-flex items-center gap-2 rounded-full bg-[#d8b36c] px-7 py-3 text-sm font-semibold text-[#15130f]">View membership & pay <ArrowRight className="h-4 w-4" /></a>
          </div>
        </Container>
      </section>

      <section id="join" className="bg-[#f4ede1] py-20 md:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-oxblood">Current founding rate</p>
              <div className="mt-6 border-y border-foreground/15 py-8">
                <p className="font-display text-6xl leading-none md:text-7xl">{membershipPricing.annualDisplay}</p>
                <p className="mt-3 text-sm text-muted-foreground">per 12-month membership · paid annually in advance</p>
              </div>
              <div className="border-b border-foreground/15 py-7">
                <p className="font-display text-3xl">{membershipPricing.joiningDisplay}</p>
                <p className="mt-2 text-sm text-muted-foreground">one-time admission & onboarding fee</p>
              </div>
              <div className="mt-7 flex items-end justify-between gap-6 border-b border-foreground/15 pb-7">
                <div><p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">First-year total</p><p className="mt-2 font-display text-4xl">{membershipPricing.firstYearDisplay}</p></div>
                <p className="max-w-[220px] text-right text-[10px] leading-5 text-muted-foreground">Before applicable taxes and separately purchased third-party goods or services.</p>
              </div>
              <p className="mt-6 max-w-xl text-sm leading-7 text-muted-foreground">This is the current Montvelle rate for new memberships commencing in {membershipPricing.pricingYear}. New-member pricing is reviewed as the membership grows. Renewal pricing is the rate stated in the member's renewal invitation and Membership Schedule.</p>

              <div className="mt-10 space-y-4">
                {included.map((item) => (
                  <div key={item} className="flex gap-3 border-t border-foreground/10 pt-4"><Check className="mt-0.5 h-4 w-4 shrink-0 text-oxblood" /><p className="text-sm leading-6">{item}</p></div>
                ))}
              </div>
            </div>

            <div className="lg:pt-8">
              <div className="border border-foreground/15 bg-[#171716] p-7 text-white md:p-10">
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#d8b36c]">Secure annual membership</p>
                <h2 className="mt-4 font-display text-5xl leading-[1.02]">Join Montvelle.</h2>
                <p className="mt-5 text-sm leading-7 text-white/62">Complete the details below and continue to Dodo Payments' secure hosted checkout. Montvelle never receives or stores your raw card or bank credentials.</p>

                <form onSubmit={beginCheckout} className="mt-8 space-y-5">
                  <div className="space-y-2"><Label htmlFor="membership-name" className="text-white/75">Full name</Label><Input id="membership-name" name="name" required autoComplete="name" className="rounded-none border-white/20 bg-white/8 text-white placeholder:text-white/35" /></div>
                  <div className="space-y-2"><Label htmlFor="membership-email" className="text-white/75">Email</Label><Input id="membership-email" name="email" type="email" required autoComplete="email" className="rounded-none border-white/20 bg-white/8 text-white placeholder:text-white/35" /></div>
                  <div className="space-y-2"><Label htmlFor="membership-country" className="text-white/75">Country of residence</Label><Input id="membership-country" name="country" required autoComplete="country-name" className="rounded-none border-white/20 bg-white/8 text-white placeholder:text-white/35" /></div>

                  <label className="flex gap-3 border-t border-white/15 pt-5 text-xs leading-6 text-white/65">
                    <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[#d8b36c]" />
                    <span>I have read and agree to the <Link to="/membership-agreement" className="underline underline-offset-2">Membership Agreement</Link>, <Link to="/terms" className="underline underline-offset-2">Website Terms</Link>, <Link to="/privacy" className="underline underline-offset-2">Privacy Notice</Link> and <Link to="/confidentiality" className="underline underline-offset-2">Confidentiality & No Solicitation standard</Link>. I understand that my Membership Schedule records the specific approved member, term and commercial details.</span>
                  </label>
                  <label className="flex gap-3 text-xs leading-6 text-white/65">
                    <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[#d8b36c]" />
                    <span>I request onboarding and service preparation to begin as soon as GSM accepts my membership. Where a statutory cancellation right applies, I understand that services already supplied may be deducted from any refund to the extent permitted by applicable law.</span>
                  </label>
                  <label className="flex gap-3 text-xs leading-6 text-white/65">
                    <input type="checkbox" required className="mt-1 h-4 w-4 shrink-0 accent-[#d8b36c]" />
                    <span>I understand that payment alone does not override GSM's admission, sanctions, fraud, safety or compliance checks. If GSM does not accept the membership, the membership and admission fees paid for that unaccepted membership will be returned, subject to mandatory law and payment-provider processing.</span>
                  </label>

                  {error ? <p className="border border-[#d8b36c]/35 bg-[#d8b36c]/8 p-3 text-xs leading-6 text-[#f1d69d]" role="alert">{error}</p> : null}

                  <Button type="submit" size="lg" disabled={submitting} className="w-full rounded-none bg-[#d8b36c] text-[#15130f] hover:bg-[#e4c47f]">
                    {submitting ? "Opening secure checkout…" : `Pay ${membershipPricing.firstYearDisplay} securely`}<ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>

                <div className="mt-7 flex gap-3 border-t border-white/15 pt-6"><ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#d8b36c]" /><p className="text-[10px] leading-5 text-white/48">Montvelle is operated by {site.operator}, a Delaware limited liability company. Membership activates only after acceptance, required checks, contractual acceptance and cleared funds.</p></div>
              </div>

              <div className="mt-5 border border-foreground/15 bg-white/55 p-6">
                <p className="font-display text-3xl">Prefer a private conversation first?</p>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">The application route remains available for families who would rather speak with us before paying.</p>
                <Button asChild variant="outline" className="mt-5 rounded-full"><Link to="/apply">Request membership first <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-center lg:gap-20">
            <figure className="overflow-hidden"><img src={luxuryImages.table} alt="Montvelle members gathering privately" className="aspect-[16/11] w-full object-cover" loading="lazy" /></figure>
            <div><p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-oxblood">Selective, not complicated</p><h2 className="mt-5 font-display text-5xl leading-[1.02] md:text-6xl">The price is public. The standard remains private.</h2><p className="mt-7 text-base leading-8 text-muted-foreground">Paying is not a way to buy somebody else's confidence, data or private room. Montvelle remains a curated membership with strict confidentiality, consent-led introductions and the right to protect the community when conduct, safety, law or trust requires it.</p></div>
          </div>
        </Container>
      </section>
    </>
  );
}
