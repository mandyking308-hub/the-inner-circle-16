import { type FormEvent, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, LockKeyhole } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { loadApplications, saveApplications, type MembershipApplication } from "@/data/applicationStore";
import { luxuryImages } from "@/data/luxuryImages";
import { site } from "@/config/site";

export const Route = createFileRoute("/apply")({
  head: () => ({ meta: [{ title: `${site.ctaLabel} — ${site.name}` }, { name: "description", content: `Request membership of ${site.name}.` }] }),
  component: ApplyPage,
});

function ApplyPage() {
  const [submitted, setSubmitted] = useState<MembershipApplication | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const application: MembershipApplication = {
      id: `PT-${Date.now().toString().slice(-8)}`,
      submittedAt: new Date().toISOString(),
      status: "New",
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      location: String(form.get("location") ?? "").trim(),
      profile: String(form.get("profile") ?? "").trim(),
      membership: (String(form.get("membership") ?? "Individual") as MembershipApplication["membership"]),
      building: String(form.get("building") ?? "").trim(),
      complicated: String(form.get("complicated") ?? "").trim(),
      contribution: String(form.get("contribution") ?? "").trim(),
      referral: String(form.get("referral") ?? "").trim(),
    };

    const current = loadApplications();
    saveApplications([application, ...current]);
    setSubmitted(application);
    event.currentTarget.reset();
  };

  return (
    <>
      <section className="relative min-h-[560px] overflow-hidden bg-foreground text-background">
        <img src={luxuryImages.table} alt="A private members table in London" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/96 via-foreground/78 to-foreground/18" />
        <Container className="relative flex min-h-[560px] items-center py-20">
          <div className="max-w-3xl">
            <p className="eyebrow text-bronze">Request a seat</p>
            <h1 className="mt-6 max-w-[11ch] font-display text-6xl leading-[0.93] md:text-8xl">Tell us what you are building — and what has become complicated.</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-background/70">We are more interested in the life behind the title than the title itself. A human reviews every founding application.</p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <div className="border border-foreground/15 bg-linen p-6 md:p-7">
                <LockKeyhole className="h-5 w-5 text-oxblood" />
                <h2 className="mt-6 font-display text-3xl">What happens next?</h2>
                <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                  <p>We read the application for fit, contribution and whether the current community can genuinely be useful to you.</p>
                  <p>If there appears to be a fit, the next step is a conversation — not an automated checkout page.</p>
                  <p>Founding membership is deliberately small while the service is being proved.</p>
                </div>
              </div>
              <p className="mt-4 text-[10px] leading-5 text-muted-foreground">Private preview: applications are currently stored in this browser and appear in the prototype Admin review queue. Production launch will move this workflow to the secure database.</p>
            </aside>

            <div>
              {submitted ? (
                <div className="border border-foreground/15 bg-card p-7 md:p-10">
                  <CheckCircle2 className="h-6 w-6 text-oxblood" />
                  <p className="mt-7 text-[10px] font-semibold uppercase tracking-[0.2em] text-oxblood">Application received</p>
                  <h2 className="mt-3 font-display text-5xl">Thank you, {submitted.name.split(" ")[0] || "there"}.</h2>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-muted-foreground">Your application is now in the private review queue as <strong>{submitted.id}</strong>. In this preview you can open Admin → Applications to see the same record arrive there.</p>
                  <div className="mt-8 flex flex-wrap gap-3"><Button asChild className="rounded-none"><Link to="/admin/applications">View admin queue <ArrowRight className="ml-2 h-4 w-4" /></Link></Button><Button type="button" variant="outline" className="rounded-none" onClick={() => setSubmitted(null)}>Submit another</Button></div>
                </div>
              ) : (
                <form onSubmit={submit} className="border border-foreground/15 bg-card p-6 md:p-9">
                  <div className="grid gap-5 md:grid-cols-2">
                    <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" name="name" required className="rounded-none" /></div>
                    <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" required className="rounded-none" /></div>
                    <div className="space-y-2"><Label htmlFor="location">Where does life happen?</Label><Input id="location" name="location" placeholder="e.g. London / Dubai / New York" className="rounded-none" /></div>
                    <div className="space-y-2"><Label htmlFor="profile">What best describes you?</Label><Input id="profile" name="profile" placeholder="Founder, family business, investor, adviser..." className="rounded-none" /></div>
                    <div className="space-y-2 md:col-span-2"><Label htmlFor="membership">Which door seems most relevant?</Label><select id="membership" name="membership" className="h-10 w-full rounded-none border border-input bg-background px-3 text-sm"><option>Individual</option><option>Family</option><option>Trusted Partner</option></select></div>
                  </div>

                  <div className="mt-7 space-y-6 border-t border-foreground/12 pt-7">
                    <div className="space-y-2"><Label htmlFor="building">What are you building or responsible for?</Label><Textarea id="building" name="building" rows={4} required className="rounded-none" placeholder="The business, family enterprise, investment work or professional responsibility that matters most right now." /></div>
                    <div className="space-y-2"><Label htmlFor="complicated">What has become complicated?</Label><Textarea id="complicated" name="complicated" rows={5} required className="rounded-none" placeholder="A move, succession, schools, advisers, growth, family governance, time, access — tell us the real version." /></div>
                    <div className="space-y-2"><Label htmlFor="contribution">What would you bring to the room?</Label><Textarea id="contribution" name="contribution" rows={4} required className="rounded-none" placeholder="Experience, judgement, relationships, a sector you know deeply, willingness to mentor or something else useful." /></div>
                    <div className="space-y-2"><Label htmlFor="referral">How did you hear about us?</Label><Input id="referral" name="referral" placeholder="Member introduction, event, search, other" className="rounded-none" /></div>
                  </div>

                  <Button type="submit" size="lg" className="mt-8 w-full rounded-none bg-oxblood">Send private application <ArrowRight className="ml-2 h-4 w-4" /></Button>
                  <p className="mt-4 text-center text-[10px] leading-5 text-muted-foreground">No payment is taken at application. Partner applicants do not receive member access simply by applying.</p>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
