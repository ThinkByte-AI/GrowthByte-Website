import Link from 'next/link'
import { CASE_STUDY_HIGHLIGHTS } from '@/lib/constants'

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="section-padding bg-ink relative overflow-hidden scroll-mt-header">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="section-eyebrow-dark">Case studies</p>
            <h2 className="text-white text-balance">
              Results, not reports.
            </h2>
          </div>
          <Link href="/case-studies" className="btn-ghost-dark self-start md:self-auto flex-shrink-0">
            All case studies
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {CASE_STUDY_HIGHLIGHTS.map((cs) => (
            <Link
              key={cs.slug}
              href={`/case-studies/${cs.slug}`}
              className="group flex flex-col bg-white/4 border border-white/8 rounded-2xl p-6 lg:p-7 hover:border-teal/30 hover:bg-white/6 transition-all duration-250"
            >
              {/* Industry tag */}
              <span className="tag tag-dark text-xs mb-5 self-start">{cs.industry}</span>

              {/* Metric */}
              <div className="mb-4">
                <div
                  className="text-teal-light font-bold tabular-nums"
                  style={{ fontSize: 'clamp(2rem, 3vw + 0.5rem, 2.5rem)', lineHeight: '1', letterSpacing: '-0.025em' }}
                >
                  {cs.metric}
                </div>
                <div className="text-white/40 text-xs font-medium uppercase tracking-wider mt-1.5">
                  {cs.metricLabel}
                </div>
              </div>

              {/* Headline */}
              <h3 className="text-white font-semibold text-[1rem] leading-snug mb-3">{cs.headline}</h3>

              {/* Summary */}
              <p className="text-white/50 text-sm leading-relaxed flex-1">{cs.summary}</p>

              {/* Footer */}
              <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/8">
                <span className="text-xs text-white/30 font-medium">{cs.timeframe}</span>
                <span className="text-xs font-semibold text-teal opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                  Read study
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
