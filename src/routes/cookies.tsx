import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: `Cookies — ${site.name}` }, { name: "description", content: "How Montvelle uses cookies, local storage and similar technologies." }] }),
  component: CookiesPage,
});

function CookiesPage() {
  return <LegalTemplate title="Cookies & local storage" documentKey="cookies" intro="Montvelle uses a deliberately restrained technology stack. We do not design the public site around advertising trackers, behavioural profiling or the sale of browsing data." sections={[
    { heading: "What these technologies are", body: "Cookies are small text files stored by a browser. Similar technologies can include local storage, session storage, authentication tokens and security identifiers. They can be necessary for sign-in, security, preferences and reliable operation." },
    { heading: "Strictly necessary use", body: "Member and administrator areas may use technically necessary storage or tokens to authenticate a user, preserve a secure session, remember security state and prevent abuse. These technologies are required for the service requested by the user and are not used for advertising." },
    { heading: "Preferences", body: "Where Montvelle stores a language, accessibility or interface preference, it is used to provide the experience the user selected. If a visitor chooses a translated language in the public language selector, that choice is stored in a \"googtrans\" cookie (site preference) so the selected translation can be applied and remembered. The English-language version remains authoritative, and this preference is not used for advertising or profiling." },
    { heading: "Analytics and marketing", body: "Montvelle should not activate non-essential analytics, advertising pixels, cross-site tracking or behavioural marketing technologies without first implementing the consent and disclosure controls required by applicable law. If such tools are introduced, this notice and the relevant consent controls should be updated before they are enabled." },
    { heading: "Third parties", body: "Translation is performed in-page by Google Translate. Choosing a translated language loads Google's translation resources into the page, and Google may set its own cookies or similar technologies under its own policies. No Google translation resources are loaded while the site is viewed in English. Links to independently operated providers may also set their own storage once a user enters those services; Montvelle does not control storage set by third parties." },
    { heading: "Browser controls", body: "Browsers generally allow users to view, block or delete cookies and site storage. Blocking strictly necessary storage can prevent sign-in, security features or private member functions from working correctly." },
    { heading: "Changes", body: "We may update this notice if the technology used by Montvelle changes. Any future non-essential tracking should be assessed before deployment so that appropriate consent, opt-out and regional privacy requirements are respected." },
  ]} />;
}
