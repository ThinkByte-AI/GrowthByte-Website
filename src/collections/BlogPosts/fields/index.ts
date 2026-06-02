import type { Field } from 'payload'
import { identityFields } from './identity'
import { workflowFields } from './workflow'
import { introFields } from './intro'
import { contentFields } from './content'
import { faqFields } from './faq'
import { howToFields } from './howTo'
import { taxonomyFields } from './taxonomy'
import { authorFields } from './author'
import { seoFields } from './seo'

export const blogPostFields: Field[] = [
  ...identityFields,
  ...workflowFields,
  ...introFields,
  ...contentFields,
  ...faqFields,
  ...howToFields,
  ...taxonomyFields,
  ...authorFields,
  ...seoFields,
]
