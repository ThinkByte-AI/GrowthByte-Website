import type { TemplateContent } from '@/lib/templateRenderer'
import { getPayloadClient } from '@/src/get-payload'

export const getBlogPost = async (slug: string): Promise<TemplateContent | null> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
    draft: false,
    overrideAccess: false,
  })
  return (docs[0] as TemplateContent) || null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTemplate = async (templateId: string): Promise<any> => {
  const payload = await getPayloadClient()
  try {
    return await payload.findByID({ collection: 'page-templates', id: templateId, depth: 0 })
  } catch {
    return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getDefaultBlogTemplate = async (): Promise<any> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'page-templates',
    where: {
      type: { equals: 'blog' },
      isDefault: { equals: true },
    },
    limit: 1,
  })
  return docs[0] || null
}

export const getRelatedBlogPosts = async (
  currentSlug: string,
  limit: number = 3,
): Promise<TemplateContent[]> => {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { slug: { not_equals: currentSlug } },
    limit,
    sort: '-publishedAt',
    depth: 1,
    draft: false,
    overrideAccess: false,
  })
  return docs as TemplateContent[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const resolveBlogTemplate = async (post: TemplateContent): Promise<any> => {
  let template = null
  if (post.template) {
    template = typeof post.template === 'string' ? await getTemplate(post.template) : post.template
  }
  if (!template?.customLayout?.html) {
    template = await getDefaultBlogTemplate()
  }
  return template
}
