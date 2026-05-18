import type { CollectionConfig } from 'payload'

export const PageTemplates: CollectionConfig = {
  slug: 'page-templates',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'updatedAt'],
    description: 'Create reusable page layouts for blogs and other content types',
    preview: (doc) => {
      if (doc?.id) {
        return `/preview/templates/${doc.id}`
      }
      return null
    },
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
    delete: ({ req }) => !!req.user,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'Template name shown in admin (e.g., "Blog Post Default", "Landing Page")',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'blog',
      options: [
        { label: 'Blog Post', value: 'blog' },
        { label: 'Service Page', value: 'service' },
        { label: 'Landing Page', value: 'landing' },
        { label: 'Case Study', value: 'case-study' },
      ],
      admin: {
        description: 'What type of content this template is for',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Brief description of when to use this template',
      },
    },
    // Make this the default template for its type
    {
      name: 'isDefault',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        description: 'Make this the default template for this content type',
      },
    },
    // Visual Page Builder (Primary)
    {
      name: 'customLayout',
      type: 'group',
      admin: {
        description: 'Build your template visually - use {{placeholders}} for dynamic content',
      },
      fields: [
        {
          name: 'html',
          type: 'textarea',
          admin: {
            description: 'Generated HTML from the visual editor. Use placeholders like {{title}}, {{content}}, {{featuredImage}}',
          },
          maxLength: 1000000,
        },
        {
          name: 'css',
          type: 'textarea',
          admin: {
            description: 'Generated CSS from the visual editor',
          },
          maxLength: 500000,
        },
        {
          name: 'components',
          type: 'json',
          admin: {
            description: 'Component data (JSON) for the visual editor',
          },
        },
        {
          name: 'editor',
          type: 'ui',
          admin: {
            components: {
              Field: '@/payload-plugins/TemplateEditorPlugin#TemplateEditorField',
            },
          },
        },
      ],
    },
  ],
}
