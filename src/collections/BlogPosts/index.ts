import type { CollectionConfig } from 'payload'
import { publicReadAccess } from './access'
import { beforeChangeBlogPost } from './hooks'
import { publishScheduledEndpoint } from './publishScheduledEndpoint'
import { blogPostFields } from './fields'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'workflowStatus', '_status', 'publishedAt', 'updatedAt'],
    group: 'Content',
    preview: (doc) => (doc?.slug ? `/blogs/${doc.slug}` : null),
  },
  access: {
    read: publicReadAccess,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  versions: {
    drafts: { autosave: true },
    maxPerDoc: 50,
  },
  fields: blogPostFields,
  hooks: {
    beforeChange: [beforeChangeBlogPost],
  },
  endpoints: [publishScheduledEndpoint],
}
