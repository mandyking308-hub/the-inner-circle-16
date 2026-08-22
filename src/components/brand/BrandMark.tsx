export function BrandMark({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden ${compact ? "h-8 w-8" : "h-11 w-11"} ${
        inverse ? "bg-background text-foreground" : "bg-oxblood text-oxblood-foreground"
      }`}
    >
      <span className={`absolute inset-[4px] border ${inverse ? "border-foreground/25" : "border-oxblood-foreground/28"}`} />
      <span className="font-display text-[0.72rem] leading-none tracking-[-0.08em]">PT</span>
      <span className={`absolute left-1/2 top-[4px] h-[5px] w-px -translate-x-1/2 ${inverse ? "bg-foreground/25" : "bg-oxblood-foreground/28"}`} />
      <span className={`absolute bottom-[4px] left-1/2 h-[5px] w-px -translate-x-1/2 ${inverse ? "bg-foreground/25" : "bg-oxblood-foreground/28"}`} />
    </span>
  );
}
