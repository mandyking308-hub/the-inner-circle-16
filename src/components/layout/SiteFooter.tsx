import { Link } from "@tanstack/react-router";

import { Container } from "./Container";
import { site } from "@/config/site";

const communityLinks = [
  { to: "/about", label: "About" },
  { to: "/the-table", label: "The Table" },
  { to: "/gatherings", label: "Gatherings" },
  { to: "/legacy", label: "Legacy" },
  { to: "/next-gen", label: "Next Gen" },
  { to: "/impact", label: "Impact" },
  { to: "/membership", label: "Membership" },
] as const;

const trustLinks = [
  { to: "/principles", label: "Membership Principles" },
  { to: "/confidentiality", label: "Confidentiality & No Solicitation" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-[1fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl text-foreground">{site.name}</p>
            <p className="mt-2 max-w-xs text-xs leading-6 text-muted-foreground">{site.location} · By invitation. A private room for people building what outlives them.</p>
            <Link to="/apply" className="mt-5 inline-block text-xs font-medium underline decoration-bronze/40 underline-offset-4">Request a seat</Link>
          </div>
          <nav>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Community</p>
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-3">
              {communityLinks.map((item) => <Link key={item.to} to={item.to} className="text-xs text-muted-foreground transition-colors hover:text-foreground">{item.label}</Link>)}
            </div>
          </nav>
          <nav>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Trust & legal</p>
            <div className="mt-4 flex flex-col gap-3">
              {trustLinks.map((item) => <Link key={item.to} to={item.to} className="text-xs text-muted-foreground transition-colors hover:text-foreground">{item.label}</Link>)}
              <Link to="/auth" className="text-xs text-muted-foreground transition-colors hover:text-foreground">Member sign in</Link>
            </div>
          </nav>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-[11px] leading-5 text-muted-foreground">Project Table is a working name. Legal pages are draft templates and require review before launch. No investment, legal, tax or regulated professional advice is provided by the community itself.</div>
      </Container>
    </footer>
  );
}
