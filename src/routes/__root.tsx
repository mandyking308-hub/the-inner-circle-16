import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingLanguageSelector } from "@/components/common/FloatingLanguageSelector";
import { site } from "@/config/site";
import { luxuryImages } from "@/data/luxuryImages";
import {
  canonicalUrl,
  isNonIndexablePath,
  INDEXABLE_ROBOTS,
  NON_INDEXABLE_ROBOTS,
} from "@/lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center"><p className="eyebrow text-oxblood">{site.name}</p><h1 className="mt-5 font-display text-8xl text-foreground">404</h1><h2 className="mt-4 font-display text-3xl text-foreground">This room does not exist.</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">The page may have moved, or the door you followed is no longer open.</p><div className="mt-7"><Link to="/" className="inline-flex items-center justify-center bg-oxblood px-6 py-3 text-sm font-medium text-oxblood-foreground transition-colors hover:bg-foreground">Return to Montvelle</Link></div></div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4"><div className="max-w-md text-center"><p className="eyebrow text-oxblood">Private service</p><h1 className="mt-5 font-display text-4xl text-foreground">This page did not load.</h1><p className="mt-3 text-sm leading-7 text-muted-foreground">Try again, or return to Montvelle.</p><div className="mt-7 flex flex-wrap justify-center gap-2"><button onClick={() => { router.invalidate(); reset(); }} className="inline-flex items-center justify-center bg-oxblood px-5 py-2.5 text-sm font-medium text-oxblood-foreground transition-colors hover:bg-foreground">Try again</button><a href="/" className="inline-flex items-center justify-center border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent">Go home</a></div></div></div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${site.name} — ${site.positioning}` },
      { name: "application-name", content: site.name },
      { name: "description", content: site.description },
      
      { name: "theme-color", content: "#651f24" },
      { property: "og:site_name", content: site.name },
      { property: "og:title", content: `${site.name} — ${site.positioning}` },
      { property: "og:description", content: site.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: site.url },
      { property: "og:image", content: luxuryImages.hero },
      { property: "og:image:alt", content: "Montvelle — a private world around the life you've built" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${site.name} — ${site.positioning}` },
      { name: "twitter:description", content: site.description },
      { name: "twitter:image", content: luxuryImages.hero },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500&display=swap" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "alternate icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const nonIndexable = isNonIndexablePath(pathname);
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <meta name="robots" content={nonIndexable ? NON_INDEXABLE_ROBOTS : INDEXABLE_ROBOTS} />
        {nonIndexable ? null : <link rel="canonical" href={canonicalUrl(pathname)} />}
      </head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

/**
 * Right-click deterrent requested for the Montvelle site. This is a presentation
 * deterrent only, not a security boundary: content remains fully accessible to
 * keyboard users, assistive technology, copy/paste shortcuts and view-source.
 */
function useContextMenuDeterrent() {
  useEffect(() => {
    const handler = (event: MouseEvent) => event.preventDefault();
    document.addEventListener("contextmenu", handler);
    return () => document.removeEventListener("contextmenu", handler);
  }, []);
}

/**
 * Global scroll-to-top on route navigation. Runs in the root component so it
 * applies to every route without per-page wiring.
 *
 * - On every client-side pathname change, resets window scroll to the top.
 * - On direct page load/refresh, also starts at the top (history.scrollRestoration
 *   is forced to "manual" so the browser does not restore an old position).
 * - If the URL carries an explicit hash/anchor, the named element is scrolled
 *   into view instead of forcing the page to the top, preserving intentional
 *   anchor navigation.
 * - Only scrolls the window; internal scroll containers, modals and drawers
 *   that manage their own scroll are unaffected.
 */
function useScrollToTopOnNavigation() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const hash = useRouterState({ select: (state) => state.location.hash });
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const before = window.scrollY;
    console.log("[scrolltop] effect fired", { pathname, hash, before });
    if (hash) {
      const id = decodeURIComponent(hash.replace(/^#/, ""));
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
    console.log("[scrolltop] after scrollTo", { after: window.scrollY });
  }, [pathname, hash]);
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  useContextMenuDeterrent();
  useScrollToTopOnNavigation();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isPrivateArea = pathname === "/member" || pathname.startsWith("/member/") || pathname === "/admin" || pathname.startsWith("/admin/") || pathname === "/supplier" || pathname.startsWith("/supplier/");
  return <QueryClientProvider client={queryClient}>{isPrivateArea ? <Outlet /> : <div className="flex min-h-screen flex-col bg-background paper-grain"><SiteHeader /><main className="flex-1"><Outlet /></main><SiteFooter /><FloatingLanguageSelector /></div>}</QueryClientProvider>;
}
