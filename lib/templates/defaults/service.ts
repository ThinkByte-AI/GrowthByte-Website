import type { PageTemplate } from '../types'

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
