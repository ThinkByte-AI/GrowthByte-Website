import type { CollectionConfig } from 'payload'
import { beforeChangeService } from './hooks'
import { serviceFields } from './fields'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: serviceFields,
  hooks: {
    beforeChange: [beforeChangeService],
  },
}
