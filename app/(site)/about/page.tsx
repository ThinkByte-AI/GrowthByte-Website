import type { Metadata } from 'next'
import Hero from './_components/Hero'
import OriginStory from './_components/OriginStory'
import Values from './_components/Values'
import Cta from './_components/Cta'

export const metadata: Metadata = {
  title: { absolute: 'About GrowthByte | AI and Human Growth Agency India' },
  description: 'Engineers and growth operators tired of agencies billing for activity. So we built one that owns the number. AI for speed, humans for the strategy.',
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
