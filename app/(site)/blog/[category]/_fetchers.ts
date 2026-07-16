import type { TemplateContent } from '@/lib/templateRenderer'
import { getPayloadClient } from '@/src/get-payload'

export interface BlogCategoryDoc {
  id: string
  name: string
  slug: string
  description?: string
  color?: string
  metaTitle?: string
  metaDescription?: string
}

export const getCategoryBySlug = async (slug: string): Promise<BlogCategoryDoc | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'categories',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  return (docs[0] as BlogCategoryDoc) || null
}

export const getPostsByCategory = async (categoryId: string): Promise<TemplateContent[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { category: { equals: categoryId } },
    sort: '-publishedAt',
    depth: 1,
    limit: 60,
    draft: false,
    overrideAccess: false,
  })
  return docs as TemplateContent[]
}

// Legacy safety net: a one-segment /blog/<something> that is not a category may
// be an old flat post slug. Resolve it so the page can 301 to the nested URL.
export const findPostBySlug = async (slug: string): Promise<TemplateContent | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
    draft: false,
    overrideAccess: false,
  })
  return (docs[0] as TemplateContent) || null
}
