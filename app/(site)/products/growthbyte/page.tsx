import type { Metadata } from 'next'
import '../../gb-home.css'
import './waitlist.css'
import './doors.css'
import { getPayloadClient } from '@/src/get-payload'
import { getLaunchSettings } from '@/lib/waitlist/launch-settings'
import { countFoundingClaims } from '@/lib/waitlist/members'
import ProductHero from './_components/ProductHero'
import WhatItDoes from './_components/WhatItDoes'
import HowSlotsWork from './_components/HowSlotsWork'
import FeatureShowcase from './_components/FeatureShowcase'
import FoundingOffer from './_components/FoundingOffer'
import WaitlistFaq from './_components/WaitlistFaq'

export const revalidate = 60

export const metadata: Metadata = {
  title: { absolute: 'GrowthByte OS for Agencies — Get a Growth Proposal in 24 Hours' },
  description:
    'GrowthByte OS runs your agency’s client work — plan, execute and report for every client, with your team approving what ships. Get a Growth Proposal for a client, or a Growth Strategy for your business, in 24 hours.',
  alternates: { canonical: '/products/growthbyte' },
  openGraph: {
    title: 'GrowthByte OS for Agencies',
    description: 'GrowthByte OS runs your agency’s client work. Get a Growth Proposal for one of your clients in 24 hours.',
    url: 'https://www.growthbyte.ai/products/growthbyte',
  },
}

export default async function GrowthByteProductPage() {
  const payload = await getPayloadClient()
  const [claimedCount, settings] = await Promise.all([countFoundingClaims(payload), getLaunchSettings(payload)])
  return (
    <div className="gb-home">
      <ProductHero claimedCount={claimedCount} callUrl={settings.foundingCallUrl} />
      <WhatItDoes />
      <FeatureShowcase />
      <HowSlotsWork settings={settings} />
      <FoundingOffer settings={settings} />
      <WaitlistFaq settings={settings} />
    </div>
  )
}
