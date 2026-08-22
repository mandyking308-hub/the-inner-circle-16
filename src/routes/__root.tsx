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
import { CookieBanner } from "@/components/common/CookieBanner";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { site } from "@/config/site";
import { luxuryImages } from "@/data/luxuryImages";

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
      { name: "robots", content: "index,follow,max-image-preview:large" },
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
      { rel: "canonical", href: site.url },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Newsreader:opsz,wght@6..72,300;6..72,400;6..72,500&display=swap" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return <html lang="en"><head><HeadContent /></head><body>{children}<Scripts /></body></html>;
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isPrivateArea = pathname === "/member" || pathname.startsWith("/member/") || pathname === "/admin" || pathname.startsWith("/admin/");
  return <QueryClientProvider client={queryClient}>{isPrivateArea ? <Outlet /> : <div className="flex min-h-screen flex-col bg-background paper-grain"><SiteHeader /><main className="flex-1"><Outlet /></main><SiteFooter /><CookieBanner /></div>}</QueryClientProvider>;
}
