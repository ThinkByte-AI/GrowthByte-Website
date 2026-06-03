import type { Metadata } from 'next'
import { LegalDocument } from '@/components/legal'
import { TERMS_OF_SERVICE } from './content'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'The terms that govern your access to and use of the GrowthByte website and the information and content we make available through it.',
  alternates: { canonical: '/terms' },
  openGraph: {
    title: 'Terms of Service — GrowthByte',
    description: 'The terms that govern your access to and use of the GrowthByte website.',
    url: 'https://www.growthbyte.ai/terms',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function TermsOfServicePage() {
  return <LegalDocument doc={TERMS_OF_SERVICE} />
}
