import { FormEvent, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/member/introductions")({
  component: IntroductionsPage,
});

const statuses = [
  {
    person: "DEMO Member F",
    reason: "Founder-to-chair transition",
    status: "Consent received",
    detail:
      "DEMO Member F is happy to connect. Concierge will send a short contextual introduction today.",
  },
  {
    person: "DEMO Member K",
    reason: "Modernising family-office systems",
    status: "Reviewing",
    detail: "Concierge is checking relevance and whether DEMO Member K has capacity for this conversation.",
  },
  {
    person: "Healthcare operator · UAE",
    reason: "International launch experience",
    status: "Introduced",
    detail: "Both sides agreed. Introduction made on 12 August.",
  },
];

export default function IntroductionsPage() {
  const [submitted, setSubmitted] = useState(false);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Concierge introductions"
        title="Context before contact."
        description="Tell us why the connection would be useful. We check fit, ask the other person first and only introduce when both sides want the conversation. No cold DMs and no member list harvesting."
      />

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="border border-border bg-card p-5 md:p-6">
          <div className="flex items-center gap-3">
            <p className="eyebrow">Request an introduction</p>
          </div>

          {submitted ? (
            <div className="mt-7 border-t border-border pt-6">
              <h2 className="mt-4 font-display text-3xl">Request received.</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">
                Concierge will review the context first. If the introduction looks useful, we ask
                the other member privately before sharing anything.
              </p>
              <Button
                className="mt-5 rounded-none"
                variant="outline"
                onClick={() => setSubmitted(false)}
              >
                Make another request
              </Button>
            </div>
          ) : (
            <form onSubmit={submit} className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="person">Who would you like to meet?</Label>
                <Input
                  id="person"
                  required
                  className="rounded-none"
                  placeholder="Member name, role or type of person"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Why this person?</Label>
                <Textarea
                  id="reason"
                  required
                  rows={4}
                  className="rounded-none"
                  placeholder="What makes the connection relevant now?"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outcome">What would a useful outcome look like?</Label>
                <Textarea
                  id="outcome"
                  rows={3}
                  className="rounded-none"
                  placeholder="Advice, a specific conversation, learning, collaboration…"
                />
              </div>
              <Button type="submit" className="rounded-none">
                Send to concierge
              </Button>
            </form>
          )}
        </section>

        <section className="border border-border bg-card">
          <div className="border-b border-border p-5 md:p-6">
            <p className="eyebrow text-bronze">Your requests</p>
            <h2 className="mt-2 font-display text-3xl">Introduction desk</h2>
          </div>
          <div>
            {statuses.map((item) => (
              <div
                key={item.person}
                className="grid gap-4 border-b border-border p-5 last:border-b-0 md:grid-cols-[1fr_auto] md:p-6"
              >
                <div>
                  <p className="text-sm font-medium">{item.person}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.reason}</p>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
                <div className="flex items-start gap-2 text-xs">
                  {item.status === "Introduced" || item.status === "Consent received" ? (
                    ) : (
                    )}
                  {item.status}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="flex items-start gap-3 border border-border bg-accent/25 p-4 text-xs leading-6 text-muted-foreground">
        Introductions are part of the community service, not inventory for sale. Members and
        advisers cannot pay to be placed in front of another member.
      </div>
    </div>
  );
}
