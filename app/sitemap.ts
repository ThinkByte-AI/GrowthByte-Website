import { MetadataRoute } from 'next'
import { getAllCaseStudies } from '@/app/(site)/case-studies/[slug]/_fetchers'
import { getAllServices } from '@/app/(site)/services/[slug]/_fetchers'
import { getAllIndustries } from '@/app/(site)/industries/_fetchers'
import { getPayloadClient } from '@/src/get-payload'
import { blogCategoryPath, blogPostPath, resolveBlogCategory } from '@/lib/blog/category'

// Sitemap pulls case-study URLs from Payload (DB call). Don't prerender at
// build time — env may not be loaded and rebuilding for every new post is
// pointless. Generate per request instead.
export const dynamic = 'force-dynamic'

const BASE_URL = 'https://www.growthbyte.ai'

interface BlogPostRow {
  slug?: string
  category?: unknown
  updatedAt?: string
}

const getBlogEntries = async (): Promise<MetadataRoute.Sitemap> => {
  const payload = await getPayloadClient()
  const [posts, categories] = await Promise.all([
    payload.find({ collection: 'blog-posts', limit: 500, depth: 1, pagination: false, draft: false, overrideAccess: false }),
    payload.find({ collection: 'categories', limit: 100, pagination: false }),
  ])
  const postPages = (posts.docs as BlogPostRow[]).map((p) => ({
    url: `${BASE_URL}${blogPostPath(resolveBlogCategory(p.category)?.slug, p.slug || '')}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  const categoryPages = (categories.docs as { slug?: string }[]).map((c) => ({
    url: `${BASE_URL}${blogCategoryPath(c.slug)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))
  return [...categoryPages, ...postPages]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, industries, caseStudies, blogEntries] = await Promise.all([
    getAllServices(200),
    getAllIndustries(200),
    getAllCaseStudies(200),
    getBlogEntries(),
  ])

  const servicePages = services.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const industryPages = industries.map((i) => ({
    url: `${BASE_URL}/industries/${i.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  const caseStudyPages = caseStudies.map((c) => ({
    url: `${BASE_URL}/case-studies/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...servicePages,
    {
      url: `${BASE_URL}/industries`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...industryPages,
    {
      url: `${BASE_URL}/case-studies`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...caseStudyPages,
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...blogEntries,
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
