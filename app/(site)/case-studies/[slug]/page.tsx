import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CASE_STUDY_HIGHLIGHTS } from '@/lib/constants'
import { BigCta } from '@/components/journal'
import CaseStudyHero from './_components/CaseStudyHero'
import CaseStudySection from './_components/CaseStudySection'
import CaseStudySteps from './_components/CaseStudySteps'
import CaseStudyResults from './_components/CaseStudyResults'
import RelatedCaseStudies from './_components/RelatedCaseStudies'
import { buildCaseStudyStory } from './_components/story'
import '@/components/journal/journal.css'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return CASE_STUDY_HIGHLIGHTS.map((cs) => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cs = CASE_STUDY_HIGHLIGHTS.find((c) => c.slug === slug)
  if (!cs) return {}
  return {
    title: `${cs.headline} — GrowthByte Case Study`,
    description: cs.summary,
    alternates: { canonical: `/case-studies/${slug}` },
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const cs = CASE_STUDY_HIGHLIGHTS.find((c) => c.slug === slug)
  if (!cs) notFound()

  const related = CASE_STUDY_HIGHLIGHTS.filter((c) => c.slug !== cs.slug)
  const story = buildCaseStudyStory(cs)

  return (
    <div className="gbx">
      <CaseStudyHero cs={cs} />
      <CaseStudySection
        secNo="01 · The Challenge"
        heading="A growth problem disguised as a channel problem."
        label="Context"
        paragraphs={story.challenge}
      />
      <CaseStudySection
        secNo="02 · Our Approach"
        heading="Diagnose first. Subtract before adding. Compound from there."
        label="How we framed it"
        paragraphs={story.approach}
        altBg
      />
      <CaseStudySection
        secNo="03 · What We Did"
        heading="The workstreams that moved the metric."
        label="Workstreams"
      >
        <CaseStudySteps steps={story.steps} />
      </CaseStudySection>
      <CaseStudyResults cs={cs} paragraph={story.resultsParagraph} />
      <RelatedCaseStudies items={[...related]} />
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
