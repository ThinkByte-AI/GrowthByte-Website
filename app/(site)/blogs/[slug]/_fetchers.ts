import type { TemplateContent } from '@/lib/templateRenderer'

const API_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const getBlogPost = async (slug: string): Promise<TemplateContent | null> => {
  const res = await fetch(
    `${API_URL}/api/blog-posts?where[slug][equals]=${slug}&depth=2&limit=1`,
    { cache: 'no-store' },
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] || null
}

export const getTemplate = async (templateId: string) => {
  const res = await fetch(`${API_URL}/api/page-templates/${templateId}?depth=0`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export const getDefaultBlogTemplate = async () => {
  const res = await fetch(
    `${API_URL}/api/page-templates?where[type][equals]=blog&where[isDefault][equals]=true&limit=1`,
    { cache: 'no-store' },
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] || null
}

export const getRelatedBlogPosts = async (
  currentSlug: string,
  limit: number = 3,
): Promise<TemplateContent[]> => {
  const res = await fetch(
    `${API_URL}/api/blog-posts?where[slug][not_equals]=${currentSlug}&limit=${limit}&sort=-publishedAt&depth=1`,
    { cache: 'no-store' },
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.docs || []
}

export const resolveBlogTemplate = async (post: TemplateContent) => {
  let template = null
  if (post.template) {
    template = typeof post.template === 'string' ? await getTemplate(post.template) : post.template
  }
  if (!template?.customLayout?.html) {
    template = await getDefaultBlogTemplate()
  }
  return template
}
