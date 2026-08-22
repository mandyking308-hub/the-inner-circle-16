import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu } from "lucide-react";

import { BrandMark } from "@/components/brand/BrandMark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navItems, site } from "@/config/site";
import { Container } from "./Container";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/15 bg-background/95 backdrop-blur-xl">
      <div className="border-b border-foreground/10 bg-foreground text-background">
        <Container className="flex h-7 items-center justify-between text-[9px] uppercase tracking-[0.22em] text-background/60">
          <span>London · by invitation</span>
          <span className="hidden sm:inline">Private family enterprise community</span>
        </Container>
      </div>

      <Container className="flex h-[74px] items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <BrandMark compact />
          <span>
            <span className="block font-display text-[1.35rem] leading-none text-foreground">{site.name}</span>
            <span className="mt-1 hidden text-[8px] uppercase tracking-[0.2em] text-muted-foreground sm:block">People · structure · execution · legacy</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative whitespace-nowrap py-2 text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-oxblood transition-transform group-hover:scale-x-100" />
            </Link>
          ))}
          <Link to="/auth" className="text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground">Member sign in</Link>
          <Button asChild size="sm" className="rounded-none border border-oxblood bg-oxblood px-5 text-oxblood-foreground hover:bg-foreground">
            <Link to="/apply">{site.ctaLabel}<ArrowUpRight className="ml-2 h-3.5 w-3.5" /></Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu" className="rounded-none border border-border"><Menu className="size-5" /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[88vw] max-w-sm border-l border-foreground/15 bg-background p-0">
            <div className="border-b border-border bg-foreground px-6 py-7 text-background">
              <div className="flex items-center gap-3"><BrandMark inverse compact /><div><SheetTitle className="font-display text-2xl text-background">{site.name}</SheetTitle><p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-background/55">London · private community</p></div></div>
              <p className="mt-7 max-w-xs font-display text-3xl leading-tight">{site.positioning}</p>
            </div>
            <nav className="flex flex-col px-6 py-7">
              {navItems.map((item, index) => (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="grid grid-cols-[42px_1fr] border-b border-border py-4 text-base text-foreground">
                  <span className="font-display text-lg text-oxblood">0{index + 1}</span><span>{item.label}</span>
                </Link>
              ))}
              <Link to="/auth" onClick={() => setOpen(false)} className="mt-6 text-sm text-muted-foreground">Member sign in</Link>
              <Button asChild className="mt-6 rounded-none bg-oxblood text-oxblood-foreground hover:bg-foreground"><Link to="/apply" onClick={() => setOpen(false)}>{site.ctaLabel}</Link></Button>
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
