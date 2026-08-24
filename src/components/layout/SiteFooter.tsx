import { Link } from "@tanstack/react-router";

import { BrandMark } from "@/components/brand/BrandMark";
import { FooterNetworkStrip } from "@/components/marketing/FooterNetworkStrip";
import { translationNotice } from "@/components/common/LanguageSelector";
import { site } from "@/config/site";

const columnOne = [
  { to: "/world", label: "The World" },
  { to: "/membership", label: "Membership" },
  { to: "/concierge", label: "Private Office" },
  { to: "/family-learning", label: "Family" },
] as const;

const columnTwo = [
  { to: "/gatherings", label: "Gatherings" },
  { to: "/global-life", label: "Global Life" },
  { to: "/impact", label: "Giving" },
  { to: "/about", label: "Our Story" },
  { to: "/montvelle-world", label: "Montvelle World" },
  { to: "/supplier-portal", label: "Supplier Portal" },
] as const;

const legalLinks = [
  { to: "/membership-agreement", label: "Membership Agreement" },
  { to: "/terms", label: "Terms" },
  { to: "/privacy", label: "Privacy" },
  { to: "/confidentiality", label: "Confidentiality" },
  { to: "/supplier-agreement", label: "Supplier & Partner Agreement" },
  { to: "/cancellation", label: "Cancellation Rights" },
  { to: "/legal", label: "Legal" },
  { to: "/cookies", label: "Cookies" },
  { to: "/accessibility", label: "Accessibility" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-background">
      <div className="mx-auto w-full max-w-[110rem] px-6 py-16 sm:px-10 lg:px-14">
        <FooterNetworkStrip />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_0.6fr_0.6fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <BrandMark compact />
              <span className="leading-none">
                <span className="font-display text-2xl tracking-[0.08em]">{site.name.toUpperCase()}</span>
                <span className="mt-1 block text-[8px] uppercase tracking-[0.34em] text-background/55">
                  A private world
                </span>
              </span>
            </div>
            <p className="mt-6 max-w-xs text-xs leading-6 text-background/55">{site.supportingLine}</p>
          </div>

          <nav aria-label="Explore Montvelle" className="flex flex-col gap-3">
            {columnOne.map((item) => (
              <Link key={item.to} to={item.to} className="text-sm text-background/62 hover:text-gold">
                {item.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="More about Montvelle" className="flex flex-col gap-3">
            {columnTwo.map((item) => (
              <Link key={item.to} to={item.to} className="text-sm text-background/62 hover:text-gold">
                {item.label}
              </Link>
            ))}
          </nav>

          <div>
            <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-gold">Speak to Montvelle</p>
            <p className="mt-3 max-w-sm text-sm leading-6 text-background/62">
              We do not publish an email address. Membership questions, privacy requests, formal
              notices and cancellations come through one secure route.
            </p>
            <Link
              to="/contact"
              className="mt-5 inline-flex border border-gold px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold hover:bg-gold hover:text-ink"
            >
              Contact Montvelle
            </Link>
            <p className="mt-5 max-w-sm text-[9px] leading-4 text-background/34">{translationNotice}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-background/12 pt-6 text-[10px] text-background/42 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Legal">
            {legalLinks.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-background">
                {item.label}
              </Link>
            ))}
          </nav>
          <p>{site.legalNotice}</p>
          <p>By invitation only</p>
        </div>
      </div>
    </footer>
  );
}
