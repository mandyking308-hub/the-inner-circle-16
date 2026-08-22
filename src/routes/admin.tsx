import { createFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { site } from "@/config/site";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: `Admin — ${site.name}` },
      { name: "description", content: `Administration area for ${site.name}.` },
      { property: "og:title", content: `Admin — ${site.name}` },
      { property: "og:description", content: `Administration area for ${site.name}.` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Operations"
          title="Admin"
          description="Administration tools will live here. Nothing to manage yet."
        />
      </Container>
    </section>
  );
}
