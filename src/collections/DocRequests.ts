import type { CollectionConfig } from 'payload'

const isAdmin = ({ req }: { req: { user?: unknown } }) => !!req.user

export const DocRequests: CollectionConfig = {
  slug: 'doc-requests',
  labels: { singular: 'Document request', plural: 'Document requests' },
  admin: {
    useAsTitle: 'website',
    defaultColumns: ['createdAt', 'door', 'website', 'email', 'status', 'sheetRow', 'sheetError'],
    group: 'Marketing',
    description:
      'Growth Proposal / Growth Strategy requests from the GrowthByte OS page. Verified requests are copied to the GrowthByte-OS-Doors sheet; a filled "Sheet error" means the copy failed and the row must be added by hand.',
  },
  // Public requests come through /api/doors (server-side, overrideAccess); REST stays admin-only.
  access: { read: isAdmin, create: isAdmin, update: isAdmin, delete: isAdmin },
  fields: [
    {
      name: 'door',
      type: 'select',
      required: true,
      options: [
        { label: 'Agency (Growth Proposal)', value: 'agency' },
        { label: 'Business (Growth Strategy)', value: 'business' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'pending',
      index: true,
      options: [
        { label: 'Awaiting email check', value: 'pending' },
        { label: 'Verified', value: 'verified' },
      ],
    },
    { name: 'website', type: 'text', required: true },
    { name: 'websiteDomain', type: 'text', index: true, admin: { readOnly: true } },
    { name: 'offer', type: 'textarea', label: 'What the business sells' },
    { name: 'audience', type: 'textarea', label: 'Who it sells to' },
    { name: 'goal', type: 'text' },
    { name: 'channels', type: 'text', admin: { description: 'Comma-separated channel keys.' } },
    { name: 'name', type: 'text' },
    { name: 'agencyName', type: 'text' },
    { name: 'email', type: 'email', required: true, index: true },
    { name: 'whatsapp', type: 'text' },
    { name: 'country', type: 'text' },
    { name: 'wantsAgency', type: 'checkbox', label: 'Looking for an agency', defaultValue: false },
    { name: 'member', type: 'relationship', relationTo: 'waitlist', admin: { readOnly: true } },
    { name: 'source', type: 'text' },
    { name: 'referralCode', type: 'text', admin: { description: 'Code of the member whose link brought them.' } },
    { name: 'utmSource', type: 'text' },
    { name: 'utmMedium', type: 'text' },
    { name: 'utmCampaign', type: 'text' },
    { name: 'utmTerm', type: 'text' },
    { name: 'utmContent', type: 'text' },
    { name: 'verifiedAt', type: 'date', index: true, admin: { readOnly: true } },
    { name: 'sheetRow', type: 'number', admin: { readOnly: true } },
    { name: 'sheetError', type: 'text', admin: { readOnly: true } },
    { name: 'ipHash', type: 'text', index: true, admin: { hidden: true } },
    // Secrets behind the verify link and confirmation page: hidden in the admin UI, still readable server-side.
    { name: 'confirmKey', type: 'text', index: true, admin: { hidden: true } },
    { name: 'verifyTokenHash', type: 'text', index: true, admin: { hidden: true } },
    { name: 'verifyExpiresAt', type: 'date', admin: { hidden: true } },
  ],
}
