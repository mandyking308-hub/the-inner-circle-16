export function BrandMark({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`relative inline-flex shrink-0 items-center justify-center border ${compact ? "h-8 w-8" : "h-10 w-10"} ${
        inverse ? "border-background/35 bg-background text-foreground" : "border-oxblood bg-oxblood text-oxblood-foreground"
      }`}
    >
      <span className="absolute left-[20%] top-[20%] h-1 w-1 rounded-full bg-current" />
      <span className="absolute right-[20%] top-[20%] h-1 w-1 rounded-full bg-current" />
      <span className="absolute bottom-[20%] left-[20%] h-1 w-1 rounded-full bg-current" />
      <span className="absolute bottom-[20%] right-[20%] h-1 w-1 rounded-full bg-current" />
      <span className="h-[2px] w-[42%] bg-current" />
    </span>
  );
}
