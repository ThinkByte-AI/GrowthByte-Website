import type { Metadata } from 'next'
import '../../gb-home.css'
import './waitlist.css'
import { getPayloadClient } from '@/src/get-payload'
import { countVerifiedMembers } from '@/lib/waitlist/members'
import ProductHero from './_components/ProductHero'
import WhatItDoes from './_components/WhatItDoes'
import HowSlotsWork from './_components/HowSlotsWork'
import FeatureShowcase from './_components/FeatureShowcase'
import WaitlistSection from './_components/WaitlistSection'
import WaitlistFaq from './_components/WaitlistFaq'

export const revalidate = 60

export const metadata: Metadata = {
  title: { absolute: 'GrowthByte OS for Agencies — Join the Founding Waitlist' },
  description:
    'GrowthByte OS runs your agency’s client work — plan, execute and report for every client, with your team approving what ships. Founding waitlist: 50 agencies.',
  alternates: { canonical: '/products/growthbyte' },
  openGraph: {
    title: 'GrowthByte OS for Agencies',
    description: 'GrowthByte OS runs your agency’s client work. Founding cohort of 50 agencies.',
    url: 'https://www.growthbyte.ai/products/growthbyte',
  },
}

export default async function GrowthByteProductPage() {
  const memberCount = await countVerifiedMembers(await getPayloadClient())
  return (
    <div className="gb-home">
      <ProductHero memberCount={memberCount} />
      <WhatItDoes />
      <FeatureShowcase />
      <HowSlotsWork />
      <WaitlistSection />
      <WaitlistFaq />
    </div>
  )
}
