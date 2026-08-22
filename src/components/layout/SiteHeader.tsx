import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";

import { Container } from "./Container";
import { site, navItems } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between xl:h-20">
        <Link to="/" className="group">
          <span className="block font-display text-lg tracking-tight text-foreground md:text-xl">{site.name}</span>
          <span className="mt-0.5 hidden text-[8px] uppercase tracking-[0.22em] text-muted-foreground sm:block">London · private community</span>
        </Link>

        <nav className="hidden items-center gap-4 xl:flex 2xl:gap-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="whitespace-nowrap text-xs text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="rounded-none px-5">
            <Link to="/apply">{site.ctaLabel}</Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu"><Menu className="size-5" /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-background">
            <SheetTitle className="font-display px-6 pt-6 text-xl">{site.name}</SheetTitle>
            <p className="px-6 pt-2 text-xs text-muted-foreground">{site.supportingLine}</p>
            <nav className="mt-8 flex flex-col gap-5 px-6">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="text-base text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2 rounded-none"><Link to="/apply" onClick={() => setOpen(false)}>{site.ctaLabel}</Link></Button>
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
