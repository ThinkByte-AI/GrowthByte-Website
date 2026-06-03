import type { LegalDocumentData } from '@/components/legal'

export const TERMS_OF_SERVICE: LegalDocumentData = {
  eyebrow: 'Legal',
  title: 'Terms of Service',
  lastUpdated: 'June 3, 2026',
  intro:
    'These Terms of Service ("Terms") govern your access to and use of the GrowthByte website at growthbyte.ai and the information and content we make available through it. By accessing or using the site, you agree to these Terms. If you do not agree, please do not use the site.',
  sections: [
    {
      id: 'our-services',
      heading: 'Our services',
      blocks: [
        { type: 'text', text: 'GrowthByte provides growth marketing services that combine AI systems with senior strategic expertise for SaaS, D2C, FinTech, Healthcare, and similar companies. This website presents information about those services. Any paid engagement is governed by a separate written agreement or proposal, which prevails over these Terms in the event of a conflict.' },
      ],
    },
    {
      id: 'eligibility',
      heading: 'Eligibility',
      blocks: [
        { type: 'text', text: 'You must be at least 18 years old and able to enter into a binding contract to use this website. By using it, you confirm that you meet these requirements and that any information you provide is accurate.' },
      ],
    },
    {
      id: 'acceptable-use',
      heading: 'Acceptable use',
      blocks: [
        { type: 'text', text: 'When using our website, you agree not to:' },
        {
          type: 'list',
          items: [
            { text: 'Use it for any unlawful, harmful, or fraudulent purpose.' },
            { text: 'Attempt to gain unauthorised access to our systems, networks, or data.' },
            { text: 'Interfere with or disrupt the site, or introduce malicious code.' },
            { text: 'Scrape, copy, or republish our content without permission.' },
            { text: 'Misrepresent your identity or affiliation with any person or organisation.' },
          ],
        },
      ],
    },
    {
      id: 'intellectual-property',
      heading: 'Intellectual property',
      blocks: [
        { type: 'text', text: 'The website and its content — including text, graphics, logos, designs, and the GrowthByte name and brand — are owned by GrowthByte or its licensors and protected by applicable intellectual-property laws. You may view and share our content for personal, non-commercial use, but you may not reproduce, modify, or distribute it commercially without our written consent.' },
      ],
    },
    {
      id: 'your-submissions',
      heading: 'Your submissions',
      blocks: [
        { type: 'text', text: 'When you submit information through a form or otherwise communicate with us, you confirm it is accurate and that you have the right to share it. You grant us permission to use that information to respond to you and deliver our services, in line with our Privacy Policy.' },
      ],
    },
    {
      id: 'third-party-services',
      heading: 'Third-party services and links',
      blocks: [
        { type: 'text', text: 'Our website may reference or link to third-party tools, platforms, and websites. We do not control and are not responsible for their content, practices, or availability. Your use of any third-party service is subject to its own terms.' },
      ],
    },
    {
      id: 'no-guarantee',
      heading: 'No guarantee of results',
      blocks: [
        { type: 'text', text: 'We work hard to drive measurable growth, but marketing outcomes depend on many factors beyond our control. Any metrics, case studies, or examples on this website describe past results and are not a promise or guarantee of future performance for your business.' },
      ],
    },
    {
      id: 'disclaimers',
      heading: 'Disclaimers',
      blocks: [
        { type: 'text', text: 'The website and its content are provided "as is" and "as available" without warranties of any kind, whether express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the site will be uninterrupted, error-free, or secure.' },
      ],
    },
    {
      id: 'limitation-of-liability',
      heading: 'Limitation of liability',
      blocks: [
        { type: 'text', text: 'To the fullest extent permitted by law, GrowthByte and its team will not be liable for any indirect, incidental, special, or consequential damages, or any loss of profits, revenue, or data, arising from your use of — or inability to use — this website.' },
      ],
    },
    {
      id: 'indemnification',
      heading: 'Indemnification',
      blocks: [
        { type: 'text', text: 'You agree to indemnify and hold GrowthByte harmless from any claims, losses, or expenses arising out of your misuse of the website or your breach of these Terms.' },
      ],
    },
    {
      id: 'governing-law',
      heading: 'Governing law',
      blocks: [
        { type: 'text', text: 'These Terms are governed by the laws of India, without regard to conflict-of-law principles. Any dispute arising from them will be subject to the exclusive jurisdiction of the competent courts in India.' },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to these Terms',
      blocks: [
        { type: 'text', text: 'We may update these Terms from time to time. The "Last updated" date above reflects the latest version. Your continued use of the website after changes take effect constitutes acceptance of the revised Terms.' },
      ],
    },
  ],
}
