import { FormEvent, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, LockKeyhole } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/config/site";

export const Route = createFileRoute("/apply")({
  head: () => ({
    meta: [
      { title: `${site.ctaLabel} — ${site.name}` },
      { name: "description", content: `Apply for membership of ${site.name}, a private ${site.location} community.` },
      { property: "og:title", content: `${site.ctaLabel} — ${site.name}` },
      { property: "og:description", content: `Express interest in membership of ${site.name}.` },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    if (typeof window !== "undefined") {
      const form = new FormData(event.currentTarget);
      const record = Object.fromEntries(form.entries());
      const existing = JSON.parse(window.localStorage.getItem("project-table-applications") ?? "[]");
      window.localStorage.setItem("project-table-applications", JSON.stringify([...existing, { ...record, submittedAt: new Date().toISOString() }]));
    }
    window?.scrollTo?.({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="py-16 md:py-24">
      <Container>
        {submitted ? (
          <div className="mx-auto max-w-2xl border border-border bg-card p-7 text-center md:p-12">
            <CheckCircle2 className="mx-auto h-6 w-6 text-bronze" />
            <p className="mt-6 eyebrow text-bronze">Application received</p>
            <h1 className="mt-4 font-display text-5xl">Every application is personally reviewed.</h1>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-muted-foreground">We are building a small founding community and will contact you if there is a credible fit for the current room. No automated score makes the admission decision.</p>
            <Button className="mt-7 rounded-none" variant="outline" onClick={() => setSubmitted(false)}>Return to application</Button>
          </div>
        ) : (
          <>
            <SectionHeading eyebrow="Membership" title="Request a seat" description="Tell us who you are, what you are responsible for and what you would genuinely contribute to the room. We are interested in judgement, trajectory and character — not a public display of wealth." />

            <form className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]" onSubmit={submit}>
              <div className="space-y-8 border border-border bg-card p-5 md:p-8">
                <fieldset>
                  <legend className="font-display text-3xl">You</legend>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <Field label="Full name" name="name" required />
                    <Field label="Email" name="email" type="email" required />
                    <Field label="Phone" name="phone" />
                    <Field label="City" name="city" required />
                    <Field label="Role / title" name="role" required />
                    <Field label="Organisation" name="organisation" required />
                  </div>
                  <div className="mt-5 space-y-2">
                    <Label htmlFor="category">Membership category</Label>
                    <select id="category" name="category" required className="h-10 w-full border border-input bg-background px-3 text-sm">
                      <option value="">Select one</option>
                      <option>Founder / Business Owner</option>
                      <option>Family Enterprise Principal</option>
                      <option>Investor / Family Office</option>
                      <option>Trusted Adviser</option>
                      <option>Philanthropy / Impact Leader</option>
                    </select>
                  </div>
                  <Area label="Short professional biography" name="bio" rows={4} required />
                </fieldset>

                <fieldset className="border-t border-border pt-8">
                  <legend className="font-display text-3xl">The room</legend>
                  <Area label="What are you building or responsible for?" name="building" rows={4} required />
                  <Area label="Why do you want to join?" name="why" rows={4} required />
                  <Area label="What can you contribute to other members?" name="contribution" rows={4} required />
                  <Area label="What do you want help thinking through?" name="challenge" rows={4} required />
                </fieldset>

                <fieldset className="border-t border-border pt-8">
                  <legend className="font-display text-3xl">Context</legend>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    <Field label="Areas of expertise" name="expertise" placeholder="AI, governance, health, investment…" />
                    <Field label="Impact interests" name="impact" placeholder="Health, education, climate…" />
                    <Field label="Who referred you?" name="referral" placeholder="Optional" />
                    <Field label="LinkedIn or website" name="link" placeholder="Optional" />
                  </div>
                </fieldset>

                <label className="flex items-start gap-3 border-t border-border pt-6 text-sm leading-7">
                  <input type="checkbox" name="principles" required className="mt-1.5" />
                  <span>I understand that confidentiality and no-solicitation are membership principles, and that membership does not grant permission to harvest member data or pitch the community.</span>
                </label>

                <Button type="submit" size="lg" className="rounded-none px-8">Submit application</Button>
              </div>

              <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
                <div className="border border-border bg-foreground p-6 text-background">
                  <LockKeyhole className="h-5 w-5 text-bronze" />
                  <p className="mt-7 eyebrow text-background/60">What we do not ask for here</p>
                  <ul className="mt-5 space-y-3 text-sm leading-6 text-background/75">
                    <li>Net worth</li><li>Bank statements</li><li>Trust documents</li><li>Children's details</li><li>Home address</li>
                  </ul>
                  <p className="mt-5 border-t border-background/20 pt-5 text-xs leading-6 text-background/60">If verification is later required for a specific membership type, it should be handled privately and proportionately — never displayed to other members.</p>
                </div>
                <div className="border border-border bg-card p-5"><p className="eyebrow text-bronze">Founding stage</p><p className="mt-3 text-sm leading-7 text-muted-foreground">Applications are being curated manually while the first London Tables are formed. The goal is a strong room before a large membership number.</p></div>
              </aside>
            </form>
          </>
        )}
      </Container>
    </section>
  );
}

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return <div className="space-y-2"><Label htmlFor={name}>{label}</Label><Input id={name} name={name} type={type} required={required} placeholder={placeholder} className="rounded-none" /></div>;
}

function Area({ label, name, rows, required }: { label: string; name: string; rows: number; required?: boolean }) {
  return <div className="mt-5 space-y-2"><Label htmlFor={name}>{label}</Label><Textarea id={name} name={name} rows={rows} required={required} className="rounded-none" /></div>;
}
