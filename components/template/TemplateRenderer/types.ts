import type { PageTemplate, TemplateContent, TemplateContentType } from '@/lib/templates'

export interface TemplateRendererProps {
  content: TemplateContent
  template: Partial<PageTemplate>
  contentType: TemplateContentType
  relatedContent?: TemplateContent[]
  sidebarData?: {
    popular?: TemplateContent[]
    categories?: string[]
  }
}
