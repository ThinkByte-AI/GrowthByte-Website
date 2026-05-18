// Unified template rendering with placeholder replacement
// Works for any website - no hardcoded branding

import { lexicalToHtml } from './lexicalToHtml'

// Content types that can be rendered
export type ContentType = 'blog' | 'service' | 'case-study' | 'landing'

// Standard content fields available for placeholders
export interface TemplateContent {
  id: string
  title: string
  slug: string
  excerpt?: string
  content?: any // Lexical JSON
  featuredImage?: { url: string; alt?: string }
  category?: string
  tags?: string[]
  publishedAt?: string
  author?: string
  authorBio?: string
  authorImage?: { url: string; alt?: string }
  readTime?: number
  metaTitle?: string
  metaDescription?: string
  // Service specific
  shortTitle?: string
  outcome?: string
  description?: string
  capabilities?: Array<{ capability: string }>
  icon?: string
  // Case study specific
  client?: string
  industry?: string
  results?: string
}

// Dynamic data for blocks
export interface DynamicData {
  relatedPosts?: TemplateContent[]
  categories?: string[]
  popularPosts?: TemplateContent[]
  customData?: Record<string, any>
}

// Render options
export interface RenderOptions {
  contentType?: ContentType
  dynamicData?: DynamicData
  wrapInContainer?: boolean
}

// Available placeholders by content type
export const AVAILABLE_PLACEHOLDERS: Record<ContentType, string[]> = {
  blog: [
    'title', 'slug', 'excerpt', 'content', 'featuredImage', 'featuredImageAlt',
    'category', 'tags', 'publishedAt', 'author', 'authorBio', 'authorImage',
    'readTime', 'metaTitle', 'metaDescription'
  ],
  service: [
    'title', 'slug', 'shortTitle', 'description', 'outcome', 'content',
    'featuredImage', 'featuredImageAlt', 'capabilities', 'icon',
    'metaTitle', 'metaDescription'
  ],
  'case-study': [
    'title', 'slug', 'excerpt', 'content', 'featuredImage', 'featuredImageAlt',
    'client', 'industry', 'results', 'category',
    'metaTitle', 'metaDescription'
  ],
  landing: [
    'title', 'slug', 'content', 'featuredImage', 'featuredImageAlt'
  ],
}

/**
 * Replace single placeholder like {{title}} with value
 */
function replacePlaceholder(html: string, key: string, value: any): string {
  const placeholder = new RegExp(`\\{\\{${key}\\}\\}`, 'g')

  if (value === null || value === undefined) {
    return html.replace(placeholder, '')
  }

  // Handle object with url (like images)
  if (typeof value === 'object' && value.url) {
    return html.replace(placeholder, value.url)
  }

  // Handle array of objects (like capabilities)
  if (Array.isArray(value)) {
    return html.replace(placeholder, JSON.stringify(value))
  }

  return html.replace(placeholder, String(value))
}

/**
 * Replace nested placeholder like {{author.name}} with value
 */
function replaceNestedPlaceholder(html: string, key: string, value: any): string {
  const parts = key.split('.')
  let current = value

  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = current[part]
    } else {
      return html.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), '')
    }
  }

  if (current && typeof current === 'object' && 'url' in current) {
    current = current.url
  }

  return html.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(current || ''))
}

/**
 * Replace all standard placeholders in HTML
 */
export function replacePlaceholders(html: string, content: TemplateContent): string {
  let result = html

  // Standard flat placeholders
  const flatKeys = [
    'title', 'slug', 'excerpt', 'category', 'publishedAt', 'author',
    'authorBio', 'readTime', 'metaTitle', 'metaDescription',
    'shortTitle', 'outcome', 'description', 'icon', 'client', 'industry', 'results'
  ]

  for (const key of flatKeys) {
    if (key in content) {
      result = replacePlaceholder(result, key, (content as any)[key])
    }
  }

  // Nested placeholders
  result = replaceNestedPlaceholder(result, 'authorImage', content.authorImage)
  result = replaceNestedPlaceholder(result, 'featuredImage', content.featuredImage)

  // Aliases for image alt text
  if (content.featuredImage?.alt) {
    result = result.replace(/\{\{featuredImageAlt\}\}/g, content.featuredImage.alt)
  } else {
    result = result.replace(/\{\{featuredImageAlt\}\}/g, content.title || '')
  }

  // Tags as comma-separated string
  if (content.tags && content.tags.length > 0) {
    result = result.replace(/\{\{tags\}\}/g, content.tags.join(', '))
  } else {
    result = result.replace(/\{\{tags\}\}/g, '')
  }

  // Capabilities as list items
  if (content.capabilities && content.capabilities.length > 0) {
    const capList = content.capabilities
      .map(cap => `<li>${cap.capability}</li>`)
      .join('')
    result = result.replace(/\{\{capabilities\}\}/g, `<ul>${capList}</ul>`)
  } else {
    result = result.replace(/\{\{capabilities\}\}/g, '')
  }

  // Rich content - convert Lexical JSON to HTML
  if (content.content) {
    const contentHtml = lexicalToHtml(content.content)
    result = result.replace(/\{\{content\}\}/g, `<div class="rich-content">${contentHtml}</div>`)
  } else {
    result = result.replace(/\{\{content\}\}/g, '')
  }

  return result
}

