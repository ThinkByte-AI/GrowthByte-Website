import type { Field } from 'payload'

export const introFields: Field[] = [
  {
    name: 'excerpt',
    type: 'textarea',
    admin: {
      description: 'Short summary shown in blog listings and meta description',
    },
  },
  {
    name: 'heroSection',
    type: 'group',
    admin: { description: 'Hero section content' },
    fields: [
      {
        name: 'heroImage',
        type: 'upload',
        relationTo: 'media',
        admin: { description: 'Hero background or featured image' },
      },
      {
        name: 'heroSubtitle',
        type: 'text',
        admin: { description: 'Optional subtitle below the main title' },
      },
      {
        name: 'heroOverlay',
        type: 'select',
        defaultValue: 'none',
        options: [
          { label: 'No Overlay', value: 'none' },
          { label: 'Dark Overlay', value: 'dark' },
          { label: 'Light Overlay', value: 'light' },
          { label: 'Gradient Overlay', value: 'gradient' },
        ],
        admin: { description: 'Overlay for image backgrounds' },
      },
    ],
  },
]
