export type NetworkProofStat = {
  value: string;
  label: string;
};

export type NetworkProofBandProps = {
  eyebrow: string;
  headline: string;
  supporting: string;
  names: readonly string[];
  stats: readonly NetworkProofStat[];
  promise: string;
  qualifier: string;
  verticals?: readonly string[];
  verticalsLabel?: string;
};

/**
 * Reusable editorial proof band: eyebrow, headline, supporting line, optional
 * vertical breakdown, a slow name-only marquee, restrained stats, a promise
 * line and a legal qualifier. Names are never links; no logos, cards or icons.
 */
export function NetworkProofBand({
  eyebrow,
  headline,
  supporting,
  names,
  stats,
  promise,
  qualifier,
  verticals,
  verticalsLabel = "Coverage",
}: NetworkProofBandProps) {
  return (
    <section className="border-b border-bronze/25 bg-linen">
      <div className="mx-auto w-full max-w-[110rem] px-6 py-14 sm:px-10 md:py-16 lg:px-14">
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-bronze">
            {eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl leading-[1.06] md:text-[2.75rem]">{headline}</h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">{supporting}</p>
        </div>

        {verticals && verticals.length > 0 ? (
          <div className="mt-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-bronze">
              {verticalsLabel}
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-8">
              {verticals.map((vertical) => (
                <li
                  key={vertical}
                  className="border-t border-bronze/25 py-3 text-xs leading-5 text-foreground/82 md:text-sm"
                >
                  {vertical}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-10 border-y border-bronze/25 py-5">
          <div className="proof-marquee">
            <div className="proof-marquee-track">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  aria-hidden={copy === 1}
                  className="proof-marquee-list"
                >
                  {names.map((name) => (
                    <li
                      key={`${copy}-${name}`}
                      className="font-display text-lg whitespace-nowrap text-foreground/80 md:text-xl"
                    >
                      {name}
                      <span className="ml-8 text-bronze/60">&bull;</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-bronze/25 pt-4">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl leading-none md:text-4xl">
                  {stat.value}
                </span>
                <span className="mt-3 block text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 max-w-2xl text-sm leading-7 text-foreground/80">{promise}</p>
        <p className="mt-4 max-w-3xl text-[11px] leading-5 text-muted-foreground/80">{qualifier}</p>
      </div>
    </section>
  );
}
