import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CASE_STUDY_HIGHLIGHTS } from '@/lib/constants'
import Hero from './_components/Hero'
import Summary from './_components/Summary'
import Related from './_components/Related'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return CASE_STUDY_HIGHLIGHTS.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = CASE_STUDY_HIGHLIGHTS.find((c) => c.slug === params.slug)
  if (!cs) return {}
  return {
    title: `${cs.headline} — GrowthByte Case Study`,
    description: cs.summary,
    alternates: { canonical: `/case-studies/${params.slug}` },
  }
}

export default function CaseStudyPage({ params }: Props) {
  const cs = CASE_STUDY_HIGHLIGHTS.find((c) => c.slug === params.slug)
  if (!cs) notFound()

  const related = CASE_STUDY_HIGHLIGHTS.filter((c) => c.slug !== cs.slug)

  return (
    <>
      <Hero cs={cs} />
      <Summary cs={cs} />
      <Related items={related} />
    </>
  )
}
