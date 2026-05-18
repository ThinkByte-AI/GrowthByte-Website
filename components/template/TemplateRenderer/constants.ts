import type { TemplateContentType } from '@/lib/templates'

export const BACK_LINKS: Record<TemplateContentType, { href: string; label: string }> = {
  blog: { href: '/blogs', label: 'Back to Blogs' },
  service: { href: '/services', label: 'Back to Services' },
  'case-study': { href: '/case-studies', label: 'Back to Case Studies' },
  landing: { href: '/', label: 'Back to Home' },
}

export const THEME_CLASSES = {
  default: 'bg-surface',
  dark: 'bg-ink text-white',
  brand: 'bg-gradient-to-b from-teal/5 to-surface',
} as const

export type ThemeKey = keyof typeof THEME_CLASSES
