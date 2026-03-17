import type { Metadata } from 'next'
import Link from 'next/link'
import { CASE_STUDY_HIGHLIGHTS } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Case Studies — GrowthByte | Measurable Growth Results',
  description: 'Real results from real growth programmes. CAC reductions, ROAS improvements, and organic pipeline growth across SaaS, D2C, and B2B verticals.',
}

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(circle at center, #009389, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <p className="section-eyebrow-dark">Case studies</p>
              <h1 className="text-white text-balance mb-5">
                Results, not reports.
              </h1>
              <p className="text-white/55 text-body-lg max-w-[36rem] text-balance leading-relaxed">
                Every case study below is a real engagement — real numbers, real timelines, real methods. We measure what matters: CAC, ROAS, pipeline, and revenue.
              </p>
            </div>
            {/* Right: outcome metrics cluster */}
            <div className="hidden lg:flex justify-end">
              <div className="w-[300px] space-y-3">
                {[
                  { metric: '−42%', label: 'CAC Reduction', sub: 'SaaS · 90 days', color: 'teal' },
                  { metric: '3.1×', label: 'ROAS Improvement', sub: 'D2C · 60 days', color: 'teal' },
                  { metric: '₹50Cr+', label: 'Pipeline Generated', sub: 'B2B SaaS · 6 months', color: 'teal' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 bg-white/[0.04] border border-white/[0.07] rounded-xl px-5 py-4">
                    <div>
                      <div
                        className="font-bold tabular-nums text-teal-light leading-none"
                        style={{ fontSize: '1.625rem', letterSpacing: '-0.025em' }}
                      >
                        {item.metric}
                      </div>
                      <div className="text-[0.6875rem] text-white/40 uppercase tracking-wider font-medium mt-0.5">{item.label}</div>
                    </div>
                    <div className="ml-auto text-right">
                      <div className="text-[0.6875rem] text-white/30">{item.sub}</div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal" />
                  <span className="text-[0.6875rem] text-white/30 font-medium">Verified client results</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case studies grid */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CASE_STUDY_HIGHLIGHTS.map((cs) => (
              <Link
                key={cs.slug}
                href={`/case-studies/${cs.slug}`}
                className="group flex flex-col bg-surface border border-surface-border rounded-2xl p-7 hover:border-teal/30 hover:shadow-card-hover transition-all duration-250"
              >
                <span className="tag tag-teal text-xs mb-5 self-start">{cs.industry}</span>

                {/* Metric */}
                <div className="mb-5">
                  <div
                    className="text-ink font-bold tabular-nums"
                    style={{ fontSize: 'clamp(2rem, 3vw + 0.5rem, 2.5rem)', lineHeight: '1', letterSpacing: '-0.025em' }}
                  >
                    {cs.metric}
                  </div>
                  <div className="text-ink-40 text-xs font-medium uppercase tracking-wider mt-1.5">{cs.metricLabel}</div>
                </div>

                <h2 className="font-bold text-ink text-[1rem] leading-snug mb-3">{cs.headline}</h2>
                <p className="text-ink-60 text-sm leading-relaxed flex-1">{cs.summary}</p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-surface-border">
                  <span className="text-xs text-ink-40 font-medium">{cs.timeframe}</span>
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

      {/* CTA */}
      <section className="section-padding-sm bg-surface-2 border-t border-surface-border">
        <div className="container-custom text-center">
          <h2 className="text-balance mb-4 max-w-[30rem] mx-auto">Want results like these for your business?</h2>
          <p className="text-ink-60 text-body-lg mb-8 max-w-[30rem] mx-auto">
            Book a strategy call. We will show you exactly what we would do in your situation.
          </p>
          <Link href="/contact" className="btn-primary btn-lg">Book a Strategy Call</Link>
        </div>
      </section>
    </>
  )
}
