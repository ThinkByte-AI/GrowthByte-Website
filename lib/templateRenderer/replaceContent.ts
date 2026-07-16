import { lexicalToHtml } from '../lexicalToHtml'
import { resolveBlogCategory } from '../blog/category'
import type { TemplateContent } from './types'
import { replaceNestedPlaceholder, replacePlaceholder } from './replaceField'
import { buildTocHtml } from './buildTocHtml'

const FLAT_KEYS = [
  'title', 'slug', 'excerpt', 'publishedAt', 'author',
  'authorBio', 'readTime', 'metaTitle', 'metaDescription',
  'shortTitle', 'outcome', 'description', 'icon', 'client', 'industry', 'results',
]

// `category` is a relationship object on blog posts but a plain string on case
// studies; resolve both to display name + url slug.
const replaceCategoryFields = (html: string, content: TemplateContent): string => {
  const resolved = resolveBlogCategory(content.category)
  const asString = typeof content.category === 'string' ? content.category : ''
  const name = resolved?.name ?? asString
  const slug = resolved?.slug ?? asString
  let result = html.replace(/\{\{categorySlug\}\}/g, slug)
  result = result.replace(/\{\{category\}\}/g, name)
  return result
}

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

const replaceToc = (html: string, content: TemplateContent): string => {
  const tocHtml = content.content ? buildTocHtml(content.content) : ''
  return html.replace(/\{\{toc\}\}/g, tocHtml)
}

export const replacePlaceholders = (html: string, content: TemplateContent): string => {
  let result = replaceFlatFields(html, content)
  result = replaceCategoryFields(result, content)
  result = replaceImageFields(result, content)
  result = replaceListFields(result, content)
  result = replaceRichContent(result, content)
  result = replaceToc(result, content)
  return result
}
