import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getIndustry } from '../_fetchers'
import { getAllServices } from '../../services/[slug]/_fetchers'

import Hero from './_components/Hero'
import ServicesForIndustry, { type IndustryServiceCard } from './_components/ServicesForIndustry'
import Cta from './_components/Cta'

interface Props {
  params: Promise<{ slug: string }>
}

export const dynamic = 'force-dynamic'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toIndustryServiceCard = (doc: any): IndustryServiceCard => ({
  slug: String(doc.slug),
  title: String(doc.title ?? ''),
  outcome: String(doc.outcome ?? ''),
  description: String(doc.description ?? ''),
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const industry = await getIndustry(slug)
  if (!industry) return {}
  return {
    title: `${industry.name} Growth Marketing — GrowthByte`,
    description: `${industry.challenge}. GrowthByte builds integrated AI-powered growth systems for ${industry.name} companies.`,
    alternates: { canonical: `/industries/${slug}` },
  }
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const [industry, serviceDocs] = await Promise.all([
    getIndustry(slug),
    getAllServices(30),
  ])
  if (!industry) notFound()

  const services = serviceDocs.map(toIndustryServiceCard)

  return (
    <>
      <Hero industry={industry} />
      <ServicesForIndustry industry={industry} services={services} />
      <Cta industry={industry} />
    </>
  )
}
