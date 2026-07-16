import type { JournalPost } from './types'
import { resolveBlogCategory } from '@/lib/blog/category'

interface MediaRef {
  url?: string
  alt?: string
}

interface AuthorRef {
  name?: string
  role?: string
  bio?: string
  avatar?: MediaRef
  linkedinUrl?: string
  xUrl?: string
  websiteUrl?: string
  email?: string
}

const mediaRef = (value: unknown): MediaRef =>
  value && typeof value === 'object' ? (value as MediaRef) : {}

const authorRef = (value: unknown): AuthorRef =>
  value && typeof value === 'object' ? (value as AuthorRef) : {}

export const toJournalPost = (post: Record<string, unknown>): JournalPost => {
  const image = mediaRef(post.featuredImage)
  const heroSection = post.heroSection as { heroImage?: unknown } | undefined
  const heroImage = mediaRef(heroSection?.heroImage)
  const author = authorRef(post.author)
  const authorAvatar = mediaRef(author.avatar)
  const category = resolveBlogCategory(post.category)
  return {
    id: String(post.id),
    slug: String(post.slug),
    title: (post.title as string) || 'Untitled',
    excerpt: post.excerpt as string | undefined,
    categorySlug: category?.slug,
    categoryName: category?.name,
    categoryColor: category?.color,
    imageUrl: image.url,
    heroImageUrl: heroImage.url,
    imageAlt: image.alt || heroImage.alt,
    author: author.name,
    authorRole: author.role,
    authorBio: author.bio,
    authorImageUrl: authorAvatar.url,
    authorLinkedinUrl: author.linkedinUrl,
    authorXUrl: author.xUrl,
    authorWebsiteUrl: author.websiteUrl,
    authorEmail: author.email,
    readTime: post.readTime as number | undefined,
    publishedAt: post.publishedAt as string | undefined,
  }
}
