import type { Field } from 'payload'

export const seoFields: Field[] = [
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
      description: 'JSON-LD schema for SEO',
    },
  },
]
