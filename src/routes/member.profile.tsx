import { FormEvent, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

import { PageIntro } from "@/components/private/PrivateShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/member/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [showEnterpriseStage, setShowEnterpriseStage] = useState(false);
  const [showEvents, setShowEvents] = useState(true);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <div className="space-y-8">
      <PageIntro
        eyebrow="Profile & privacy"
        title="Give the room enough context — no more than it needs."
        description="Your profile exists to make useful relationships easier. Sensitive family, ownership and financial information is private by default and should never be required for social signalling."
      />

      <form onSubmit={submit} className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="border border-border bg-card p-5 md:p-6">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" className="rounded-none" defaultValue="Amelia Hart" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" className="rounded-none" defaultValue="London" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input id="role" className="rounded-none" defaultValue="Founder & CEO" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="organisation">Organisation</Label>
              <Input id="organisation" className="rounded-none" defaultValue="Hartwell Systems" />
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <Label htmlFor="bio">Short biography</Label>
            <Textarea id="bio" rows={4} className="rounded-none" defaultValue="Founder of an enterprise technology company working across the UK and Europe. Interested in building management independence, family governance and responsible AI adoption." />
          </div>
          <div className="mt-5 space-y-2">
            <Label htmlFor="help">I can help with</Label>
            <Textarea id="help" rows={3} className="rounded-none" defaultValue="Scaling technology teams, enterprise sales, AI implementation and founder-led international growth." />
          </div>
          <div className="mt-5 space-y-2">
            <Label htmlFor="learn">I want to learn about</Label>
            <Textarea id="learn" rows={3} className="rounded-none" defaultValue="Governance before a liquidity event, ownership structures, next-generation education and long-term philanthropy." />
          </div>
          <div className="mt-6 flex items-center gap-3">
            <Button type="submit" className="rounded-none">Save profile</Button>
            {saved ? <span className="text-xs text-muted-foreground">Saved locally for this prototype.</span> : null}
          </div>
        </section>

        <aside className="space-y-5">
          <section className="border border-border bg-card p-5">
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-4 w-4 text-bronze" />
              <p className="eyebrow">Visibility controls</p>
            </div>
            <div className="mt-5 space-y-5">
              <label className="flex cursor-pointer items-start justify-between gap-4 border-t border-border pt-4 first:border-0 first:pt-0">
                <div>
                  <p className="text-sm font-medium">Enterprise stage</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">Show a broad stage such as building, scaling, transition or family office.</p>
                </div>
                <input type="checkbox" checked={showEnterpriseStage} onChange={(event) => setShowEnterpriseStage(event.target.checked)} className="mt-1" />
              </label>
              <label className="flex cursor-pointer items-start justify-between gap-4 border-t border-border pt-4">
                <div>
                  <p className="text-sm font-medium">Event participation</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">Let members see selected gatherings you have attended.</p>
                </div>
                <input type="checkbox" checked={showEvents} onChange={(event) => setShowEvents(event.target.checked)} className="mt-1" />
              </label>
            </div>
          </section>

          <section className="border border-border bg-foreground p-5 text-background">
            <div className="flex items-center gap-3">
              {showEnterpriseStage ? <Eye className="h-4 w-4 text-bronze" /> : <EyeOff className="h-4 w-4 text-bronze" />}
              <p className="eyebrow text-background/60">Never public by default</p>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-background/75">
              <li>Net worth or investable assets</li>
              <li>Home address or personal phone number</li>
              <li>Children's identities or school information</li>
              <li>Trust, estate or ownership documents</li>
              <li>Confidential Table challenges</li>
            </ul>
          </section>
        </aside>
      </form>
    </div>
  );
}
