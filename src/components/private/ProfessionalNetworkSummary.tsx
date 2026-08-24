import { Link } from "@tanstack/react-router";

import { ConciergeNetworkSummary } from "@/components/private/ConciergeNetworkSummary";
import { advisoryProofBand } from "@/data/networkProof";

export type ProfessionalNetworkSummaryProps = {
  /** How many of the shared proof stats to show (editorially restrained). */
  statCount?: number;
};

/**
 * Private-side network capability summaries used on the member dashboard.
 * Neither block is a directory: members ask for an outcome and Montvelle
 * identifies and coordinates the right external route.
 */
export function ProfessionalNetworkSummary({ statCount = 4 }: ProfessionalNetworkSummaryProps) {
  const stats = advisoryProofBand.stats.slice(0, statCount);

  return (
    <div className="grid gap-8">
      <section className="border border-border bg-card p-6 md:p-7">
        <p className="eyebrow text-oxblood">Professional network</p>
        <h2 className="mt-5 max-w-3xl font-display text-3xl leading-tight">
          The right expertise is already within reach.
        </h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground">
          Montvelle can source and coordinate professional organisations worldwide — law, tax,
          private banking, fiduciary services, transactions, risk and specialist advice — assembled
          around the outcome you are working towards rather than a list you have to work through.
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

        <Link
          to="/member/services"
          className="mt-6 inline-flex items-center gap-2 border border-foreground bg-foreground px-5 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-oxblood"
        >
          Ask Montvelle to find the right route
        </Link>

        <p className="mt-5 max-w-3xl text-[11px] leading-5 text-muted-foreground/80">
          You tell us the outcome. We identify and coordinate the route; the professional advice
          remains with the relevant firm.
        </p>
        <p className="mt-3 max-w-3xl text-[10px] leading-4 text-muted-foreground/70">
          {advisoryProofBand.qualifier}
        </p>
      </section>

      <ConciergeNetworkSummary statCount={statCount} />
    </div>
  );
}
