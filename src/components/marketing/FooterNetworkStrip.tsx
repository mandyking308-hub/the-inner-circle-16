import { advisoryProofBand, conciergeProofBand } from "@/data/networkProof";

type Column = {
  eyebrow: string;
  heading: string;
  stats: readonly { value: string; label: string }[];
  names: readonly string[];
};

/** Strongest verified facts only — drawn straight from the proof-band source of truth. */
const businessColumn: Column = {
  eyebrow: "Business Access",
  heading: "Global expertise behind Montvelle.",
  stats: advisoryProofBand.stats.slice(0, 4),
  names: advisoryProofBand.names.slice(0, 8),
};

const personalColumn: Column = {
  eyebrow: "Personal Access",
  heading: "A world of access behind Montvelle.",
  stats: conciergeProofBand.stats.slice(0, 4),
  names: conciergeProofBand.names.slice(0, 8),
};

function ProofColumn({ column }: { column: Column }) {
  return (
    <div>
      <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-gold">
        {column.eyebrow}
      </p>
      <h2 className="mt-3 max-w-sm font-display text-xl leading-snug md:text-[1.6rem]">
        {column.heading}
      </h2>

      <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-4">
        {column.stats.map((stat) => (
          <div key={stat.label}>
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block font-display text-lg leading-none md:text-xl">
                {stat.value}
              </span>
              <span className="mt-2 block text-[9px] leading-3 uppercase tracking-[0.16em] text-background/50">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <p className="mt-6 border-t border-background/12 pt-5 font-display text-[13px] leading-6 text-background/58">
        {column.names.map((name, i) => (
          <span key={name}>
            {name}
            {i < column.names.length - 1 ? (
              <span className="mx-2.5 text-gold/40">&bull;</span>
            ) : null}
          </span>
        ))}
      </p>
    </div>
  );
}

/**
 * Compact dark proof band shown above the footer links on every public page:
 * Business Access and Personal Access side by side. Names only — no logos,
 * links, contact details or relationship claims.
 */
export function FooterNetworkStrip() {
  return (
    <div className="border-b border-background/12 pb-10">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProofColumn column={businessColumn} />
        <div className="border-t border-background/12 pt-10 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-16">
          <ProofColumn column={personalColumn} />
        </div>
      </div>

      <p className="mt-8 max-w-4xl text-[9px] leading-4 text-background/32">
        Selected organisations reflect Montvelle&rsquo;s sourcing and advisory capability.
        Inclusion does not by itself imply a formal partnership, endorsement, preferred status or
        guaranteed access.
      </p>
    </div>
  );
}
