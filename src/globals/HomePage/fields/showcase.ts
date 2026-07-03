import type { Field } from 'payload'

const INDUSTRY_ICON_KEYS = ['saas', 'cart', 'healthcare', 'fintech', 'people', 'ai']

export const caseStudiesGroup: Field = {
  name: 'caseStudies',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Case Studies' },
    { name: 'heading', type: 'text', defaultValue: 'Real companies. Real numbers.' },
    { name: 'allLabel', type: 'text', defaultValue: 'All Case Studies' },
    { name: 'allHref', type: 'text', defaultValue: '/case-studies' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'tag', type: 'text' }, { name: 'num', type: 'text' }, { name: 'sub', type: 'text' },
        { name: 'title', type: 'text' }, { name: 'desc', type: 'textarea' }, { name: 'href', type: 'text' },
      ],
      defaultValue: [
        { tag: 'SaaS / Performance', num: '44%', sub: 'CAC reduction • 90 days', title: 'Series B SaaS cuts CAC 44% in 90 days', desc: 'We rebuilt paid acquisition from scratch: new audience architecture, tighter creative testing, and daily AI bid management across Google and Meta.', href: '/case-studies/saas-cac-reduction' },
        { tag: 'D2C / Meta Ads', num: '3.8x', sub: 'ROAS on Meta • 60 days', title: 'D2C brand hits 3.8x ROAS on Meta in 60 days', desc: 'Restructured Meta campaigns with AI-generated creative variants, tightened attribution, and a lifecycle email overhaul that recovered a large share of abandoned carts. The testing system still runs itself.', href: '/case-studies/d2c-roas-growth' },
        { tag: 'B2B SaaS / SEO', num: '12x', sub: 'Organic pipeline • 8 months', title: 'B2B SaaS grows organic pipeline 12x in 8 months', desc: 'Built a content engine targeting high-intent queries. Technical SEO fixes unlocked crawlability across the site. Organic became the top channel.', href: '/case-studies/b2b-organic-growth' },
      ],
    },
  ],
}

export const industriesGroup: Field = {
  name: 'industries',
  type: 'group',
  fields: [
    { name: 'eyebrow', type: 'text', defaultValue: 'Industries' },
    { name: 'heading', type: 'text', defaultValue: 'We learn your buyer first.' },
    { name: 'allLabel', type: 'text', defaultValue: 'All Industries' },
    { name: 'allHref', type: 'text', defaultValue: '/industries' },
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'iconKey', type: 'select', options: INDUSTRY_ICON_KEYS, defaultValue: 'saas' },
        { name: 'name', type: 'text' }, { name: 'desc', type: 'textarea' },
        { name: 'proof', type: 'text' }, { name: 'href', type: 'text' },
      ],
      defaultValue: [
        { iconKey: 'saas', name: 'SaaS', desc: 'Lower CAC, better trial-to-paid, longer LTV. Full funnel from acquisition to expansion.', proof: '44% CAC reduction, 90 days', href: '/industries/saas' },
        { iconKey: 'cart', name: 'D2C and E-Commerce', desc: 'Lower ROAS targets, higher AOV, stronger retention across every channel and lifecycle stage.', href: '/industries/d2c-ecommerce' },
        { iconKey: 'healthcare', name: 'Healthcare', desc: 'Patient acquisition within compliance limits. Trust-first campaigns for clinics and healthtech.', href: '/industries/healthcare' },
        { iconKey: 'fintech', name: 'FinTech', desc: 'Qualified lead generation with trust and regulatory awareness. Payments, lending, and wealth.', href: '/industries/fintech' },
        { iconKey: 'people', name: 'Professional Services', desc: 'Enterprise positioning, shorter sales cycles, and pipeline that grows month over month.', href: '/industries/professional-services' },
        { iconKey: 'ai', name: 'AI Companies', desc: 'Category education and trust-led funnels for AI startups and product companies.', href: '/industries/ai-companies' },
      ],
    },
  ],
}
