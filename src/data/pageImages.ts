/**
 * Montvelle image inventory (non-homepage placements).
 *
 * RULE: one unique asset per placement. Never alias one asset to two keys and
 * never reuse a homepage asset (see `src/data/luxuryImages.ts`) on another page.
 * Adding a new placement means adding a new photograph.
 */
import worldHero from "@/assets/pg/world-hero.jpg";
import tableHero from "@/assets/pg/table-hero.jpg";
import tableFeature from "@/assets/pg/table-feature.jpg";
import tableSecondary from "@/assets/pg/table-secondary.jpg";
import partnersHero from "@/assets/pg/partners-hero.jpg";
import partnerApplication from "@/assets/pg/partner-application.jpg";
import membershipHero from "@/assets/pg/membership-hero.jpg";
import membershipFeature from "@/assets/pg/membership-feature.jpg";
import membershipSecondary from "@/assets/pg/membership-secondary.jpg";
import legacyHero from "@/assets/pg/legacy-hero.jpg";
import impactHero from "@/assets/pg/impact-hero.jpg";
import globalHero from "@/assets/pg/global-hero.jpg";
import globalFeature from "@/assets/pg/global-feature.jpg";
import globalSecondary from "@/assets/pg/global-secondary.jpg";
import gatheringsHero from "@/assets/pg/gatherings-hero.jpg";
import gatheringsFeature from "@/assets/pg/gatherings-feature.jpg";
import gatheringsSecondary from "@/assets/pg/gatherings-secondary.jpg";
import familyHero from "@/assets/pg/family-hero.jpg";
import familyFeature from "@/assets/pg/family-feature.jpg";
import familySecondary from "@/assets/pg/family-secondary.jpg";
import nextGenHero from "@/assets/pg/nextgen-hero.jpg";
import nextGenMentor from "@/assets/pg/nextgen-mentor.jpg";
import decisionHero from "@/assets/pg/decision-hero.jpg";
import conciergeHero from "@/assets/pg/concierge-hero.jpg";
import conciergeFeature from "@/assets/pg/concierge-feature.jpg";
import conciergeSecondary from "@/assets/pg/concierge-secondary.jpg";
import authEntry from "@/assets/pg/auth-entry.jpg";
import applyHero from "@/assets/pg/apply-hero.jpg";
import aboutHero from "@/assets/pg/about-hero.jpg";
import aboutMid from "@/assets/pg/about-mid.jpg";
import aboutEnd from "@/assets/pg/about-end.jpg";
import memberHome from "@/assets/pg/member-home.jpg";
import memberEvents from "@/assets/pg/member-events.jpg";
import memberControl from "@/assets/pg/member-control.jpg";
import journal1 from "@/assets/pg/journal-1.jpg";
import journal2 from "@/assets/pg/journal-2.jpg";
import journal3 from "@/assets/pg/journal-3.jpg";
import journal4 from "@/assets/pg/journal-4.jpg";
import journal5 from "@/assets/pg/journal-5.jpg";
import journal6 from "@/assets/pg/journal-6.jpg";

export const pageImages = {
  worldHero,
  tableHero,
  tableFeature,
  tableSecondary,
  partnersHero,
  partnerApplication,
  membershipHero,
  membershipFeature,
  membershipSecondary,
  legacyHero,
  impactHero,
  globalHero,
  globalFeature,
  globalSecondary,
  gatheringsHero,
  gatheringsFeature,
  gatheringsSecondary,
  familyHero,
  familyFeature,
  familySecondary,
  nextGenHero,
  nextGenMentor,
  decisionHero,
  conciergeHero,
  conciergeFeature,
  conciergeSecondary,
  authEntry,
  applyHero,
  aboutHero,
  aboutMid,
  aboutEnd,
  memberHome,
  memberEvents,
  memberControl,
  journal1,
  journal2,
  journal3,
  journal4,
  journal5,
  journal6,
} as const;
