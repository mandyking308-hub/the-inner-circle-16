import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { site } from "@/config/site";
import { Container } from "./Container";

const communityLinks = [
  { to: "/the-table", label: "Belong" },
  { to: "/global-life", label: "The World" },
  { to: "/gatherings", label: "Gatherings" },
  { to: "/family-learning", label: "Families" },
  { to: "/concierge", label: "Private Office" },
  { to: "/journal", label: "Journal" },
] as const;

const trustLinks = [
  { to: "/about", label: "Why this exists" },
  { to: "/membership", label: "Membership" },
  { to: "/principles", label: "Membership principles" },
  { to: "/confidentiality", label: "Confidentiality" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground/10 bg-[#eee6da] text-foreground">
      <Container className="py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr_0.7fr] lg:gap-20">
          <div>
            <div className="flex items-center gap-3"><BrandMark /><div><p className="font-display text-2xl">{site.name}</p><p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">London · by invitation</p></div></div>
            <p className="mt-10 max-w-xl font-display text-5xl leading-[1.04]">A private world around the life you've built.</p>
            <p className="mt-6 max-w-md text-sm leading-7 text-muted-foreground">Beautiful places, trusted people, family, culture, travel and a discreet private office behind it all.</p>
            <Link to="/apply" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Request membership <ArrowUpRight className="h-4 w-4" /></Link>
          </div>

          <nav>
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Explore</p>
            <div className="mt-6 flex flex-col gap-4">{communityLinks.map((item) => <Link key={item.to} to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item.label}</Link>)}</div>
          </nav>

          <nav>
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">Trust & access</p>
            <div className="mt-6 flex flex-col gap-4">{trustLinks.map((item) => <Link key={item.to} to={item.to} className="text-sm text-muted-foreground transition-colors hover:text-foreground">{item.label}</Link>)}<Link to="/auth" className="mt-2 text-sm font-semibold text-oxblood">Member sign in</Link></div>
          </nav>
        </div>

        <div className="mt-16 grid gap-4 border-t border-foreground/10 pt-6 text-[10px] leading-5 text-muted-foreground md:grid-cols-[1fr_auto]">
          <p>Membership is by application and invitation. Members instruct appropriately qualified professionals where regulated advice is required.</p>
          <p>Private community · London</p>
        </div>
      </Container>
    </footer>
  );
}
