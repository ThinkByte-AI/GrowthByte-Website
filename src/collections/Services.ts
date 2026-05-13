import type { CollectionConfig } from 'payload'

function generateServiceSchema(data: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": data.title,
    "description": data.description,
    "provider": {
      "@type": "Organization",
      "name": "GrowthByte",
      "url": "https://www.growthbyte.ai"
    },
    "serviceType": data.title,
    "areaServed": "Worldwide",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": data.title,
      "itemListElement": (data.capabilities || []).map((cap: any) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": cap.capability
        }
      }))
    }
  }
}

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
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
      name: 'shortTitle',
      type: 'text',
    },
    {
      name: 'outcome',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'capabilities',
      type: 'array',
      fields: [
        {
          name: 'capability',
          type: 'text',
        },
      ],
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Icon name or emoji',
      },
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
          data.seoSchema = generateServiceSchema(data)
          data.regenerateSchema = false
        }
        return data
      },
    ],
  },
}
