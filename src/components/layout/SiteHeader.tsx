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
    <header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/92 backdrop-blur-xl">
      <Container className="flex h-[86px] items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <BrandMark compact />
          <span>
            <span className="block font-display text-[1.45rem] leading-none text-foreground">{site.name}</span>
            <span className="mt-1.5 hidden text-[8px] uppercase tracking-[0.22em] text-muted-foreground sm:block">London · by invitation</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap text-[11px] font-medium tracking-[0.02em] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/auth" className="text-[11px] font-medium text-muted-foreground transition-colors hover:text-foreground">Sign in</Link>
          <Button asChild size="sm" variant="outline" className="rounded-full border-foreground/30 bg-transparent px-5 text-foreground hover:bg-foreground hover:text-background">
            <Link to="/apply">Request membership<ArrowUpRight className="ml-2 h-3.5 w-3.5" /></Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu" className="rounded-full"><Menu className="size-5" /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[90vw] max-w-sm border-l border-foreground/10 bg-background p-0">
            <div className="px-7 pb-5 pt-8">
              <div className="flex items-center gap-3"><BrandMark compact /><div><SheetTitle className="font-display text-2xl">{site.name}</SheetTitle><p className="mt-1 text-[9px] uppercase tracking-[0.2em] text-muted-foreground">London · by invitation</p></div></div>
            </div>
            <nav className="flex flex-col px-7 py-6">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="border-b border-border/70 py-5 font-display text-3xl text-foreground">
                  {item.label}
                </Link>
              ))}
              <Link to="/auth" onClick={() => setOpen(false)} className="mt-7 text-sm text-muted-foreground">Member sign in</Link>
              <Button asChild className="mt-6 rounded-full"><Link to="/apply" onClick={() => setOpen(false)}>Request membership</Link></Button>
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
