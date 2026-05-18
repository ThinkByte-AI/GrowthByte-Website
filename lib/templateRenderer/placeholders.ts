import type { ContentType } from './types'

export const AVAILABLE_PLACEHOLDERS: Record<ContentType, string[]> = {
  blog: [
    'title', 'slug', 'excerpt', 'content', 'featuredImage', 'featuredImageAlt',
    'category', 'tags', 'publishedAt', 'author', 'authorBio', 'authorImage',
    'readTime', 'metaTitle', 'metaDescription',
  ],
  service: [
    'title', 'slug', 'shortTitle', 'description', 'outcome', 'content',
    'featuredImage', 'featuredImageAlt', 'capabilities', 'icon',
    'metaTitle', 'metaDescription',
  ],
  'case-study': [
    'title', 'slug', 'excerpt', 'content', 'featuredImage', 'featuredImageAlt',
    'client', 'industry', 'results', 'category',
    'metaTitle', 'metaDescription',
  ],
  landing: ['title', 'slug', 'content', 'featuredImage', 'featuredImageAlt'],
}

const DYNAMIC_PLACEHOLDERS = ['relatedPostsCount', 'relatedPosts', 'categoriesList', 'popularPosts']

export const getPlaceholdersForType = (contentType: ContentType): string[] => {
  const base = AVAILABLE_PLACEHOLDERS[contentType] || []
  return [...base, ...DYNAMIC_PLACEHOLDERS]
}

const renderPlaceholderChip = (placeholder: string) =>
  `<code style="background: #333; padding: 4px 8px; border-radius: 4px; color: #ccc; font-size: 12px;">{{${placeholder}}}</code>`

export const generatePlaceholderHelp = (contentType: ContentType): string => {
  const placeholders = getPlaceholdersForType(contentType)
  const chips = placeholders.map(renderPlaceholderChip).join('')
  return `
    <div style="padding: 16px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; margin: 16px 0;">
      <h4 style="color: #00b5aa; margin: 0 0 12px 0;">Available Placeholders</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">${chips}</div>
      <p style="color: #888; font-size: 12px; margin: 12px 0 0 0;">
        For lists: use <code style="background: #333; padding: 2px 6px; border-radius: 2px;">{{#relatedPosts}}...{{/relatedPosts}}</code>
      </p>
    </div>
  `
}
