import type { Field } from 'payload'

export const workflowFields: Field[] = [
  {
    name: '_status',
    type: 'select',
    defaultValue: 'draft',
    required: true,
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Review', value: 'review' },
      { label: 'Published', value: 'published' },
      { label: 'Scheduled', value: 'scheduled' },
      { label: 'Archived', value: 'archived' },
    ],
    admin: {
      position: 'sidebar',
      description: 'Workflow status. Scheduled posts auto-publish when publishedAt arrives.',
    },
  },
  {
    name: 'publishedAt',
    type: 'date',
    admin: {
      position: 'sidebar',
      description: 'Publication date. For scheduled posts, this is when it goes live.',
      date: { pickerAppearance: 'dayAndTime' },
    },
  },
  {
    name: 'unpublishAt',
    type: 'date',
    admin: {
      position: 'sidebar',
      description: 'Optional. Post will be archived after this date/time.',
      date: { pickerAppearance: 'dayAndTime' },
    },
  },
  {
    name: 'template',
    type: 'relationship',
    relationTo: 'page-templates',
    hasMany: false,
    filterOptions: { type: { equals: 'blog' } },
    admin: {
      position: 'sidebar',
      description: 'Select the page layout template',
    },
  },
]
