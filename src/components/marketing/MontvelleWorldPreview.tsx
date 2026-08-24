/**
 * MontvelleWorldPreview — a compact, HTML/CSS software preview of Montvelle World.
 * Purely illustrative: no real member data, no external logos, no photography.
 */
export function MontvelleWorldPreview() {
  return (
    <div
      aria-label="Illustrative preview of the Montvelle World member interface"
      role="img"
      className="overflow-hidden border border-border bg-background shadow-[0_18px_50px_-30px_rgba(12,11,10,0.55)]"
    >
      {/* window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-linen px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/25" />
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-foreground/10" />
        <span className="ml-2 text-[8px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
          Montvelle World
        </span>
      </div>

      <div className="flex max-h-[300px] min-h-[264px]">
        {/* side rail */}
        <nav className="w-[30%] shrink-0 bg-ink px-3 py-3 text-background">
          <p className="text-[7px] font-semibold uppercase tracking-[0.24em] text-gold">Member</p>
          <ul className="mt-2.5 space-y-[7px] text-[9px] leading-none">
            {[
              "Today",
              "Ask Montvelle",
              "Decision Room",
              "Expert Council",
              "Build My Circle",
              "Invitations",
              "Family",
              "Messages",
            ].map((item, i) => (
              <li
                key={item}
                className={
                  i === 0
                    ? "border-l border-gold pl-2 text-background"
                    : "border-l border-transparent pl-2 text-background/55"
                }
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>

        {/* main */}
        <div className="min-w-0 flex-1 bg-background px-4 py-3.5">
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display text-[15px] leading-none text-foreground">
              Good afternoon, James
            </p>
            <span className="text-[7px] font-semibold uppercase tracking-[0.2em] text-bronze">
              Demo
            </span>
          </div>

          <p className="mt-3 text-[7px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            Today
          </p>
          <ul className="mt-1.5 space-y-1 border-t border-border pt-1.5 text-[9px] leading-4 text-foreground/80">
            <li className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-1">
              <span>Monaco relocation — residence appointment</span>
              <span className="shrink-0 text-muted-foreground">10:30</span>
            </li>
            <li className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-1">
              <span>Trust review — papers circulated</span>
              <span className="shrink-0 text-muted-foreground">14:00</span>
            </li>
            <li className="flex items-baseline justify-between gap-3">
              <span>Private dinner — travel coordination</span>
              <span className="shrink-0 text-muted-foreground">Fri</span>
            </li>
          </ul>

          <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border pt-2.5">
            <div>
              <p className="text-[7px] font-semibold uppercase tracking-[0.22em] text-bronze">
                Decision Room
              </p>
              <p className="mt-1 font-display text-[11px] leading-tight text-foreground">
                Monaco relocation
              </p>
              <div className="mt-1.5 h-[3px] w-full bg-foreground/10">
                <div className="h-full w-[62%] bg-gold" />
              </div>
              <p className="mt-1 text-[8px] leading-3 text-muted-foreground">
                Next: confirm schooling options
              </p>
            </div>
            <div>
              <p className="text-[7px] font-semibold uppercase tracking-[0.22em] text-bronze">
                Expert Council
              </p>
              <ul className="mt-1 space-y-[3px] text-[8.5px] leading-3 text-foreground/75">
                <li>Residence counsel</li>
                <li>Cross-border tax adviser</li>
                <li>Private banker</li>
              </ul>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-4 border-t border-border pt-2 text-[8px] text-muted-foreground">
            <span>
              Messages <span className="text-oxblood">2</span>
            </span>
            <span>
              Invitations <span className="text-oxblood">1</span>
            </span>
            <span className="ml-auto text-bronze">Illustrative</span>
          </div>
        </div>
      </div>
    </div>
  );
}
