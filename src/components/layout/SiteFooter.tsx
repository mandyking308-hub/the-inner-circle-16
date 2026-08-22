import { Link } from "@tanstack/react-router";

import { Container } from "./Container";
import { site, navItems } from "@/config/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/70 py-10">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-base text-foreground">{site.name}</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {site.location} &middot; By invitation
          </p>
        </div>
        <nav className="flex flex-wrap gap-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/auth"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Sign in
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
