import type { TemplateContent, TemplateContentType } from '@/lib/templates'
import { API_URL, COLLECTION_MAP } from './config'

const DEFAULT_LIMIT = 3

export const fetchRelatedContent = async (
  contentType: TemplateContentType,
  content: TemplateContent,
  limit: number = DEFAULT_LIMIT,
): Promise<TemplateContent[]> => {
  const collection = COLLECTION_MAP[contentType]
  let endpoint = `${API_URL}/api/${collection}?where[id][not_equals]=${content.id}&limit=${limit}&depth=1`
  if (content.category) endpoint += `&where[category][equals]=${content.category}`

  try {
    const res = await fetch(endpoint, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    return data.docs || []
  } catch (error) {
    console.error('Error fetching related content:', error)
    return []
  }
}
