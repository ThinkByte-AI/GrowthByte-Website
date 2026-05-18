import Link from 'next/link'
import type { CaseStudy } from './types'

const RelatedCard = ({ cs }: { cs: CaseStudy }) => (
  <Link
    href={`/case-studies/${cs.slug}`}
    className="group flex gap-5 p-5 bg-surface border border-surface-border rounded-xl hover:border-teal/30 hover:shadow-card-hover transition-all duration-250"
  >
    <div className="flex-shrink-0">
      <div className="text-ink font-bold tabular-nums" style={{ fontSize: '1.75rem', lineHeight: '1', letterSpacing: '-0.025em' }}>
        {cs.metric}
      </div>
      <div className="text-ink-40 text-[0.6875rem] font-medium uppercase tracking-wider mt-1">{cs.metricLabel}</div>
    </div>
    <div>
      <span className="tag tag-teal text-[0.6875rem] mb-2 inline-block">{cs.industry}</span>
      <h3 className="font-semibold text-ink text-sm leading-snug group-hover:text-teal transition-colors">{cs.headline}</h3>
    </div>
  </Link>
)

export default function Related({ items }: { items: readonly CaseStudy[] }) {
  if (items.length === 0) return null
  return (
    <section className="section-padding-sm bg-surface-2 border-t border-surface-border">
      <div className="container-custom">
        <h2 className="text-[1.375rem] font-bold text-ink mb-8">More case studies</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((r) => <RelatedCard key={r.slug} cs={r} />)}
        </div>
      </div>
    </section>
  )
}
