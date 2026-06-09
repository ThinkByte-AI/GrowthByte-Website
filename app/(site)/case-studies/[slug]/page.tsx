import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BigCta } from '@/components/journal'
import CaseStudyHero from './_components/CaseStudyHero'
import CaseStudySection from './_components/CaseStudySection'
import CaseStudySteps from './_components/CaseStudySteps'
import CaseStudyResults from './_components/CaseStudyResults'
import RelatedCaseStudies from './_components/RelatedCaseStudies'
import { getCaseStudy, getRelatedCaseStudies } from './_fetchers'
import { toCaseStudy } from '../_components/toCaseStudy'
import '@/components/journal/journal.css'

interface Props {
  params: Promise<{ slug: string }>
}

// Content is read live from Payload; opt out of the full route cache so
// edits and deletes reflect immediately, matching the blog detail behaviour.
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await getCaseStudy(slug)
  if (!doc) return { title: 'Case study not found' }
  const cs = toCaseStudy(doc)
  const title = cs.metaTitle
    ? { absolute: cs.metaTitle }
    : { absolute: `${cs.headline || cs.title} — GrowthByte Case Study` }
  return {
    title,
    description: cs.metaDescription || cs.summary,
    alternates: { canonical: `/case-studies/${slug}` },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const doc = await getCaseStudy(slug)
  if (!doc) notFound()

  const cs = toCaseStudy(doc)
  const relatedDocs = await getRelatedCaseStudies(slug, 3)
  const related = relatedDocs.map(toCaseStudy)

  return (
    <div className="gbx">
      <CaseStudyHero cs={cs} />
      <CaseStudySection
        secNo="01 · The Challenge"
        heading="A growth problem disguised as a channel problem."
        label="Context"
        paragraphs={cs.challenge}
      />
      <CaseStudySection
        secNo="02 · Our Approach"
        heading="Diagnose first. Subtract before adding. Compound from there."
        label="How we framed it"
        paragraphs={cs.approach}
        altBg
      />
      <CaseStudySection
        secNo="03 · What We Did"
        heading="The workstreams that moved the metric."
        label="Workstreams"
      >
        <CaseStudySteps steps={cs.steps} />
      </CaseStudySection>
      <CaseStudyResults cs={cs} paragraph={cs.resultsParagraph} />
      <RelatedCaseStudies items={related} />
      <BigCta
        eyebrow={`What would ${cs.metric} look like for you?`}
        heading="Let us put your numbers on this page next."
        sub="A 30-minute call. We will look at your funnel and tell you, honestly, whether we are the right partner — and what the highest-leverage first move is either way."
        primary={{ label: 'Book a strategy call', href: '/contact' }}
        secondary={{ label: 'Read the blog', href: '/blogs' }}
      />
    </div>
  )
}
