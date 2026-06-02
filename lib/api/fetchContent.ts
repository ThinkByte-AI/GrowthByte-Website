import type { TemplateContent, TemplateContentType } from '@/lib/templates'
import { API_URL, COLLECTION_MAP } from './config'
import { fetchTemplate } from './fetchTemplate'

export const fetchContent = async (
  contentType: TemplateContentType,
  slug: string,
): Promise<TemplateContent | null> => {
  const collection = COLLECTION_MAP[contentType]
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
