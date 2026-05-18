export type TemplateContentType = 'blog' | 'service' | 'case-study' | 'landing'

export type HeroLayout = 'centered' | 'left' | 'image-bg' | 'split'
export type HeroOverlay = 'none' | 'dark' | 'light' | 'gradient'
export type SidebarPosition = 'left' | 'right'
export type SidebarWidget = 'author' | 'related' | 'categories' | 'newsletter' | 'popular' | 'tags'
export type ContentWidth = 'prose' | 'medium' | 'wide' | 'full'
export type Theme = 'default' | 'dark' | 'brand'

export interface PageTemplate {
  id: string
  name: string
  type: TemplateContentType
  description?: string

  hero: {
    enabled: boolean
    layout: HeroLayout
    showCategory: boolean
    showAuthor: boolean
    showDate: boolean
    showReadTime: boolean
  }

  sidebar: {
    enabled: boolean
    position: SidebarPosition
    widgets: SidebarWidget[]
  }

  contentArea: {
    width: ContentWidth
    showTableOfContents: boolean
    showShareButtons: boolean
  }

  footer: {
    showAuthorBox: boolean
    showRelatedPosts: boolean
    showCTA: boolean
    ctaText?: string
    ctaButtonText?: string
    ctaButtonLink?: string
  }

  styling: {
    theme: Theme
    customCSS?: string
  }

  isDefault?: boolean
}

export interface MediaRef {
  url: string
  alt?: string
}

export interface TemplateContent {
  id: string
  title: string
  slug: string
  template?: PageTemplate | string

  heroSection?: {
    heroImage?: MediaRef
    heroSubtitle?: string
    heroOverlay?: HeroOverlay
  }

  content?: any

  excerpt?: string
  featuredImage?: MediaRef
  category?: string
  tags?: string[]
  publishedAt?: string
  author?: string
  authorBio?: string
  authorImage?: MediaRef
  readTime?: number

  metaTitle?: string
  metaDescription?: string

  sidebarContent?: {
    customWidget?: any
    hideDefaultWidgets?: boolean
  }

  additionalBlocks?: {
    gallery?: Array<{ image: { url: string }; caption?: string }>
    videoEmbed?: string
    pullQuote?: string
  }

  shortTitle?: string
  outcome?: string
  description?: string
  capabilities?: Array<{ capability: string }>
  icon?: string

  client?: string
  industry?: string
  results?: string
}

export interface TemplateRendererProps {
  content: TemplateContent
  contentType: TemplateContentType
  relatedContent?: TemplateContent[]
}
