import { createFileRoute } from "@tanstack/react-router";

import { QuietLuxuryHome } from "@/components/marketing/QuietLuxuryHome";
import { site } from "@/config/site";

/** Restrained structured data: only facts already published on the site. */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}#website`,
      url: site.url,
      name: site.name,
      description: site.description,
      inLanguage: "en",
      publisher: { "@id": `${site.url}#operator` },
    },
    {
      "@type": "Organization",
      "@id": `${site.url}#operator`,
      name: site.operator,
      legalName: site.operator,
      url: site.url,
      brand: {
        "@type": "Brand",
        name: site.name,
        slogan: site.positioning,
      },
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — A private world around the life you've built` },
      { name: "description", content: site.description },
      { property: "og:title", content: `${site.name} — ${site.positioning}` },
      { property: "og:description", content: site.description },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(structuredData),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <QuietLuxuryHome />;
}
