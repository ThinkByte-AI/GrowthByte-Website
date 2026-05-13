import type { CollectionConfig } from 'payload'

function generateBlogSchema(data: any) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": data.title,
    "description": data.excerpt,
    "datePublished": data.publishedAt,
    "author": {
      "@type": data.author ? "Person" : "Organization",
      "name": data.author || "GrowthByte"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GrowthByte",
      "url": "https://www.growthbyte.ai"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.growthbyte.ai/blogs/${data.slug}`
    },
    "articleSection": data.category?.replace('-', ' ') || "Marketing",
    "inLanguage": "en-US"
  }
}

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'publishedAt', 'updatedAt'],
  },
  access: {
    read: () => true, // Public read access
    create: ({ req }) => !!req.user, // Only logged in users
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
      name: 'excerpt',
      type: 'textarea',
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Growth Strategy', value: 'growth-strategy' },
        { label: 'Performance Marketing', value: 'performance-marketing' },
        { label: 'SEO', value: 'seo' },
        { label: 'Marketing Automation', value: 'automation' },
        { label: 'Analytics', value: 'analytics' },
        { label: 'Industry Insights', value: 'insights' },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
    },
    {
      name: 'author',
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
          data.seoSchema = generateBlogSchema(data)
          data.regenerateSchema = false
        }
        return data
      },
    ],
  },
}
