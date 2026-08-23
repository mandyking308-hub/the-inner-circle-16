import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Menu } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { LanguageSelector } from "@/components/common/LanguageSelector";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navItems, site } from "@/config/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ink text-background">
      <div className="border-b border-background/10 py-2 text-center text-[9px] font-semibold uppercase tracking-[0.28em] text-gold">
        Welcome to {site.name}. {site.positioning}
      </div>

      <div className="mx-auto flex w-full max-w-[110rem] items-center justify-between gap-6 px-6 py-4 sm:px-10 lg:px-14">
        <Link to="/" className="flex items-center gap-3" aria-label={`${site.name} home`}>
          <BrandMark compact />
          <span className="leading-none">
            <span className="font-display text-2xl tracking-[0.08em]">{site.name.toUpperCase()}</span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.34em] text-background/55">
              A private world
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary navigation">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap text-[13px] text-background/78 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 xl:flex">
          <LanguageSelector inverse />
          <Button
            asChild
            size="sm"
            className="rounded-none bg-gold px-5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink hover:bg-gold/90"
          >
            <Link to="/apply">
              Membership inquiry <ArrowRight className="ml-2 h-3.5 w-3.5" />
            </Link>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu" className="text-background hover:bg-background/10 hover:text-background">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[90vw] max-w-sm border-l border-background/10 bg-ink p-0 text-background">
            <div className="px-7 pb-5 pt-8">
              <div className="flex items-center gap-3">
                <BrandMark compact />
                <SheetTitle className="font-display text-2xl tracking-[0.08em] text-background">
                  {site.name.toUpperCase()}
                </SheetTitle>
              </div>
            </div>
            <nav className="flex flex-col px-7 py-4" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-background/12 py-4 font-display text-2xl"
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-6">
                <LanguageSelector compact inverse />
              </div>
              <Link to="/auth" onClick={() => setOpen(false)} className="mt-6 text-sm text-background/65">
                Member sign in
              </Link>
              <Button
                asChild
                className="mt-6 rounded-none bg-gold text-[11px] font-semibold uppercase tracking-[0.18em] text-ink hover:bg-gold/90"
              >
                <Link to="/apply" onClick={() => setOpen(false)}>
                  Membership inquiry
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
