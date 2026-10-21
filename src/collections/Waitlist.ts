import type { CollectionConfig } from 'payload'

export const Waitlist: CollectionConfig = {
  slug: 'waitlist',
  labels: { singular: 'Waitlist signup', plural: 'Waitlist' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['position', 'name', 'email', 'door', 'agencyName', 'foundingClaimed', 'referralCount', 'reward'],
    group: 'Marketing',
    description: 'The GrowthByte OS list: everyone who confirmed a Growth Proposal / Growth Strategy request, in join order.',
    components: { beforeListTable: ['@/components/admin/WaitlistExportButton'] },
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
    { name: 'agencyName', type: 'text' },
    { name: 'website', type: 'text' },
    { name: 'whatsapp', type: 'text', admin: { description: 'Optional; given as consent to WhatsApp updates.' } },
    { name: 'country', type: 'text' },
    {
      name: 'door',
      type: 'select',
      options: [
        { label: 'Agency', value: 'agency' },
        { label: 'Business', value: 'business' },
      ],
    },
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
    { name: 'verified', type: 'checkbox', defaultValue: false, index: true },
    {
      name: 'position',
      type: 'number',
      index: true,
      admin: { readOnly: true, description: 'Join order, assigned when the email is verified. Never recalculated.' },
    },
    { name: 'referralCode', type: 'text', index: true, admin: { readOnly: true } },
    { name: 'referredBy', type: 'relationship', relationTo: 'waitlist', admin: { readOnly: true } },
    { name: 'referralCount', type: 'number', defaultValue: 0 },
    {
      name: 'foundingClaimed',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: { description: 'Tick once this agency has claimed a founding slot. Drives the "founding slots left" counter.' },
    },
    {
      name: 'possibleDuplicate',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Agency name matches another verified member. Review before launch.' },
    },
    {
      name: 'agencyDomain',
      type: 'text',
      index: true,
      admin: { readOnly: true, description: 'Company email domain; one verified spot per domain. Empty for free mail.' },
    },
    { name: 'agencyKey', type: 'text', index: true, admin: { hidden: true } },
    {
      name: 'reward',
      type: 'select',
      defaultValue: 'none',
      options: [
        { label: 'None', value: 'none' },
        { label: '3 months free', value: '3_months' },
        { label: '12 months free (Agency)', value: '12_months' },
      ],
    },
    // Secret behind the member page link: hidden in the admin UI, still readable server-side.
    { name: 'memberKey', type: 'text', index: true, admin: { hidden: true } },
  ],
}
