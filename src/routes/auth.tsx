import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, LockKeyhole, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { site } from "@/config/site";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: `Sign in — ${site.name}` },
      { name: "description", content: `Member sign in for ${site.name}.` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto grid max-w-4xl gap-5 lg:grid-cols-[1fr_0.8fr]">
          <div className="border border-border bg-card p-6 md:p-8">
            <div className="flex items-center gap-3"><LockKeyhole className="h-5 w-5 text-bronze" /><p className="eyebrow">Members</p></div>
            <h1 className="mt-5 font-display text-5xl">Private sign in</h1>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">Production authentication is intentionally not wired in this GitHub-first prototype. No passwords or secrets are collected yet.</p>
            <form className="mt-8 space-y-5" onSubmit={(event) => event.preventDefault()}>
              <div className="space-y-2"><Label htmlFor="signin-email">Email</Label><Input id="signin-email" type="email" className="rounded-none" placeholder="member@example.com" disabled /></div>
              <Button type="submit" className="w-full rounded-none" disabled>Secure sign in — coming next</Button>
            </form>
            <div className="mt-8 border-t border-border pt-6">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Prototype access</p>
              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Button asChild className="rounded-none"><Link to="/member">Enter member demo <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
                <Button asChild variant="outline" className="rounded-none"><Link to="/admin">Open concierge demo</Link></Button>
              </div>
            </div>
          </div>

          <aside className="border border-border bg-foreground p-6 text-background md:p-8">
            <ShieldCheck className="h-5 w-5 text-bronze" />
            <p className="mt-8 eyebrow text-background/60">Before launch</p>
            <h2 className="mt-3 font-display text-3xl">Private means private infrastructure too.</h2>
            <ul className="mt-6 space-y-4 text-sm leading-7 text-background/70">
              <li>Role-based authentication</li>
              <li>Member / next-gen / concierge permission boundaries</li>
              <li>Audit-safe admin actions</li>
              <li>Secure database policies</li>
              <li>Proper account recovery and session controls</li>
            </ul>
            <p className="mt-6 border-t border-background/20 pt-5 text-xs leading-6 text-background/55">Those controls should be wired after the product flow is approved, not improvised into a visual prototype.</p>
          </aside>
        </div>
      </Container>
    </section>
  );
}
