import type { ApplicationReference } from "@/lib/applicationReferences";

/**
 * Admission-review only. Reference contact details are private and must never
 * be rendered in member, supplier or public surfaces.
 */
export function ReferencePanel({ references }: { references: ApplicationReference[] | undefined }) {
  const pair = Array.isArray(references) ? references : [];
  return (
    <div className="border-t border-border pt-5">
      <div className="flex items-center justify-between gap-4">
        <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-oxblood">Two references</p>
        <span className="text-[9px] uppercase tracking-[0.12em] text-muted-foreground">Private — review only</span>
      </div>
      {pair.length ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {pair.map((reference, index) => (
            <article key={reference.email || index} className="border border-border bg-background p-4">
              <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">Reference {index + 1}</p>
              <h4 className="mt-2 font-display text-2xl">{reference.name}</h4>
              {reference.organisation ? <p className="mt-1 text-xs text-muted-foreground">{reference.organisation}</p> : null}
              <p className="mt-2 text-xs">{reference.email}</p>
              {reference.phone ? <p className="text-xs text-muted-foreground">{reference.phone}</p> : null}
              <p className="mt-3 text-xs leading-6 text-muted-foreground">{reference.relationship}</p>
            </article>
          ))}
        </div>
      ) : (
        <p className="mt-3 text-xs text-muted-foreground">No references recorded on this application.</p>
      )}
    </div>
  );
}
