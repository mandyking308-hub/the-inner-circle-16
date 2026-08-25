import { site } from "@/config/site";

/** Routes that must never be indexed: private areas, auth and internal previews. */
export function isNonIndexablePath(pathname: string) {
  return pathname === "/auth"
    || pathname === "/demo"
    || pathname === "/supplier-portal"
    || pathname === "/member"
    || pathname.startsWith("/member/")
    || pathname === "/admin"
    || pathname.startsWith("/admin/")
    || pathname === "/supplier"
    || pathname.startsWith("/supplier/")
    || pathname.startsWith("/lovable/");
}

/** Absolute canonical URL for a public page, derived from its actual pathname. */
export function canonicalUrl(pathname: string) {
  const path = pathname === "/" ? "" : pathname.replace(/\/+$/, "");
  return `${site.url}${path}`;
}

export const INDEXABLE_ROBOTS = "index,follow,max-image-preview:large";
export const NON_INDEXABLE_ROBOTS = "noindex,nofollow,noarchive";
