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
  { name: 'client', type: 'text' },
  { name: 'industry', type: 'text' },
  { name: 'headline', type: 'text' },
  {
    name: 'metric',
    type: 'text',
    admin: { description: 'e.g., 44%' },
  },
  {
    name: 'metricLabel',
    type: 'text',
    admin: { description: 'e.g., CAC reduction' },
  },
  { name: 'summary', type: 'textarea' },
  { name: 'challenge', type: 'textarea' },
  { name: 'solution', type: 'textarea' },
  {
    name: 'results',
    type: 'array',
    fields: [{ name: 'result', type: 'text' }],
  },
  { name: 'quote', type: 'textarea' },
  { name: 'author', type: 'text' },
  { name: 'timeframe', type: 'text' },
  {
    name: 'metaTitle',
    type: 'text',
    admin: {
      position: 'sidebar',
      description: 'SEO title (defaults to title if empty)',
    },
  },
  {
    name: 'metaDescription',
    type: 'textarea',
    admin: {
      position: 'sidebar',
      description: 'SEO description for search results',
    },
  },
  {
    name: 'regenerateSchema',
    type: 'checkbox',
    admin: {
      position: 'sidebar',
      description: 'Check to regenerate SEO schema on save',
    },
  },
  {
    name: 'seoSchema',
    type: 'json',
    admin: {
      position: 'sidebar',
      description: 'JSON-LD schema for SEO. Edit manually or check "Regenerate" above.',
    },
  },
]
