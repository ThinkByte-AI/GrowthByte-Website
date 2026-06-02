import type { CollectionBeforeChangeHook } from 'payload'
import { generateServiceSchema } from './schema'

export const beforeChangeService: CollectionBeforeChangeHook = ({ data }) => {
  if (data.regenerateSchema || !data.seoSchema) {
    data.seoSchema = generateServiceSchema(data)
    data.regenerateSchema = false
  }
  return data
}
