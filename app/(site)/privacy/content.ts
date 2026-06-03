import type { LegalDocumentData } from '@/components/legal'

export const PRIVACY_POLICY: LegalDocumentData = {
  eyebrow: 'Legal',
  title: 'Privacy Policy',
  lastUpdated: 'June 3, 2026',
  intro:
    'GrowthByte ("GrowthByte", "we", "us", or "our") is an AI-powered growth partner for SaaS, D2C, FinTech, and Healthcare companies. This Privacy Policy explains what information we collect when you visit growthbyte.ai or engage our services, how we use it, and the choices you have. By using our website, you agree to the practices described below.',
  sections: [
    {
      id: 'information-we-collect',
      heading: 'Information we collect',
      blocks: [
        { type: 'text', text: 'We collect information in two ways — details you give us directly, and data gathered automatically as you use the site.' },
        {
          type: 'list',
          items: [
            { term: 'Information you provide:', text: 'your name, email address, phone number, company, and anything you share when you submit a contact form, book a strategy call, or correspond with us.' },
            { term: 'Information collected automatically:', text: 'your IP address, browser and device type, pages viewed, referring URLs, and similar usage data gathered through cookies and analytics tools.' },
          ],
        },
      ],
    },
    {
      id: 'how-we-use-information',
      heading: 'How we use your information',
      blocks: [
        { type: 'text', text: 'We use the information we collect to:' },
        {
          type: 'list',
          items: [
            { text: 'Respond to your enquiries and schedule strategy calls.' },
            { text: 'Provide, operate, and improve our services and website.' },
            { text: 'Send updates, insights, and marketing communications you have asked to receive.' },
            { text: 'Measure website performance and understand how visitors use our content.' },
            { text: 'Protect against fraud and abuse, and meet our legal obligations.' },
          ],
        },
      ],
    },
    {
      id: 'cookies-and-analytics',
      heading: 'Cookies and analytics',
      blocks: [
        { type: 'text', text: 'We use cookies and similar technologies to keep the site working, remember your preferences, and understand traffic. We use Google Analytics to measure usage; it may set cookies and process data under its own privacy terms.' },
        { type: 'text', text: 'You can control or disable cookies through your browser settings, though some features may not function correctly if you do.' },
      ],
    },
    {
      id: 'how-we-share-information',
      heading: 'How we share information',
      blocks: [
        { type: 'text', text: 'We do not sell your personal information. We share it only in these limited situations:' },
        {
          type: 'list',
          items: [
            { term: 'Service providers:', text: 'trusted vendors who host our site, deliver email, and process analytics, bound by confidentiality obligations.' },
            { term: 'Legal reasons:', text: 'when required by law or legal process, or to protect the rights, safety, and property of GrowthByte or others.' },
            { term: 'Business transfers:', text: 'in connection with a merger, acquisition, or sale of assets, where information may pass to the successor entity.' },
          ],
        },
      ],
    },
    {
      id: 'data-retention',
      heading: 'Data retention',
      blocks: [
        { type: 'text', text: 'We keep personal information only for as long as needed to fulfil the purposes in this policy, satisfy legal or accounting requirements, and resolve disputes. When it is no longer needed, we delete or anonymise it.' },
      ],
    },
    {
      id: 'data-security',
      heading: 'How we protect your information',
      blocks: [
        { type: 'text', text: 'We use reasonable technical and organisational measures to protect your information against unauthorised access, loss, or misuse. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.' },
      ],
    },
    {
      id: 'your-rights',
      heading: 'Your rights and choices',
      blocks: [
        { type: 'text', text: 'Depending on your location, you may have the right to:' },
        {
          type: 'list',
          items: [
            { text: 'Access, correct, or delete the personal information we hold about you.' },
            { text: 'Object to or restrict certain processing of your information.' },
            { text: 'Withdraw consent or unsubscribe from marketing at any time using the link in our emails.' },
          ],
        },
        { type: 'text', text: 'To exercise any of these rights, contact us using the details below. We will respond within the timeframe required by applicable law.' },
      ],
    },
    {
      id: 'third-party-links',
      heading: 'Third-party links and services',
      blocks: [
        { type: 'text', text: 'Our website may link to third-party sites and tools we do not control. This policy does not apply to them, and we encourage you to review their privacy practices before sharing information.' },
      ],
    },
    {
      id: 'international-users',
      heading: 'International users',
      blocks: [
        { type: 'text', text: 'We are based in India and may process your information there or in other countries where our service providers operate. By using our site, you understand that your information may be transferred to locations with different data-protection laws.' },
      ],
    },
    {
      id: 'childrens-privacy',
      heading: "Children's privacy",
      blocks: [
        { type: 'text', text: 'Our website and services are intended for businesses and are not directed to children under 16. We do not knowingly collect personal information from children.' },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      blocks: [
        { type: 'text', text: 'We may update this Privacy Policy from time to time. When we do, we will revise the "Last updated" date above, and significant changes will be highlighted on this page.' },
      ],
    },
  ],
}
