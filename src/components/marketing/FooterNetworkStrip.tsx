import type { NetworkProofBandProps } from "@/components/marketing/NetworkProofBand";
import { advisoryProofBand, conciergeProofBand } from "@/data/networkProof";

type FooterProofProps = {
  label: string;
  headline: string;
  proof: NetworkProofBandProps;
};

function FooterProof({ label, headline, proof }: FooterProofProps) {
  const names = proof.names.slice(0, 8);

  return (
    <section className="py-10 first:pt-0 last:pb-0">
      <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-gold">{label}</p>
      <h2 className="mt-3 font-display text-2xl leading-tight md:text-3xl">{headline}</h2>

      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
        {proof.stats.map((stat) => (
          <div key={stat.label} className="border-t border-background/15 pt-3">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block font-display text-2xl leading-none md:text-3xl">{stat.value}</span>
              <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.16em] text-background/50">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-background/55">
        {names.map((name) => (
          <li key={name} className="font-display text-sm">
            {name}
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-3xl text-[9px] leading-4 text-background/34">{proof.qualifier}</p>
    </section>
  );
}

/**
 * Condensed dark-footer proof for the two external networks behind Montvelle.
 * Names only: no links, logos, contact details or relationship claims.
 */
export function FooterNetworkStrip() {
  return (
    <div className="divide-y divide-background/12 border-b border-background/12 pb-12">
      <FooterProof
        label="Professional network"
        headline="Global expertise behind Montvelle."
        proof={advisoryProofBand}
      />
      <FooterProof
        label="Global concierge & sourcing"
        headline="A world of access behind Montvelle."
        proof={conciergeProofBand}
      />
    </div>
  );
}
