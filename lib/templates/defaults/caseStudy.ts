import type { PageTemplate } from '../types'

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