/**
 * Replace block placeholders like {{#relatedPosts}}...{{/relatedPosts}}
 */
function replaceBlockPlaceholders(
  html: string,
  dynamicData: DynamicData
): string {
  let result = html

  // Related posts block
  if (dynamicData.relatedPosts && dynamicData.relatedPosts.length > 0) {
    result = result.replace(/\{\{relatedPostsCount\}\}/g, String(dynamicData.relatedPosts.length))
  } else {
    result = result.replace(/\{\{relatedPostsCount\}\}/g, '0')
  }

  // Related posts iteration: {{#relatedPosts}}...{{/relatedPosts}}
  const relatedPostsMatch = result.match(/\{\{#relatedPosts\}\}([\s\S]*?)\{\{\/relatedPosts\}\}/)
  if (relatedPostsMatch && dynamicData.relatedPosts) {
    const template = relatedPostsMatch[1]
    const renderedPosts = dynamicData.relatedPosts
      .map(post => {
        let item = template
        item = item.replace(/\{\{title\}\}/g, post.title || '')
        item = item.replace(/\{\{slug\}\}/g, post.slug || '')
        item = item.replace(/\{\{excerpt\}\}/g, post.excerpt || '')
        item = item.replace(/\{\{category\}\}/g, post.category || '')
        item = item.replace(/\{\{featuredImage\}\}/g, post.featuredImage?.url || '')
        if (post.publishedAt) {
          const date = new Date(post.publishedAt)
          item = item.replace(/\{\{publishedAt\}\}/g, date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }))
        }
        return item
      })
      .join('')
    result = result.replace(/\{\{#relatedPosts\}\}[\s\S]*?\{\{\/relatedPosts\}\}/, renderedPosts)
  }

  // Popular posts iteration
  const popularMatch = result.match(/\{\{#popularPosts\}\}([\s\S]*?)\{\{\/popularPosts\}\}/)
  if (popularMatch && dynamicData.popularPosts) {
    const template = popularMatch[1]
    const renderedPosts = dynamicData.popularPosts
      .map(post => {
        let item = template
        item = item.replace(/\{\{title\}\}/g, post.title || '')
        item = item.replace(/\{\{slug\}\}/g, post.slug || '')
        item = item.replace(/\{\{excerpt\}\}/g, post.excerpt || '')
        return item
      })
      .join('')
    result = result.replace(/\{\{#popularPosts\}\}[\s\S]*?\{\{\/popularPosts\}\}/, renderedPosts)
  }

  // Categories list
  if (dynamicData.categories && dynamicData.categories.length > 0) {
    const catList = dynamicData.categories
      .map(cat => `<li>${cat}</li>`)
      .join('')
    result = result.replace(/\{\{categoriesList\}\}/g, `<ul>${catList}</ul>`)
  } else {
    result = result.replace(/\{\{categoriesList\}\}/g, '')
  }

  // Custom data placeholders
  if (dynamicData.customData) {
    for (const [key, value] of Object.entries(dynamicData.customData)) {
      if (typeof value === 'string' || typeof value === 'number') {
        result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(value))
      }
    }
  }

  return result
}

/**
 * Main render function - takes template HTML/CSS and content, returns rendered HTML/CSS
 */
export function renderTemplate(
  template: { html: string; css?: string },
  content: TemplateContent,
  options: RenderOptions = {}
): { html: string; css: string } {
  let html = template.html
  const css = template.css || ''

  // Replace standard content placeholders
  html = replacePlaceholders(html, content)

  // Replace dynamic block placeholders
  if (options.dynamicData) {
    html = replaceBlockPlaceholders(html, options.dynamicData)
  }

  // Wrap in container if requested
  if (options.wrapInContainer) {
    html = `<div class="template-container">${html}</div>`
  }

  return { html, css }
}

/**
 * Get list of available placeholders for a content type
 */
export function getPlaceholdersForType(contentType: ContentType): string[] {
  const base = AVAILABLE_PLACEHOLDERS[contentType] || []
  const dynamic = ['relatedPostsCount', 'relatedPosts', 'categoriesList', 'popularPosts']
  return [...base, ...dynamic]
}

/**
 * Generate placeholder helper HTML for the editor
 */
export function generatePlaceholderHelp(contentType: ContentType): string {
  const placeholders = getPlaceholdersForType(contentType)
  return `
    <div style="padding: 16px; background: #1a1a1a; border: 1px solid #333; border-radius: 8px; margin: 16px 0;">
      <h4 style="color: #00b5aa; margin: 0 0 12px 0;">Available Placeholders</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${placeholders.map(p => `<code style="background: #333; padding: 4px 8px; border-radius: 4px; color: #ccc; font-size: 12px;">{{${p}}}</code>`).join('')}
      </div>
      <p style="color: #888; font-size: 12px; margin: 12px 0 0 0;">
        For lists: use <code style="background: #333; padding: 2px 6px; border-radius: 2px;">{{#relatedPosts}}...{{/relatedPosts}}</code>
      </p>
    </div>
  `
}
