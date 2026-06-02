import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'role', 'updatedAt'],
    group: 'Content',
    description: 'Reusable author profiles. Each blog post links to one author here instead of duplicating name, bio, and social links.',
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    { name: 'role', type: 'text', admin: { description: 'Job title, e.g. "Head of Growth"' } },
    { name: 'bio', type: 'textarea', admin: { description: 'Short bio shown on the blog post page' } },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Profile photo' },
    },
    {
      name: 'linkedinUrl',
      type: 'text',
      admin: { description: 'Full LinkedIn URL. Icon is hidden on the public page if left blank.' },
    },
    {
      name: 'xUrl',
      type: 'text',
      admin: { description: 'Full X (Twitter) URL. Icon is hidden on the public page if left blank.' },
    },
    {
      name: 'websiteUrl',
      type: 'text',
      admin: { description: 'Personal website URL. Icon is hidden on the public page if left blank.' },
    },
    {
      name: 'email',
      type: 'email',
      admin: { description: 'Public-facing email. Icon is hidden on the public page if left blank.' },
    },
  ],
}
