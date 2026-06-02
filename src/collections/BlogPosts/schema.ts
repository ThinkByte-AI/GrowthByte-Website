export interface BlogSchemaInput {
  title?: string
  excerpt?: string
  publishedAt?: string
  author?: string
  slug?: string
  category?: string
}

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
    url: 'https://www.growthbyte.ai',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://www.growthbyte.ai/blogs/${data.slug}`,
  },
  articleSection: data.category?.replace('-', ' ') || 'Marketing',
  inLanguage: 'en-US',
})
