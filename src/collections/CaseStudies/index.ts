import type { CollectionConfig } from 'payload'
import { beforeChangeCaseStudy } from './hooks'
import { caseStudyFields } from './fields'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'industry', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: caseStudyFields,
  hooks: {
    beforeChange: [beforeChangeCaseStudy],
  },
}
