import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { LegalContactCta } from "@/components/marketing/LegalTemplate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { legalUpdatedLine } from "@/config/legal";
import { site } from "@/config/site";
import { applicationIntakeEnabled } from "@/lib/applicationIntake";

export const Route = createFileRoute("/cancellation")({
  head: () => ({
    meta: [
      { title: `Cancellation Rights — ${site.name}` },
      { name: "description", content: "How to cancel a Montvelle membership purchase, including distance-selling cancellation rights where they apply and a model cancellation form." },
      { property: "og:title", content: `Cancellation Rights — ${site.name}` },
      { property: "og:description", content: "Cancellation periods, the effect of requesting immediate service, deductions and how to submit a cancellation instruction." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CancellationPage,
});

const sections: { heading: string; body: string }[] = [
  {
    heading: "Mandatory local rights prevail",
    body: "Nothing on this page reduces any cancellation, withdrawal, refund or consumer right you have under the mandatory law of your country of residence. Where local law gives you a longer period or a better outcome than described here, that local right applies. Cancellation rights differ between consumers and business purchasers, and some rights do not apply where the membership is purchased in a business or entity capacity.",
  },
  {
    heading: "Where a 14-day cancellation period applies",
    body: "For consumers in the United Kingdom and the European Union buying at a distance (online, without meeting us in person), a statutory cancellation period of 14 days generally applies to a services contract. The period runs from the day after the day the contract is concluded — normally the day your membership purchase is confirmed. You do not need to give a reason to cancel within that period.",
  },
  {
    heading: "If you ask us to start straight away",
    body: "Montvelle asks separately, at checkout, whether you want service to begin during the cancellation period. This is a distinct question from accepting the contractual documents and is never assumed. If you ask us to begin immediately and then cancel within the 14 days, you remain entitled to cancel, but we may charge a proportionate amount for the service actually supplied up to the moment you told us you were cancelling, calculated against the total contract price. If you do not ask us to begin immediately, service starts after the cancellation period ends.",
  },
  {
    heading: "Fully performed services",
    body: "If you expressly asked for the service to begin during the cancellation period and the service has been fully performed within that period with your acknowledgement that you would lose the right to cancel on full performance, the statutory cancellation right no longer applies to that fully performed service.",
  },
  {
    heading: "Third-party and non-recoverable costs",
    body: "Where, at your request, we have committed money to third parties on your behalf — deposits, retainers for independent specialists, travel, venues, tickets, security or similar — those amounts may be non-refundable in whole or in part under that third party's own terms. We will tell you before incurring such costs where we reasonably can, and we will pass on any recovery we obtain. These costs are separate from the membership fee and from any proportionate deduction described above.",
  },
  {
    heading: "Admission fee and annual fee",
    body: "Where a cancellation right applies and is validly exercised, we will refund amounts due without undue delay and in any event within 14 days of being informed, using the same means of payment you used, unless you agree otherwise. Where the payment provider is the merchant of record for the transaction, the refund is processed through that provider's flow and may appear on your statement under their descriptor.",
  },
  {
    heading: "Outside the cancellation period",
    body: "After any applicable cancellation period ends, the membership term and the commercial terms recorded in your Membership Schedule apply. Renewal, non-renewal, suspension and termination are dealt with in the Membership Agreement. Membership may also be ended by Montvelle in the circumstances set out in that agreement.",
  },
  {
    heading: "How to cancel",
    body: "You may cancel by making a clear statement to that effect. Use the model form below, or send the same information through the Contact Montvelle form selecting the category 'Cancellation'. We do not publish an email address. Your cancellation takes effect from the moment you send it, so please keep the reference we return to you.",
  },
  {
    heading: "Durable copy of your contract",
    body: "Your contractual documents and payment receipt should be provided to you through the payment and onboarding process. Production transactional email is not yet enabled on this build, so we do not currently claim automatic email delivery of a durable copy; until it is enabled, request a copy through the contact form and we will supply one.",
  },
];

function CancellationPage() {
  const [values, setValues] = useState({
    name: "",
    address: "",
    reference: "",
    orderedOn: "",
    cancellingOn: "",
    notes: "",
  });
  const [copied, setCopied] = useState(false);

  const modelText = useMemo(
    () =>
      [
        "To: Global Solutions Management LLC (Montvelle) — submitted via the Montvelle contact form",
        "",
        "I hereby give notice that I cancel my contract for the supply of the following service:",
        "Montvelle membership (admission and/or annual membership fee).",
        "",
        `Ordered / contract concluded on: ${values.orderedOn || "[date]"}`,
        `Name of consumer: ${values.name || "[name]"}`,
        `Address of consumer: ${values.address || "[address]"}`,
        `Membership or payment reference: ${values.reference || "[reference]"}`,
        `Date of this notice: ${values.cancellingOn || "[date]"}`,
        "",
        values.notes ? `Additional information: ${values.notes}` : "Additional information: —",
      ].join("\n"),
    [values],
  );

  const update = (key: keyof typeof values) => (event: { target: { value: string } }) =>
    setValues((current) => ({ ...current, [key]: event.target.value }));

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(modelText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="max-w-3xl">
          <span className="inline-flex border border-bronze/40 bg-accent/30 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-bronze">
            Draft template · legal review required before launch
          </span>
          <h1 className="mt-6 font-display text-5xl md:text-6xl">Cancellation Rights</h1>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {legalUpdatedLine("cancellationRights")}
          </p>
          <p className="mt-6 text-sm leading-8 text-muted-foreground">
            This page explains how to cancel a Montvelle membership purchase, when a statutory
            cancellation period applies, what happens if you ask us to begin work immediately, and
            how to send us a cancellation instruction without using email. It should be read with the{" "}
            <Link to="/membership-agreement" className="underline underline-offset-2">Membership Agreement</Link>{" "}
            and the <Link to="/terms" className="underline underline-offset-2">Website Terms</Link>.
          </p>

          <div className="mt-10 divide-y divide-border border-y border-border">
            {sections.map((section) => (
              <div key={section.heading} className="py-7">
                <h2 className="font-display text-3xl">{section.heading}</h2>
                <p className="mt-3 text-sm leading-8 text-muted-foreground">{section.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 border border-foreground/15 bg-card p-6 md:p-9">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">
              Model cancellation form
            </p>
            <h2 className="mt-3 font-display text-3xl leading-tight">
              Complete, copy, and send through the contact form
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              You only need to use this form if you wish to cancel the contract. Fill in the fields,
              copy the statement, then submit it through Contact Montvelle with the category
              &ldquo;Cancellation&rdquo;.
            </p>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="c-name">Your name</Label>
                <Input id="c-name" value={values.name} onChange={update("name")} className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-reference">Membership or payment reference</Label>
                <Input id="c-reference" value={values.reference} onChange={update("reference")} className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-ordered">Date contract concluded</Label>
                <Input id="c-ordered" type="date" value={values.orderedOn} onChange={update("orderedOn")} className="rounded-none" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="c-cancelling">Date of this notice</Label>
                <Input id="c-cancelling" type="date" value={values.cancellingOn} onChange={update("cancellingOn")} className="rounded-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="c-address">Your address</Label>
                <Input id="c-address" value={values.address} onChange={update("address")} className="rounded-none" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="c-notes">Anything else we should know (optional)</Label>
                <Textarea id="c-notes" rows={3} value={values.notes} onChange={update("notes")} className="rounded-none" />
              </div>
            </div>

            <div className="mt-7 border border-foreground/15 bg-linen p-5">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Your statement
              </p>
              <pre className="mt-3 whitespace-pre-wrap break-words font-sans text-xs leading-6 text-foreground">
                {modelText}
              </pre>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button type="button" variant="outline" className="rounded-none" onClick={copy}>
                {copied ? "Copied" : "Copy statement"}
              </Button>
              <Button asChild className="rounded-none bg-oxblood">
                <Link to="/contact">Submit through Contact Montvelle</Link>
              </Button>
            </div>

            {!applicationIntakeEnabled() ? (
              <p className="mt-5 border border-bronze/40 bg-accent/30 p-4 text-xs leading-6 text-foreground">
                Preview build: the contact form currently stores messages in your browser rather than
                delivering them to Montvelle. Until production delivery is enabled, please also use
                the contact route given in your application or membership correspondence so your
                cancellation is received in time.
              </p>
            ) : null}
          </div>

          <LegalContactCta prompt="Cancellation instructions, refund questions and requests for a durable copy of your contract are handled through the secure contact form." />
        </div>
      </Container>
    </section>
  );
}
