import type { TemplateContentType } from '@/lib/templates'

export const API_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const COLLECTION_MAP: Record<TemplateContentType, string> = {
  blog: 'blog-posts',
  service: 'services',
  'case-study': 'case-studies',
  landing: 'pages',
}
