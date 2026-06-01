import type { JournalPost } from './types'

interface MediaRef {
  url?: string
  alt?: string
}

const mediaRef = (value: unknown): MediaRef =>
  value && typeof value === 'object' ? (value as MediaRef) : {}

export const toJournalPost = (post: Record<string, unknown>): JournalPost => {
  const image = mediaRef(post.featuredImage)
  const heroSection = post.heroSection as { heroImage?: unknown } | undefined
  const heroImage = mediaRef(heroSection?.heroImage)
  const authorImage = mediaRef(post.authorImage)
  return {
    id: String(post.id),
    slug: String(post.slug),
    title: (post.title as string) || 'Untitled',
    excerpt: post.excerpt as string | undefined,
    category: post.category as string | undefined,
    imageUrl: image.url,
    heroImageUrl: heroImage.url,
    imageAlt: image.alt || heroImage.alt,
    author: post.author as string | undefined,
    authorBio: post.authorBio as string | undefined,
    authorImageUrl: authorImage.url,
    readTime: post.readTime as number | undefined,
    publishedAt: post.publishedAt as string | undefined,
  }
}
