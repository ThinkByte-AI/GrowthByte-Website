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
    type: 'select',
    options: [
      { label: 'Growth Strategy', value: 'growth-strategy' },
      { label: 'Performance Marketing', value: 'performance-marketing' },
      { label: 'SEO', value: 'seo' },
      { label: 'Marketing Automation', value: 'automation' },
      { label: 'Analytics', value: 'analytics' },
      { label: 'Industry Insights', value: 'insights' },
    ],
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
