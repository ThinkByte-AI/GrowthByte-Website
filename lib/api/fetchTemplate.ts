import {
  getDefaultTemplate,
  type PageTemplate,
  type TemplateContent,
  type TemplateContentType,
} from '@/lib/templates'
import { API_URL } from './config'

export const fetchTemplate = async (templateId: string): Promise<PageTemplate | null> => {
  const endpoint = `${API_URL}/api/page-templates/${templateId}`
  try {
    const res = await fetch(endpoint, { cache: 'no-store' })
    if (!res.ok) return null
    return await res.json()
  } catch (error) {
    console.error('Error fetching template:', error)
    return null
  }
}

export const fetchDefaultTemplate = async (
  contentType: TemplateContentType,
): Promise<PageTemplate | null> => {
  const endpoint = `${API_URL}/api/page-templates?where[type][equals]=${contentType}&where[isDefault][equals]=true&limit=1`
  try {
    const res = await fetch(endpoint, { cache: 'no-store' })
    if (!res.ok) return null
    const data = await res.json()
    return data.docs?.[0] || null
  } catch (error) {
    console.error('Error fetching default template:', error)
    return null
  }
}

export const getEffectiveTemplate = async (
  content: TemplateContent,
  contentType: TemplateContentType,
): Promise<Partial<PageTemplate>> => {
  if (content.template && typeof content.template === 'object') {
    return content.template
  }
  const remote = await fetchDefaultTemplate(contentType)
  if (remote) return remote
  return getDefaultTemplate(contentType)
}
