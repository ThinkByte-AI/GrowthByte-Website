import type { CollectionConfig } from 'payload'

const slugify = (value: string): string =>
  value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    group: 'Content',
    description:
      'Blog categories. The slug becomes the URL segment: /blog/<slug>/<post>. Renaming a slug changes every URL under it, so change slugs deliberately.',
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
      index: true,
      admin: {
        position: 'sidebar',
        description: 'URL segment. Auto-filled from the name; edit deliberately (it is part of every post URL).',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Shown on the category landing page and used for its meta description.' },
    },
    {
      name: 'color',
      type: 'text',
      admin: {
        description: 'Hex color (e.g. #0EA5A4) used for the category tag and generative thumbnails. Optional.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional banner image for the category landing page.' },
    },
    {
      name: 'metaTitle',
      type: 'text',
      admin: { position: 'sidebar', description: 'SEO title (defaults to name if empty).' },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: { position: 'sidebar', description: 'SEO description for the category landing page.' },
    },
  ],
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (!data) return data
        if (!data.slug && data.name) data.slug = slugify(data.name)
        else if (data.slug) data.slug = slugify(data.slug)
        return data
      },
    ],
  },
}
