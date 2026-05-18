import type { CollectionBeforeChangeHook } from 'payload'
import { generateCaseStudySchema } from './schema'

export const beforeChangeCaseStudy: CollectionBeforeChangeHook = ({ data }) => {
  if (data.regenerateSchema || !data.seoSchema) {
    data.seoSchema = generateCaseStudySchema(data)
    data.regenerateSchema = false
  }
  return data
}
