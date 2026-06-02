import type { PageTemplate } from '../types'

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
