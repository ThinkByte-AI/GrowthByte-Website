export interface CaseStudyStep {
  title: string
  detail: string
  tags: string[]
}

export interface CaseStudyDoc {
  id: string
  slug: string
  title: string
  industry: string
  headline?: string
  metric?: string
  metricLabel?: string
  summary?: string
  timeframe?: string
  client?: string
  challenge?: Array<{ paragraph: string }>
  approach?: Array<{ paragraph: string }>
  steps?: CaseStudyStep[]
  resultsParagraph?: string
  quote?: string
  author?: string
  metaTitle?: string
  metaDescription?: string
}

export interface CaseStudy {
  slug: string
  title: string
  industry: string
  headline: string
  metric: string
  metricLabel: string
  summary: string
  timeframe: string
  client?: string
  challenge: string[]
  approach: string[]
  steps: CaseStudyStep[]
  resultsParagraph: string
  quote?: string
  author?: string
  metaTitle?: string
  metaDescription?: string
}
