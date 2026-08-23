export function BrandMark({ inverse = false, compact = false }: { inverse?: boolean; compact?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center ${compact ? "h-9 w-9" : "h-12 w-12"} ${inverse ? "text-foreground" : "text-gold"}`}
    >
      <svg viewBox="0 0 48 48" className="h-full w-full" fill="none" role="presentation">
        {/* Small crown */}
        <path
          d="M15 12.5L18.2 15.6L24 10.5L29.8 15.6L33 12.5V17.4H15V12.5Z"
          fill="currentColor"
          fillOpacity="0.9"
        />
        {/* Serif M */}
        <path
          d="M11.5 39V21.2H16.8L24 33.4L31.2 21.2H36.5V39H32.4V26.9L25.6 38.4H22.4L15.6 26.9V39H11.5Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}
