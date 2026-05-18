import type { TemplateContent } from '@/lib/templates'

export type WidgetKey = 'author' | 'related' | 'categories' | 'newsletter' | 'popular' | 'tags'

export interface SidebarConfig {
  enabled: boolean
  position: 'left' | 'right'
  widgets: WidgetKey[]
}

export interface TemplateSidebarProps {
  content: TemplateContent
  relatedContent?: TemplateContent[]
  popularContent?: TemplateContent[]
  categories?: string[]
  config: SidebarConfig
}
