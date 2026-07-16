import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  CollectionBeforeChangeHook,
  PayloadRequest,
} from 'payload'
import { generateBlogSchema } from './schema'
import { blogCategorySlug } from '@/lib/blog/category'

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

// The category relationship is stored as an id on the doc; resolve it to a slug
// so we can revalidate the exact nested URL /blog/<category>/<slug>.
const resolveCategorySlug = async (category: unknown, req: PayloadRequest): Promise<string | undefined> => {
  const direct = blogCategorySlug(category)
  if (direct) return direct
  if (typeof category === 'string' && category) {
    try {
      const cat = await req.payload.findByID({ collection: 'categories', id: category, depth: 0 })
      return (cat as { slug?: string })?.slug
    } catch {
      return undefined
    }
  }
  return undefined
}

// Refresh the ISR cache for the listing and the affected post so edits/publishes
// go live immediately. Dynamic import + try/catch because hooks can also run
// outside a Next request scope (CLI, migrations), where next/cache is unavailable.
const revalidateBlogPaths = async (doc: { slug?: string; category?: unknown } | undefined, req: PayloadRequest) => {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/blog')
    const categorySlug = await resolveCategorySlug(doc?.category, req)
    if (categorySlug) revalidatePath(`/blog/${categorySlug}`)
    if (doc?.slug && categorySlug) revalidatePath(`/blog/${categorySlug}/${doc.slug}`)
    if (doc?.slug) revalidatePath(`/blogs/${doc.slug}`)
  } catch {
    /* not in a Next request scope; nothing to revalidate */
  }
}

export const afterChangeBlogPost: CollectionAfterChangeHook = async ({ doc, req }) => {
  await revalidateBlogPaths(doc, req)
}

// Belt-and-suspenders cleanup. Payload normally cascades version deletion
// when the parent doc is deleted, but with autosave drafts an in-flight
// version write can land *after* the parent delete and survive as an orphan
// — Payload then surfaces it on read paths and the doc appears to come back.
// Re-running the cleanup here closes the race.
export const afterDeleteBlogPost: CollectionAfterDeleteHook = async ({ id, doc, req }) => {
  try {
    await req.payload.db.deleteMany({
      collection: '_blog-posts_versions',
      where: { parent: { equals: id } },
    })
  } catch {
    /* versions collection may not exist yet on a fresh DB; safe to ignore */
  }
  await revalidateBlogPaths(doc, req)
}
