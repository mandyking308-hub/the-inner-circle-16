import { createFileRoute } from "@tanstack/react-router";
import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { site } from "@/config/site";

export const Route = createFileRoute("/legal")({
  head: () => ({ meta: [{ title: `Legal notice — ${site.name}` }, { name: "description", content: "Corporate, regulatory and legal information for Montvelle." }],
    links: [{ rel: "canonical", href: `${site.url}/legal` }], }),
  component: LegalNoticePage,
});

function LegalNoticePage() {
  return <LegalTemplate title="Legal notice" intro={`Last updated 22 August 2026. ${site.name} is operated by ${site.operator}, a Delaware limited liability company. The Montvelle website and membership experience are provided under that operating entity unless a specific written agreement identifies another contracting party.`} sections={[
    { heading: "Operator", body: "Montvelle is a brand operated by Global Solutions Management LLC, a Delaware limited liability company. The applicable membership agreement, invoice, order form or engagement document identifies the contracting entity for any paid relationship and takes precedence where it expressly differs from this public notice." },
    { heading: "Nature of the service", body: "Montvelle is a private membership, community, coordination and lifestyle service. It brings together peer relationships, gatherings, introductions, concierge coordination, family learning and private-office tools. It is not, by itself, a regulated legal, investment, tax, medical, immigration, fiduciary or financial-advisory service." },
    { heading: "Independent professionals", body: "Lawyers, accountants, investment professionals, medical professionals, immigration advisers, fiduciaries, property specialists, educators and other experts introduced through or visible within Montvelle act independently unless a written agreement expressly says otherwise. Their professional duties, licences, fees and advice belong to their own engagement with the member." },
    { heading: "No partnership or agency", body: "Membership, attendance at a gathering, participation in a Table, an introduction or inclusion in a directory does not create a partnership, joint venture, fiduciary relationship, employment relationship or agency between Montvelle and a member, guest, Trusted Partner or third party unless a written agreement expressly creates one." },
    { heading: "No public offer", body: "Nothing on this website is an offer of securities, investment advice, solicitation to invest, public fundraising solicitation or guarantee of access to any transaction. Any investment, financing or regulated opportunity must be handled separately by appropriately authorised parties under the law that applies to it." },
    { heading: "Third-party names and services", body: "References to locations, hotels, schools, venues, advisers, brands, institutions or other third parties are descriptive only unless an express partnership is stated. Their names and marks remain the property of their respective owners. Montvelle does not imply endorsement by a third party merely by mentioning or linking to it." },
    { heading: "Intellectual property", body: "The Montvelle name, monogram, visual identity, website design, editorial content, private frameworks, software and original materials are owned by or licensed to Global Solutions Management LLC unless stated otherwise. Nothing on the public site grants a licence to reproduce, commercialise or create confusingly similar branding." },
    { heading: "Confidential information", body: "Private member areas, introductions, Decision Rooms, family information and confidential correspondence are not public materials. Access is granted only for the intended relationship and remains subject to the confidentiality, privacy and conduct terms applicable to that service." },
    { heading: "Translations", body: "Public pages may be translated using a third-party translation service for convenience. Machine translation can alter nuance. The English-language legal documents and contractual documents are authoritative to the extent permitted by applicable law." },
    { heading: "Mandatory rights", body: "Nothing in this notice is intended to remove rights or remedies that cannot lawfully be waived in a user's jurisdiction. Where a separate written membership agreement or mandatory law provides greater protection, that agreement or law controls to the extent required." },
    { heading: "Legal enquiries", body: "Legal notices, privacy requests and formal enquiries should use the contact details supplied in the relevant Montvelle application, membership agreement, invoice or correspondence so they can be routed to the correct responsible team or adviser." },
  ]} />;
}
