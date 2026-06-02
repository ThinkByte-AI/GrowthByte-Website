import type { Field } from 'payload'

export const howToFields: Field[] = [
  {
    name: 'howTo',
    type: 'group',
    admin: {
      description:
        'Optional. Step-by-step instructions emitted as HowTo JSON-LD. Steps must match content visible on the page (Google policy).',
    },
    fields: [
      {
        name: 'name',
        type: 'text',
        admin: { description: 'Short name of the procedure (e.g. "How to install a WordPress plugin").' },
      },
      {
        name: 'description',
        type: 'textarea',
      },
      {
        name: 'totalTime',
        type: 'text',
        admin: { description: 'ISO 8601 duration, e.g. PT30M for 30 minutes, PT2H for 2 hours.' },
      },
      {
        name: 'image',
        type: 'upload',
        relationTo: 'media',
      },
      {
        name: 'steps',
        type: 'array',
        admin: { description: 'At least one step required for HowTo schema to be emitted.' },
        fields: [
          { name: 'stepName', type: 'text' },
          { name: 'stepText', type: 'textarea', required: true },
          { name: 'stepImage', type: 'upload', relationTo: 'media' },
          {
            name: 'url',
            type: 'text',
            admin: { description: 'Optional anchor or full URL pointing to this step on the page.' },
          },
        ],
      },
    ],
  },
]
