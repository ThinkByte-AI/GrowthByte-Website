import type { CollectionAfterDeleteHook, CollectionBeforeChangeHook } from 'payload'
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
  const isFuture = publishDate > now
  const isPastOrNow = publishDate <= now

  if (data.workflowStatus === 'draft' && isFuture) {
    data.workflowStatus = 'scheduled'
    return
  }
  if (data.workflowStatus === 'published' && isFuture) {
    data.workflowStatus = 'scheduled'
    return
  }
  if (data.workflowStatus === 'scheduled' && isPastOrNow) {
    data.workflowStatus = 'published'
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

// Belt-and-suspenders cleanup. Payload normally cascades version deletion
// when the parent doc is deleted, but with autosave drafts an in-flight
// version write can land *after* the parent delete and survive as an orphan
// — Payload then surfaces it on read paths and the doc appears to come back.
// Re-running the cleanup here closes the race.
export const afterDeleteBlogPost: CollectionAfterDeleteHook = async ({ id, req }) => {
  try {
    await req.payload.db.deleteMany({
      collection: '_blog-posts_versions',
      where: { parent: { equals: id } },
    })
  } catch {
    /* versions collection may not exist yet on a fresh DB; safe to ignore */
  }
}
