import type { CollectionConfig } from 'payload'

function generateIndustrySchema(data: any) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": data.name,
    "description": data.detail,
    "provider": {
      "@type": "Organization",
      "name": "GrowthByte",
      "url": "https://www.growthbyte.ai"
    },
    "about": {
      "@type": "Thing",
      "name": `${data.name} Industry`,
      "description": data.challenge
    },
    "mainEntity": {
      "@type": "Service",
      "name": `${data.name} Growth Marketing`,
      "provider": {
        "@type": "Organization",
        "name": "GrowthByte"
      }
    }
  }
}

export const Industries: CollectionConfig = {
  slug: 'industries',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
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
      name: 'challenge',
      type: 'text',
    },
    {
      name: 'detail',
      type: 'textarea',
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'SEO title (defaults to name if empty)',
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
          data.seoSchema = generateIndustrySchema(data)
          data.regenerateSchema = false
        }
        return data
      },
    ],
  },
}
