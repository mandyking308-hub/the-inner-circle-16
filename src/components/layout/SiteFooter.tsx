import { Link } from "@tanstack/react-router";

import { Container } from "./Container";
import { site } from "@/config/site";

const communityLinks = [
  { to: "/ecosystem", label: "The Ecosystem" },
  { to: "/the-table", label: "The Table" },
  { to: "/global-life", label: "Global Life" },
  { to: "/family-learning", label: "Family Learning" },
  { to: "/partners", label: "Trusted Partners" },
  { to: "/concierge", label: "Concierge" },
  { to: "/alumni", label: "Rising Gen & Alumni" },
  { to: "/gatherings", label: "Gatherings" },
  { to: "/legacy", label: "Legacy" },
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
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr_0.8fr]">
          <div>
            <p className="font-display text-xl text-foreground">{site.name}</p>
            <p className="mt-2 max-w-sm text-xs leading-6 text-muted-foreground">{site.location} · By invitation. Trusted peers, coordinated experts, family learning and execution for lives that have become more complex than one adviser or one country.</p>
            <Link to="/apply" className="mt-5 inline-block text-xs font-medium underline decoration-bronze/40 underline-offset-4">Request a seat</Link>
          </div>
          <nav>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Explore</p>
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
        <div className="mt-10 border-t border-border pt-6 text-[11px] leading-5 text-muted-foreground">Project Table is a working name. Legal pages are draft templates and require review before launch. The community does not itself provide investment, legal, tax, immigration, fiduciary, medical or other regulated professional advice; appropriate qualified professionals must be instructed where required.</div>
      </Container>
    </footer>
  );
}
