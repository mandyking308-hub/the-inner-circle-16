import { advisoryProofBand, conciergeProofBand } from "@/data/networkProof";

/**
 * Two compact, slow-moving name-only ticker rows placed immediately below the
 * homepage hero. Business & Expertise (advisory universe) over Personal &
 * Access (concierge sourcing universe). Same verified names as the proof
 * bands and footer strip; no links, logos or contact details. Ink ground,
 * gold dots, cream names — a narrow premium bridge from the dark hero into
 * the editorial proof sections. Reduced-motion falls back to a wrapped list.
 */
function TickerRow({
  label,
  names,
  reverse,
}: {
  label: string;
  names: readonly string[];
  reverse?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 gap-2 py-3 sm:grid-cols-[9.5rem_1fr] sm:items-center sm:gap-6">
      <p className="text-[9px] font-semibold uppercase leading-5 tracking-[0.22em] text-gold/80">
        {label}
      </p>
      <div className="proof-marquee">
        <div className={`proof-marquee-track ${reverse ? "proof-marquee-track--reverse" : ""}`}>
          {[0, 1].map((copy) => (
            <ul
              key={copy}
              aria-hidden={copy === 1 || undefined}
              className="proof-marquee-list"
            >
              {names.map((name) => (
                <li
                  key={`${copy}-${name}`}
                  className="flex items-center font-display text-[13px] leading-6 whitespace-nowrap text-background/64 md:text-sm"
                >
                  {name}
                  <span className="ml-6 text-gold/45" aria-hidden="true">
                    &bull;
                  </span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HeroNetworkTickers() {
  return (
    <section className="border-b border-background/12 bg-ink text-background">
      <div className="mx-auto w-full max-w-[110rem] divide-y divide-background/10 px-6 sm:px-10 lg:px-14">
        <TickerRow label="Business & Expertise" names={advisoryProofBand.names} />
        <TickerRow label="Personal & Access" names={conciergeProofBand.names} reverse />
      </div>
    </section>
  );
}
