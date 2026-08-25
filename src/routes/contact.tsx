import { type FormEvent, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { TurnstileGate } from "@/components/security/TurnstileGate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/config/site";
import {
  submitContactIntake,
  type ContactCategory,
} from "@/lib/applicationIntake";

const categories: ContactCategory[] = [
  "Membership",
  "Privacy / data request",
  "Legal / formal notice",
  "Cancellation",
  "Supplier / partner",
  "Accessibility",
  "Other",
];

const routingNotes: Record<ContactCategory, string> = {
  Membership: "Routed to the membership team.",
  "Privacy / data request": "Routed to the team responsible for data protection. We may need to verify your identity before acting on a rights request.",
  "Legal / formal notice": "Formal notices are routed to the legal contact for Global Solutions Management LLC.",
  Cancellation: "Routed to membership administration and treated as a cancellation instruction from the date and time of submission.",
  "Supplier / partner": "Routed to partner operations. This is a business enquiry route, not a membership route.",
  Accessibility: "Routed to the team responsible for the digital experience.",
  Other: "Routed to the appropriate team.",
};

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact Montvelle — ${site.name}` },
      { name: "description", content: "Secure contact route for membership, privacy requests, formal legal notices, cancellation, partner enquiries and accessibility." },
      { property: "og:title", content: `Contact Montvelle — ${site.name}` },
      { property: "og:description", content: "A single secure form for membership, privacy, legal, cancellation, partner and accessibility enquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [category, setCategory] = useState<ContactCategory>("Membership");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ reference: string; mode: "production" | "preview" } | null>(null);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);
    const formElement = event.currentTarget;
    const form = new FormData(formElement);

    try {
      const outcome = await submitContactIntake(
        {
          category,
          name: String(form.get("name") ?? "").trim(),
          contact: String(form.get("contact") ?? "").trim(),
          country: String(form.get("country") ?? "").trim(),
          message: String(form.get("message") ?? "").trim(),
          acknowledgedPrivacy: form.get("privacy") === "on",
          website: String(form.get("website") ?? "").trim(),
        },
        turnstileToken,
      );
      setResult(outcome);
      setTurnstileToken("");
      formElement.reset();
    } catch (cause) {
      const code = cause instanceof Error ? cause.message : "SUBMISSION_FAILED";
      setError(
        code === "SECURITY_CHECK_REQUIRED"
          ? "Please complete the security check and try again."
          : "We could not send your message just now. Please try again shortly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-foreground py-20 text-background md:py-28">
        <Container>
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Contact</p>
            <h1 className="mt-6 max-w-[14ch] font-display text-6xl leading-[0.94] md:text-7xl">
              One private route in.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/72">
              Montvelle does not publish an email address. Membership questions, privacy and data
              requests, formal legal notices, cancellation instructions, partner enquiries and
              accessibility feedback all come through this form and are routed to the right team.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-foreground/15 bg-linen p-6 md:p-7">
                <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">
                  How this is handled
                </p>
                <h2 className="mt-4 font-display text-3xl leading-tight">Routed, not broadcast</h2>
                <p className="mt-4 text-xs leading-6 text-muted-foreground">
                  Choose the category that fits best. We use it to route your message internally and
                  to apply the right handling standard — a privacy rights request and a formal notice
                  are not treated the same way.
                </p>
                <p className="mt-4 text-xs leading-6 text-muted-foreground">
                  Personal information submitted here is handled under our{" "}
                  <Link to="/privacy" className="underline underline-offset-2">Privacy Notice</Link>.
                </p>
              </div>
              <div className="mt-4 border border-foreground/15 bg-card p-5">
                <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-oxblood">
                  Related documents
                </p>
                <div className="mt-3 grid gap-2 text-xs text-muted-foreground">
                  <Link to="/membership-agreement" className="underline underline-offset-2">Membership Agreement</Link>
                  <Link to="/terms" className="underline underline-offset-2">Website Terms</Link>
                  <Link to="/cancellation" className="underline underline-offset-2">Cancellation Rights</Link>
                  <Link to="/supplier-agreement" className="underline underline-offset-2">Supplier &amp; Partner Agreement</Link>
                </div>
              </div>
            </aside>

            <div>
              {result ? (
                <div className="border border-foreground/15 bg-card p-7 md:p-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-oxblood">
                    Message recorded
                  </p>
                  <h2 className="mt-4 font-display text-5xl leading-[0.98]">Thank you.</h2>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">
                    Your reference is <strong>{result.reference}</strong>. Please keep it — it
                    identifies your message without exposing any personal detail.
                  </p>
                  {result.mode === "preview" ? (
                    <p className="mt-5 border border-bronze/40 bg-accent/30 p-4 text-xs leading-6 text-foreground">
                      Preview only. Production message delivery is not yet enabled, so this message
                      has been stored in this browser and has not been transmitted to Montvelle. If
                      your enquiry is time-critical, please use the contact route given in your
                      application or membership correspondence.
                    </p>
                  ) : null}
                  <Button variant="outline" className="mt-7 rounded-none" onClick={() => setResult(null)}>
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={submit} className="border border-foreground/15 bg-card p-6 md:p-9">
                  <fieldset>
                    <legend className="text-[9px] font-semibold uppercase tracking-[0.2em] text-oxblood">
                      What is this about?
                    </legend>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {categories.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setCategory(option)}
                          aria-pressed={category === option}
                          className={`border px-4 py-2 text-xs transition-colors ${category === option ? "border-oxblood bg-oxblood text-oxblood-foreground" : "border-foreground/20 text-muted-foreground hover:border-foreground/40"}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                    <p className="mt-3 text-[11px] leading-6 text-muted-foreground">{routingNotes[category]}</p>
                  </fieldset>

                  <div className="mt-7 grid gap-5 border-t border-foreground/12 pt-7 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your name</Label>
                      <Input id="name" name="name" required className="rounded-none" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact">How should we reply?</Label>
                      <Input id="contact" name="contact" required placeholder="Email or phone" className="rounded-none" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="country">Country of residence</Label>
                      <Input id="country" name="country" required className="rounded-none" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="message">Your message</Label>
                      <Textarea id="message" name="message" required rows={7} className="rounded-none" placeholder="Please avoid including highly sensitive detail in a first message." />
                    </div>
                  </div>

                  <label className="mt-7 flex gap-3 border-t border-foreground/12 pt-7 text-[11px] leading-6 text-muted-foreground">
                    <input type="checkbox" name="privacy" required className="mt-1 h-3.5 w-3.5 shrink-0 accent-[#7b2230]" />
                    <span>
                      I understand my information will be handled in accordance with the{" "}
                      <Link to="/privacy" className="underline underline-offset-2">Privacy Notice</Link>, and
                      that Montvelle may need to verify my identity before acting on a rights request.
                    </span>
                  </label>

                  <div className="mt-6 space-y-6">
                    <div className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
                      <Label htmlFor="website">Leave blank</Label>
                      <Input id="website" name="website" tabIndex={-1} autoComplete="off" />
                    </div>
                    <TurnstileGate action="contact" onToken={setTurnstileToken} />
                  </div>

                  {error ? (
                    <p className="mt-5 border border-oxblood/30 bg-oxblood/5 p-3 text-xs leading-6 text-oxblood" role="alert">
                      {error}
                    </p>
                  ) : null}

                  <Button type="submit" size="lg" disabled={submitting} className="mt-8 w-full rounded-none bg-oxblood">
                    {submitting ? "Sending…" : "Send to Montvelle"}
                  </Button>

                  {!applicationIntakeEnabled() ? (
                    <p className="mt-4 text-center text-[10px] leading-5 text-muted-foreground">
                      Preview build: production message delivery is not yet enabled.
                    </p>
                  ) : null}
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
