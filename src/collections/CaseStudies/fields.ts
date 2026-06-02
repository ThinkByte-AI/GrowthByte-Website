import type { Field } from 'payload'

export const caseStudyFields: Field[] = [
  { name: 'title', type: 'text', required: true },
  {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    admin: { position: 'sidebar' },
  },
  { name: 'industry', type: 'text', required: true },
  { name: 'headline', type: 'text', admin: { description: 'One-line takeaway, shown on the listing card' } },
  { name: 'metric', type: 'text', admin: { description: 'Headline number, e.g. "44%"' } },
  { name: 'metricLabel', type: 'text', admin: { description: 'What the metric measures, e.g. "CAC reduction"' } },
  { name: 'summary', type: 'textarea' },
  { name: 'timeframe', type: 'text', admin: { description: 'e.g. "90 days"' } },
  { name: 'client', type: 'text', admin: { description: 'Client name (optional, kept out of public copy if blank)' } },
  {
    name: 'challenge',
    type: 'array',
    labels: { singular: 'Challenge paragraph', plural: 'Challenge paragraphs' },
    fields: [{ name: 'paragraph', type: 'textarea', required: true }],
  },
  {
    name: 'approach',
    type: 'array',
    labels: { singular: 'Approach paragraph', plural: 'Approach paragraphs' },
    fields: [{ name: 'paragraph', type: 'textarea', required: true }],
  },
  {
    name: 'steps',
    type: 'array',
    labels: { singular: 'Step', plural: 'Steps' },
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'detail', type: 'textarea', required: true },
      { name: 'tags', type: 'text', hasMany: true, admin: { description: 'e.g. Analytics, Paid Media' } },
    ],
  },
  { name: 'resultsParagraph', type: 'textarea', admin: { description: 'Closing narrative under the headline metric' } },
  { name: 'quote', type: 'textarea', admin: { description: 'Optional pull-quote' } },
  { name: 'author', type: 'text', admin: { description: 'Quote attribution (optional)' } },
  {
    name: 'metaTitle',
    type: 'text',
    admin: { position: 'sidebar', description: 'SEO title (defaults to title if empty)' },
  },
  {
    name: 'metaDescription',
    type: 'textarea',
    admin: { position: 'sidebar', description: 'SEO description for search results' },
  },
  {
    name: 'regenerateSchema',
    type: 'checkbox',
    admin: { position: 'sidebar', description: 'Check to regenerate SEO schema on save' },
  },
  {
    name: 'seoSchema',
    type: 'json',
    admin: { position: 'sidebar', description: 'JSON-LD schema for SEO. Edit manually or check "Regenerate" above.' },
  },
]
