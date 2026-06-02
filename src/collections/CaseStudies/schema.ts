interface CaseStudySchemaInput {
  title?: string
  headline?: string
  slug?: string
  summary?: string
  industry?: string
  results?: Array<{ result: string }>
}

export const generateCaseStudySchema = (data: CaseStudySchemaInput) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: data.headline || data.title,
  description: data.summary,
  author: {
    '@type': 'Organization',
    name: 'GrowthByte',
    url: 'https://www.growthbyte.ai',
  },
  publisher: {
    '@type': 'Organization',
    name: 'GrowthByte',
    url: 'https://www.growthbyte.ai',
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://www.growthbyte.ai/case-studies/${data.slug}`,
  },
  about: {
    '@type': 'Thing',
    name: data.industry,
  },
  mentions: (data.results || []).map((r) => ({
    '@type': 'Thing',
    name: r.result,
  })),
})

