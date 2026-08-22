import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/cookies")({
  head: () => ({ meta: [{ title: `Cookies — ${site.name}` }, { name: "description", content: "Montvelle cookie and device-storage notice, including how to manage optional technologies." }] }),
  component: CookiesPage,
});

function CookiesPage() {
  return <LegalTemplate title="Cookie Notice" intro={`Last updated 22 August 2026. Montvelle, operated by ${site.operator}, uses strictly necessary browser storage to keep the service secure and remember privacy choices. Optional technologies are disabled by default until you choose them through our consent controls.`} sections={[
    { heading: "Strictly necessary", body: "Necessary storage supports security, authentication, session continuity, fraud prevention and remembering your cookie choices. These items are required for the service requested by the user and cannot be switched off through our consent tool, although you can control storage through your browser settings." },
    { heading: "Functional", body: "Functional technologies remember optional preferences or enable non-essential convenience features. They are off unless you enable them. Disabling them should not prevent access to the core public website, although some optional preferences may not persist." },
    { heading: "Analytics", body: "Analytics technologies may be used to understand aggregate use, performance and navigation so we can improve the service. Analytics storage is off until you consent. Where analytics is introduced, we should configure it to minimise data collection and avoid using it for unrelated advertising purposes." },
    { heading: "Other optional technologies", body: "Embedded media, external integrations or similar optional technologies may set or read storage through third parties. These are treated as optional and should not run before the relevant consent where applicable law requires it." },
    { heading: "Managing or withdrawing consent", body: "Use the Cookie settings control in the footer at any time to accept, reject or change optional categories. Withdrawing consent does not affect processing that was lawful before withdrawal. Browser controls can also delete existing cookies or block future storage, but blocking necessary storage may affect secure member functions." },
    { heading: "Google Translate and external services", body: "When you select a non-English language, Montvelle redirects the current public page through Google Translate. That service is provided independently by Google and may use its own cookies, device information and privacy practices once you leave the Montvelle domain. The English-language Montvelle documents remain authoritative." },
    { heading: "Retention and versioning", body: "Montvelle records the browser's current consent choices and the version of this notice locally so we know whether a fresh choice is required. We may ask again if the categories or purposes materially change. Individual third-party technologies may have different lifetimes, which should be documented when those technologies are introduced." },
    { heading: "Do Not Track and similar signals", body: "Browser privacy signals continue to evolve across jurisdictions. Where a legally binding opt-out or universal preference signal applies to a Montvelle activity, we will configure relevant systems to honour it. Montvelle does not sell member directory information or use the private member experience as an advertising marketplace." },
  ]} />;
}
