import type { Field } from 'payload'

export const seoGroup: Field = {
  name: 'seo',
  type: 'group',
  fields: [
    { name: 'metaTitle', type: 'text', defaultValue: 'AI-First Growth Partner India | One Revenue Engine' },
    {
      name: 'metaDescription',
      type: 'textarea',
      defaultValue:
        'AI-first growth partner trusted by 20+ brands. Senior strategists and AI cut CAC 42% and lift ROAS 3.1x in 90 days. Book your free growth audit.',
    },
  ],
}

export const heroGroup: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    { name: 'badge', type: 'text', defaultValue: 'AI-Powered Growth Partner' },
    { name: 'headingBefore', type: 'text', defaultValue: 'Revenue that grows every month. ' },
    { name: 'headingEmphasis', type: 'text', defaultValue: 'Measurably.' },
    {
      name: 'sub',
      type: 'textarea',
      defaultValue:
        'Senior strategists and AI systems on one mandate: your revenue number. We lower CAC, lift ROAS, and build pipeline that compounds, for companies in the ₹5Cr to ₹100Cr range.',
    },
    { name: 'primaryCtaLabel', type: 'text', defaultValue: 'Book a Strategy Call' },
    { name: 'primaryCtaHref', type: 'text', defaultValue: '/contact' },
    { name: 'secondaryCtaLabel', type: 'text', defaultValue: 'See our work' },
    { name: 'secondaryCtaHref', type: 'text', defaultValue: '/case-studies' },
    {
      name: 'trustPoints',
      type: 'array',
      fields: [{ name: 'value', type: 'text' }],
      defaultValue: [
        { value: 'BITS Pilani founders' },
        { value: 'ex-MediBuddy, 15x growth' },
        { value: 'Amrita TBI backed' },
        { value: '20+ brands' },
      ],
    },
    {
      name: 'counters',
      type: 'array',
      fields: [
        { name: 'target', type: 'number', required: true },
        { name: 'prefix', type: 'text' },
        { name: 'suffix', type: 'text' },
        { name: 'decimals', type: 'number', defaultValue: 0 },
        { name: 'label', type: 'text' },
      ],
      defaultValue: [
        { target: 42, suffix: '%', decimals: 0, label: 'Average CAC reduction within 90 days' },
        { target: 3.1, suffix: 'x', decimals: 1, label: 'Average ROAS improvement' },
        { target: 50, prefix: '₹', suffix: 'Cr+', decimals: 0, label: 'Pipeline built across all clients' },
        { target: 92, suffix: '%', decimals: 0, label: 'Client retention after 6 months' },
      ],
    },
  ],
}
