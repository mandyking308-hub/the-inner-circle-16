import { type FormEvent, useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Bell, Eye, EyeOff, ShieldCheck } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/member/profile")({ component: ProfilePage });

const STORAGE_KEY = "project-table:member-profile:v2";
type ProfileState = {
  name: string; city: string; role: string; organisation: string; bio: string; help: string; learn: string;
  showEnterpriseStage: boolean; showEvents: boolean; showOtherCities: boolean; showLanguages: boolean;
  conciergeUpdates: boolean; eventUpdates: boolean; introUpdates: boolean;
};
const starter: ProfileState = { name: "DEMO Member", city: "London", role: "Founder", organisation: "DEMO Enterprise", bio: "Preview profile. Replace with your own words: what you build, where life happens and what you are responsible for.", help: "Preview placeholder — the experience, sectors or judgement you can genuinely offer other members.", learn: "Preview placeholder — what you would find useful to learn from the room this year.", showEnterpriseStage: false, showEvents: true, showOtherCities: true, showLanguages: true, conciergeUpdates: true, eventUpdates: true, introUpdates: true };

function ProfilePage() {
  const [profile, setProfile] = useState<ProfileState>(starter);
  const [saved, setSaved] = useState(false);
  useEffect(() => { try { const raw = window.localStorage.getItem(STORAGE_KEY); if (raw) setProfile({ ...starter, ...(JSON.parse(raw) as Partial<ProfileState>) }); } catch { /* use starter */ } }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile)); setSaved(true); window.setTimeout(() => setSaved(false), 1800); };
  const patch = <K extends keyof ProfileState>(key: K, value: ProfileState[K]) => setProfile((current) => ({ ...current, [key]: value }));

  return (
    <div className="space-y-8">
      <PageIntro eyebrow="Account & privacy" title="Give the room enough context — no more than it needs" description="Your profile exists to make useful relationships easier. Sensitive family, ownership and financial information stays outside the social profile by default." />

      <section className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="border border-border bg-card p-5 md:p-6">
          <div className="flex items-center gap-3"><Lock className="h-4 w-4 text-oxblood" /><p className="eyebrow text-oxblood">Personal privacy and household sharing</p></div>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <div className="border-t-2 border-oxblood pt-4">
              <p className="font-display text-2xl leading-tight">Private to me</p>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">The default for your requests, messages, decisions and personal matters. Nobody else in your household sees them — including the Household Principal.</p>
            </div>
            <div className="border-t-2 border-border pt-4">
              <p className="font-display text-2xl leading-tight">Shared with my household</p>
              <p className="mt-3 text-xs leading-6 text-muted-foreground">A deliberate choice, matter by matter or area by area. Sharing one thing never opens the rest, and it can be withdrawn.</p>
            </div>
          </div>
        </div>
        <div className="border border-border bg-foreground p-5 text-background md:p-6">
          <ShieldCheck className="h-4 w-4 text-bronze" />
          <p className="mt-5 font-display text-2xl leading-tight">Who has access to your household world</p>
          <p className="mt-3 text-xs leading-6 text-background/60">Roles, agreed areas and any authorised delegate live in one place. An authorised delegate is not a Montvelle member.</p>
          <Link to="/member/household-access" className="mt-5 inline-block border-b border-bronze pb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-bronze">Household &amp; access →</Link>
        </div>
      </section>
      <form onSubmit={submit} className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="border border-border bg-card p-5 md:p-6"><div className="grid gap-5 md:grid-cols-2"><div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" value={profile.name} onChange={(e) => patch("name", e.target.value)} className="rounded-none" /></div><div className="space-y-2"><Label htmlFor="city">Primary city</Label><Input id="city" value={profile.city} onChange={(e) => patch("city", e.target.value)} className="rounded-none" /></div><div className="space-y-2"><Label htmlFor="role">Role</Label><Input id="role" value={profile.role} onChange={(e) => patch("role", e.target.value)} className="rounded-none" /></div><div className="space-y-2"><Label htmlFor="organisation">Organisation</Label><Input id="organisation" value={profile.organisation} onChange={(e) => patch("organisation", e.target.value)} className="rounded-none" /></div></div><div className="mt-5 space-y-2"><Label htmlFor="bio">Short biography</Label><Textarea id="bio" rows={4} value={profile.bio} onChange={(e) => patch("bio", e.target.value)} className="rounded-none" /></div><div className="mt-5 space-y-2"><Label htmlFor="help">I can help with</Label><Textarea id="help" rows={3} value={profile.help} onChange={(e) => patch("help", e.target.value)} className="rounded-none" /></div><div className="mt-5 space-y-2"><Label htmlFor="learn">I want to learn about</Label><Textarea id="learn" rows={3} value={profile.learn} onChange={(e) => patch("learn", e.target.value)} className="rounded-none" /></div><div className="mt-6 flex items-center gap-3"><Button type="submit" className="rounded-none">Save account</Button>{saved ? <span className="text-xs text-oxblood">Saved</span> : null}</div></section>

        <aside className="space-y-5"><section className="border border-border bg-card p-5"><div className="flex items-center gap-3"><ShieldCheck className="h-4 w-4 text-oxblood" /><p className="eyebrow">Visibility</p></div><div className="mt-5 space-y-5">{[["showEnterpriseStage","Enterprise stage","Show a broad stage such as building, scaling, transition or family office."],["showEvents","Selected event participation","Let members see selected gatherings you have attended."],["showOtherCities","Other cities","Show the other places where you regularly live or work."],["showLanguages","Languages","Show languages that may make a relationship or local introduction easier."]].map(([key,title,body]) => <label key={key} className="flex cursor-pointer items-start justify-between gap-4 border-t border-border pt-4 first:border-0 first:pt-0"><div><p className="text-sm font-medium">{title}</p><p className="mt-1 text-xs leading-5 text-muted-foreground">{body}</p></div><input type="checkbox" checked={Boolean(profile[key as keyof ProfileState])} onChange={(e) => patch(key as keyof ProfileState, e.target.checked as never)} className="mt-1" /></label>)}</div></section>

          <section className="border border-border bg-card p-5"><div className="flex items-center gap-3"><Bell className="h-4 w-4 text-oxblood" /><p className="eyebrow">Notifications</p></div><div className="mt-5 space-y-4">{[["conciergeUpdates","Concierge case updates"],["eventUpdates","Gathering confirmations"],["introUpdates","Introduction consent requests"]].map(([key,title]) => <label key={key} className="flex items-center justify-between gap-4 border-t border-border pt-4 first:border-0 first:pt-0"><span className="text-sm">{title}</span><input type="checkbox" checked={Boolean(profile[key as keyof ProfileState])} onChange={(e) => patch(key as keyof ProfileState, e.target.checked as never)} /></label>)}</div></section>

          <section className="border border-border bg-foreground p-5 text-background"><div className="flex items-center gap-3">{profile.showEnterpriseStage ? <Eye className="h-4 w-4 text-bronze" /> : <EyeOff className="h-4 w-4 text-bronze" />}<p className="eyebrow text-background/60">Never social profile data</p></div><ul className="mt-5 space-y-3 text-sm leading-6 text-background/75"><li>Net worth or investable assets</li><li>Home address or personal phone number</li><li>Children's identities or school information</li><li>Trust, estate or ownership documents</li><li>Confidential Table challenges</li></ul></section></aside>
      </form>
    </div>
  );
}
