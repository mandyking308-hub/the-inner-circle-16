import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { defaultPreferences, readPreferences, writePreferences, type Preferences } from "@/data/memberWorld";

export const Route = createFileRoute("/member/preferences")({ component: MemberPreferencesPage });

const groups: { key: keyof Preferences; label: string; note: string }[] = [
  { key: "travel", label: "Travel", note: "Airlines, seating, residences and hotels, airports and drivers." },
  { key: "dining", label: "Food & dining", note: "Dietary requirements, table preferences, things to avoid." },
  { key: "household", label: "Household & residences", note: "Recurring suppliers, house preparation, staffing notes." },
  { key: "family", label: "Family logistics", note: "Arrivals, routines and communication. No child is ever named to a provider." },
  { key: "wellbeing", label: "Wellbeing routing", note: "How wellbeing requests should be routed. High level only — this is not a medical record." },
  { key: "communications", label: "Communications", note: "How and when Montvelle should reach the household." },
  { key: "favourites", label: "Favourite providers", note: "The people you would rather we used." },
  { key: "avoid", label: "Never suggest", note: "Anything that should not be proposed again." },
  { key: "defaultBooking", label: "Default booking preferences", note: "What we may confirm, and what should always come back to you." },
];

function MemberPreferencesPage() {
  const [values, setValues] = useState<Preferences>(defaultPreferences);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setValues(readPreferences());
  }, []);

  const save = () => {
    writePreferences(values);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2600);
  };

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="My Preferences"
        title="The things we should already know."
        description="Private operational context, held so that you never have to explain it twice. This is not your member profile and it is not visible to providers."
        action={
          <Button className="rounded-none" onClick={save}>
            {saved ? "Saved" : "Save preferences"}
          </Button>
        }
      />

      <section className="border border-border bg-card p-5">
        <div className="flex items-start gap-3">
          <div>
            <p className="text-sm font-semibold">Private by default.</p>
            <p className="mt-1 max-w-4xl text-xs leading-6 text-muted-foreground">
              Nothing written here is visible to a supplier. When you make a booking, only the minimum necessary
              subset — the part a particular arrangement genuinely requires — is shared, and only after your action.
              You can see exactly what was shared on every booking record.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-2">
        {groups.map((group) => (
          <section key={group.key} className="border border-border bg-card p-6">
            <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-oxblood">{group.label}</p>
            <p className="mt-2 text-xs leading-6 text-muted-foreground">{group.note}</p>
            <Textarea
              value={values[group.key]}
              onChange={(event) => setValues((current) => ({ ...current, [group.key]: event.target.value }))}
              rows={5}
              className="mt-4 rounded-none"
            />
          </section>
        ))}
      </div>

      <div className="flex justify-end">
        <Button className="rounded-none" onClick={save}>
          {saved ? "Saved" : "Save preferences"}
        </Button>
      </div>
    </div>
  );
}
