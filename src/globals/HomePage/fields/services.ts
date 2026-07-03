import type { Field } from 'payload'

const SERVICE_ICON_KEYS = ['strategy', 'performance', 'search', 'document', 'social', 'email', 'creative', 'conversion']

export const servicesGroup: Field = {
  name: 'services',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'What We Do' },
    { name: 'heading', type: 'text', defaultValue: 'More than you see here.' },
    { name: 'allLabel', type: 'text', defaultValue: 'All Services' },
    { name: 'allHref', type: 'text', defaultValue: '/services' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'iconKey', type: 'select', options: SERVICE_ICON_KEYS, defaultValue: 'strategy' },
        { name: 'navLabel', type: 'text' },
        { name: 'tag', type: 'text' },
        { name: 'name', type: 'text' },
        { name: 'desc', type: 'textarea' },
        { name: 'pills', type: 'array', fields: [{ name: 'value', type: 'text' }] },
        { name: 'proofValue', type: 'text' },
        { name: 'proofLabel', type: 'text' },
        { name: 'href', type: 'text' },
      ],
      defaultValue: [
        { iconKey: 'strategy', navLabel: 'Growth Strategy', tag: 'Growth Strategy', name: 'The blueprint before the build.', desc: 'We audit your business end to end, benchmark competitors, and build a roadmap with channel priorities, audience architecture, and 90-day KPI targets you approve before anything runs.', pills: [{ value: 'Full-funnel audit' }, { value: 'Competitive mapping' }, { value: 'KPI architecture' }, { value: 'ICP definition' }], href: '/services/growth-strategy' },
        { iconKey: 'performance', navLabel: 'Performance Marketing', tag: 'Performance Marketing', name: 'Lower CAC. Better ROAS.', desc: 'Google, Meta, and LinkedIn campaigns with AI bid management running around the clock. We rebuild audience architecture and tighten creative-to-page alignment so every rupee works harder.', pills: [{ value: 'Google Ads' }, { value: 'Meta Ads' }, { value: 'LinkedIn Ads' }, { value: 'AI bid management' }], proofValue: '42% avg CAC reduction', proofLabel: 'within 90 days', href: '/services/performance-marketing' },
        { iconKey: 'search', navLabel: 'SEO and Content', tag: 'SEO and Content', name: 'Organic that compounds.', desc: 'Technical SEO, on-page, link building, AEO, and GEO. We build content engines that rank for queries your buyers actually search and convert them into pipeline, not just traffic.', pills: [{ value: 'Technical SEO' }, { value: 'Link Building' }, { value: 'AEO and GEO' }, { value: 'Local SEO' }], proofValue: '12x organic pipeline', proofLabel: 'B2B SaaS, 8 months', href: '/services/seo' },
        { iconKey: 'document', navLabel: 'Content at Scale', tag: 'Content at Scale', name: 'Volume without the slop.', desc: 'Articles, landing pages, and assets drafted by our generator and refined by editors. High-volume content delivered fast, every piece built around real intent and a conversion path.', pills: [{ value: 'Bulk article writing' }, { value: 'Landing pages' }, { value: 'AI plus expert refinement' }], href: '/services/content-at-scale' },
        { iconKey: 'social', navLabel: 'Social Media', tag: 'Social Media Marketing', name: 'Channels that build trust.', desc: 'Instagram, Facebook, LinkedIn, and YouTube strategy and management, aligned to your funnel rather than chasing engagement that never converts.', pills: [{ value: 'Instagram' }, { value: 'LinkedIn' }, { value: 'YouTube' }, { value: 'Facebook' }], href: '/services/social-media-marketing' },
        { iconKey: 'email', navLabel: 'Email Marketing', tag: 'Email Marketing', name: 'Your most underused channel.', desc: 'Automation, lead scoring, segmentation, and testing built around where each person is in the journey. No batch-and-blast. Every email has a purpose and a next step.', pills: [{ value: 'Automation sequences' }, { value: 'Lead scoring' }, { value: 'Segmentation' }], href: '/services/email-marketing' },
        { iconKey: 'creative', navLabel: 'Creative', tag: 'Creative', name: 'Built to perform.', desc: 'Ad creative, landing pages, brand assets, and video, grounded in what your audience responds to. We test rather than assume, and build systems that keep improving.', pills: [{ value: 'Ad creative' }, { value: 'Landing pages' }, { value: 'Brand assets' }, { value: 'Video' }], href: '/services/creative' },
        { iconKey: 'conversion', navLabel: 'CRO', tag: 'CRO', name: 'More from the traffic you have.', desc: 'A/B testing, heatmaps, funnel analysis, and conversion optimisation. We find the leaks in your funnel and fix them before recommending you scale any spend.', pills: [{ value: 'A/B testing' }, { value: 'Funnel analysis' }, { value: 'Heatmaps' }, { value: 'Checkout optimisation' }], href: '/services/cro' },
      ],
    },
  ],
}
