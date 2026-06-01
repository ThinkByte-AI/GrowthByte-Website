import { saasLanding } from './saasLanding'
import { agencyCaseStudy } from './agencyCaseStudy'
import { pricingPage } from './pricingPage'
import { blogPost } from './blogPost'
import type { GeneratedTemplate } from './types'

export type { GeneratedTemplate }

export const TEMPLATES = {
  blogPost,
  agencyCaseStudy,
  saasLanding,
  pricingPage,
} as const

export type TemplateKey = keyof typeof TEMPLATES

const KEYWORDS: Array<{ key: TemplateKey; words: string[] }> = [
  { key: 'blogPost', words: ['blog', 'essay', 'article', 'post', 'editorial', 'journal'] },
  { key: 'agencyCaseStudy', words: ['case study', 'case-study', 'casestudy', 'engagement', 'metric', 'agency'] },
  { key: 'pricingPage', words: ['pricing', 'plans', 'tier', 'subscription'] },
  { key: 'saasLanding', words: ['saas', 'landing', 'product', 'b2b', 'hero', 'startup'] },
]

export const matchTemplate = (prompt: string): GeneratedTemplate => {
  const p = prompt.toLowerCase()
  for (const { key, words } of KEYWORDS) {
    if (words.some((w) => p.includes(w))) return TEMPLATES[key]
  }
  return TEMPLATES.blogPost
}

export const STARTER_PROMPTS: Array<{ key: TemplateKey; label: string; prompt: string }> = [
  { key: 'blogPost', label: 'Blog post page', prompt: 'Generate a long-form blog post layout with byline, hero image, related posts, and author bio. Use live Payload placeholders for title, content, author, and featured image.' },
  { key: 'agencyCaseStudy', label: 'Case study page', prompt: 'Generate a case study layout for a B2B agency with a big metric hero and a challenge → approach → results narrative.' },
  { key: 'saasLanding', label: 'SaaS landing page', prompt: 'Build me a modern SaaS landing page with a hero, three features, and a strong CTA.' },
  { key: 'pricingPage', label: 'Pricing page', prompt: 'Design a three-tier pricing page with a featured plan, monthly/annual toggle, and FAQ.' },
]
