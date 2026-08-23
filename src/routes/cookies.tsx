import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: `Cookies — ${site.name}` }, { name: "description", content: "How Montvelle uses cookies, local storage and similar technologies." }],
    links: [{ rel: "canonical", href: `${site.url}/cookies` }], }),
  component: CookiesPage,
});

function CookiesPage() {
  return <LegalTemplate title="Cookies & local storage" intro="Last updated 22 August 2026. Montvelle uses a deliberately restrained technology stack. We do not design the public site around advertising trackers, behavioural profiling or the sale of browsing data." sections={[
    { heading: "What these technologies are", body: "Cookies are small text files stored by a browser. Similar technologies can include local storage, session storage, authentication tokens and security identifiers. They can be necessary for sign-in, security, preferences and reliable operation." },
    { heading: "Strictly necessary use", body: "Member and administrator areas may use technically necessary storage or tokens to authenticate a user, preserve a secure session, remember security state and prevent abuse. These technologies are required for the service requested by the user and are not used for advertising." },
    { heading: "Preferences", body: "Where Montvelle stores a language, accessibility or interface preference, it is used to provide the experience the user selected. The public language selector currently redirects a chosen page to a third-party translation service rather than creating a Montvelle advertising profile." },
    { heading: "Analytics and marketing", body: "Montvelle should not activate non-essential analytics, advertising pixels, cross-site tracking or behavioural marketing technologies without first implementing the consent and disclosure controls required by applicable law. If such tools are introduced, this notice and the relevant consent controls should be updated before they are enabled." },
    { heading: "Third parties", body: "External services opened at a user's request, including Google Translate or links to independent providers, may set their own cookies or similar technologies under their own policies. Montvelle does not control storage set after a user leaves the Montvelle site or enters a separately operated third-party service." },
    { heading: "Browser controls", body: "Browsers generally allow users to view, block or delete cookies and site storage. Blocking strictly necessary storage can prevent sign-in, security features or private member functions from working correctly." },
    { heading: "Changes", body: "We may update this notice if the technology used by Montvelle changes. Any future non-essential tracking should be assessed before deployment so that appropriate consent, opt-out and regional privacy requirements are respected." },
  ]} />;
}
