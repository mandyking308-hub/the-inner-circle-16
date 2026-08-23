import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  /** Copy adapted per application type. */
  intro: string;
  relationshipLabel: string;
  relationshipPlaceholder: string;
  consentLabel: string;
  showOrganisation?: boolean | undefined;
};

function ReferenceBlock({
  index,
  relationshipLabel,
  relationshipPlaceholder,
  showOrganisation,
}: { index: 1 | 2 } & Pick<Props, "relationshipLabel" | "relationshipPlaceholder" | "showOrganisation">) {
  const key = (field: string) => `reference${index}${field}`;
  return (
    <div className="border-t border-foreground/12 pt-6">
      <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-oxblood">Reference {index}</p>
      <div className="mt-4 grid gap-5 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor={key("Name")}>Full name</Label>
          <Input id={key("Name")} name={key("Name")} required maxLength={120} className="rounded-none" />
        </div>
        <div className="space-y-2">
          <Label htmlFor={key("Email")}>Email</Label>
          <Input id={key("Email")} name={key("Email")} type="email" required maxLength={255} className="rounded-none" />
        </div>
        {showOrganisation ? (
          <div className="space-y-2">
            <Label htmlFor={key("Organisation")}>Organisation and role</Label>
            <Input id={key("Organisation")} name={key("Organisation")} maxLength={160} className="rounded-none" />
          </div>
        ) : null}
        <div className="space-y-2">
          <Label htmlFor={key("Phone")}>Phone <span className="text-muted-foreground">(optional)</span></Label>
          <Input id={key("Phone")} name={key("Phone")} type="tel" maxLength={40} className="rounded-none" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor={key("Relationship")}>{relationshipLabel}</Label>
          <Textarea
            id={key("Relationship")}
            name={key("Relationship")}
            required
            rows={2}
            maxLength={400}
            className="rounded-none"
            placeholder={relationshipPlaceholder}
          />
        </div>
      </div>
    </div>
  );
}

export function TwoReferences({ intro, relationshipLabel, relationshipPlaceholder, consentLabel, showOrganisation }: Props) {
  return (
    <section className="mt-8 border-t border-foreground/12 pt-8">
      <p className="eyebrow text-oxblood">Two references</p>
      <h3 className="mt-3 font-display text-3xl">Two people who can speak for you.</h3>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{intro}</p>

      <ReferenceBlock index={1} relationshipLabel={relationshipLabel} relationshipPlaceholder={relationshipPlaceholder} showOrganisation={showOrganisation} />
      <ReferenceBlock index={2} relationshipLabel={relationshipLabel} relationshipPlaceholder={relationshipPlaceholder} showOrganisation={showOrganisation} />

      <label className="mt-7 flex cursor-pointer items-start gap-3 border border-foreground/15 bg-linen p-4 text-xs leading-6 text-muted-foreground">
        <input type="checkbox" name="referenceConsent" required className="mt-1 h-4 w-4 shrink-0 accent-[var(--oxblood,#6b1d20)]" />
        <span>{consentLabel}</span>
      </label>
      <p className="mt-3 text-[10px] leading-5 text-muted-foreground">
        Reference details are held only for admission review. They never appear in any directory and are not shared with members or partners.
      </p>
    </section>
  );
}
