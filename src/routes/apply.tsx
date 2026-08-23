import { type FormEvent, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { TurnstileGate } from "@/components/security/TurnstileGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { loadApplications, saveApplications, type MembershipApplication } from "@/data/applicationStore";
import { luxuryImages } from "@/data/luxuryImages";
import { submitMembershipIntake } from "@/lib/applicationIntake";
import { parseReferences } from "@/lib/applicationReferences";
import { TwoReferences } from "@/components/apply/TwoReferences";
import { site } from "@/config/site";

export const Route = createFileRoute("/apply")({
  validateSearch: (search: Record<string, unknown>): { membership?: "Individual" | "Family" } =>
    search["membership"] === "Family" ? { membership: "Family" } : search["membership"] === "Individual" ? { membership: "Individual" } : {},
  head: () => ({ meta: [{ title: `${site.ctaLabel} — ${site.name}` }, { name: "description", content: `Request membership of ${site.name}.` }] }),
  component: ApplyPage,
});

function ApplyPage() {
  const { membership: preselectedMembership = "Individual" } = Route.useSearch();
  const [submitted, setSubmitted] = useState<MembershipApplication | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const membership = String(form.get("membership") ?? "Individual") === "Family" ? "Family" : "Individual";
    const parsedReferences = parseReferences(form);
    if (!parsedReferences.ok) {
      setError(parsedReferences.message);
      setSubmitting(false);
      return;
    }
    const input = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      location: String(form.get("location") ?? "").trim(),
      profile: String(form.get("profile") ?? "").trim(),
      membership: membership as "Individual" | "Family",
      building: String(form.get("building") ?? "").trim(),
      complicated: String(form.get("complicated") ?? "").trim(),
      contribution: String(form.get("contribution") ?? "").trim(),
      referral: String(form.get("referral") ?? "").trim(),
      website: String(form.get("website") ?? "").trim(),
      references: parsedReferences.references,
      referenceConsent: true as const,
    };

    try {
      const result = await submitMembershipIntake(input, turnstileToken, (application) => saveApplications([application, ...loadApplications()]));
      const application: MembershipApplication = {
        id: result.reference,
        submittedAt: new Date().toISOString(),
        status: "New",
        name: input.name,
        email: input.email,
        location: input.location,
        profile: input.profile,
        membership: input.membership,
        building: input.building,
        complicated: input.complicated,
        contribution: input.contribution,
        referral: input.referral,
        references: input.references,
        referenceConsent: input.referenceConsent,
      };
      setSubmitted(application);
      setTurnstileToken("");
      formElement.reset();
    } catch (cause) {
      const code = cause instanceof Error ? cause.message : "SUBMISSION_FAILED";
      setError(code === "SECURITY_CHECK_REQUIRED" ? "Please complete the private application security check and try again." : code.startsWith("REFERENCE") ? "Please complete both references and confirm you have permission to share their details." : "We could not send the application just now. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="relative min-h-[560px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private members table in London" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/78 to-foreground/18" />
        <Container className="relative flex min-h-[560px] items-center py-20">
          <div className="max-w-3xl"><p className="eyebrow text-bronze">Request a seat</p><h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">Tell us what you are building — and what has become complicated.</h1><p className="mt-7 max-w-2xl text-base leading-8 text-background/70">We are more interested in the life behind the title than the title itself. Every application is personally reviewed.</p></div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-foreground/15 bg-linen p-6 md:p-7">
                <LockKeyhole className="h-5 w-5 text-oxblood" />
                <h2 className="mt-6 font-display text-3xl">What happens next?</h2>
                <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground"><p>We read the application for fit, contribution and whether the current community can genuinely be useful to you.</p><p>If there appears to be a fit, the next step is a private conversation — not an automated checkout page.</p><p>Founding membership is deliberately small. Terms are discussed privately after fit has been established.</p></div>
              </div>
              <div className="mt-4 border border-foreground/15 bg-card p-5"><p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-oxblood">Professional firm?</p><p className="mt-2 text-xs leading-6 text-muted-foreground">The Trusted Partner network has a separate screening process and does not create automatic member access.</p><Link to="/partner-application" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold">Partner application <ArrowRight className="h-3.5 w-3.5" /></Link></div>
            </aside>

            <div>
              {submitted ? (
                <div className="border border-foreground/15 bg-card p-7 md:p-10"><CheckCircle2 className="h-6 w-6 text-oxblood" /><p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-oxblood">Application received</p><h2 className="mt-3 font-display text-5xl">Thank you, {submitted.name.split(" ")[0] || "there"}.</h2><p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Your application reference is <strong>{submitted.id}</strong>. Your application now moves into personal review, including a discreet word with the two references you gave us. If there appears to be a fit, the next step is a conversation.</p><Button asChild variant="outline" className="mt-8 rounded-none"><Link to="/journal">Read the Journal <ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
              ) : (
                <form onSubmit={submit} className="border border-foreground/15 bg-card p-6 md:p-9">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" required className="rounded-none" /></div>
                    <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required className="rounded-none" /></div>
                    <div className="space-y-2"><Label htmlFor="location">Where does life happen?</Label><Input id="location" name="location" placeholder="e.g. London / Dubai / New York" className="rounded-none" /></div>
                    <div className="space-y-2"><Label htmlFor="profile">What best describes you?</Label><Input id="profile" name="profile" placeholder="Founder, family business, investor, principal..." className="rounded-none" /></div>
                    <div className="space-y-2 md:col-span-2"><Label htmlFor="membership">Which relationship seems most relevant?</Label><select id="membership" name="membership" defaultValue={preselectedMembership} className="h-10 w-full rounded-none border border-input bg-background px-3 text-sm"><option>Individual</option><option>Family</option></select><p className="text-[11px] leading-6 text-muted-foreground">Individual — one approved principal member. Family — a household relationship for approved family members with independent access where agreed. The same Montvelle standard applies to both; household composition and commercial terms are confirmed after review.</p></div>
                  </div>
                  <div className="mt-7 space-y-6 border-t border-foreground/12 pt-7">
                    <div className="space-y-2"><Label htmlFor="building">What are you building or responsible for?</Label><Textarea id="building" name="building" rows={4} required className="rounded-none" placeholder="The business, family enterprise, investment work or responsibility that matters most right now." /></div>
                    <div className="space-y-2"><Label htmlFor="complicated">What has become complicated?</Label><Textarea id="complicated" name="complicated" rows={5} required className="rounded-none" placeholder="A move, succession, schools, advisers, growth, family governance, time, access — tell us the real version." /></div>
                    <div className="space-y-2"><Label htmlFor="contribution">What would you bring to the room?</Label><Textarea id="contribution" name="contribution" rows={4} required className="rounded-none" placeholder="Experience, judgement, relationships, a sector you know deeply, willingness to mentor or something else useful." /></div>
                    <div className="space-y-2"><Label htmlFor="referral">How did you hear about us?</Label><Input id="referral" name="referral" placeholder="Member introduction, event, search, other" className="rounded-none" /></div>
                  </div>
                  <TwoReferences
                    intro="Everyone who joins is introduced by two people. Please give us two people we may speak to as part of the admission review — someone who knows what you are responsible for, and someone who knows how you are to work alongside. We contact them discreetly, and only once."
                    relationshipLabel="How do you know each other?"
                    relationshipPlaceholder="A sentence is plenty — how long you have known one another and in what context."
                    consentLabel="I have their permission to share these details, and Montvelle may contact them as part of my application review."
                  />
                  <div className="mt-7 space-y-6 border-t border-foreground/12 pt-7">
                    <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true"><Label htmlFor="website">Website</Label><Input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
                    <TurnstileGate action="membership_apply" onToken={setTurnstileToken} />
                  </div>
                  {error ? <p className="mt-5 border border-oxblood/30 bg-oxblood/5 p-3 text-xs leading-6 text-oxblood" role="alert">{error}</p> : null}
                  <Button type="submit" size="lg" disabled={submitting} className="mt-8 w-full rounded-none bg-oxblood">{submitting ? "Sending…" : "Send private application"}<ArrowRight className="ml-2 h-4 w-4" /></Button>
                  <p className="mt-4 text-center text-[10px] leading-5 text-muted-foreground">No payment is taken at application. Submission does not guarantee membership.</p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
