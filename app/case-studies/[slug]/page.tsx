import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CASE_STUDY_HIGHLIGHTS } from '@/lib/constants'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return CASE_STUDY_HIGHLIGHTS.map(cs => ({ slug: cs.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cs = CASE_STUDY_HIGHLIGHTS.find(c => c.slug === params.slug)
  if (!cs) return {}
  return {
    title: `${cs.headline} — GrowthByte Case Study`,
    description: cs.summary,
  }
}

export default function CaseStudyPage({ params }: Props) {
  const cs = CASE_STUDY_HIGHLIGHTS.find(c => c.slug === params.slug)
  if (!cs) notFound()

  const related = CASE_STUDY_HIGHLIGHTS.filter(c => c.slug !== cs.slug)

  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />
        <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All case studies
          </Link>
          <span className="tag tag-dark mb-4">{cs.industry}</span>
          <h1 className="text-white max-w-[40rem] text-balance mb-6">{cs.headline}</h1>
          <div className="flex items-baseline gap-3">
            <span
              className="text-teal-light font-bold tabular-nums"
              style={{ fontSize: 'clamp(2.5rem, 4vw + 1rem, 4rem)', lineHeight: '1', letterSpacing: '-0.03em' }}
            >
              {cs.metric}
            </span>
            <span className="text-white/50 text-body-lg font-medium">{cs.metricLabel}</span>
          </div>
          <p className="text-white/40 text-sm font-medium mt-3 uppercase tracking-wider">Timeframe: {cs.timeframe}</p>
        </div>
      </section>

      {/* Summary */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-start">
            <div>
              <p className="section-eyebrow">What happened</p>
              <h2 className="section-heading text-balance">The situation and what we did.</h2>
              <div className="space-y-4 text-body-md text-ink-60 leading-relaxed">
                <p>{cs.summary}</p>
                <p>
                  The engagement began with a two-week audit. We mapped the existing funnel, identified the primary CAC drivers, and built a prioritised roadmap before a single campaign change was made.
                </p>
                <p>
                  Execution started in week five. AI systems were configured across the primary channels identified in the audit. Our strategist maintained weekly reviews and made structural changes based on early data signals.
                </p>
              </div>
            </div>

            {/* Metric card */}
            <div className="bg-surface-2 border border-surface-border rounded-2xl p-7 sticky top-28">
              <h3 className="font-bold text-ink text-[1rem] mb-5">Key results</h3>
              <div className="space-y-5">
                <div className="border-b border-surface-border pb-4">
                  <div
                    className="text-ink font-bold tabular-nums"
                    style={{ fontSize: '2.25rem', lineHeight: '1', letterSpacing: '-0.025em' }}
                  >
                    {cs.metric}
                  </div>
                  <div className="text-ink-40 text-xs font-medium uppercase tracking-wider mt-1.5">{cs.metricLabel}</div>
                </div>
                <div>
                  <p className="text-sm text-ink-60 font-medium">Industry</p>
                  <p className="text-ink font-semibold mt-0.5">{cs.industry}</p>
                </div>
                <div>
                  <p className="text-sm text-ink-60 font-medium">Timeframe</p>
                  <p className="text-ink font-semibold mt-0.5">{cs.timeframe}</p>
                </div>
              </div>
              <Link href="/contact" className="btn-primary w-full mt-6 text-sm">
                Get similar results
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section-padding-sm bg-surface-2 border-t border-surface-border">
          <div className="container-custom">
            <h2 className="text-[1.375rem] font-bold text-ink mb-8">More case studies</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/case-studies/${r.slug}`}
                  className="group flex gap-5 p-5 bg-surface border border-surface-border rounded-xl hover:border-teal/30 hover:shadow-card-hover transition-all duration-250"
                >
                  <div className="flex-shrink-0">
                    <div
                      className="text-ink font-bold tabular-nums"
                      style={{ fontSize: '1.75rem', lineHeight: '1', letterSpacing: '-0.025em' }}
                    >
                      {r.metric}
                    </div>
                    <div className="text-ink-40 text-[0.6875rem] font-medium uppercase tracking-wider mt-1">{r.metricLabel}</div>
                  </div>
                  <div>
                    <span className="tag tag-teal text-[0.6875rem] mb-2 inline-block">{r.industry}</span>
                    <h3 className="font-semibold text-ink text-sm leading-snug group-hover:text-teal transition-colors">{r.headline}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
