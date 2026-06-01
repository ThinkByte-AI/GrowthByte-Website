import type { CaseStudy, CaseStudyDoc } from './types'

export const toCaseStudy = (doc: CaseStudyDoc): CaseStudy => ({
  slug: doc.slug,
  title: doc.title,
  industry: doc.industry,
  headline: doc.headline ?? '',
  metric: doc.metric ?? '',
  metricLabel: doc.metricLabel ?? '',
  summary: doc.summary ?? '',
  timeframe: doc.timeframe ?? '',
  client: doc.client,
  challenge: (doc.challenge ?? []).map((p) => p.paragraph),
  approach: (doc.approach ?? []).map((p) => p.paragraph),
  steps: doc.steps ?? [],
  resultsParagraph: doc.resultsParagraph ?? '',
  quote: doc.quote,
  author: doc.author,
  metaTitle: doc.metaTitle,
  metaDescription: doc.metaDescription,
})
