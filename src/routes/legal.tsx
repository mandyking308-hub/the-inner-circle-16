import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/legal")({
  head: () => ({ meta: [{ title: `Legal notice — ${site.name}` }, { name: "description", content: "Corporate, brand and regulatory status information for Montvelle." }] }),
  component: LegalNoticePage,
});

function LegalNoticePage() {
  return <LegalTemplate title="Legal notice" intro={`Montvelle is a trading brand operated by ${site.operator}, a limited liability company organised in Delaware, United States. Domain: ${site.domain}. The Montvelle public website and membership experience are operated within the Global Solutions Management LLC portfolio.`} sections={[
    { heading: "Operator", body: "The contracting operator for the Montvelle website and platform is Global Solutions Management LLC unless a signed membership agreement, supplier contract or invoice expressly identifies another contracting entity. Corporate registration, tax and notice details should be supplied on formal contracts and invoices as required by applicable law." },
    { heading: "Private membership status", body: "Montvelle is a private membership, community, concierge and private-office coordination service. Membership is by application and invitation and is not an offer of securities, investment products, regulated financial advice or a public fund." },
    { heading: "No regulated professional practice", body: "Montvelle and Global Solutions Management LLC are not presented as a law firm, tax practice, medical provider, immigration adviser, fiduciary, broker-dealer, investment adviser or other regulated professional practice. Where a member needs regulated advice or services, the member must instruct an appropriately qualified professional under that professional's own engagement terms." },
    { heading: "Trusted Partners", body: "Independent professionals and suppliers may be introduced through Montvelle. Unless a signed agreement expressly says otherwise, they act independently and are responsible for their own licences, professional duties, insurance, advice, services, taxes and contractual obligations." },
    { heading: "Brand and intellectual property", body: "Montvelle, its monogram, original editorial material, software, private frameworks, visual identity and non-public member materials are owned by or licensed to Global Solutions Management LLC. No licence is granted to reproduce, imitate, scrape, resell or commercially exploit them except as expressly permitted." },
    { heading: "International access", body: "Montvelle is designed for an international membership, but availability of specific services may depend on location, local law, sanctions, supplier capability, licensing, insurance and other regulatory considerations. Nothing on the website represents that every service is available in every jurisdiction." },
    { heading: "Sanctions and unlawful use", body: "Montvelle will not knowingly provide services where doing so would breach applicable sanctions, anti-money-laundering requirements, export controls, anti-bribery laws or other legal restrictions. We may request reasonable compliance information, refuse a transaction or restrict access where legally or reasonably required." },
    { heading: "Website information", body: "Public content is general information and brand/editorial material. It is not professional advice and should not be relied upon as a substitute for advice tailored to a person's circumstances. Reasonable care is taken with content, but completeness, timeliness and third-party information can change." },
    { heading: "Translations", body: "Translated public pages are provided for convenience through a third-party translation service. The English-language Montvelle website, policies and contractual documents are authoritative unless a signed agreement expressly provides otherwise." },
    { heading: "Legal enquiries", body: "Formal legal, privacy, intellectual-property or compliance notices should be sent through the contact route stated in the relevant Montvelle contract, application or membership correspondence until a dedicated legal notice address is published on this page." },
  ]} />;
}
