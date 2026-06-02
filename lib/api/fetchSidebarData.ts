import type { TemplateContentType } from '@/lib/templates'
import { API_URL, COLLECTION_MAP } from './config'

const POPULAR_LIMIT = 5
const CATEGORY_SCAN_LIMIT = 100

const fetchPopular = async (collection: string) => {
  const endpoint = `${API_URL}/api/${collection}?limit=${POPULAR_LIMIT}&sort=-publishedAt&depth=1`
  const res = await fetch(endpoint, { cache: 'no-store' })
  if (!res.ok) return []
  const data = await res.json()
  return data.docs || []
}

const fetchUniqueCategories = async (collection: string): Promise<string[]> => {
  const endpoint = `${API_URL}/api/${collection}?limit=${CATEGORY_SCAN_LIMIT}&depth=0`
  const res = await fetch(endpoint, { cache: 'no-store' })
  if (!res.ok) return []
  const data = await res.json()
  const categories = data.docs?.map((d: { category?: string }) => d.category).filter(Boolean) ?? []
  return [...new Set(categories)] as string[]
}

export const fetchSidebarData = async (contentType: TemplateContentType) => {
  const collection = COLLECTION_MAP[contentType]
  try {
    const popular = await fetchPopular(collection)
    const categories = contentType === 'blog' ? await fetchUniqueCategories(collection) : []
    return { popular, categories }
  } catch (error) {
    console.error('Error fetching sidebar data:', error)
    return { popular: [], categories: [] }
  }
}
