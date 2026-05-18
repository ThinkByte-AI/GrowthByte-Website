import type { CollectionConfig, AccessArgs } from 'payload'

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

// Access control: Public can only see published posts that are live
const publicReadAccess = ({ req, data }: AccessArgs) => {
  // Logged-in users can see everything
  if (req.user) return true

  // Public users only see published posts that are currently live
  const now = new Date().toISOString()
  return {
    and: [
      { _status: { equals: 'published' } },
      { publishedAt: { less_than_equal: now } },
    ]
  }
}

// Check if unpublish date has passed (for archive logic)
const isPostLive = (data: any): boolean => {
  if (data._status !== 'published') return false

  const now = new Date()
  const publishDate = data.publishedAt ? new Date(data.publishedAt) : null
  const unpublishDate = data.unpublishAt ? new Date(data.unpublishAt) : null

  if (!publishDate || publishDate > now) return false
  if (unpublishDate && unpublishDate <= now) return false

  return true
}

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', '_status', 'publishedAt', 'updatedAt'],
    group: 'Content',
  },
  access: {
    // Public read with filtering for live posts
    read: publicReadAccess,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  // Enable full versioning for rollback capability
  versions: {
    drafts: {
      autosave: true,
    },
    maxPerDoc: 50, // Keep last 50 versions
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
    // STATUS - Workflow status
    {
      name: '_status',
      type: 'select',
      defaultValue: 'draft',
      required: true,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Review', value: 'review' },
        { label: 'Published', value: 'published' },
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Workflow status. Scheduled posts auto-publish when publishedAt arrives.',
      },
    },
    // PUBLISH DATE - When to go live
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Publication date. For scheduled posts, this is when it goes live.',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    // UNPUBLISH DATE - When to archive (optional)
    {
      name: 'unpublishAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Optional. Post will be archived after this date/time.',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    // TEMPLATE ASSIGNMENT
    {
      name: 'template',
      type: 'relationship',
      relationTo: 'page-templates',
      hasMany: false,
      filterOptions: {
        type: { equals: 'blog' },
      },
      admin: {
        position: 'sidebar',
        description: 'Select the page layout template',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Short summary shown in blog listings and meta description',
      },
    },
    // HERO CONTENT
    {
      name: 'heroSection',
      type: 'group',
      admin: {
        description: 'Hero section content',
      },
      fields: [
        {
          name: 'heroImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Hero background or featured image',
          },
        },
        {
          name: 'heroSubtitle',
          type: 'text',
          admin: {
            description: 'Optional subtitle below the main title',
          },
        },
        {
          name: 'heroOverlay',
          type: 'select',
          defaultValue: 'none',
          options: [
            { label: 'No Overlay', value: 'none' },
            { label: 'Dark Overlay', value: 'dark' },
            { label: 'Light Overlay', value: 'light' },
            { label: 'Gradient Overlay', value: 'gradient' },
          ],
          admin: {
            description: 'Overlay for image backgrounds',
          },
        },
      ],
    },
    // MAIN CONTENT
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: {
        description: 'Main blog content',
      },
    },
    // ADDITIONAL CONTENT BLOCKS
    {
      name: 'additionalBlocks',
      type: 'group',
      admin: {
        description: 'Additional content sections',
      },
      fields: [
        {
          name: 'gallery',
          type: 'array',
          admin: {
            description: 'Image gallery section',
          },
          fields: [
            {
              name: 'image',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              name: 'caption',
              type: 'text',
            },
          ],
        },
        {
          name: 'videoEmbed',
          type: 'text',
          admin: {
            description: 'YouTube/Vimeo embed URL',
          },
        },
        {
          name: 'pullQuote',
          type: 'textarea',
          admin: {
            description: 'Highlighted quote from the article',
          },
        },
      ],
    },
    // SIDEBAR CONTENT
    {
      name: 'sidebarContent',
      type: 'group',
      admin: {
        description: 'Sidebar content',
      },
      fields: [
        {
          name: 'customWidget',
          type: 'richText',
          admin: {
            description: 'Custom sidebar content',
          },
        },
        {
          name: 'hideDefaultWidgets',
          type: 'checkbox',
          label: 'Hide Template Widgets',
          admin: {
            description: 'Check to hide default sidebar widgets for this post',
          },
        },
      ],
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Image shown in blog listings and social shares',
      },
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
      name: 'tags',
      type: 'text',
      hasMany: true,
      admin: {
        position: 'sidebar',
        description: 'Comma-separated tags for this post',
      },
    },
    {
      name: 'author',
      type: 'text',
      admin: {
        position: 'sidebar',
        description: 'Author name',
      },
    },
    {
      name: 'authorBio',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Short author bio for sidebar',
      },
    },
    {
      name: 'authorImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
        description: 'Author photo',
      },
    },
    {
      name: 'readTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Estimated read time in minutes (auto-calculated if empty)',
      },
    },
    // SEO FIELDS
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
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Auto-calculate read time if not set
        if (data.content && !data.readTime) {
          const wordCount = data.content.toString().split(/\s+/).length
          data.readTime = Math.ceil(wordCount / 200)
        }

        // Auto-set status based on publishedAt
        if (data.publishedAt && data._status === 'draft') {
          const publishDate = new Date(data.publishedAt)
          const now = new Date()
          if (publishDate > now) {
            data._status = 'scheduled'
          }
        }

        // If status is scheduled, ensure publishedAt is in future
        if (data._status === 'scheduled' && data.publishedAt) {
          const publishDate = new Date(data.publishedAt)
          const now = new Date()
          if (publishDate <= now) {
            data._status = 'published'
          }
        }

        // Regenerate schema if needed
        if (data.regenerateSchema || !data.seoSchema) {
          data.seoSchema = generateBlogSchema(data)
          data.regenerateSchema = false
        }

        return data
      },
    ],
  },
  // Custom endpoints for cron
  endpoints: [
    {
      path: '/publish-scheduled',
      method: 'post',
      handler: async (req) => {
        const now = new Date().toISOString()
        const payload = req.payload

        // Publish scheduled posts
        const scheduledPosts = await payload.find({
          collection: 'blog-posts',
          where: {
            _status: { equals: 'scheduled' },
            publishedAt: { less_than_equal: now },
          },
          limit: 100,
        })

        let published = 0
        for (const post of scheduledPosts.docs) {
          await payload.update({
            collection: 'blog-posts',
            id: post.id,
            data: { _status: 'published' },
          })
          published++
        }

        // Archive expired posts
        const expiredPosts = await payload.find({
          collection: 'blog-posts',
          where: {
            _status: { equals: 'published' },
            unpublishAt: { less_than_equal: now },
          },
          limit: 100,
        })

        let archived = 0
        for (const post of expiredPosts.docs) {
          await payload.update({
            collection: 'blog-posts',
            id: post.id,
            data: { _status: 'archived' },
          })
          archived++
        }

        return Response.json({
          success: true,
          published,
          archived,
          timestamp: now,
        })
      },
    },
  ],
}
