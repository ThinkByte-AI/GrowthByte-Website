import Link from 'next/link'
import type { CaseStudy } from './types'

const SummaryNarrative = ({ summary }: { summary: string }) => (
  <div>
    <p className="section-eyebrow">What happened</p>
    <h2 className="section-heading text-balance">The situation and what we did.</h2>
    <div className="space-y-4 text-body-md text-ink-60 leading-relaxed">
      <p>{summary}</p>
      <p>
        The engagement began with a two-week audit. We mapped the existing funnel, identified the primary CAC drivers, and built a prioritised roadmap before a single campaign change was made.
      </p>
      <p>
        Execution started in week five. AI systems were configured across the primary channels identified in the audit. Our strategist maintained weekly reviews and made structural changes based on early data signals.
      </p>
    </div>
  </div>
)

const ResultsCard = ({ cs }: { cs: CaseStudy }) => (
  <div className="bg-surface-2 border border-surface-border rounded-2xl p-7 sticky top-28">
    <h3 className="font-bold text-ink text-[1rem] mb-5">Key results</h3>
    <div className="space-y-5">
      <div className="border-b border-surface-border pb-4">
        <div className="text-ink font-bold tabular-nums" style={{ fontSize: '2.25rem', lineHeight: '1', letterSpacing: '-0.025em' }}>
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
)

export default function Summary({ cs }: { cs: CaseStudy }) {
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="grid lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-start">
          <SummaryNarrative summary={cs.summary} />
          <ResultsCard cs={cs} />
        </div>
      </div>
    </section>
  )
}
