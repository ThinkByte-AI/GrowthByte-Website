import { lexicalToHtml } from '../lexicalToHtml'
import type { TemplateContent } from './types'
import { replaceNestedPlaceholder, replacePlaceholder } from './replaceField'

const FLAT_KEYS = [
  'title', 'slug', 'excerpt', 'category', 'publishedAt', 'author',
  'authorBio', 'readTime', 'metaTitle', 'metaDescription',
  'shortTitle', 'outcome', 'description', 'icon', 'client', 'industry', 'results',
]

const replaceFlatFields = (html: string, content: TemplateContent): string => {
  let result = html
  for (const key of FLAT_KEYS) {
    if (key in content) {
      result = replacePlaceholder(result, key, (content as any)[key])
    }
  }
  return result
}

const replaceImageFields = (html: string, content: TemplateContent): string => {
  let result = replaceNestedPlaceholder(html, 'authorImage', content.authorImage)
  result = replaceNestedPlaceholder(result, 'featuredImage', content.featuredImage)
  const altText = content.featuredImage?.alt || content.title || ''
  return result.replace(/\{\{featuredImageAlt\}\}/g, altText)
}

const replaceListFields = (html: string, content: TemplateContent): string => {
  const tagsString = content.tags?.length ? content.tags.join(', ') : ''
  let result = html.replace(/\{\{tags\}\}/g, tagsString)

  const capsList = content.capabilities?.length
    ? `<ul>${content.capabilities.map((c) => `<li>${c.capability}</li>`).join('')}</ul>`
    : ''
  return result.replace(/\{\{capabilities\}\}/g, capsList)
}

const replaceRichContent = (html: string, content: TemplateContent): string => {
  if (!content.content) return html.replace(/\{\{content\}\}/g, '')
  const contentHtml = lexicalToHtml(content.content)
  return html.replace(/\{\{content\}\}/g, `<div class="rich-content">${contentHtml}</div>`)
}

export const replacePlaceholders = (html: string, content: TemplateContent): string => {
  let result = replaceFlatFields(html, content)
  result = replaceImageFields(result, content)
  result = replaceListFields(result, content)
  result = replaceRichContent(result, content)
  return result
}
