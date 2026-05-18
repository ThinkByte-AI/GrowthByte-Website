import type { PageTemplate, TemplateContentType } from '../types'
import { DEFAULT_BLOG_TEMPLATE } from './blog'
import { DEFAULT_SERVICE_TEMPLATE } from './service'
import { DEFAULT_CASE_STUDY_TEMPLATE } from './caseStudy'

export { DEFAULT_BLOG_TEMPLATE, DEFAULT_SERVICE_TEMPLATE, DEFAULT_CASE_STUDY_TEMPLATE }

const TEMPLATE_BY_TYPE: Record<TemplateContentType, Partial<PageTemplate>> = {
  blog: DEFAULT_BLOG_TEMPLATE,
  service: DEFAULT_SERVICE_TEMPLATE,
  'case-study': DEFAULT_CASE_STUDY_TEMPLATE,
  landing: DEFAULT_BLOG_TEMPLATE,
}

export const getDefaultTemplate = (type: TemplateContentType): Partial<PageTemplate> =>
  TEMPLATE_BY_TYPE[type] ?? DEFAULT_BLOG_TEMPLATE
