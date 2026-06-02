import type { Field } from 'payload'

export const faqFields: Field[] = [
  {
    name: 'faqItems',
    type: 'array',
    admin: {
      description:
        'Optional. FAQ entries shown on the page and emitted as FAQPage JSON-LD. Questions and answers must match content visible on the page (Google policy).',
    },
    fields: [
      {
        name: 'question',
        type: 'text',
        required: true,
      },
      {
        name: 'answer',
        type: 'textarea',
        required: true,
      },
    ],
  },
]
