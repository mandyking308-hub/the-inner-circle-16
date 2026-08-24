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
  /** Visual treatment. "parchment" (default) is calm and light; "ink" is dramatic and dark. */
  tone?: "parchment" | "ink";
  /** Optional atmospheric image rendered as a full-bleed editorial header behind the headline. */
  image?: string;
  imageAlt?: string;
  /** When true, the moving name marquee is omitted (used where the names already appear elsewhere on the page). */
  hideMarquee?: boolean;
};

/**
 * Reusable editorial proof band: eyebrow, headline, supporting line, optional
 * vertical breakdown, a slow name-only marquee, restrained stats, a promise
 * line and a legal qualifier. Names are never links; no logos, cards or icons.
 *
 * The two tones create the deliberate colour-section rhythm the brand system
 * calls for: parchment sections create calm, ink sections create drama.
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
  tone = "parchment",
  image,
  imageAlt = "",
  hideMarquee = false,
}: NetworkProofBandProps) {
  const isInk = tone === "ink";

  // Tone-driven class tokens keep the component DRY and consistent.
  const sectionBg = isInk ? "bg-ink text-background" : "bg-linen text-foreground";
  const eyebrowCls = isInk ? "text-gold" : "text-bronze";
  const supportingCls = isInk ? "text-background/72" : "text-muted-foreground";
  const verticalCls = isInk ? "text-background/82" : "text-foreground/82";
  const verticalLabelCls = isInk ? "text-gold/80" : "text-bronze";
  const borderCls = isInk ? "border-background/16" : "border-bronze/25";
  const marqueeNameCls = isInk
    ? "text-background/80"
    : "text-foreground/80";
  const marqueeDotCls = isInk ? "text-gold/55" : "text-bronze/60";
  const statValueCls = isInk ? "text-background" : "text-foreground";
  const statLabelCls = isInk ? "text-background/58" : "text-muted-foreground";
  const promiseCls = isInk ? "text-background/82" : "text-foreground/80";
  const qualifierCls = isInk ? "text-background/55" : "text-muted-foreground/80";

  // Image header overlay: light gradient for parchment so dark text reads,
  // dark gradient for ink so light text reads.
  const overlayCls = isInk
    ? "bg-[linear-gradient(90deg,rgba(12,11,10,0.94)_0%,rgba(12,11,10,0.78)_34%,rgba(12,11,10,0.42)_68%,rgba(12,11,10,0.18)_100%)]"
    : "bg-[linear-gradient(90deg,rgba(235,228,216,0.96)_0%,rgba(235,228,216,0.80)_34%,rgba(235,228,216,0.42)_68%,rgba(235,228,216,0.12)_100%)]";

  return (
    <section className={`${sectionBg} border-b ${borderCls}`}>
      {/* Atmospheric editorial image header (optional) */}
      {image ? (
        <div className="relative isolate overflow-hidden">
          <img
            src={image}
            alt={imageAlt}
            className="absolute inset-0 -z-10 h-full w-full object-cover"
            loading="lazy"
          />
          <div className={`absolute inset-0 -z-10 ${overlayCls}`} />
          <div className="mx-auto flex w-full max-w-[110rem] min-h-[19rem] flex-col justify-end px-6 pb-12 pt-20 sm:px-10 md:min-h-[25rem] md:pb-14 md:pt-24 lg:px-14">
            <div className="max-w-3xl">
              <p
                className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${eyebrowCls}`}
              >
                {eyebrow}
              </p>
              <h2 className="mt-6 font-display text-[2.4rem] leading-[1.0] md:text-[3.5rem]">
                {headline}
              </h2>
              <p className={`mt-7 max-w-2xl text-base leading-8 ${supportingCls}`}>
                {supporting}
              </p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mx-auto w-full max-w-[110rem] px-6 py-12 sm:px-10 md:py-14 lg:px-14">

        {/* When there is no image header, the headline block lives here as before. */}
        {!image ? (
          <div className="max-w-3xl">
            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.24em] ${eyebrowCls}`}
            >
              {eyebrow}
            </p>
            <h2 className="mt-4 font-display text-3xl leading-[1.06] md:text-[2.75rem]">
              {headline}
            </h2>
            <p className={`mt-5 max-w-2xl text-sm leading-7 ${supportingCls}`}>
              {supporting}
            </p>
          </div>
        ) : null}

        {verticals && verticals.length > 0 ? (
          <div className={image ? "" : "mt-10"}>
            <p
              className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${verticalLabelCls}`}
            >
              {verticalsLabel}
            </p>
            <p className={`mt-5 max-w-4xl text-xs leading-7 ${verticalCls} md:text-sm md:leading-8`}>
              {verticals.map((vertical, i) => (
                <span key={vertical}>
                  {vertical}
                  {i < verticals.length - 1 ? (
                    <span className={`mx-3 ${marqueeDotCls}`}>&bull;</span>
                  ) : null}
                </span>
              ))}
            </p>
          </div>
        ) : null}

        {hideMarquee ? null : (
        <div
          className={`border-y ${borderCls} py-5 ${
            image ? (verticals && verticals.length > 0 ? "mt-14" : "") : "mt-10"
          }`}
        >
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
                      className={`font-display text-base whitespace-nowrap ${marqueeNameCls} md:text-lg`}
                    >
                      {name}
                      <span className={`ml-8 ${marqueeDotCls}`}>&bull;</span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
        )}

        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className={`block font-display text-2xl leading-none md:text-[1.6rem] ${statValueCls}`}>
                  {stat.value}
                </span>
                <span
                  className={`mt-3 block text-[10px] leading-4 uppercase tracking-[0.16em] ${statLabelCls}`}
                >
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>


        <p className={`mt-10 max-w-2xl text-sm leading-7 ${promiseCls}`}>{promise}</p>
        <p className={`mt-4 max-w-3xl text-[11px] leading-5 ${qualifierCls}`}>{qualifier}</p>
      </div>
    </section>
  );
}
