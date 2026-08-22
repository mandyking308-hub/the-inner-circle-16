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
    <header className="sticky top-0 z-50 border-b border-foreground/8 bg-[#f6f1e8]/95 backdrop-blur-xl">
      <Container className="flex h-[78px] items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <BrandMark compact />
          <span className="font-display text-[1.55rem] leading-none text-foreground">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="whitespace-nowrap text-[10px] font-medium tracking-[0.02em] text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "text-foreground" }}>
              {item.label}
            </Link>
          ))}
          <Link to="/auth" className="ml-1 text-[10px] font-medium text-muted-foreground transition-colors hover:text-foreground">Sign in</Link>
          <Button asChild size="sm" className="ml-1 rounded-full bg-foreground px-5 text-background hover:bg-foreground/88">
            <Link to="/apply">Request membership <ArrowUpRight className="ml-2 h-3.5 w-3.5" /></Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="xl:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu" className="rounded-full"><Menu className="size-5" /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[90vw] max-w-sm border-l border-foreground/10 bg-[#f6f1e8] p-0">
            <div className="px-7 pb-5 pt-8">
              <div className="flex items-center gap-3"><BrandMark compact /><SheetTitle className="font-display text-2xl">{site.name}</SheetTitle></div>
            </div>
            <nav className="flex flex-col px-7 py-6">
              {navItems.map((item) => (
                <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="border-b border-foreground/10 py-5 font-display text-3xl text-foreground">
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
