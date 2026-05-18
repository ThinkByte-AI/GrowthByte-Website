// Template-related types for the application

export interface PageTemplate {
  id: string
  name: string
  type: 'blog' | 'service' | 'landing' | 'case-study'
  description?: string

  hero: {
    enabled: boolean
    layout: 'centered' | 'left' | 'image-bg' | 'split'
    showCategory: boolean
    showAuthor: boolean
    showDate: boolean
    showReadTime: boolean
  }

  sidebar: {
    enabled: boolean
    position: 'left' | 'right'
    widgets: ('author' | 'related' | 'categories' | 'newsletter' | 'popular' | 'tags')[]
  }

  contentArea: {
    width: 'prose' | 'medium' | 'wide' | 'full'
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
    theme: 'default' | 'dark' | 'brand'
    customCSS?: string
  }

  isDefault?: boolean
}

// Content types that can use templates
export type TemplateContentType = 'blog' | 'service' | 'case-study' | 'landing'

// Generic content interface for any template-renderable content
export interface TemplateContent {
  id: string
  title: string
  slug: string
  template?: PageTemplate | string

  // Hero content
  heroSection?: {
    heroImage?: { url: string; alt?: string }
    heroSubtitle?: string
    heroOverlay?: 'none' | 'dark' | 'light' | 'gradient'
  }

  // Main content
  content?: any

  // Metadata
  excerpt?: string
  featuredImage?: { url: string; alt?: string }
  category?: string
  tags?: string[]
  publishedAt?: string
  author?: string
  authorBio?: string
  authorImage?: { url: string; alt?: string }
  readTime?: number

  // SEO
  metaTitle?: string
  metaDescription?: string

  // Sidebar overrides
  sidebarContent?: {
    customWidget?: any
    hideDefaultWidgets?: boolean
  }

  // Additional content
  additionalBlocks?: {
    gallery?: Array<{ image: { url: string }; caption?: string }>
    videoEmbed?: string
    pullQuote?: string
  }
}

// Props for the TemplateRenderer component
export interface TemplateRendererProps {
  content: TemplateContent
  contentType: TemplateContentType
  relatedContent?: TemplateContent[]
}

// Default template configurations
export const DEFAULT_BLOG_TEMPLATE: Partial<PageTemplate> = {
  hero: {
    enabled: true,
    layout: 'centered',
    showCategory: true,
    showAuthor: true,
    showDate: true,
    showReadTime: true,
  },
  sidebar: {
    enabled: true,
    position: 'right',
    widgets: ['author', 'related', 'categories', 'newsletter'],
  },
  contentArea: {
    width: 'prose',
    showTableOfContents: true,
    showShareButtons: true,
  },
  footer: {
    showAuthorBox: true,
    showRelatedPosts: true,
    showCTA: true,
    ctaText: 'Ready to grow?',
    ctaButtonText: 'Book a Strategy Call',
    ctaButtonLink: '/contact',
  },
  styling: {
    theme: 'default',
  },
}

export const DEFAULT_SERVICE_TEMPLATE: Partial<PageTemplate> = {
  hero: {
    enabled: true,
    layout: 'left',
    showCategory: false,
    showAuthor: false,
    showDate: false,
    showReadTime: false,
  },
  sidebar: {
    enabled: false,
    position: 'right',
    widgets: [],
  },
  contentArea: {
    width: 'wide',
    showTableOfContents: false,
    showShareButtons: false,
  },
  footer: {
    showAuthorBox: false,
    showRelatedPosts: false,
    showCTA: true,
    ctaText: 'Get Started Today',
    ctaButtonText: 'Contact Us',
    ctaButtonLink: '/contact',
  },
  styling: {
    theme: 'default',
  },
}

export const DEFAULT_CASE_STUDY_TEMPLATE: Partial<PageTemplate> = {
  hero: {
    enabled: true,
    layout: 'image-bg',
    showCategory: true,
    showAuthor: false,
    showDate: false,
    showReadTime: false,
  },
  sidebar: {
    enabled: true,
    position: 'right',
    widgets: ['related', 'categories'],
  },
  contentArea: {
    width: 'medium',
    showTableOfContents: true,
    showShareButtons: true,
  },
  footer: {
    showAuthorBox: false,
    showRelatedPosts: true,
    showCTA: true,
    ctaText: 'Want Similar Results?',
    ctaButtonText: 'Talk to Us',
    ctaButtonLink: '/contact',
  },
  styling: {
    theme: 'brand',
  },
}

// Helper to get default template by type
export function getDefaultTemplate(type: TemplateContentType): Partial<PageTemplate> {
  switch (type) {
    case 'blog':
      return DEFAULT_BLOG_TEMPLATE
    case 'service':
      return DEFAULT_SERVICE_TEMPLATE
    case 'case-study':
      return DEFAULT_CASE_STUDY_TEMPLATE
    default:
      return DEFAULT_BLOG_TEMPLATE
  }
}
