export interface JournalPost {
  id: string
  slug: string
  title: string
  excerpt?: string
  category?: string
  imageUrl?: string
  heroImageUrl?: string
  imageAlt?: string
  author?: string
  authorBio?: string
  authorImageUrl?: string
  readTime?: number
  publishedAt?: string
}
