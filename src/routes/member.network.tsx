import { createFileRoute, Link } from "@tanstack/react-router";

import { PageIntro } from "@/components/private/PrivateShell";

export const Route = createFileRoute("/member/network")({ component: CommunityHubPage });

function CommunityHubPage() {
  const rooms = [
    [
      "My Table",
      "Your permanent peer circle, next agenda, confidential challenges and commitments.",
      "/member/table",
    ],
    [
      "Member Community",
      "People in Montvelle, the experience they hold, and why they might be relevant to what you are working on.",
      "/member/community",
    ],
    [
      "Introductions",
      "Ask for a warm introduction with context, a desired outcome and consent on both sides.",
      "/member/introductions",
    ],
    [
      "Ask & Offer",
      "Put a real need or a useful offer in front of the community, without cold outreach.",
      "/member/ask-offer",
    ],
  ] as const;

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Community"
        title="Useful people, with context"
        description="The value is not a list of impressive names. It is knowing who might be relevant, why an introduction makes sense, and whether both sides want it."
      />
      <div className="grid gap-px bg-border md:grid-cols-2">
        {rooms.map(([title, body, to]) => (
          <Link key={title} to={to} className="group bg-card p-6 transition-colors hover:bg-accent">
            <Icon className="h-5 w-5 text-oxblood" />
            <h2 className="mt-7 font-display text-3xl">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
            <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
              Open{" "}
              </span>
          </Link>
        ))}
      </div>
      <section className="border border-border bg-foreground p-6 text-background md:p-8">
        <p className="eyebrow text-background/50">Relationship rule</p>
        <h2 className="mt-4 max-w-4xl font-display text-4xl leading-tight md:text-5xl">
          Consent first. No member list ever moves sideways.
        </h2>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-background/65">
          Profiles exist so members can understand who is in the community. Contact details stay
          private by default, and introductions move through consent and context rather than
          extraction. If the expertise you need sits outside the community, ask us and we will
          source it.
        </p>
        <Link
          to="/member/services"
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold"
        >
          Make a request </Link>
      </section>
    </div>
  );
}
