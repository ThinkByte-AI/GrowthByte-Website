import type { CollectionConfig } from 'payload'

export const Waitlist: CollectionConfig = {
  slug: 'waitlist',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'product', 'createdAt'],
    group: 'Marketing',
    description: 'Product waitlist signups captured from the /products landing pages.',
  },
  access: {
    // Public signups come through /api/waitlist (server-side, overrideAccess).
    // Direct REST access stays locked to authenticated admins.
    read: ({ req }) => !!req.user,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'name', type: 'text' },
    {
      name: 'product',
      type: 'text',
      defaultValue: 'GrowthByte',
      admin: { description: 'Which product/waitlist this signup is for.' },
    },
    {
      name: 'source',
      type: 'text',
      admin: { description: 'Where the signup came from (page or campaign).' },
    },
  ],
}
