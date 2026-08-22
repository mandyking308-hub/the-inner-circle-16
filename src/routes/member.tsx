import { createFileRoute } from "@tanstack/react-router";

import { Container } from "@/components/layout/Container";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { site } from "@/config/site";

export const Route = createFileRoute("/member")({
  head: () => ({
    meta: [
      { title: `Member area — ${site.name}` },
      { name: "description", content: `The private member area of ${site.name}.` },
      { property: "og:title", content: `Member area — ${site.name}` },
      { property: "og:description", content: `The private member area of ${site.name}.` },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: MemberPage,
});

function MemberPage() {
  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="Members"
          title="Member area"
          description="This space is reserved for members. It is intentionally empty for now."
        />
      </Container>
    </section>
  );
}
