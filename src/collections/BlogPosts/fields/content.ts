import type { Field } from 'payload'

export const contentFields: Field[] = [
  {
    name: 'content',
    type: 'richText',
    required: true,
    admin: { description: 'Main blog content' },
  },
  {
    name: 'additionalBlocks',
    type: 'group',
    admin: { description: 'Additional content sections' },
    fields: [
      {
        name: 'gallery',
        type: 'array',
        admin: { description: 'Image gallery section' },
        fields: [
          { name: 'image', type: 'upload', relationTo: 'media', required: true },
          { name: 'caption', type: 'text' },
        ],
      },
      {
        name: 'videoEmbed',
        type: 'text',
        admin: { description: 'YouTube/Vimeo embed URL' },
      },
      {
        name: 'pullQuote',
        type: 'textarea',
        admin: { description: 'Highlighted quote from the article' },
      },
    ],
  },
  {
    name: 'sidebarContent',
    type: 'group',
    admin: { description: 'Sidebar content' },
    fields: [
      {
        name: 'customWidget',
        type: 'richText',
        admin: { description: 'Custom sidebar content' },
      },
      {
        name: 'hideDefaultWidgets',
        type: 'checkbox',
        label: 'Hide Template Widgets',
        admin: { description: 'Check to hide default sidebar widgets for this post' },
      },
    ],
  },
]
