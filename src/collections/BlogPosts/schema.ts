import { blogCategorySlug, blogPostPath, resolveBlogCategory } from '@/lib/blog/category'

export interface BlogSchemaInput {
  title?: string
  excerpt?: string
  publishedAt?: string
  author?: string
  slug?: string
  category?: unknown
}

const BASE_URL = 'https://www.growthbyte.ai'

export const generateBlogSchema = (data: BlogSchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: data.title,
  description: data.excerpt,
  datePublished: data.publishedAt,
  author: {
    '@type': data.author ? 'Person' : 'Organization',
    name: data.author || 'GrowthByte',
  },
  publisher: {
    '@type': 'Organization',
    name: 'GrowthByte',
    url: BASE_URL,
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${BASE_URL}${blogPostPath(blogCategorySlug(data.category), data.slug || '')}`,
  },
  articleSection: resolveBlogCategory(data.category)?.name || 'Marketing',
  inLanguage: 'en-US',
})
