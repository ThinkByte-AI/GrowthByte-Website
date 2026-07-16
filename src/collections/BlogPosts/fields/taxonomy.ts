import type { Field } from 'payload'

export const taxonomyFields: Field[] = [
  {
    name: 'featuredImage',
    type: 'upload',
    relationTo: 'media',
    admin: { description: 'Image shown in blog listings and social shares' },
  },
  {
    name: 'category',
    type: 'relationship',
    relationTo: 'categories',
    required: true,
    admin: {
      description: 'Drives the post URL: /blog/<category-slug>/<post-slug>. Manage the list under Categories.',
    },
  },
  {
    name: 'tags',
    type: 'text',
    hasMany: true,
    admin: {
      position: 'sidebar',
      description: 'Comma-separated tags for this post',
    },
  },
]
