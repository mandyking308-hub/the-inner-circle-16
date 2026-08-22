export function BrandMark({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  const ink = inverse ? "hsl(var(--background))" : "hsl(var(--oxblood-foreground))";

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ${compact ? "h-8 w-8" : "h-11 w-11"} ${inverse ? "text-foreground" : "text-oxblood"}`}
    >
      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none" role="presentation">
        <circle cx="24" cy="24" r="23" fill="currentColor" />
        <circle cx="24" cy="24" r="18.6" stroke={ink} strokeOpacity="0.3" />
        <path d="M13.5 31V17.2L24 29.1L34.5 17.2V31" stroke={ink} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M17 31.6L24 24.2L31 31.6" stroke={ink} strokeWidth="1.05" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.72" />
        <path d="M20.5 14.2H27.5" stroke={ink} strokeWidth="0.9" strokeLinecap="round" strokeOpacity="0.42" />
        <circle cx="24" cy="35.3" r="0.9" fill={ink} fillOpacity="0.9" />
      </svg>
    </span>
  );
}
