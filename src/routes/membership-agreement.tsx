import { createFileRoute } from "@tanstack/react-router";

import { LegalTemplate } from "@/components/marketing/LegalTemplate";
import { familyMembershipPricing, membershipPricing } from "@/config/membershipPricing";
import { site } from "@/config/site";

export const Route = createFileRoute("/membership-agreement")({
  head: () => ({
    meta: [
      { title: `Membership Agreement — ${site.name}` },
      {
        name: "description",
        content:
          "The Montvelle Membership Agreement governing paid membership with Global Solutions Management LLC.",
      },
    ],
  }),
  component: MembershipAgreementPage,
});

function MembershipAgreementPage() {
  return (
    <LegalTemplate
      title="Membership Agreement"
      documentKey="membershipAgreement"
      intro={`This Membership Agreement governs paid Montvelle membership supplied by ${site.operator}, a Delaware limited liability company ("GSM"). It forms part of the contract between GSM and the approved individual, family office, family entity, company or other member identified in the applicable Membership Schedule. Where a Membership Schedule expressly differs from this Agreement, the Membership Schedule prevails for that membership.`}
      sections={[
        {
          heading: "1. Membership and acceptance",
          body: "Montvelle is a private global membership community, coordination and private-service membership. Membership may include curated peer relationships and Tables, private gatherings, member introductions, knowledge resources, Global Life coordination, Concierge and Private Office coordination, family learning, member technology and other services made available to the relevant membership. Payment does not compel GSM to admit an applicant. GSM may conduct identity, sanctions, fraud, safety, suitability and other checks reasonably required to protect the community or comply with law. Membership becomes active only when GSM has accepted the purchaser, the applicable contractual documents have been accepted, required checks have been completed, commencement amounts have cleared and — where a statutory cooling-off period applies to that purchaser — either that period has expired or the purchaser has made a separate express request for the service to begin sooner. If GSM declines an unactivated paid membership, GSM will arrange return of the membership and admission fees paid for that unactivated membership, subject to applicable law.",
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
          body: `The current ${membershipPricing.pricingYear} individual founding price is ${membershipPricing.annualDisplay} for a 12-month membership, paid in advance, plus a one-time ${membershipPricing.joiningDisplay} admission and onboarding fee, giving a first-year total of ${membershipPricing.firstYearDisplay} before applicable taxes and separately purchased third-party goods or services. Family membership is published as a "from" price of ${familyMembershipPricing.fromAnnualAmountDisplay} for a 12-month household membership; the final annual fee, the approved household composition and any admission or onboarding amount for a family membership are determined after review and recorded in the Membership Schedule. The contractual amount for a Member is the amount stated in the payment instructions, invoice or Membership Schedule issued to that Member. Fees are settled by bank transfer against instructions and a payment reference issued privately after admission and acceptance of this Agreement and the Membership Schedule; GSM does not operate an online card checkout and does not publish account details. GSM may change prices for future new memberships and renewals. Taxes, duties, levies, payment charges, bank charges and similar amounts are payable as stated and as required by law. Where GSM agrees a different billing currency, the fixed contractual amount is stated in the applicable payment instructions, invoice or Membership Schedule.`,
        },
        {
          heading: "4A. Who sells and who performs",
          body: "GSM sells, operates and performs the Montvelle membership and services described in this Agreement. There is no third-party seller of record and no online card checkout for Montvelle membership. Membership is requested, reviewed and, if accepted, settled by bank transfer against payment instructions issued privately to the Member. Nothing in this clause reduces any mandatory consumer right.",
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
          heading: "7. How provider service works: request-led, not a directory",
          body: "Montvelle is request-led. There is no member-facing directory, catalogue, marketplace or browsable list of suppliers, providers or experts, and membership does not grant a right to browse or contact providers directly through Montvelle. Where a Member describes a need, GSM researches, sources, checks, coordinates and, where appropriate, introduces external organisations, firms or individual experts in response to that specific need. Unless GSM expressly agrees in writing to act as the supplier or principal, the relevant third party — not GSM — supplies those goods, professional advice or services and is responsible for its own acts, omissions, licences, professional duties, terms and performance. The Member decides whether to instruct or transact with a third party and remains responsible for appropriate due diligence. GSM does not guarantee reservations, upgrades, aviation, event access, school places, visas, immigration outcomes, transactions, investments, property results, medical outcomes, professional outcomes, introductions or any other third-party result.",
        },
        {
          heading: "7A. Ask Montvelle and the 24-hour response standard",
          body: "A Member may ask Montvelle for anything within the scope of their membership. GSM aims to acknowledge a request promptly and to provide a meaningful first response within 24 hours of receiving it — an answer, a considered update, a set of checked options or a clear statement of what happens next and when. This is a response standard, not a promise of fulfilment, delivery, resolution, booking, availability or outcome within 24 hours. Response and delivery times can legitimately be affected by complexity, time zones and geography, third-party availability, regulated or professional processes, seasonal demand, emergencies, safeguarding matters and compliance or verification requirements. Emergency or safety-critical matters should be raised with the appropriate emergency services or a qualified professional first; Montvelle is not an emergency service.",
        },
        {
          heading: "7B. Expert Councils",
          body: "An Expert Council is an on-demand, member-specific group of independent specialists assembled by GSM around a particular decision or matter raised by the Member. Expert Councils are not standing committees, panels, boards or an existing directory, and no Expert Council exists before a Member's need calls for one. GSM may research worldwide to identify suitable specialists and is not limited to any existing roster. Specialists remain independent of GSM and of one another, act under their own professional and regulatory obligations and, where relevant, under their own engagement terms with the Member. Composition may change as a matter develops. GSM does not guarantee the availability of any particular specialist, the content of any specialist's opinion, agreement between specialists, or any outcome.",
        },
        {
          heading: "7C. Build My Circle",
          body: "A Circle is a bespoke, consent-led set of relationships built around a Member's stated purpose. A Circle may include other Montvelle members, external peers, professionals or organisations who are not members, or a person the Member already knows and asks GSM to bring into the picture. Every introduction requires the consent of the people involved and may be declined without explanation. Being included in a Circle does not make a person a Montvelle member, does not create any membership right and does not grant general access to Montvelle, to other members or to any member information. Circles are not a directory and may not be exported, copied, list-built, marketed to or used for unsolicited prospecting.",
        },
        {
          heading: "7D. External enquiries and the Member's privacy",
          body: "To carry out a request, GSM may make neutral enquiries of external organisations and individuals on the Member's behalf, disclosing only the minimum information necessary to obtain a useful answer. GSM does not disclose the Member's identity, household composition, family circumstances, financial position, health, security arrangements or other private or sensitive details to an external party without the Member's explicit consent, unless disclosure is required by law or by a competent authority. Where a Member prefers to remain unnamed, GSM will make enquiries on an unattributed basis wherever that is practical.",
        },
        {
          heading: "7E. Authority, instructions and spend",
          body: "GSM has no authority to bind the Member, to enter into a contract with a third party for or on behalf of the Member, to accept a third party's terms for the Member, or to incur third-party expenditure, deposits, cancellation exposure or other financial commitment on the Member's account, except to the extent the Member has given express authority or a specific instruction for that matter. Where the Member gives such authority, GSM acts within its stated limits and the resulting third-party contract is between the Member and that third party unless expressly agreed otherwise in writing.",
        },
        {
          heading: "7F. Coordination is not regulated advice",
          body: "GSM coordinates: it holds context, reconciles dependencies between advisers and providers, chases and consolidates communications, sequences work and keeps the Member's overall picture current. Doing so does not make GSM the Member's regulated adviser, agent, fiduciary or professional representative in any field, and does not transfer to GSM the professional responsibility of any adviser, specialist or provider instructed by the Member.",
        },
        {
          heading: "7G. Decision Rooms and external participants",
          body: "A Decision Room is scoped to a specific matter. Where the Member consents, a selected external adviser or specialist may be associated with that matter and given access limited to the minimum information necessary for it, for as long as the matter requires. External participation never confers access to the Member's wider household record, other matters, other members or the Member's general Montvelle environment, and access may be withdrawn by the Member at any time.",
        },
        {
          heading: "8. Commissions, referrals and conflicts",
          body: "GSM may have preferred commercial relationships with suppliers and may receive commissions, referral fees, rebates, preferred rates, benefits or other consideration. Material arrangements that could reasonably affect a Member's decision will be disclosed where required by law or applicable Montvelle policy. A provider's relationship with GSM does not purchase member identities, visibility inside Montvelle, confidential-room access, listing to members or any right to prospect members.",
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
