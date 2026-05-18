import type { PageTemplate } from '@/lib/templates'

type TemplatePartial = Partial<PageTemplate>

export const buildHeroConfig = (template: TemplatePartial) => ({
  enabled: template.hero?.enabled ?? true,
  layout: template.hero?.layout ?? 'centered',
  showCategory: template.hero?.showCategory ?? true,
  showAuthor: template.hero?.showAuthor ?? true,
  showDate: template.hero?.showDate ?? true,
  showReadTime: template.hero?.showReadTime ?? true,
})

export const buildSidebarConfig = (template: TemplatePartial) => ({
  enabled: template.sidebar?.enabled ?? false,
  position: template.sidebar?.position ?? 'right',
  widgets: template.sidebar?.widgets ?? [],
})

export const buildContentConfig = (template: TemplatePartial) => ({
  width: template.contentArea?.width ?? 'prose',
  showTableOfContents: template.contentArea?.showTableOfContents ?? false,
  showShareButtons: template.contentArea?.showShareButtons ?? true,
})

export const buildFooterConfig = (template: TemplatePartial) => ({
  showAuthorBox: template.footer?.showAuthorBox ?? false,
  showRelatedPosts: template.footer?.showRelatedPosts ?? true,
  showCTA: template.footer?.showCTA ?? true,
  ctaText: template.footer?.ctaText,
  ctaButtonText: template.footer?.ctaButtonText,
  ctaButtonLink: template.footer?.ctaButtonLink,
})
