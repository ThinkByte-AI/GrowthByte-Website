import type { Field } from 'payload'

export const authorFields: Field[] = [
  {
    name: 'author',
    type: 'text',
    admin: { position: 'sidebar', description: 'Author name' },
  },
  {
    name: 'authorBio',
    type: 'textarea',
    admin: { position: 'sidebar', description: 'Short author bio for sidebar' },
  },
  {
    name: 'authorImage',
    type: 'upload',
    relationTo: 'media',
    admin: { position: 'sidebar', description: 'Author photo' },
  },
  {
    name: 'readTime',
    type: 'number',
    admin: {
      position: 'sidebar',
      description: 'Estimated read time in minutes (auto-calculated if empty)',
    },
  },
]
