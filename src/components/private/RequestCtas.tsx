import { Link } from "@tanstack/react-router";

/**
 * Expert Councils and circle building are not standing panels or directories.
 * Each one is assembled on request, around a single member's real situation.
 */

export function expertCouncilNeed(topic?: string) {
  const subject = topic?.trim();
  return [
    "Please assemble an Expert Council for me.",
    subject ? `The matter: ${subject}.` : "The matter:",
    "The outcome I am trying to reach:",
    "Where (country / city):",
    "Timing:",
    "Constraints that cannot change:",
    "Anyone already advising me:",
  ].join("\n");
}

export function circleNeed(goal?: string) {
  const subject = goal?.trim();
  return [
    "Please help me build my circle around this.",
    subject ? `The goal: ${subject}.` : "The goal:",
    "The kind of people who would be useful (members, professionals, peers, organisations):",
    "Where:",
    "Timing:",
    "Anyone I already trust who should be brought into this matter:",
  ].join("\n");
}

export function ExpertCouncilCta({
  topic,
  tone = "light",
}: {
  topic?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <section
      className={
        dark
          ? "border border-border bg-foreground p-6 text-background md:p-8"
          : "border border-border bg-card p-6 md:p-8"
      }
    >
      <p className={`eyebrow ${dark ? "text-bronze" : "text-oxblood"}`}>Expert Council</p>
      <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
        Need expertise beyond what is already here? We will assemble a council around it.
      </h2>
      <p
        className={`mt-4 max-w-3xl text-sm leading-7 ${dark ? "text-background/68" : "text-muted-foreground"}`}
      >
        An Expert Council is not a standing committee and there is no panel waiting on a shelf. You
        describe the outcome, the geography, the timing and anything that cannot change. We then
        research worldwide, approach the organisations and individuals who genuinely fit, check them
        properly, and come back with a small considered shortlist — or coordinate the introductions
        ourselves.
      </p>
      <p
        className={`mt-3 max-w-3xl text-xs leading-6 ${dark ? "text-background/50" : "text-muted-foreground"}`}
      >
        A move to Monaco, for example, may need residence counsel, cross-border tax, property,
        schooling, banking, insurance and household logistics. We hold the dependencies between them
        so you are not the project manager. Where a decision warrants it, and only with your consent,
        a chosen expert can be attached to that Decision Room with the minimum information necessary
        — never broad access to you or to Montvelle.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/member/services"
          search={{ need: expertCouncilNeed(topic) }}
          className={`inline-flex items-center border px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
            dark
              ? "border-background/30 text-background hover:bg-background hover:text-foreground"
              : "border-foreground bg-foreground text-background hover:bg-oxblood"
          }`}
        >
          Assemble an Expert Council
        </Link>
        <Link
          to="/member/messages"
          className={`inline-flex items-center border px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] ${
            dark ? "border-background/20 text-background/70" : "border-border text-muted-foreground"
          }`}
        >
          Talk it through first
        </Link>
      </div>
    </section>
  );
}

export function BuildCircleCta({ goal, tone = "light" }: { goal?: string; tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section
      className={
        dark
          ? "border border-border bg-foreground p-6 text-background md:p-8"
          : "border border-border bg-card p-6 md:p-8"
      }
    >
      <p className={`eyebrow ${dark ? "text-bronze" : "text-oxblood"}`}>Your circle</p>
      <h2 className="mt-3 max-w-3xl font-display text-3xl leading-tight md:text-4xl">
        Build the circle around a particular goal.
      </h2>
      <p
        className={`mt-4 max-w-3xl text-sm leading-7 ${dark ? "text-background/68" : "text-muted-foreground"}`}
      >
        Membership is not a club list handed to you on day one. Tell us what you are trying to do —
        a relocation, a business decision, a family question — and we will find people who are
        genuinely useful to it, whether they are Montvelle members, external professionals, peers or
        organisations. You can also ask us to bring someone you already trust into a specific matter;
        they are not made a member and receive no general access.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/member/services"
          search={{ need: circleNeed(goal) }}
          className={`inline-flex items-center border px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition-colors ${
            dark
              ? "border-background/30 text-background hover:bg-background hover:text-foreground"
              : "border-foreground bg-foreground text-background hover:bg-oxblood"
          }`}
        >
          Build my circle
        </Link>
        <Link
          to="/member/introductions"
          className={`inline-flex items-center border px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] ${
            dark ? "border-background/20 text-background/70" : "border-border text-muted-foreground"
          }`}
        >
          Consent-led introductions
        </Link>
      </div>
    </section>
  );
}
