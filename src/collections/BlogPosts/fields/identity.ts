import type { Field } from 'payload'

export const identityFields: Field[] = [
  {
    name: 'title',
    type: 'text',
    required: true,
  },
  {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    admin: {
      position: 'sidebar',
    },
  },
]
