import type { CollectionConfig } from 'payload'

function generateCaseStudySchema(data: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": data.headline || data.title,
    "description": data.summary,
    "author": {
      "@type": "Organization",
      "name": "GrowthByte",
      "url": "https://www.growthbyte.ai"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GrowthByte",
      "url": "https://www.growthbyte.ai"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.growthbyte.ai/case-studies/${data.slug}`
    },
    "about": {
      "@type": "Thing",
      "name": data.industry
    },
    "mentions": (data.results || []).map((r: any) => ({
      "@type": "Thing",
      "name": r.result
    }))
  }
}

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'industry', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'client',
      type: 'text',
    },
    {
      name: 'industry',
      type: 'text',
    },
    {
      name: 'headline',
      type: 'text',
    },
    {
      name: 'metric',
      type: 'text',
      admin: {
        description: 'e.g., 44%',
      },
    },
    {
      name: 'metricLabel',
      type: 'text',
      admin: {
        description: 'e.g., CAC reduction',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
    },
    {
      name: 'challenge',
      type: 'textarea',
    },
    {
      name: 'solution',
      type: 'textarea',
    },
    {
      name: 'results',
      type: 'array',
      fields: [
        {
          name: 'result',
          type: 'text',
        },
      ],
    },
    {
      name: 'quote',
      type: 'textarea',
    },
    {
      name: 'author',
      type: 'text',
    },
    {
      name: 'timeframe',
      type: 'text',
    },
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
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.regenerateSchema || !data.seoSchema) {
          data.seoSchema = generateCaseStudySchema(data)
          data.regenerateSchema = false
        }
        return data
      },
    ],
  },
}
