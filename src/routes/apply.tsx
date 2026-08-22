import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

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
      {
        name: "description",
        content: `Express interest in membership of ${site.name}, a private ${site.location} community. Admission is by invitation.`,
      },
      { property: "og:title", content: `${site.ctaLabel} — ${site.name}` },
      {
        name: "og:description",
        content: `Express interest in membership of ${site.name}.`,
      },
    ],
  }),
  component: ApplyPage,
});

function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Membership"
          title={site.ctaLabel}
          description="Tell us briefly who you are and what you are building. Every enquiry is read privately; admission remains by invitation."
        />

        {submitted ? (
          <div className="mt-12 max-w-xl border-t border-border pt-8">
            <p className="font-display text-2xl text-foreground">Thank you.</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Your note has been received. We will be in touch if there is a fit.
            </p>
          </div>
        ) : (
          <form
            className="mt-12 max-w-xl space-y-6 border-t border-border pt-8"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" required className="rounded-none" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required className="rounded-none" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="note">A short note</Label>
              <Textarea id="note" name="note" rows={5} className="rounded-none" />
            </div>
            <Button type="submit" size="lg" className="rounded-none px-8">
              Submit enquiry
            </Button>
          </form>
        )}
      </Container>
    </section>
  );
}
