import { advisoryProofBand } from "@/data/networkProof";

const footerNames = advisoryProofBand.names.slice(0, 8);

/**
 * Condensed, dark-footer version of the professional network proof:
 * names only, no links, no logos, no marquee.
 */
export function FooterNetworkStrip() {
  return (
    <div className="border-b border-background/12 pb-12">
      <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-gold">
        Professional network
      </p>
      <h2 className="mt-3 font-display text-2xl leading-tight md:text-3xl">
        Global expertise behind Montvelle.
      </h2>

      <dl className="mt-8 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 lg:grid-cols-5">
        {advisoryProofBand.stats.map((stat) => (
          <div key={stat.label} className="border-t border-background/15 pt-3">
            <dt className="sr-only">{stat.label}</dt>
            <dd>
              <span className="block font-display text-2xl leading-none md:text-3xl">
                {stat.value}
              </span>
              <span className="mt-2 block text-[9px] font-semibold uppercase tracking-[0.16em] text-background/50">
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-xs text-background/55">
        {footerNames.map((name) => (
          <li key={name} className="font-display text-sm">
            {name}
          </li>
        ))}
      </ul>

      <p className="mt-6 max-w-3xl text-[9px] leading-4 text-background/34">
        {advisoryProofBand.qualifier}
      </p>
    </div>
  );
}
