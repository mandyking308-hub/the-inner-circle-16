import { createFileRoute } from "@tanstack/react-router";

import { Hero } from "@/components/marketing/Hero";
import { Pillars } from "@/components/marketing/Pillars";
import { HomeStory } from "@/components/marketing/HomeStory";
import { site } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — A private London membership community` },
      { name: "description", content: site.description },
      { property: "og:title", content: `${site.name} — ${site.supportingLine}` },
      { property: "og:description", content: site.description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <Pillars />
      <HomeStory />
    </>
  );
}
