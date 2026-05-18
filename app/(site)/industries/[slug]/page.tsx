import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { INDUSTRIES } from '@/lib/constants'

import Hero from './_components/Hero'
import ServicesForIndustry from './_components/ServicesForIndustry'
import Cta from './_components/Cta'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const industry = INDUSTRIES.find((i) => i.slug === params.slug)
  if (!industry) return {}
  return {
    title: `${industry.name} Growth Marketing — GrowthByte`,
    description: `${industry.challenge}. GrowthByte builds integrated AI-powered growth systems for ${industry.name} companies.`,
  }
}

export default function IndustryPage({ params }: Props) {
  const industry = INDUSTRIES.find((i) => i.slug === params.slug)
  if (!industry) notFound()

  return (
    <>
      <Hero industry={industry} />
      <ServicesForIndustry industry={industry} />
      <Cta industry={industry} />
    </>
  )
}
