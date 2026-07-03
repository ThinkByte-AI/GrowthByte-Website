import type { Metadata } from 'next'
import { cache } from 'react'
import { getPayloadClient } from '@/src/get-payload'
import type { HomeData } from '@/components/home/types'
import Hero from '@/components/home/Hero'
import MetricBar from '@/components/home/MetricBar'
import ProblemSection from '@/components/home/ProblemSection'
import ComparisonSection from '@/components/home/ComparisonSection'
import MidCta from '@/components/home/MidCta'
import OperatingModelSection from '@/components/home/OperatingModelSection'
import ServicesSection from '@/components/home/ServicesSection'
import NumbersBand from '@/components/home/NumbersBand'
import CaseStudiesSection from '@/components/home/CaseStudiesSection'
import IndustriesSection from '@/components/home/IndustriesSection'
import ProcessSection from '@/components/home/ProcessSection'
import FoundersSection from '@/components/home/FoundersSection'
import ToolsSection from '@/components/home/ToolsSection'
import FinalCtaSection from '@/components/home/FinalCtaSection'
import FaqSection from '@/components/home/FaqSection'

// Cached static; the HomePage global's afterChange hook revalidates '/' on edit.
export const revalidate = 3600

const getHome = cache(async (): Promise<HomeData> => {
  const payload = await getPayloadClient()
  return (await payload.findGlobal({ slug: 'home', depth: 0 })) as unknown as HomeData
})

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getHome()
  return {
    title: seo?.metaTitle ? { absolute: seo.metaTitle } : undefined,
    description: seo?.metaDescription ?? undefined,
    alternates: { canonical: '/' },
    openGraph: {
      title: seo?.metaTitle ?? undefined,
      description: seo?.metaDescription ?? undefined,
      url: 'https://www.growthbyte.ai',
    },
  }
}

export default async function HomePage() {
  const home = await getHome()
  return (
    <div className="gb-home">
      <Hero data={home.hero ?? {}} />
      <MetricBar data={home.metricBar ?? {}} />
      <ProblemSection data={home.problem ?? {}} />
      <ComparisonSection data={home.comparison ?? {}} />
      <MidCta data={home.midCtaOne ?? {}} />
      <OperatingModelSection data={home.operatingModel ?? {}} />
      <ServicesSection data={home.services ?? {}} />
      <NumbersBand data={home.numbers ?? {}} />
      <CaseStudiesSection data={home.caseStudies ?? {}} />
      <MidCta data={home.midCtaTwo ?? {}} />
      <IndustriesSection data={home.industries ?? {}} />
      <ProcessSection data={home.process ?? {}} />
      <FoundersSection data={home.founders ?? {}} />
      <ToolsSection data={home.tools ?? {}} />
      <FinalCtaSection data={home.finalCta ?? {}} />
      <FaqSection data={home.faq ?? {}} />
    </div>
  )
}
