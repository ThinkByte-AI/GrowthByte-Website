import type { Metadata } from 'next'
import Hero from './_components/Hero'
import OriginStory from './_components/OriginStory'
import Values from './_components/Values'
import Cta from './_components/Cta'

export const metadata: Metadata = {
  title: 'About GrowthByte — AI-Powered Growth Partner',
  description: 'GrowthByte was built because fragmented agencies and disconnected tools were failing growth-stage companies. We built an integrated AI + human growth system instead.',
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
