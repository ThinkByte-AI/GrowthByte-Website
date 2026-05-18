import type { CollectionBeforeChangeHook } from 'payload'
import { generateBlogSchema } from './schema'

const WORDS_PER_MINUTE = 200

const autoCalculateReadTime = (data: any) => {
  if (data.content && !data.readTime) {
    const wordCount = data.content.toString().split(/\s+/).length
    data.readTime = Math.ceil(wordCount / WORDS_PER_MINUTE)
  }
}

const syncStatusWithPublishDate = (data: any) => {
  if (!data.publishedAt) return
  const publishDate = new Date(data.publishedAt)
  const now = new Date()

  if (data._status === 'draft' && publishDate > now) {
    data._status = 'scheduled'
    return
  }
  if (data._status === 'scheduled' && publishDate <= now) {
    data._status = 'published'
  }
}

const regenerateSeoSchemaIfNeeded = (data: any) => {
  if (data.regenerateSchema || !data.seoSchema) {
    data.seoSchema = generateBlogSchema(data)
    data.regenerateSchema = false
  }
}

export const beforeChangeBlogPost: CollectionBeforeChangeHook = ({ data }) => {
  autoCalculateReadTime(data)
  syncStatusWithPublishDate(data)
  regenerateSeoSchemaIfNeeded(data)
  return data
}
