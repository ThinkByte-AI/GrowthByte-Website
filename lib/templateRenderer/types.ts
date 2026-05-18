export type { TemplateContent } from '@/lib/templates'
export type { TemplateContentType as ContentType } from '@/lib/templates'

export interface DynamicData {
  relatedPosts?: import('@/lib/templates').TemplateContent[]
  categories?: string[]
  popularPosts?: import('@/lib/templates').TemplateContent[]
  customData?: Record<string, any>
}

export interface RenderOptions {
  contentType?: import('@/lib/templates').TemplateContentType
  dynamicData?: DynamicData
  wrapInContainer?: boolean
}
