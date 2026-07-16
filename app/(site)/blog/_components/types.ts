export interface JournalPost {
  id: string
  slug: string
  title: string
  excerpt?: string
  categorySlug?: string
  categoryName?: string
  categoryColor?: string
  imageUrl?: string
  heroImageUrl?: string
  imageAlt?: string
  author?: string
  authorRole?: string
  authorBio?: string
  authorImageUrl?: string
  authorLinkedinUrl?: string
  authorXUrl?: string
  authorWebsiteUrl?: string
  authorEmail?: string
  readTime?: number
  publishedAt?: string
}
