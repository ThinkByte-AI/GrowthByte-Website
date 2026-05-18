// Template-aware content fetching utilities

import { PageTemplate, TemplateContent, TemplateContentType, getDefaultTemplate } from './templates'

const API_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

// Fetch content with template populated
export async function fetchContent(
  contentType: TemplateContentType,
  slug: string
): Promise<TemplateContent | null> {
  const collectionMap: Record<TemplateContentType, string> = {
    blog: 'blog-posts',
    service: 'services',
    'case-study': 'case-studies',
    landing: 'pages', // If you have a pages collection
  }

  const collection = collectionMap[contentType]
  const endpoint = `${API_URL}/api/${collection}?where[slug][equals]=${slug}&depth=2&limit=1`

  try {
    const res = await fetch(endpoint, {
      cache: 'no-store',
      next: { revalidate: 0 },
    })

    if (!res.ok) return null

    const data = await res.json()
    const doc = data.docs?.[0]

    if (!doc) return null

    // If template is just an ID string, fetch the full template
    if (doc.template && typeof doc.template === 'string') {
      const template = await fetchTemplate(doc.template)
      return { ...doc, template }
    }

    return doc
  } catch (error) {
    console.error(`Error fetching ${contentType} content:`, error)
    return null
  }
}

// Fetch template by ID
export async function fetchTemplate(templateId: string): Promise<PageTemplate | null> {
  const endpoint = `${API_URL}/api/page-templates/${templateId}`

  try {
    const res = await fetch(endpoint, {
      cache: 'no-store',
    })

    if (!res.ok) return null

    return await res.json()
  } catch (error) {
    console.error('Error fetching template:', error)
    return null
  }
}

// Fetch default template for a content type
export async function fetchDefaultTemplate(
  contentType: TemplateContentType
): Promise<PageTemplate | null> {
  const endpoint = `${API_URL}/api/page-templates?where[type][equals]=${contentType}&where[isDefault][equals]=true&limit=1`

  try {
    const res = await fetch(endpoint, {
      cache: 'no-store',
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching default template:', error)
    return null
  }
}

// Get template or fallback to default
export async function getEffectiveTemplate(
  content: TemplateContent,
  contentType: TemplateContentType
): Promise<Partial<PageTemplate>> {
  // If content has a template, use it
  if (content.template && typeof content.template === 'object') {
    return content.template
  }

  // Try to fetch default template for this content type
  const defaultTemplate = await fetchDefaultTemplate(contentType)

  if (defaultTemplate) {
    return defaultTemplate
  }

  // Fallback to hardcoded defaults
  return getDefaultTemplate(contentType)
}

// Fetch related content (same category or random)
export async function fetchRelatedContent(
  contentType: TemplateContentType,
  content: TemplateContent,
  limit: number = 3
): Promise<TemplateContent[]> {
  const collectionMap: Record<TemplateContentType, string> = {
    blog: 'blog-posts',
    service: 'services',
    'case-study': 'case-studies',
    landing: 'pages',
  }

  const collection = collectionMap[contentType]
  const excludeId = content.id

  // First try to get content from same category
  let endpoint = `${API_URL}/api/${collection}?where[id][not_equals]=${excludeId}&limit=${limit}&depth=1`

  if (content.category) {
    endpoint += `&where[category][equals]=${content.category}`
  }

  try {
    const res = await fetch(endpoint, {
      cache: 'no-store',
    })

    if (!res.ok) return []

    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching related content:', error)
    return []
  }
}

// Fetch content for sidebar widgets
export async function fetchSidebarData(contentType: TemplateContentType) {
  // For "popular" or "categories" widgets
  const collectionMap: Record<TemplateContentType, string> = {
    blog: 'blog-posts',
    service: 'services',
    'case-study': 'case-studies',
    landing: 'pages',
  }

  const collection = collectionMap[contentType]

  try {
    // Get popular (most recent for now)
    const popularEndpoint = `${API_URL}/api/${collection}?limit=5&sort=-publishedAt&depth=1`
    const popularRes = await fetch(popularEndpoint, { cache: 'no-store' })
    const popularData = popularRes.ok ? await popularRes.json() : { docs: [] }

    // Get categories (for blogs)
    let categories: string[] = []
    if (contentType === 'blog') {
      const categoriesEndpoint = `${API_URL}/api/${collection}?limit=100&depth=0`
      const categoriesRes = await fetch(categoriesEndpoint, { cache: 'no-store' })
      if (categoriesRes.ok) {
        const categoriesData = await categoriesRes.json()
        categories = [...new Set(categoriesData.docs?.map((d: { category?: string }) => d.category).filter(Boolean))] as string[]
      }
    }

    return {
      popular: popularData.docs || [],
      categories,
    }
  } catch (error) {
    console.error('Error fetching sidebar data:', error)
    return { popular: [], categories: [] }
  }
}
