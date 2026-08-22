# Project Table

**Working name.** A private, invitation-only London community for founders, family enterprises, investors, trusted advisers and philanthropists.

> A private room for people building what outlives them.
>
> **Build. Protect. Govern. Pass it on.**

## Product model

Project Table is designed as a trust system rather than a mass networking platform.

- **The Table** — recurring 8–12 person peer circles with accumulated context.
- **Community** — a private member directory focused on expertise, contribution and interests rather than public wealth.
- **Introductions** — concierge-brokered, consent-based warm introductions rather than cold direct messaging.
- **Ask & Offer** — structured Needs, Offers and Introduction Requests.
- **Gatherings** — private dinners, breakfasts, salons, masterclasses, retreats and impact visits.
- **Knowledge** — curated briefings and expert councils around governance, succession, technology, risk, philanthropy and next-generation stewardship.
- **Impact** — practical opportunities to contribute expertise, relationships and support.
- **Next Generation** — a separately protected programme with guardian/admin controls and no access to adult confidential rooms.
- **Concierge/Admin** — human curation of applications, Tables, events, introductions, conduct, content and safeguards.

Core principles: **Character, Contribution, Commitment, Confidentiality, No Solicitation.**

## Current MVP

The repository contains a complete clickable frontend prototype using fictional/local demo data. It intentionally does **not** activate production payments or authentication yet.

Public routes include About, The Table, Gatherings, Legacy, Next Gen, Impact, Membership, Apply and draft trust/legal templates.

Private demo routes include the member dashboard, My Table, Community, Introductions, Ask & Offer, Events, Knowledge, Impact, Next Gen, Profile and the full concierge/admin back office.

## Development strategy

This project is intentionally **GitHub-first** to minimise Lovable credit usage.

1. Build and verify substantive product changes in GitHub.
2. GitHub Actions runs the production build.
3. Merge approved work to `main`.
4. Let the connected Lovable project sync from GitHub.
5. Use Lovable primarily for visual review, occasional small refinements and publishing — not repeated feature generation.

The project uses TanStack Start, React, TypeScript, Tailwind and shadcn/Radix components, with the Lovable TanStack Vite configuration preserved so GitHub changes continue to sync cleanly back into Lovable.

## Local development

```sh
bun install
bun run dev
```

Production verification:

```sh
bun run build
```

## Before production launch

The following should be implemented only after the product flow is approved:

- production authentication and account recovery;
- role-based permissions for member, next-gen, moderator, concierge/admin and superadmin;
- PostgreSQL/Supabase schema and row-level security;
- persisted applications, RSVP, introduction and moderation workflows;
- secure handling of any verification documents;
- final legal/privacy documents and safeguarding review;
- payments and membership-plan activation;
- final brand/name and domain review.

All member names and operating examples currently in the app are fictional demo data.
