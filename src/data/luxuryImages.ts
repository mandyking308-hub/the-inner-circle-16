/**
 * Homepage-only photography.
 *
 * RULE: these assets belong to the approved homepage composition and must not
 * be reused on any other route. Every other placement lives in
 * `src/data/pageImages.ts` with its own unique asset. No aliases.
 */
import heroJet from "@/assets/hero-jet.jpg";
import globalLife from "@/assets/global-life.jpg";
import ourPeople from "@/assets/our-people.jpg";
import bespokeService from "@/assets/bespoke-service.jpg";
import familyLegacy from "@/assets/family-legacy.jpg";
import privateOffice from "@/assets/private-office.jpg";
import destParis from "@/assets/dest-paris.jpg";
import destCourchevel from "@/assets/dest-courchevel.jpg";
import cityLondon from "@/assets/city-london.jpg";
import cityDubai from "@/assets/city-dubai.jpg";
import cityGeneva from "@/assets/city-geneva.jpg";
import cityNewYork from "@/assets/city-newyork.jpg";

export const luxuryImages = {
  hero: heroJet,
  world: globalLife,
  table: ourPeople,
  service: bespokeService,
  family: familyLegacy,
  office: privateOffice,
} as const;

export const destinationImages = {
  paris: destParis,
  courchevel: destCourchevel,
  london: cityLondon,
  dubai: cityDubai,
  geneva: cityGeneva,
  newYork: cityNewYork,
} as const;
