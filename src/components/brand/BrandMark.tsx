export function BrandMark({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ${compact ? "h-8 w-8" : "h-11 w-11"} ${inverse ? "text-foreground" : "text-oxblood"}`}
    >
      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none" role="presentation">
        <rect x="1" y="1" width="46" height="46" fill="currentColor" />
        <rect x="5.5" y="5.5" width="37" height="37" stroke={inverse ? "hsl(var(--background))" : "hsl(var(--oxblood-foreground))"} strokeOpacity="0.42" />
        <path d="M14 16.5H34" stroke={inverse ? "hsl(var(--background))" : "hsl(var(--oxblood-foreground))"} strokeWidth="1.5" />
        <path d="M24 16.5V33" stroke={inverse ? "hsl(var(--background))" : "hsl(var(--oxblood-foreground))"} strokeWidth="1.5" />
        <circle cx="24" cy="24" r="5.5" stroke={inverse ? "hsl(var(--background))" : "hsl(var(--oxblood-foreground))"} strokeWidth="1" strokeOpacity="0.8" />
        <path d="M24 8.5V12M24 36V39.5M8.5 24H12M36 24H39.5" stroke={inverse ? "hsl(var(--background))" : "hsl(var(--oxblood-foreground))"} strokeWidth="1" strokeOpacity="0.55" />
        <circle cx="24" cy="10.5" r="1" fill={inverse ? "hsl(var(--background))" : "hsl(var(--oxblood-foreground))"} />
        <circle cx="24" cy="37.5" r="1" fill={inverse ? "hsl(var(--background))" : "hsl(var(--oxblood-foreground))"} />
        <circle cx="10.5" cy="24" r="1" fill={inverse ? "hsl(var(--background))" : "hsl(var(--oxblood-foreground))"} />
        <circle cx="37.5" cy="24" r="1" fill={inverse ? "hsl(var(--background))" : "hsl(var(--oxblood-foreground))"} />
      </svg>
    </span>
  );
}
