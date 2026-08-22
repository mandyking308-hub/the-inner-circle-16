import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/accessibility")({
  head: () => ({ meta: [{ title: `Accessibility — ${site.name}` }, { name: "description", content: "Montvelle accessibility commitment for its public site and member experience." }] }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return <LegalTemplate title="Accessibility" intro={`Montvelle is designed for an international membership and we want the public website and core member journeys to be usable by as many people as reasonably possible. ${site.operator} treats accessibility as an ongoing product and service responsibility rather than a one-time certification.`} sections={[
    { heading: "Our target", body: "We aim to follow recognised web accessibility practices, including meaningful structure, keyboard access, readable contrast, text alternatives, focus states, responsive layouts and compatibility with common assistive technologies. New core features should be assessed against WCAG 2.2 AA principles where reasonably applicable." },
    { heading: "Language and translation", body: "Public pages can be routed through a third-party translation service for convenience. Machine translation can introduce errors and may not preserve every accessibility feature of the original page. The English-language Montvelle site remains the authoritative version." },
    { heading: "Images and media", body: "Meaningful editorial images should include useful text alternatives where they communicate information. Decorative imagery should not create unnecessary noise for screen-reader users. Video or audio introduced into essential journeys should include appropriate captions, transcripts or alternatives where reasonably required." },
    { heading: "Member and private-office tools", body: "Core private member journeys should be operable without relying solely on colour, pointer-only interaction or inaccessible visual cues. Where a complex third-party integration creates an accessibility barrier, we will seek a reasonable alternative route for the member." },
    { heading: "Physical experiences", body: "Accessibility needs for gatherings, travel, family programmes or other physical experiences vary by venue and supplier. Members are encouraged to tell the concierge or event team about relevant access needs early enough for us to work with the venue or supplier on reasonable arrangements." },
    { heading: "Feedback and assistance", body: "If you encounter an accessibility barrier, use the contact route in your Montvelle application or membership correspondence and describe the page, feature or service involved. We will aim to understand the issue, provide a practical alternative where possible and feed material issues into product remediation." },
    { heading: "Third-party services", body: "Some booking, payment, translation, map, media or professional-service experiences may be delivered by independent third parties. We cannot control every aspect of their accessibility, but we can use accessibility as a factor in supplier selection and help members find an alternative route where practical." },
  ]} />;
}
