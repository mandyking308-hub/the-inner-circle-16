import { type FormEvent, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, CheckCircle2, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { TurnstileGate } from "@/components/security/TurnstileGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { luxuryImages } from "@/data/luxuryImages";
import { loadPartnerApplications, savePartnerApplications, type PartnerApplication } from "@/data/partnerApplicationStore";
import { partnerQualification } from "@/data/qualification";
import { submitPartnerIntake } from "@/lib/applicationIntake";
import { parseReferences } from "@/lib/applicationReferences";
import { TwoReferences } from "@/components/apply/TwoReferences";
import { site } from "@/config/site";

export const Route = createFileRoute("/partner-application")({
  head: () => ({ meta: [{ title: `Trusted Partner application — ${site.name}` }, { name: "description", content: "Apply to be considered for the Montvelle Trusted Partner network." }] }),
  component: PartnerApplicationPage,
});

function PartnerApplicationPage() {
  const [submitted, setSubmitted] = useState<PartnerApplication | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const parsedReferences = parseReferences(form);
    if (!parsedReferences.ok) {
      setError(parsedReferences.message);
      setSubmitting(false);
      return;
    }
    const input = {
      contactName: String(form.get("contactName") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      firm: String(form.get("firm") ?? "").trim(),
      websiteUrl: String(form.get("websiteUrl") ?? "").trim(),
      category: String(form.get("category") ?? "").trim(),
      locations: String(form.get("locations") ?? "").trim(),
      regulatoryStatus: String(form.get("regulatoryStatus") ?? "").trim(),
      familyExperience: String(form.get("familyExperience") ?? "").trim(),
      whyRelevant: String(form.get("whyRelevant") ?? "").trim(),
      memberBenefit: String(form.get("memberBenefit") ?? "").trim(),
      references: parsedReferences.references,
      referenceConsent: true as const,
      conflicts: String(form.get("conflicts") ?? "").trim(),
      website: String(form.get("website") ?? "").trim(),
    };

    try {
      const result = await submitPartnerIntake(input, turnstileToken, (application) => savePartnerApplications([application, ...loadPartnerApplications()]));
      const application: PartnerApplication = {
        id: result.reference,
        submittedAt: new Date().toISOString(),
        status: "New",
        contactName: input.contactName,
        email: input.email,
        firm: input.firm,
        category: input.category,
        locations: input.locations,
        regulatoryStatus: input.regulatoryStatus,
        familyExperience: input.familyExperience,
        whyRelevant: input.whyRelevant,
        memberBenefit: input.memberBenefit,
        references: input.references,
        referenceConsent: input.referenceConsent,
        conflicts: input.conflicts,
      };
      setSubmitted(application);
      setTurnstileToken("");
      formElement.reset();
    } catch (cause) {
      const code = cause instanceof Error ? cause.message : "SUBMISSION_FAILED";
      setError(code === "SECURITY_CHECK_REQUIRED" ? "Please complete the partner application security check and try again." : code.startsWith("REFERENCE") ? "Please complete both references and confirm you have permission to share their details." : "We could not send the application just now. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative min-h-[620px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="Trusted advisers in a private London setting" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/80 to-foreground/18" />
        <Container className="relative flex min-h-[620px] items-center py-20">
          <div className="max-w-3xl"><p className="eyebrow text-bronze">Trusted Partner application</p><h1 className="mt-6 max-w-[10ch] font-display text-6xl leading-[0.93] md:text-8xl">Earn the recommendation, not access to the list.</h1><p className="mt-7 max-w-2xl text-base leading-8 text-background/72">The partner network is for firms that understand complex families, collaborate well with other advisers and are comfortable being judged on the usefulness of their work.</p></div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-foreground/15 bg-linen p-6 md:p-7"><ShieldCheck className="h-5 w-5 text-oxblood" /><h2 className="mt-6 font-display text-3xl">What we screen for</h2><div className="mt-5 space-y-4">{partnerQualification.map((item) => <div key={item.key} className="border-t border-foreground/12 pt-4"><p className="text-sm font-semibold">{item.label}</p><p className="mt-1 text-xs leading-6 text-muted-foreground">{item.question}</p></div>)}</div></div>
              <div className="mt-4 border border-foreground/15 bg-card p-5"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-oxblood">A separate door</p><p className="mt-2 text-xs leading-6 text-muted-foreground">Trusted Partner approval means the firm has earned consideration for relevant briefs. It does not create a member seat, private-directory access or a right to enter confidential Tables.</p></div>
            </aside>

            <div>
              {submitted ? (
                <div className="border border-foreground/15 bg-card p-7 md:p-10"><CheckCircle2 className="h-6 w-6 text-oxblood" /><p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-oxblood">Application received</p><h2 className="mt-3 font-display text-5xl">Thank you, {submitted.contactName.split(" ")[0] || "there"}.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Your reference is <strong>{submitted.id}</strong>. The next step is screening for relevance, collaboration and fit with current member needs, including a discreet word with both references you provided. Partner approval never creates automatic access to member identities or confidential Tables.</p><Button asChild variant="outline" className="mt-7 rounded-none"><Link to="/partners">Return to partner information <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
              ) : (
                <form onSubmit={submit} className="border border-foreground/15 bg-card p-6 md:p-9">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2"><Label htmlFor="contactName">Contact name</Label><Input id="contactName" name="contactName" required className="rounded-none" /></div>
                    <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required className="rounded-none" /></div>
                    <div className="space-y-2"><Label htmlFor="firm">Firm / organisation</Label><Input id="firm" name="firm" required className="rounded-none" /></div>
                    <div className="space-y-2"><Label htmlFor="websiteUrl">Website</Label><Input id="websiteUrl" name="websiteUrl" type="url" placeholder="https://" className="rounded-none" /></div>
                    <div className="space-y-2"><Label htmlFor="category">Primary expertise</Label><Input id="category" name="category" required placeholder="e.g. Private client law, education, cyber" className="rounded-none" /></div>
                    <div className="space-y-2"><Label htmlFor="locations">Jurisdictions / locations served</Label><Input id="locations" name="locations" required className="rounded-none" /></div>
                    <div className="space-y-2 md:col-span-2"><Label htmlFor="regulatoryStatus">Regulatory / professional status</Label><Input id="regulatoryStatus" name="regulatoryStatus" placeholder="Where relevant" className="rounded-none" /></div>
                  </div>
                  <div className="mt-7 space-y-6 border-t border-foreground/12 pt-7">
                    <div className="space-y-2"><Label htmlFor="familyExperience">Relevant family / founder experience</Label><Textarea id="familyExperience" name="familyExperience" required rows={4} className="rounded-none" /></div>
                    <div className="space-y-2"><Label htmlFor="whyRelevant">Why would members genuinely need you?</Label><Textarea id="whyRelevant" name="whyRelevant" required rows={4} className="rounded-none" /></div>
                    <div className="space-y-2"><Label htmlFor="memberBenefit">What useful member benefit could you offer?</Label><Textarea id="memberBenefit" name="memberBenefit" rows={3} className="rounded-none" placeholder="Priority triage, clinic, preferred service level or another genuine benefit" /></div>
                    <div className="space-y-2"><Label htmlFor="conflicts">Conflicts, referral fees or commercial arrangements</Label><Textarea id="conflicts" name="conflicts" rows={3} className="rounded-none" placeholder="Disclose any model that could influence recommendations or introductions." /></div>
                  </div>
                  <TwoReferences
                    showOrganisation
                    intro="Two references are part of how a firm becomes trusted here. Please give us two people who have worked with you closely enough to speak candidly — ideally one client-side and one professional peer. We approach them discreetly, once, and only in connection with this application."
                    relationshipLabel="How do they know your work?"
                    relationshipPlaceholder="Briefly — the nature of the work and roughly how long you have worked together. Please do not include confidential client detail."
                    consentLabel="I have their permission to share these details, and Montvelle may contact them for assurance and screening purposes."
                  />
                  <div className="mt-7 space-y-6 border-t border-foreground/12 pt-7">
                    <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><Label htmlFor="website">Leave blank</Label><Input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
                    <TurnstileGate action="partner_apply" onToken={setTurnstileToken} />
                  </div>
                  {error ? <p className="mt-5 border border-oxblood/30 bg-oxblood/5 p-3 text-xs leading-6 text-oxblood" role="alert">{error}</p> : null}
                  <Button type="submit" size="lg" disabled={submitting} className="mt-8 w-full rounded-none bg-oxblood">{submitting ? "Sending…" : "Submit partner application"}<ArrowRight className="ml-2 h-4 w-4" /></Button>
                  <p className="mt-4 text-center text-[10px] leading-5 text-muted-foreground"><BadgeCheck className="mr-1 inline h-3 w-3" />Approval is based on relevance and standards. Payment does not purchase membership or member contact data.</p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
