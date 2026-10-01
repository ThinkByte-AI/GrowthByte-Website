import type { Metadata } from 'next'
import '../../gb-home.css'
import './waitlist.css'
import { getPayloadClient } from '@/src/get-payload'
import { countVerifiedMembers } from '@/lib/waitlist/members'
import ProductHero from './_components/ProductHero'
import DemoShowcase from './_components/DemoShowcase'
import WaitlistSection from './_components/WaitlistSection'

export const revalidate = 60

export const metadata: Metadata = {
  title: { absolute: 'GrowthByte for Agencies — Join the Founding Waitlist' },
  description:
    'Run every client on one AI platform: your team directs, the AI executes. Early access and founding pricing for the first 50 agencies.',
  alternates: { canonical: '/products/growthbyte' },
  openGraph: {
    title: 'GrowthByte for Agencies',
    description: 'Run every client on one AI platform. Founding cohort of 50 agencies.',
    url: 'https://www.growthbyte.ai/products/growthbyte',
  },
}

export default async function GrowthByteProductPage() {
  const memberCount = await countVerifiedMembers(await getPayloadClient())
  return (
    <div className="gb-home">
      <ProductHero memberCount={memberCount} />
      <DemoShowcase />
      <WaitlistSection />
    </div>
  )
}
