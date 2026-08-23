import { LanguageSelector } from "@/components/common/LanguageSelector";

/**
 * Discreet floating translation control for public pages.
 * Rendered once, outside the header, so it never consumes navigation space.
 */
export function FloatingLanguageSelector() {
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-40 print:hidden sm:bottom-6 sm:right-6">
      <div className="pointer-events-auto rounded-full border border-gold/28 bg-ink/92 px-1 py-0.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.55)] backdrop-blur-sm transition-colors hover:border-gold/50">
        <LanguageSelector inverse />
      </div>
    </div>
  );
}
