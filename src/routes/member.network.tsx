import { createFileRoute, Link } from "@tanstack/react-router";

import { PageIntro } from "@/components/private/PrivateShell";
import { BuildCircleCta, ExpertCouncilCta } from "@/components/private/RequestCtas";

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
        eyebrow="Community · Your circle"
        title="Build the circle around your life, not a list of names"
        description="Membership does not hand you everybody and call it a network. The useful circle around a household is chosen over time — some of it from within Montvelle, some of it found for you outside, and some of it people you already trust who we bring into a particular matter."
      />

      <BuildCircleCta />

      <div className="grid gap-px bg-border md:grid-cols-2">
        {rooms.map(([title, body, to]) => (
          <Link key={title} to={to} className="group bg-card p-6 transition-colors hover:bg-accent">
            <h2 className="mt-7 font-display text-3xl">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
            <span className="mt-7 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
              Open
            </span>
          </Link>
        ))}
      </div>

      <section className="grid gap-px border border-border bg-border md:grid-cols-3">
        {[
          [
            "Inside Montvelle",
            "Consent-led introductions to members whose experience is genuinely relevant. Nothing browsable, nothing broadcast.",
          ],
          [
            "Found for you",
            "Ask us to find people useful to a specific goal — professionals, peers or organisations — and we go and look, worldwide.",
          ],
          [
            "Someone you already trust",
            "We can invite a person you name into one matter or circle. They do not become a member and receive no general access.",
          ],
        ].map(([title, note]) => (
          <article key={title} className="bg-card p-6">
            <p className="text-[9px] uppercase tracking-[0.16em] text-oxblood">{title}</p>
            <p className="mt-3 text-xs leading-6 text-muted-foreground">{note}</p>
          </article>
        ))}
      </section>

      <ExpertCouncilCta tone="dark" />

      <section className="border border-border bg-card p-6 md:p-8">
        <p className="eyebrow text-oxblood">Relationship rule</p>
        <h2 className="mt-4 max-w-4xl font-display text-3xl leading-tight md:text-4xl">
          Consent first. No member list ever moves sideways.
        </h2>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground">
          Profiles exist so members can understand who is in the community. Contact details stay
          private by default, and introductions move through consent and context rather than
          extraction. Gatherings remain where the wider membership meets naturally; the personal
          circle around your household is curated deliberately.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/member/events"
            className="inline-flex items-center border border-border px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground"
          >
            See gatherings
          </Link>
          <Link
            to="/member/services"
            className="inline-flex items-center border border-foreground bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-oxblood"
          >
            Find someone useful
          </Link>
        </div>
      </section>
    </div>
  );
}
