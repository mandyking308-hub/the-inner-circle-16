import { createFileRoute } from "@tanstack/react-router";

import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { familyMembershipPricing, membershipPricing } from "@/config/membershipPricing";
import { site } from "@/config/site";

export const Route = createFileRoute("/membership-agreement")({
  head: () => ({
    meta: [
      { title: `Membership Agreement — ${site.name}` },
      { name: "description", content: "The Montvelle Membership Agreement governing paid membership with Global Solutions Management LLC." },
    ],
  }),
  component: MembershipAgreementPage,
});

function MembershipAgreementPage() {
  return (
    <LegalTemplate
      title="Membership Agreement"
      intro={`Last updated 23 August 2026. This Membership Agreement governs paid Montvelle membership supplied by ${site.operator}, a Delaware limited liability company ("GSM"). It forms part of the contract between GSM and the approved individual, family office, family entity, company or other member identified in the applicable Membership Schedule. Where a Membership Schedule expressly differs from this Agreement, the Membership Schedule prevails for that membership.`}
      sections={[
        {
          heading: "1. Membership and acceptance",
          body: "Montvelle is a private global membership community, coordination and private-service platform. Membership may include curated peer relationships and Tables, private gatherings, member introductions, knowledge resources, Global Life coordination, Concierge and Private Office coordination, family learning, member technology and other services made available to the relevant membership. The ability to submit payment does not compel GSM to admit a purchaser. GSM may conduct identity, sanctions, fraud, safety, suitability and other checks reasonably required to protect the community or comply with law. Membership becomes active only when GSM has accepted the purchaser, the applicable contractual documents have been accepted, required checks have been completed and commencement amounts have cleared. If GSM declines an unactivated paid membership, GSM will arrange return of the membership and admission fees paid for that unactivated membership, subject to applicable law and payment-provider processing.",
        },
        {
          heading: "2. Individual and family membership; household access",
          body: "Montvelle applies one standard of membership, offered either as an individual membership held by one approved principal member, or as a family membership held as a household relationship in which more than one approved adult may use Montvelle independently. Family membership is not a higher or lower level of Montvelle and is not account sharing. The approved household composition, including any approved adult household members, age-appropriate next-generation participation and any authorised household delegate, is subject to GSM approval and is recorded in the Membership Schedule. Each approved person is issued their own login; login credentials may not be shared. Membership may not be sold, transferred, sublicensed or used to provide access to an unauthorised person without GSM's prior written consent. Delegated access granted to an assistant, family-office representative or household delegate is delegated access to identified matters only and does not itself constitute Montvelle membership. Personal matters, requests and messages belonging to an approved adult are not automatically visible to the Household Principal or to any other household user; sharing within a household occurs only where that person or the Membership Schedule so provides. The Member remains responsible for ensuring that authorised users comply with this Agreement and all applicable Montvelle policies.",
        },
        {
          heading: "3. Term and renewal",
          body: "Unless the Membership Schedule states otherwise, membership runs for 12 months from the agreed activation date. Montvelle membership does not automatically renew at launch. Before expiry, GSM may invite the Member to renew at the then-current price and on the then-current renewal terms. A previous price does not create a right to a future or grandfathered price. A renewal becomes binding only when the renewal terms are accepted and the applicable renewal fee is paid, unless a later Membership Schedule expressly provides another lawful renewal mechanism.",
        },
        {
          heading: "4. Fees and payment",
          body: `The current ${membershipPricing.pricingYear} individual founding price is ${membershipPricing.annualDisplay} for a 12-month membership, paid in advance, plus a one-time ${membershipPricing.joiningDisplay} admission and onboarding fee, giving a first-year total of ${membershipPricing.firstYearDisplay} before applicable taxes and separately purchased third-party goods or services. Family membership is published as a "from" price of ${familyMembershipPricing.fromAnnualAmountDisplay} for a 12-month household membership; the final annual fee, the approved household composition and any admission or onboarding amount for a family membership are determined after review and recorded in the Membership Schedule. The contractual amount for a Member is the amount shown at checkout, on the invoice or in the Membership Schedule. GSM may change prices for future new memberships and renewals. Taxes, duties, levies, payment charges, bank charges and similar amounts are payable as stated and as required by law. Where GSM agrees a different billing currency, the fixed contractual amount is stated in the applicable checkout, invoice or Membership Schedule.`,
        },
        {
          heading: "5. Third-party costs",
          body: "Travel, accommodation, aviation, transport, event tickets, venues, restaurants, property, healthcare, education, professional advice and other externally supplied goods and services are separate from the Montvelle membership fee unless the Membership Schedule expressly states otherwise. Third-party suppliers may require deposits, prepayment, cancellation fees, insurance or other charges. Those costs are the Member's responsibility where the Member authorises the purchase or instruction.",
        },
        {
          heading: "6. Cancellation, cooling-off and refunds",
          body: "Nothing in this Agreement removes a cancellation, refund or consumer right that cannot lawfully be waived. Where a statutory cooling-off right applies and the Member expressly asks GSM to begin onboarding, service preparation or services before that period expires, GSM may deduct the value of services properly supplied before cancellation to the extent applicable law permits. Outside mandatory rights, refunds and the treatment of admission/onboarding work are governed by this Agreement, the Membership Schedule, the reason for termination and services already supplied. Third-party bookings and supplier charges are subject to the relevant supplier's own cancellation and refund rules and may be non-refundable.",
        },
        {
          heading: "7. Private service and independent suppliers",
          body: "Montvelle may research, source, coordinate, recommend or introduce third-party providers requested by the Member. Unless GSM expressly agrees in writing to act as the supplier or principal, the relevant third party — not GSM — supplies those goods, professional advice or services and is responsible for its own acts, omissions, licences, professional duties, terms and performance. The Member decides whether to instruct or transact with a third party and remains responsible for appropriate due diligence. GSM does not guarantee reservations, upgrades, aviation, event access, school places, visas, immigration outcomes, transactions, investments, property results, medical outcomes, professional outcomes, introductions or any other third-party result.",
        },
        {
          heading: "8. Commissions, referrals and conflicts",
          body: "GSM may have preferred commercial relationships with suppliers and may receive commissions, referral fees, rebates, preferred rates, benefits or other consideration. Material arrangements that could reasonably affect a Member's decision will be disclosed where required by law or applicable Montvelle policy. Trusted Partner participation does not purchase member identities, confidential-room access or unrestricted prospecting rights.",
        },
        {
          heading: "9. No regulated or professional advice by Montvelle",
          body: "Montvelle is a private membership, community, research, coordination and lifestyle service. GSM is not acting as a law firm, tax adviser, investment adviser, broker-dealer, immigration adviser, healthcare provider, fiduciary, trustee, insurer or other regulated professional merely by providing membership, information, introductions, research or coordination. General materials, peer discussions, software or AI-assisted outputs and operational suggestions are not substitutes for advice from appropriately qualified professionals instructed for the Member's own circumstances. Where a matter requires regulated or licensed advice, the Member must obtain that advice independently.",
        },
        {
          heading: "10. Member conduct",
          body: "Members and authorised users must act lawfully, respectfully and consistently with the private nature of Montvelle. Unless expressly authorised, prohibited conduct includes scraping, bulk export, list building, credential sharing, impersonation, doxxing, unauthorised recording or screenshots, unauthorised forwarding, unsolicited commercial prospecting, recruitment poaching, harassment, circumvention of access controls, misuse of confidential information and using Montvelle or member data to train an external model or dataset. A Member must not claim that GSM, Montvelle or another member endorses the Member, an investment, transaction, product or provider without express written authority.",
        },
        {
          heading: "11. Confidentiality and introductions",
          body: "Information shared in a private Table, Decision Room, member-only area, private gathering, concierge request, family context, ownership context, adviser context or confidential communication must be treated as confidential where a reasonable person would understand it to be private. Members may use general learning and ideas from the community but must not identify another person or disclose that person's confidential facts, family circumstances, commercial information or sensitive context without permission. Private sessions may not be recorded, transcribed, photographed, screenshotted, forwarded or published without appropriate consent. Montvelle introductions are consent-led. Confidentiality obligations survive expiry or termination, subject to disclosures required by law or competent authority.",
        },
        {
          heading: "12. Family and under-18 participants",
          body: "A person under 18 may not contract directly with GSM. A parent, guardian or other legally authorised adult must approve any under-18 participation and is responsible for ensuring information provided about a child is lawfully shared. GSM may apply separate age, supervision, account-access, communications, safeguarding and event rules to next-generation programmes and may immediately restrict participation where it reasonably believes safety, welfare, safeguarding or legal compliance is at risk.",
        },
        {
          heading: "13. Privacy and member information",
          body: "GSM processes personal information in accordance with the Montvelle Privacy Notice and applicable law. Member-directory information is private by default. GSM does not sell the member directory or grant third parties unrestricted prospecting access to member identities. The Member grants GSM the limited rights reasonably required to host, process, reproduce and transmit information submitted by or for the Member in order to provide, secure and administer the service, comply with law and exercise GSM's rights under this Agreement. Ownership of a Member's own confidential information remains with the Member or lawful owner.",
        },
        {
          heading: "14. AI-assisted tools",
          body: "GSM may use software and AI-assisted tools to organise information, support research, summarise material, coordinate workflows or surface options. Material membership, safety or similarly significant decisions should include human review where appropriate or legally required. Confidential member content should not be used to train a public or general-purpose model without an appropriate legal basis and any permission required by law or Montvelle policy.",
        },
        {
          heading: "15. Intellectual property",
          body: "GSM or its licensors own the Montvelle name, marks, visual identity, website, software, private frameworks, editorial content and original materials except for material expressly identified as belonging to a Member or third party. During active membership GSM grants the Member a limited, personal, revocable, non-exclusive and non-transferable right to use Montvelle materials for the Member's own private purposes. Montvelle materials may not be reproduced, resold, republished, reverse engineered, commercially exploited or used to create confusingly similar products except to the extent a non-waivable legal right permits it.",
        },
        {
          heading: "16. Availability and changes",
          body: "GSM aims to provide a secure and reliable service but does not guarantee uninterrupted or error-free access. GSM may change features, suppliers, programme formats, locations, digital functionality and operating processes where reasonably necessary for security, legal compliance, capacity, service quality or product development. A routine product update will not be used to remove a material paid contractual right during a current term except in accordance with this Agreement, the Membership Schedule and mandatory law.",
        },
        {
          heading: "17. Compliance, sanctions and prohibited activity",
          body: "GSM may refuse, delay, restrict or terminate a membership, request, payment or introduction where it reasonably believes continuing could breach sanctions, export controls, anti-bribery law, fraud controls, financial-crime obligations, court orders or other applicable law. Montvelle must not be used to facilitate bribery, corruption, money laundering, sanctions evasion, fraud, trafficking, prohibited investment activity or other unlawful conduct. GSM may request information reasonably required to assess a compliance concern and may make disclosures to competent authorities where legally required.",
        },
        {
          heading: "18. Suspension and termination",
          body: "GSM may suspend access while investigating a credible security, safety, confidentiality, payment, legal or serious conduct concern. GSM may terminate membership for material or repeated breach, confidentiality or no-solicitation breach, harassment, fraud, unlawful activity, material non-payment, reversed payment, serious safety risk, materially misleading information, sanctions/compliance concerns or conduct that materially threatens the trust, privacy, legal position or integrity of the community. The financial consequences of termination, including any refund or retained fee, depend on the circumstances, the Membership Schedule and mandatory law. Provisions intended by their nature to survive termination — including confidentiality, intellectual property, accrued payment obligations, liability, dispute and data-related obligations — continue after membership ends.",
        },
        {
          heading: "19. Member responsibility",
          body: "The Member remains responsible for personal, family, commercial, investment, tax, legal, immigration, medical, educational, travel and other decisions. Information obtained through Montvelle may be incomplete, become outdated or reflect another member's personal experience rather than professional advice. The Member is responsible for ensuring that authorised users comply with this Agreement.",
        },
        {
          heading: "20. Liability",
          body: "Nothing in this Agreement excludes or limits liability that cannot lawfully be excluded or limited, including liability for fraud or fraudulent misrepresentation where applicable. Subject to those non-excludable liabilities and to the fullest extent permitted by law, GSM is not liable for indirect, incidental, consequential, special or punitive loss, or for loss of profit, revenue, business opportunity, goodwill, anticipated savings, investment value or data. Subject to mandatory law, GSM is not liable for the acts, omissions, insolvency, delay, cancellation, negligence or non-performance of an independent third-party supplier merely because Montvelle introduced, recommended or coordinated that supplier. GSM's total aggregate liability for all other losses arising under or in connection with a Membership will not exceed the annual Membership Fee paid or payable to GSM for the relevant 12-month term, unless applicable law requires a higher or different liability position.",
        },
        {
          heading: "21. Events outside reasonable control",
          body: "Neither party is responsible for delay or failure caused by events outside its reasonable control to the extent permitted by law, including natural disasters, war, terrorism, civil disruption, epidemics or pandemics, government action, transport disruption, widespread communications outages, supplier failures or similar events. Mandatory cancellation, refund and consumer rights remain unaffected.",
        },
        {
          heading: "22. Electronic contracting and notices",
          body: "This Agreement and a Membership Schedule may be accepted electronically and in counterparts. Routine membership notices may be sent electronically to the contact details held for the Member. Formal legal notices must be sent using the notice details stated in the Membership Schedule, invoice, Legal Notice or other formal GSM correspondence.",
        },
        {
          heading: "23. Assignment",
          body: "The Member may not assign or transfer this Agreement or membership without GSM's prior written consent. GSM may assign this Agreement to an affiliate, successor or purchaser of substantially all of the relevant business or assets, subject to applicable law and without reducing mandatory Member rights.",
        },
        {
          heading: "24. Entire agreement, severability and waiver",
          body: "The Membership Schedule, this Agreement and any expressly incorporated Privacy, Confidentiality, conduct or bespoke service documents form the entire agreement for the paid membership relationship and supersede prior statements about that relationship, subject to liability for fraud and non-waivable rights. If a provision is invalid or unenforceable, it will be modified or severed only to the minimum extent necessary and the remaining provisions continue in effect. A failure to enforce a provision is not a waiver of that provision.",
        },
        {
          heading: "25. Relationship of the parties",
          body: "Nothing in the Montvelle relationship creates a partnership, joint venture, employment relationship, fiduciary relationship, agency or authority for one party to bind the other unless a separate written document expressly states otherwise.",
        },
        {
          heading: "26. Governing law and disputes",
          body: "This Agreement is governed by the laws of the State of Delaware, United States, without prejudice to mandatory consumer, privacy or other rights that apply because of the Member's residence or other applicable law. The parties should first attempt in good faith to resolve a dispute directly. Subject to any mandatory local right to bring proceedings elsewhere, the state and federal courts located in Delaware have jurisdiction over disputes arising from this Agreement unless the applicable Membership Schedule expressly provides another lawful dispute process.",
        },
        {
          heading: "27. Language",
          body: "Translations may be provided for convenience. The English-language Agreement is authoritative to the extent permitted by applicable law. Where mandatory local law requires another language or gives a translated version legal priority, that law applies.",
        },
      ]}
    />
  );
}
