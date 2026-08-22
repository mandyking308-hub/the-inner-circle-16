import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { OPEN_COOKIE_SETTINGS_EVENT } from "@/components/common/CookieBanner";
import { LanguageSelector, translationNotice } from "@/components/common/LanguageSelector";
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
  { to: "/about", label: "About Montvelle" },
  { to: "/membership", label: "Membership" },
  { to: "/principles", label: "Membership principles" },
  { to: "/confidentiality", label: "Confidentiality" },
  { to: "/privacy", label: "Privacy" },
  { to: "/cookies", label: "Cookies" },
  { to: "/accessibility", label: "Accessibility" },
  { to: "/terms", label: "Terms" },
  { to: "/legal", label: "Legal notice" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-[#171716] text-white">
      <Container className="py-24 md:py-32">
        <div className="grid gap-16 lg:grid-cols-[1.35fr_0.65fr_0.65fr] lg:gap-24">
          <div>
            <div className="flex items-center gap-3"><BrandMark /><p className="font-display text-xl tracking-[0.11em]">MONTVELLE</p></div>
            <p className="mt-10 max-w-2xl font-display text-5xl leading-[1.02] md:text-6xl">A private world around the life you've built.</p>
            <p className="mt-7 max-w-md text-sm leading-7 text-white/58">Trusted people, exceptional access, family, culture, travel and a serious private office behind it all.</p>
            <Link to="/apply" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">Request membership <ArrowUpRight className="h-4 w-4" /></Link>
            <div className="mt-10"><LanguageSelector inverse /></div>
            <p className="mt-3 max-w-sm text-[9px] leading-4 text-white/34">{translationNotice}</p>
          </div>

          <nav aria-label="Explore Montvelle">
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/42">Explore</p>
            <div className="mt-7 flex flex-col gap-4">{exploreLinks.map((item) => <Link key={item.to} to={item.to} className="text-sm text-white/62 transition-colors hover:text-white">{item.label}</Link>)}</div>
          </nav>

          <nav aria-label="Membership and legal information">
            <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-white/42">Membership & trust</p>
            <div className="mt-7 flex flex-col gap-4">
              {trustLinks.map((item) => <Link key={item.to} to={item.to} className="text-sm text-white/62 transition-colors hover:text-white">{item.label}</Link>)}
              <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS_EVENT))} className="text-left text-sm text-white/62 transition-colors hover:text-white">Cookie settings</button>
              <Link to="/auth" className="mt-2 text-sm font-semibold text-white">Member sign in</Link>
            </div>
          </nav>
        </div>

        <div className="mt-20 grid gap-5 border-t border-white/12 pt-7 text-[10px] leading-5 text-white/40 md:grid-cols-[1fr_auto]">
          <div className="max-w-4xl space-y-2">
            <p>{site.legalNotice}</p>
            <p>Membership is by application and invitation. Montvelle is not a law firm, investment adviser, tax adviser, medical provider, immigration adviser, fiduciary or other regulated professional practice. Members instruct appropriately qualified professionals where regulated advice or services are required.</p>
            <p>© {new Date().getFullYear()} {site.operator}. All rights reserved.</p>
          </div>
          <p className="md:text-right">{site.domain}<br />London · global membership</p>
        </div>
      </Container>
    </footer>
  );
}
