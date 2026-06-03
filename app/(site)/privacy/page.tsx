import type { Metadata } from 'next'
import { LegalDocument } from '@/components/legal'
import { PRIVACY_POLICY } from './content'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How GrowthByte collects, uses, shares, and protects your personal information when you visit our website or engage our services.',
  alternates: { canonical: '/privacy' },
  openGraph: {
    title: 'Privacy Policy — GrowthByte',
    description: 'How GrowthByte collects, uses, and protects your personal information.',
    url: 'https://www.growthbyte.ai/privacy',
    type: 'website',
  },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  return <LegalDocument doc={PRIVACY_POLICY} />
}
