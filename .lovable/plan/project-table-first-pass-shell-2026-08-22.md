# Project Table — first-pass shell

A lightweight, beautiful shell for a private London membership community. No backend, no payments, no directories — just polished routing, navigation and a homepage.

## Brand config (easy rename)

A single `src/config/site.ts` holds the name ("Project Table"), tagline, supporting line and CTA copy. Every page and the nav read from it, so renaming later is a one-line change.

## Design system

Update `src/styles.css` tokens to a warm London-editorial palette:
- Warm ivory background, near-black foreground, muted warm greys
- Subtle bronze accent used sparingly (rules, small caps labels, link underlines, focus rings)
- Serif display headings (Cormorant Garamond) + clean sans UI text (Inter-alternative, e.g. Instrument/Work Sans), loaded via `<link>` in the root route
- Generous spacing scale, near-square corners, no gradients or shadows-as-decoration

## Pages

- `/` — homepage: minimal header, hero with "A private room for people building what outlives them", supporting line "Build. Protect. Govern. Pass it on.", one primary CTA "Request a seat" → `/apply`. Below: a short three-line pillar row (Build / Protect / Govern) and a quiet footer. No stock imagery.
- `/apply` — brief expression-of-interest form (name, email, short note) using shadcn form fields. Submit shows a thank-you state only; nothing is stored or sent.
- `/member` — empty authenticated-style placeholder page with a heading and "coming soon" note.
- `/admin` — same, empty placeholder.
- Auth placeholders: `/auth` sign-in page with email field, non-functional. A `useAuth` stub hook returns a hardcoded signed-out state so real auth can slot in later.

## Components

`src/components/layout/SiteHeader.tsx` (responsive nav, mobile sheet menu), `SiteFooter.tsx`, `Container.tsx`, `SectionHeading.tsx`, plus `src/components/marketing/Hero.tsx` and `Pillars.tsx`. Route files stay thin.

## Technical notes

- TanStack Router file routes: `index.tsx`, `apply.tsx`, `member.tsx`, `admin.tsx`, `auth.tsx`
- Each route defines its own `head()` metadata (title, description, og tags)
- Shared chrome in `__root.tsx` around `<Outlet />`
- Tailwind v4 tokens in `src/styles.css`; no hardcoded colour classes
- No database, no Cloud, no integrations in this pass
