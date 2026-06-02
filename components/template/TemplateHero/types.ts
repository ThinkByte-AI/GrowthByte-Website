export type HeroLayout = 'centered' | 'left' | 'image-bg' | 'split'
export type HeroOverlay = 'none' | 'dark' | 'light' | 'gradient'

export interface HeroConfig {
  enabled: boolean
  layout: HeroLayout
  showCategory: boolean
  showAuthor: boolean
  showDate: boolean
  showReadTime: boolean
}

export interface HeroBackLink {
  href: string
  label: string
}

export interface HeroImageData {
  url: string
  alt?: string
}

export interface TemplateHeroProps {
  title: string
  subtitle?: string
  category?: string
  author?: string
  authorImage?: HeroImageData
  publishedAt?: string
  readTime?: number
  heroImage?: HeroImageData
  heroOverlay?: HeroOverlay
  config: HeroConfig
  backLink?: HeroBackLink
}
