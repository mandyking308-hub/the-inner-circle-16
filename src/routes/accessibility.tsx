import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/accessibility")({
  head: () => ({ meta: [{ title: `Accessibility — ${site.name}` }, { name: "description", content: "Montvelle's approach to accessible digital experiences and member service." }],
    links: [{ rel: "canonical", href: `${site.url}/accessibility` }], }),
  component: AccessibilityPage,
});

function AccessibilityPage() {
  return <LegalTemplate title="Accessibility" intro="Last updated 22 August 2026. Montvelle aims to make its public website and member-facing digital experience usable by as many people as reasonably possible, including people using keyboards, screen readers, zoom, high-contrast settings and other assistive technology." sections={[
    { heading: "Our approach", body: "We aim to build semantic page structure, keyboard-operable controls, visible focus states, meaningful labels, sufficient text contrast, responsive layouts and useful alternative text where an image carries information. Decorative imagery should not create a barrier to understanding the page." },
    { heading: "Language and readability", body: "Public copy is written to be clear and concise. The language selector offers translated access to public pages through a third-party translation service, while the English version remains authoritative. Machine translation may not preserve every nuance or accessibility feature." },
    { heading: "Private member areas", body: "Member and administrator tools should follow the same accessibility principles, with additional care around forms, authentication, tables, dialogs, status messages and time-sensitive workflows. Accessibility should be tested whenever material new functionality is introduced." },
    { heading: "Third-party services", body: "Some journeys can lead to independently operated websites, venues, booking systems, advisers or translation services. Their accessibility is controlled by those providers. Where a member tells us a third-party route is not workable, our service team should try to identify a reasonable alternative where possible." },
    { heading: "Feedback and adjustments", body: "If you encounter an accessibility barrier, please use the contact route in your Montvelle application or membership correspondence and describe the page, task and adjustment that would help. We will use that information to investigate the issue and, where reasonably possible, provide an alternative route while it is being addressed." },
    { heading: "Continuous improvement", body: "Accessibility is treated as an operational requirement rather than a one-time statement. We expect to review the site as content, components, browsers, assistive technologies and applicable accessibility standards evolve." },
  ]} />;
}
