import { createFileRoute } from "@tanstack/react-router";

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
      { property: "og:title", content: `Sign in — ${site.name}` },
      { property: "og:description", content: `Member sign in for ${site.name}.` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  return (
    <section className="py-20 md:py-28">
      <Container className="max-w-md">
        <p className="eyebrow">Members</p>
        <h1 className="font-display mt-4 text-3xl text-foreground">Sign in</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Authentication is not connected yet. This screen is a placeholder.
        </p>
        <form className="mt-10 space-y-6" onSubmit={(event) => event.preventDefault()}>
          <div className="space-y-2">
            <Label htmlFor="signin-email">Email</Label>
            <Input id="signin-email" type="email" className="rounded-none" disabled />
          </div>
          <Button type="submit" className="w-full rounded-none" disabled>
            Continue
          </Button>
        </form>
      </Container>
    </section>
  );
}
