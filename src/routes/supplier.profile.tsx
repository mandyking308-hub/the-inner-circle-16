import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";

import { SupplierIntro, useSupplierIdentity } from "@/components/supplier/SupplierShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/supplier/profile")({ component: SupplierProfile });

type Profile = {
  name: string;
  summary: string;
  cities: string;
  contact: string;
  insurance: string;
  vetting: string;
};

function SupplierProfile() {
  const { supplierId, supplier } = useSupplierIdentity();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saved, setSaved] = useState(false);
  const key = `montvelle:supplier-profile:${supplierId}`;

  useEffect(() => {
    const base: Profile = {
      name: supplier?.name ?? "",
      summary: supplier?.summary ?? "",
      cities: (supplier?.cities ?? []).join(", "),
      contact: supplier?.contact ?? "",
      insurance: supplier?.assurance ?? "",
      vetting: supplier?.vetting ?? "",
    };
    try {
      const raw = window.localStorage.getItem(key);
      setProfile(raw ? { ...base, ...(JSON.parse(raw) as Profile) } : base);
    } catch {
      setProfile(base);
    }
  }, [key, supplier]);

  if (!profile) return null;

  const save = () => {
    window.localStorage.setItem(key, JSON.stringify(profile));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2400);
  };

  const field = (label: string, name: keyof Profile, long = false) => (
    <div>
      <p className="text-[9px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      {long ? (
        <Textarea
          rows={3}
          value={profile[name]}
          onChange={(event) => setProfile({ ...profile, [name]: event.target.value })}
          className="mt-1 rounded-none"
        />
      ) : (
        <Input
          value={profile[name]}
          onChange={(event) => setProfile({ ...profile, [name]: event.target.value })}
          className="mt-1 rounded-none"
        />
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <SupplierIntro
        eyebrow="Profile & assurance"
        title="How Montvelle presents your business."
        description="Accuracy matters more than polish. Members see a short, factual description and the assurance behind it."
      />

      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5 border border-border bg-card p-6">
          {field("Business name", "name")}
          {field("Short description", "summary", true)}
          {field("Cities served", "cities")}
          {field("Primary contact", "contact")}
          {field("Insurance & licensing", "insurance", true)}
          {field("Vetting & references", "vetting", true)}
          <Button className="rounded-none" onClick={save}>
            {saved ? "Saved" : "Save profile"}
          </Button>
        </div>

        <aside className="border border-border bg-foreground p-6 text-background">
          <ShieldCheck className="h-5 w-5 text-bronze" />
          <p className="mt-5 text-[9px] uppercase tracking-[0.16em] text-background/45">Confidentiality</p>
          <p className="mt-3 text-sm leading-7 text-background/65">
            Work carried out for Montvelle households is confidential. No member may be named as a reference, used in
            marketing, photographed, or contacted outside the booking that brought you together.
          </p>
        </aside>
      </div>
    </div>
  );
}
