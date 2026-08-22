import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { site } from "@/config/site";
import { Container } from "./Container";

const communityLinks = [
  { to: "/ecosystem", label: "The Ecosystem" },
  { to: "/the-table", label: "The Table" },
  { to: "/decision-room", label: "Decision Room" },
  { to: "/global-life", label: "Global Life" },
  { to: "/family-learning", label: "Family Learning" },
  { to: "/partners", label: "Trusted Partners" },
  { to: "/concierge", label: "Concierge" },
  { to: "/alumni", label: "The Continuum" },
  { to: "/gatherings", label: "Gatherings" },
  { to: "/impact", label: "Impact" },
  { to: "/membership", label: "Membership" },
] as const;

const trustLinks = [
  { to: "/about", label: "About" },
  { to: "/principles", label: "Membership Principles" },
  { to: "/confidentiality", label: "Confidentiality & No Solicitation" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-background/10 bg-foreground text-background">
      <Container className="py-14 md:py-18">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr_0.7fr]">
          <div>
            <div className="flex items-center gap-3"><BrandMark inverse /><div><p className="font-display text-2xl">{site.name}</p><p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.2em] text-background/40">London · by invitation</p></div></div>
            <p className="mt-8 max-w-xl font-display text-4xl leading-[1.06] text-background">Success creates complexity. Nobody hands you the map.</p>
            <p className="mt-5 max-w-md text-xs leading-6 text-background/55">Trusted peers, qualified specialists, concierge execution and family capability — organised around the decisions that matter.</p>
            <Link to="/apply" className="mt-7 inline-flex items-center gap-2 border-b border-bronze pb-1 text-xs font-semibold uppercase tracking-[0.14em]">Request a seat <ArrowUpRight className="h-3.5 w-3.5" /></Link>
          </div>

          <nav>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-background/35">The house</p>
            <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {communityLinks.map((item) => <Link key={item.to} to={item.to} className="text-[11px] text-background/55 transition-colors hover:text-background">{item.label}</Link>)}
            </div>
          </nav>

          <nav>
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-background/35">Trust & access</p>
            <div className="mt-5 flex flex-col gap-3">
              {trustLinks.map((item) => <Link key={item.to} to={item.to} className="text-[11px] text-background/55 transition-colors hover:text-background">{item.label}</Link>)}
              <Link to="/auth" className="mt-3 text-[11px] font-semibold text-bronze">Member sign in</Link>
            </div>
          </nav>
        </div>

        <div className="mt-12 grid gap-4 border-t border-background/12 pt-6 text-[9px] leading-5 text-background/35 md:grid-cols-[1fr_auto]">
          <p>Project Table is a working name. Legal pages remain draft templates until professional review. The community does not itself provide legal, tax, immigration, investment, fiduciary, medical or other regulated professional advice.</p>
          <p>Private community · London</p>
        </div>
      </Container>
    </footer>
  );
}
