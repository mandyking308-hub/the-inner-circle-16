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

export const Route = createFileRoute("/cancellation")({
  head: () => ({
    meta: [
      { title: `Cancellation Rights — ${site.name}` },
      { name: "description", content: "How to cancel a Montvelle membership purchase, including statutory cooling-off rights where they apply and a model cancellation form." },
      { property: "og:title", content: `Cancellation Rights — ${site.name}` },
      { property: "og:description", content: "Cancellation periods, early-start requests, deductions, refunds and how to submit a cancellation instruction." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CancellationPage,
});

const sections: { heading: string; body: string }[] = [
  {
    heading: "Mandatory local rights prevail",
    body: "Nothing on this page reduces a cancellation, withdrawal, refund or consumer right that cannot lawfully be waived. Rights vary by residence, contracting capacity and how the contract was made. Consumer rights do not automatically apply to a family office, company, trust, partnership or other business/entity purchase. Where mandatory local law gives a longer period, an additional renewal right, a different calculation or a better remedy, that law applies.",
  },
  {
    heading: "Where a 14-day cancellation period applies",
    body: "For many United Kingdom and European Union consumers who conclude a services contract at a distance, a statutory cancellation period of 14 days applies. The period ordinarily runs from the legally relevant contract-conclusion date rather than from a later activation date. Montvelle records or confirms that date in the Membership Schedule, contract confirmation or other durable contract record. You do not need to give a reason for exercising a statutory cooling-off right. If mandatory law extends the cancellation period because required cancellation information was not properly provided, the extended statutory period applies.",
  },
  {
    heading: "Separate early-start request",
    body: "If you want onboarding, service preparation or membership services to begin before an applicable cooling-off period expires, Montvelle requires a separate express early-start request, recorded in a durable form where required by law. It is not inferred from paying, accepting the Membership Agreement, signing the Membership Schedule, logging in or making a general request. Where the law requires an acknowledgement about the consequences of full performance, that acknowledgement is also obtained separately. If you make no valid early-start request, the relevant consumer service waits until the cooling-off period has expired.",
  },
  {
    heading: "If you cancel after asking us to start early",
    body: "Where applicable law permits, if you expressly ask us to start during the cooling-off period and then cancel before that period ends, you may be required to pay a proportionate amount for services actually supplied before you told us you were cancelling. The calculation is made in accordance with applicable law by reference to the agreed contract price and what has genuinely been provided; where law requires another basis, that basis applies. We do not treat the entire 12-month annual Membership Fee as earned merely because service was started early.",
  },
  {
    heading: "Fully performed discrete services",
    body: "A statutory right to cancel a particular service may end where that service has been fully performed during the cancellation period after the consumer expressly requested early performance and gave any acknowledgement required by law that the cancellation right would be lost on full performance. This rule is applied only to a service that has genuinely been fully performed and does not automatically treat a 12-month membership as fully performed during its opening days.",
  },
  {
    heading: "Third-party deposits, bookings and professional retainers",
    body: "Travel, accommodation, tickets, venues, security, advisers, specialists and other third parties may impose their own cancellation and refund terms. Where, at your authority, money has been committed to a third party, those sums may be non-refundable in whole or in part under the third party's lawful terms. We tell you material cancellation exposure before commitment where reasonably practicable and pass on a recovery we actually receive for you. Ending Montvelle membership does not itself cancel or unwind a separate supplier contract, and GSM is not required to fund a supplier refund from its own resources while the supplier, insurer, bank or other recovery route remains outstanding.",
  },
  {
    heading: "Refunds during a valid statutory cancellation period",
    body: "Where a statutory cancellation right is validly exercised, GSM will return the amount legally due without undue delay and within the deadline required by the applicable law, ordinarily no later than 14 days after being informed for UK/EU distance-service cancellation. Any lawful deduction for services begun at your separate express request is applied first. Because Montvelle membership is paid by bank transfer, refunds are normally returned by transfer to the originating account where practical and lawful unless another method is agreed. GSM does not charge a cancellation refund fee, although sanctions, court orders or other law may prevent or delay payment where making it would itself be unlawful.",
  },
  {
    heading: "After cooling-off: the 12-month annual commitment stands",
    body: "Once every applicable statutory cooling-off period has expired, Montvelle membership remains a fixed 12-month annual commitment paid in advance. It is not converted into a monthly subscription by non-use. A Member may ask us to stop providing or making the service available before the term ends, but voluntary early cancellation, non-use, dissatisfaction, a change of mind, or a change in personal, family, business, financial, travel or residence circumstances does not create a contractual right to a refund, credit, pause or pro-rata repayment of the annual Membership Fee. To the fullest extent permitted by law, admission/onboarding amounts are also non-refundable once the relevant work has been performed or committed. Mandatory law always prevails.",
  },
  {
    heading: "Narrow contractual exceptions after cooling-off",
    body: "The Membership Agreement defines the limited contractual exceptions to the no-voluntary-refund rule. These include an express term in the Membership Schedule, a refund required by mandatory law, or defined cases where GSM terminates an active membership for convenience without Member fault or permanently withdraws substantially all core Montvelle membership services without a reasonable substitute. In those cases, the contractual remedy is limited as stated in the Membership Agreement, ordinarily to the unearned pro-rata portion of the annual Membership Fee from the effective termination date. Admission/onboarding already earned and authorised or non-recoverable third-party costs remain excluded to the extent permitted by law.",
  },
  {
    heading: "Suspension or termination caused by the Member",
    body: "Where access or membership is suspended or terminated because of Member breach, fraud, misconduct, non-payment, payment reversal, sanctions/compliance, serious confidentiality or safety concerns, or another reason attributable to the Member, that action does not create a contractual refund, credit or pro-rata repayment right after the cooling-off period, subject to mandatory law. Separate supplier commitments remain payable according to their lawful terms.",
  },
  {
    heading: "Renewals",
    body: "Montvelle membership does not automatically renew at launch. A renewal becomes binding only through the renewal process described in the Membership Agreement. If Montvelle later introduces an automatic or subscription-renewal mechanism, any mandatory pre-renewal notice, renewal reminder, cancellation method or renewal cooling-off right then required by applicable law will apply and the legal documents and operational process must be updated before that mechanism is used.",
  },
  {
    heading: "How to cancel",
    body: "You may exercise a cancellation right by making a clear statement that you wish to cancel; use of the model form is optional. Submit the statement through Contact Montvelle using the category 'Cancellation', or use the formal cancellation contact method stated in your Membership Schedule or membership correspondence. Include enough information for us to identify the contract, but do not send passwords or unnecessary sensitive information. Keep the submission confirmation or other evidence of when you sent the notice. Where mandatory law treats a notice sent within the statutory period as timely even if received later, that rule applies.",
  },
  {
    heading: "Durable copy and evidence",
    body: "At or promptly after contract conclusion, GSM provides the Membership Schedule, applicable contractual documents, cancellation information and required confirmation on paper or another durable medium as required by applicable law. Early-start requests, required acknowledgements and acceptance records should also be retained in a durable, reproducible form. You should keep these records. You may request another copy through Contact Montvelle. GSM retains evidence of the version accepted and the legally relevant contract and cancellation records for the period required by law and the Privacy Notice.",
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
        "To: Global Solutions Management LLC (Montvelle) — submitted through the authorised Montvelle cancellation route",
        "",
        "I hereby give notice that I cancel my contract for the supply of the following service:",
        "Montvelle membership (including any applicable admission/onboarding component).",
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
          <h1 className="font-display text-5xl md:text-6xl">Cancellation Rights</h1>

          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {legalUpdatedLine("cancellationRights")}
          </p>
          <p className="mt-6 text-sm leading-8 text-muted-foreground">
            This page explains statutory cooling-off rights where they apply, Montvelle&apos;s fixed annual
            commitment after those rights expire, what happens if you ask us to begin work early, and how
            to submit a cancellation instruction. It should be read with the{" "}
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
              Complete, copy, and submit through an authorised cancellation route
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              Use of the model form is optional. Fill in what is relevant, copy the statement, then submit
              it through Contact Montvelle with the category &ldquo;Cancellation&rdquo; or through the formal
              cancellation route stated in your Membership Schedule or membership correspondence.
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
                <Link to="/contact">Open Contact Montvelle</Link>
              </Button>
            </div>
          </div>

          <LegalContactCta prompt="Cancellation instructions, refund questions and requests for a durable copy of your contract are handled through Contact Montvelle and any formal cancellation route stated in your membership documents." />
        </div>
      </Container>
    </section>
  );
}
