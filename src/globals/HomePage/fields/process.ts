import type { Field } from 'payload'

const TOOL_ICON_KEYS = ['calculator', 'bars', 'search', 'keyword']

// Build a lexical editor state from a string where **...** marks bold, so the
// founder bios keep their bold words while becoming a rich-text field editors can edit.
const bioRichText = (text: string) => ({
  root: {
    type: 'root', format: '', indent: 0, version: 1, direction: 'ltr',
    children: [{
      type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', textFormat: 0,
      children: text.split('**').map((part, i) => ({
        type: 'text', detail: 0, mode: 'normal', style: '', version: 1,
        format: i % 2 === 1 ? 1 : 0, text: part,
      })).filter((node) => node.text.length > 0),
    }],
  },
})

export const processGroup: Field = {
  name: 'process',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'How It Works' },
    { name: 'heading', type: 'text', defaultValue: 'Audit to live in six weeks.' },
    { name: 'lead', type: 'textarea', defaultValue: 'No onboarding limbo. No strategy-only quarter. We move fast because the system is proven.' },
    {
      name: 'steps',
      type: 'array',
      fields: [
        { name: 'idx', type: 'text' }, { name: 'when', type: 'text' }, { name: 'name', type: 'text' },
        { name: 'desc', type: 'textarea' }, { name: 'deliverable', type: 'text' },
      ],
      defaultValue: [
        { idx: '01', when: 'Weeks 1 to 2', name: 'Audit and discovery', desc: 'We take apart your analytics, ad accounts, SEO, email, and CRM, then map where the leverage is.', deliverable: 'Growth audit and scorecard' },
        { idx: '02', when: 'Weeks 3 to 4', name: 'Strategy and architecture', desc: 'Channel priorities, audience design, messaging, and 90-day targets. You approve before it goes live.', deliverable: 'Strategy doc and KPI dashboard' },
        { idx: '03', when: 'Weeks 5 to 6', name: 'Build and launch', desc: 'Campaigns, automations, and tracking go live. The AI starts learning. You see performance daily.', deliverable: 'Live campaigns and tracking' },
        { idx: '04', when: 'Ongoing', name: 'Optimise and scale', desc: 'AI handles daily optimisation. Strategists review weekly, adjust monthly, plan quarterly.', deliverable: 'Weekly reports, monthly review' },
      ],
    },
  ],
}

export const foundersGroup: Field = {
  name: 'founders',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'The Founders' },
    { name: 'heading', type: 'text', defaultValue: 'Operators, not account managers.' },
    { name: 'lead', type: 'textarea', defaultValue: 'Engineers and product leaders who built real companies, scaled them, and know what growth looks like from the inside.' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'initials', type: 'text' }, { name: 'name', type: 'text' },
        { name: 'role', type: 'text' }, { name: 'bio', type: 'richText' },
      ],
      defaultValue: [
        { initials: 'ST', name: 'SriHarsha Thota', role: 'Co-Founder', bio: bioRichText('ex-VP Consumer Growth at **MediBuddy**, delivered **15x growth in one year**. Founding engineer through exit. BITS Pilani.') },
        { initials: 'VK', name: 'Vinay Kumar Kovvuri', role: 'Co-Founder, AI/ML', bio: bioRichText('Shipped **20+ production AI products** across healthcare and consumer tech. AI/ML product leadership. BITS Pilani.') },
        { initials: 'RG', name: 'Raghu Gorrela', role: 'Co-Founder, Global GTM', bio: bioRichText('Global client strategy across **US, SEA, and India**. BITS Pilani and **XLRI Jamshedpur**. Turns strategy into revenue.') },
      ],
    },
  ],
}

export const toolsGroup: Field = {
  name: 'tools',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Tools' },
    { name: 'heading', type: 'text', defaultValue: 'Find where revenue leaks.' },
    { name: 'allLabel', type: 'text', defaultValue: 'All Tools' },
    { name: 'allHref', type: 'text', defaultValue: '/tools' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'iconKey', type: 'select', options: TOOL_ICON_KEYS, defaultValue: 'calculator' },
        { name: 'name', type: 'text' }, { name: 'desc', type: 'textarea' }, { name: 'href', type: 'text' },
      ],
      defaultValue: [
        { iconKey: 'calculator', name: 'CAC Calculator', desc: 'Find your true acquisition cost and where the funnel leaks money.', href: '/tools/customer-acquisition-cost-calculator' },
        { iconKey: 'bars', name: 'Marketing ROI Calculator', desc: 'See the exact return on every rupee spent across all channels.', href: '/tools/marketing-roi-calculator' },
        { iconKey: 'search', name: 'SEO Audit Tool', desc: 'Technical and on-page audit of your site in under 60 seconds.', href: '/tools/seo-audit-tool' },
        { iconKey: 'keyword', name: 'Keyword Research Tool', desc: 'Find keywords your competitors have not targeted yet.', href: '/tools/keyword-research-tool' },
      ],
    },
  ],
}
