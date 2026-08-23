import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Linkedin, Youtube } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { LanguageSelector, translationNotice } from "@/components/common/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  { to: "/legal", label: "Legal" },
  { to: "/cookies", label: "Cookies" },
  { to: "/accessibility", label: "Accessibility" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-background">
      <div className="mx-auto w-full max-w-[110rem] px-6 py-16 sm:px-10 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_0.5fr_0.5fr_1fr_0.6fr]">
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
            <p className="text-[9px] font-semibold uppercase tracking-[0.26em] text-gold">Stay connected</p>
            <p className="mt-3 text-sm text-background/62">Discreet updates and invitations.</p>
            <form className="mt-4 flex max-w-sm gap-0" onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="footer-email">
                Your email
              </label>
              <Input
                id="footer-email"
                type="email"
                placeholder="Your email"
                className="rounded-none border-background/25 bg-transparent text-background placeholder:text-background/40"
              />
              <Button
                type="submit"
                aria-label="Subscribe"
                className="rounded-none bg-gold px-4 text-ink hover:bg-gold/90"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-3 max-w-sm text-[9px] leading-4 text-background/34">{translationNotice}</p>
          </div>

          <div className="flex items-start gap-4 lg:justify-end">
            <LanguageSelector inverse />
            <div className="flex items-center gap-3 text-background/60">
              <a href="https://www.linkedin.com" aria-label="LinkedIn" className="hover:text-gold">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://www.instagram.com" aria-label="Instagram" className="hover:text-gold">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="https://www.youtube.com" aria-label="YouTube" className="hover:text-gold">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-background/12 pt-6 text-[10px] text-background/42 lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap gap-6" aria-label="Legal">
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
