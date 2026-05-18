import type { TemplateContent } from '@/lib/templateRenderer'

const API_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const getService = async (slug: string): Promise<TemplateContent | null> => {
  const res = await fetch(
    `${API_URL}/api/services?where[slug][equals]=${slug}&depth=2&limit=1`,
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

export const getDefaultServiceTemplate = async () => {
  const res = await fetch(
    `${API_URL}/api/page-templates?where[type][equals]=service&where[isDefault][equals]=true&limit=1`,
    { cache: 'no-store' },
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] || null
}

export const getRelatedServices = async (
  currentSlug: string,
  limit: number = 3,
): Promise<TemplateContent[]> => {
  const res = await fetch(
    `${API_URL}/api/services?where[slug][not_equals]=${currentSlug}&limit=${limit}&depth=1`,
    { cache: 'no-store' },
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.docs || []
}

export const resolveServiceTemplate = async (service: TemplateContent) => {
  let template = null
  if (service.template) {
    template = typeof service.template === 'string'
      ? await getTemplate(service.template)
      : service.template
  }
  if (!template?.customLayout?.html) {
    template = await getDefaultServiceTemplate()
  }
  return template
}
