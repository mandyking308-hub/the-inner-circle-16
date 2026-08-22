export function BrandMark({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  const line = inverse ? "hsl(var(--background))" : "hsl(var(--oxblood-foreground))";

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ${compact ? "h-8 w-8" : "h-11 w-11"} ${inverse ? "text-foreground" : "text-oxblood"}`}
    >
      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none" role="presentation">
        <rect x="1" y="1" width="46" height="46" rx="23" fill="currentColor" />
        <circle cx="24" cy="24" r="18.5" stroke={line} strokeOpacity="0.34" />
        <path d="M13.5 30.5V17.5L24 29.3L34.5 17.5V30.5" stroke={line} strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16.8 31.7L24 24.1L31.2 31.7" stroke={line} strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.72" />
        <circle cx="24" cy="35.2" r="1" fill={line} fillOpacity="0.92" />
      </svg>
    </span>
  );
}
