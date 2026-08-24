import { Link } from "@tanstack/react-router";

import { conciergeProofBand } from "@/data/networkProof";

export type ConciergeNetworkSummaryProps = {
  statCount?: number;
};

/**
 * Private-side concierge sourcing capability summary.
 * This is not a supplier directory: members ask for an outcome and Montvelle
 * uses the internal sourcing universe to find and coordinate the right route.
 */
export function ConciergeNetworkSummary({ statCount = 4 }: ConciergeNetworkSummaryProps) {
  const stats = conciergeProofBand.stats.slice(0, statCount);
  const verticals = conciergeProofBand.verticals ?? [];

  return (
    <section className="border border-border bg-card p-6 md:p-7">
      <p className="eyebrow text-oxblood">Global concierge & sourcing</p>
      <h2 className="mt-5 max-w-3xl font-display text-3xl leading-tight">
        A world of access, already mapped.
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        Montvelle can source and coordinate the practical, personal and exceptional requests around
        an international life through a 1,000-organisation global supplier universe.
      </p>

      <dl className="mt-7 grid grid-cols-2 gap-x-8 gap-y-6 border-y border-border py-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block font-display text-3xl leading-none">{stat.value}</span>
              <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      {verticals.length > 0 ? (
        <div className="mt-7">
          <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-oxblood">
            What Montvelle can arrange
          </p>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-6">
            {verticals.map((vertical) => (
              <li key={vertical} className="border-t border-border py-2.5 text-xs leading-5 text-muted-foreground">
                {vertical}
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <Link
        to="/member/services"
        className="mt-7 inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-oxblood"
      >
        Ask Montvelle to arrange something
      </Link>

      <p className="mt-5 max-w-3xl text-[11px] leading-5 text-muted-foreground/80">
        Tell us the outcome, destination, timing and constraints. We find the right route, make the
        enquiries and coordinate the next step.
      </p>
      <p className="mt-3 max-w-3xl text-[10px] leading-4 text-muted-foreground/70">
        {conciergeProofBand.qualifier}
      </p>
    </section>
  );
}
