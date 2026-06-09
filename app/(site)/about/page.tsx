import type { Metadata } from 'next'
import Hero from './_components/Hero'
import OriginStory from './_components/OriginStory'
import Values from './_components/Values'
import Cta from './_components/Cta'

export const metadata: Metadata = {
  title: { absolute: 'About GrowthByte.ai | AI Growth Partner for SaaS D2C' },
  description: 'We built GrowthByte.ai for SaaS, D2C, FinTech and Healthcare companies that needed a growth partner owning revenue outcomes, not activity reports. One accountable team.',
  alternates: { canonical: '/about' },
}

export default function AboutPage() {
  return (
    <>
      <Hero />
      <OriginStory />
      <Values />
      <Cta />
    </>
  )
}
