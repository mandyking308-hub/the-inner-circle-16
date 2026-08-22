import { createFileRoute } from "@tanstack/react-router";

import { QuietLuxuryHome } from "@/components/marketing/QuietLuxuryHome";
import { site } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — A private world around the life you've built` },
      { name: "description", content: site.description },
      { property: "og:title", content: `${site.name} — ${site.positioning}` },
      { property: "og:description", content: site.description },
    ],
  }),
  component: Index,
});

function Index() {
  return <QuietLuxuryHome />;
}
