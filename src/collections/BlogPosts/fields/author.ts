import type { Field } from 'payload'

export const authorFields: Field[] = [
  {
    name: 'author',
    type: 'relationship',
    relationTo: 'authors',
    hasMany: false,
    admin: {
      position: 'sidebar',
      description: 'Pick an author from the Authors collection. Name, bio, image, and social links are inherited from there.',
    },
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
