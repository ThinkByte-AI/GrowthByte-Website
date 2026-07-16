import { resolveBlogCategory } from '../blog/category'
import type { DynamicData, TemplateContent } from './types'

const renderRelatedPostItem = (template: string, post: TemplateContent): string => {
  const category = resolveBlogCategory(post.category)
  let item = template
  item = item.replace(/\{\{title\}\}/g, post.title || '')
  item = item.replace(/\{\{slug\}\}/g, post.slug || '')
  item = item.replace(/\{\{excerpt\}\}/g, post.excerpt || '')
  item = item.replace(/\{\{categorySlug\}\}/g, category?.slug || '')
  item = item.replace(/\{\{category\}\}/g, category?.name || '')
  item = item.replace(/\{\{featuredImage\}\}/g, post.featuredImage?.url || '')
  if (post.publishedAt) {
    const date = new Date(post.publishedAt)
    const formatted = date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    })
    item = item.replace(/\{\{publishedAt\}\}/g, formatted)
  }
  return item
}

const renderPopularPostItem = (template: string, post: TemplateContent): string => {
  let item = template
  item = item.replace(/\{\{title\}\}/g, post.title || '')
  item = item.replace(/\{\{slug\}\}/g, post.slug || '')
  item = item.replace(/\{\{excerpt\}\}/g, post.excerpt || '')
  return item
}

const replaceRelatedPostsCount = (html: string, count: number): string =>
  html.replace(/\{\{relatedPostsCount\}\}/g, String(count))

const replaceRelatedPostsBlock = (html: string, posts: TemplateContent[]): string => {
  const match = html.match(/\{\{#relatedPosts\}\}([\s\S]*?)\{\{\/relatedPosts\}\}/)
  if (!match) return html
  const rendered = posts.map((p) => renderRelatedPostItem(match[1], p)).join('')
  return html.replace(/\{\{#relatedPosts\}\}[\s\S]*?\{\{\/relatedPosts\}\}/, rendered)
}

const replacePopularPostsBlock = (html: string, posts: TemplateContent[]): string => {
  const match = html.match(/\{\{#popularPosts\}\}([\s\S]*?)\{\{\/popularPosts\}\}/)
  if (!match) return html
  const rendered = posts.map((p) => renderPopularPostItem(match[1], p)).join('')
  return html.replace(/\{\{#popularPosts\}\}[\s\S]*?\{\{\/popularPosts\}\}/, rendered)
}

const replaceCategoriesList = (html: string, categories: string[]): string => {
  if (!categories.length) return html.replace(/\{\{categoriesList\}\}/g, '')
  const list = `<ul>${categories.map((c) => `<li>${c}</li>`).join('')}</ul>`
  return html.replace(/\{\{categoriesList\}\}/g, list)
}

const replaceCustomData = (html: string, data: Record<string, any>): string => {
  let result = html
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string' || typeof value === 'number') {
      result = result.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), String(value))
    }
  }
  return result
}

export const replaceBlockPlaceholders = (html: string, dynamicData: DynamicData): string => {
  let result = replaceRelatedPostsCount(html, dynamicData.relatedPosts?.length ?? 0)
  if (dynamicData.relatedPosts) result = replaceRelatedPostsBlock(result, dynamicData.relatedPosts)
  if (dynamicData.popularPosts) result = replacePopularPostsBlock(result, dynamicData.popularPosts)
  result = replaceCategoriesList(result, dynamicData.categories ?? [])
  if (dynamicData.customData) result = replaceCustomData(result, dynamicData.customData)
  return result
}
