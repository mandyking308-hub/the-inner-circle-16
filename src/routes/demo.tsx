import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, EyeOff, Layers, ShieldCheck } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { enableDemoMode } from "@/lib/demoMode";

const description =
  "Walk through Montvelle World — Today, Requests, Decision Room, Invitations, Community, Family and Messages — using illustrative demo data. No real member information is shown.";

export const Route = createFileRoute("/demo")({
  head: () => ({
    meta: [
      { title: `Montvelle World demo — ${site.name}` },
      { name: "description", content: description },
      { property: "og:title", content: `Montvelle World demo — ${site.name}` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${site.url}/demo` }],
  }),
  component: DemoPage,
});

const notes = [
  {
    icon: Layers,
    title: "Everything you see is illustrative.",
    body: "Members, households, requests, arrangements and invitations are neutral DEMO fixtures created for this walkthrough. Nothing here represents a real member, a live booking or confirmed inventory.",
  },
  {
    icon: EyeOff,
    title: "Nothing is sent, stored or shared.",
    body: "Anything you type stays in this browser session and disappears when you clear it. The demo has no access to production data, real accounts or operations tools.",
  },
  {
    icon: ShieldCheck,
    title: "Member view only.",
    body: "The demo opens the member environment. Operations, sourcing and supplier workspaces are not part of it and remain closed.",
  },
] as const;

function DemoPage() {
  const navigate = useNavigate();

  const enter = () => {
    enableDemoMode();
    void navigate({ to: "/member" });
  };

  return (
    <section className="bg-background">
      <Container className="py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="eyebrow text-oxblood">Montvelle World</p>
            <h1 className="mt-6 max-w-[16ch] font-display text-5xl leading-[0.98] md:text-7xl">
              Look inside, before you ask for a seat.
            </h1>
            <p className="mt-8 max-w-xl text-base leading-8 text-muted-foreground">
              This is an illustrative demonstration of the private environment that opens after membership. It uses
              fictional DEMO data throughout so you can judge how the world behaves — not what anyone else is doing in
              it.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Button onClick={enter} className="rounded-none bg-oxblood px-7 py-6 text-oxblood-foreground hover:bg-oxblood/90">
                Enter demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Link
                to="/montvelle-world"
                className="border-b border-bronze/60 pb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-oxblood transition-colors hover:text-foreground"
              >
                Read about Montvelle World
              </Link>
            </div>
            <p className="mt-8 text-xs leading-6 text-muted-foreground">
              Already a member?{" "}
              <Link to="/auth" className="border-b border-bronze pb-0.5 font-semibold text-foreground">
                Member access
              </Link>
              .
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {notes.map((note) => (
              <article key={note.title} className="grid gap-4 py-8 md:grid-cols-[40px_1fr] md:gap-6">
                <note.icon className="h-5 w-5 text-bronze" />
                <div>
                  <h2 className="font-display text-2xl leading-tight md:text-3xl">{note.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{note.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
