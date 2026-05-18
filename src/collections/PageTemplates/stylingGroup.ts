import type { Field } from 'payload'

const themeField: Field = {
  name: 'theme',
  type: 'select',
  defaultValue: 'default',
  options: [
    { label: 'Default', value: 'default' },
    { label: 'Dark', value: 'dark' },
    { label: 'Brand', value: 'brand' },
  ],
  admin: { description: 'Visual theme applied to the template' },
}

const typographyFields: Field[] = [
  {
    name: 'h1Size',
    type: 'number',
    admin: { description: 'H1 size in px. Leave blank to use default.' },
  },
  {
    name: 'h2Size',
    type: 'number',
    admin: { description: 'H2 size in px. Leave blank to use default.' },
  },
  {
    name: 'h3Size',
    type: 'number',
    admin: { description: 'H3 size in px. Leave blank to use default.' },
  },
  {
    name: 'bodySize',
    type: 'number',
    admin: { description: 'Body text size in px. Leave blank to use default.' },
  },
  {
    name: 'headingColor',
    type: 'text',
    admin: { description: 'Heading color (hex, e.g. #1a1a1a). Leave blank to use default.' },
  },
  {
    name: 'bodyColor',
    type: 'text',
    admin: { description: 'Body text color (hex). Leave blank to use default.' },
  },
  {
    name: 'linkColor',
    type: 'text',
    admin: { description: 'Link color (hex). Leave blank to use default.' },
  },
]

const customCssField: Field = {
  name: 'customCSS',
  type: 'textarea',
  admin: { description: 'Additional custom CSS injected after typography rules. Use for fine-grained overrides.' },
}

export const stylingGroup: Field = {
  name: 'styling',
  type: 'group',
  admin: { description: 'Theme, typography, and custom CSS for this template' },
  fields: [themeField, ...typographyFields, customCssField],
}
