import type { CollectionConfig, PayloadRequest } from 'payload'
import { publicReadAccess } from './access'
import { afterChangeBlogPost, afterDeleteBlogPost, beforeChangeBlogPost } from './hooks'
import { publishScheduledEndpoint } from './publishScheduledEndpoint'
import { blogPostFields } from './fields'
import { blogCategorySlug, blogPostPath } from '@/lib/blog/category'

const previewUrl = async (
  doc: { slug?: string; category?: unknown } | undefined,
  req: PayloadRequest,
): Promise<string | null> => {
  if (!doc?.slug) return null
  let categorySlug = blogCategorySlug(doc.category)
  if (!categorySlug && typeof doc.category === 'string' && doc.category) {
    try {
      const cat = (await req.payload.findByID({
        collection: 'categories',
        id: doc.category,
        depth: 0,
      })) as { slug?: string }
      categorySlug = cat?.slug
    } catch {
      categorySlug = undefined
    }
  }
  return blogPostPath(categorySlug, doc.slug)
}

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'workflowStatus', '_status', 'publishedAt', 'updatedAt'],
    group: 'Content',
    preview: (doc, { req }) => previewUrl(doc, req),
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
    afterChange: [afterChangeBlogPost],
    afterDelete: [afterDeleteBlogPost],
  },
  endpoints: [publishScheduledEndpoint],
}
