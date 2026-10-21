import type { GlobalAfterChangeHook, GlobalConfig } from 'payload'

// Dynamic import + try/catch because the hook can also run outside a Next request scope (e.g. scripts).
const revalidateProductPage: GlobalAfterChangeHook = async () => {
  try {
    const { revalidatePath } = await import('next/cache')
    revalidatePath('/products/growthbyte')
  } catch {
    /* not in a Next request scope; the page's 60s revalidate picks the change up */
  }
}

export const GrowthByteOsLaunch: GlobalConfig = {
  slug: 'growthbyte-os-launch',
  label: 'GrowthByte OS Launch',
  access: { read: () => true },
  admin: { group: 'Marketing' },
  fields: [
    {
      name: 'firstLoginsAt',
      type: 'date',
      label: 'First logins (T)',
      admin: {
        description:
          'The day the first external agencies log in. Leave empty until it is fixed — the page then shows no dates. Once set, the page shows this date and the founding window (T + 6 weeks).',
        date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' },
      },
    },
    {
      name: 'foundingCallUrl',
      type: 'text',
      label: 'Founding call booking link',
      admin: { description: 'Cal.com round-robin link for "Book a 20-min founding call". Empty sends people to /contact.' },
    },
  ],
  hooks: { afterChange: [revalidateProductPage] },
}
