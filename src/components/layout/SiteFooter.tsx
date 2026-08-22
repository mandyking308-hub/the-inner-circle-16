import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { site } from "@/config/site";
import { Container } from "./Container";

const exploreLinks = [
  { to: "/the-table", label: "The Table" },
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
    <footer className="bg-[#171716] text-white">
      <Container className="py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.35fr_0.65fr_0.65fr] lg:gap-24">
          <div>
            <div className="flex items-center gap-3"><BrandMark /><p className="font-display text-2xl">{site.name}</p></div>
            <p className="mt-10 max-w-2xl font-display text-5xl leading-[1.02] md:text-6xl">A private world around the life you've built.</p>
            <p className="mt-7 max-w-md text-sm leading-7 text-white/58">Trusted people, beautiful places, family, culture, travel and a serious private office behind it all.</p>
            <Link to="/apply" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Request membership <ArrowUpRight className="h-4 w-4" /></Link>
          </div>

          <nav>
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/42">Explore</p>
            <div className="mt-7 flex flex-col gap-4">{exploreLinks.map((item) => <Link key={item.to} to={item.to} className="text-sm text-white/62 transition-colors hover:text-white">{item.label}</Link>)}</div>
          </nav>

          <nav>
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/42">Membership & trust</p>
            <div className="mt-7 flex flex-col gap-4">{trustLinks.map((item) => <Link key={item.to} to={item.to} className="text-sm text-white/62 transition-colors hover:text-white">{item.label}</Link>)}<Link to="/auth" className="mt-2 text-sm font-semibold text-white">Member sign in</Link></div>
          </nav>
        </div>

        <div className="mt-20 grid gap-5 border-t border-white/12 pt-7 text-[10px] leading-5 text-white/40 md:grid-cols-[1fr_auto]">
          <p>Membership is by application and invitation. Members instruct appropriately qualified professionals where regulated advice is required.</p>
          <p>London · private membership</p>
        </div>
      </Container>
    </footer>
  );
}
