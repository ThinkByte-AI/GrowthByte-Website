export const BLOG_CATEGORY_LABELS: Record<string, string> = {
  'growth-strategy': 'Growth Strategy',
  'performance-marketing': 'Performance Marketing',
  seo: 'SEO',
  automation: 'Marketing Automation',
  analytics: 'Analytics',
  insights: 'Industry Insights',
}

export const categoryLabel = (value?: string): string =>
  (value && BLOG_CATEGORY_LABELS[value]) || value || 'Article'

export const formatPostDate = (iso?: string): string => {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}
