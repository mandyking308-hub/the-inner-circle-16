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
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="font-display text-lg tracking-tight text-foreground md:text-xl">
          {site.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
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
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72 bg-background">
            <SheetTitle className="font-display px-6 pt-6 text-lg">{site.name}</SheetTitle>
            <nav className="mt-8 flex flex-col gap-6 px-6">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="text-base text-muted-foreground transition-colors hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                >
                  {item.label}
                </Link>
              ))}
              <Button asChild className="mt-2 rounded-none">
                <Link to="/apply" onClick={() => setOpen(false)}>
                  {site.ctaLabel}
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
