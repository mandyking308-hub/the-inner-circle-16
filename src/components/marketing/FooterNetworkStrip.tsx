import { advisoryProofBand, conciergeProofBand } from "@/data/networkProof";

/** Strongest metric from each network — no repeated lists, no relationship claims. */
const closingStats = [
  advisoryProofBand.stats[0]!,
  advisoryProofBand.stats[1]!,
  conciergeProofBand.stats[0]!,
  conciergeProofBand.stats[1]!,
] as const;

/** A small, restrained selection only — the full sets appear once, higher up the page. */
const closingNames = [
  ...advisoryProofBand.names.slice(0, 3),
  ...conciergeProofBand.names.slice(0, 3),
] as const;

/**
 * Quiet closing reassurance before the footer links: the advisory and concierge
 * capability behind Montvelle, in one compressed band. Names only: no links,
 * logos, contact details or relationship claims.
 */
export function FooterNetworkStrip() {
  return (
    <div className="border-b border-background/12 pb-10">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-end lg:gap-16">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-gold">
            Expertise &amp; access
          </p>
          <h2 className="mt-3 max-w-md font-display text-xl leading-snug md:text-2xl">
            Global expertise and a world of access, quietly behind Montvelle.
          </h2>
        </div>

        <dl className="grid grid-cols-2 gap-x-8 gap-y-5 sm:grid-cols-4">
          {closingStats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-xl leading-none md:text-2xl">
                  {stat.value}
                </span>
                <span className="mt-2 block text-[9px] leading-3 uppercase tracking-[0.16em] text-background/50">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <p className="mt-8 max-w-4xl font-display text-sm leading-7 text-background/50">
        {closingNames.map((name, i) => (
          <span key={name}>
            {name}
            {i < closingNames.length - 1 ? <span className="mx-2.5 text-gold/40">&bull;</span> : null}
          </span>
        ))}
      </p>

      <p className="mt-4 max-w-3xl text-[9px] leading-4 text-background/32">
        Selected organisations are examples of routes within Montvelle&rsquo;s sourcing universe.
        Inclusion does not imply a formal partnership, endorsement, preferred status or guaranteed
        access.
      </p>
    </div>
  );
}
