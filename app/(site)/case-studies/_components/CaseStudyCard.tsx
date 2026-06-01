import Link from 'next/link'
import { ArrowSmallIcon } from '@/components/journal'
import type { CaseStudyHighlight } from './types'

interface CaseStudyCardProps {
  cs: CaseStudyHighlight
  index: number
}

export default function CaseStudyCard({ cs, index }: CaseStudyCardProps) {
  return (
    <Link href={`/case-studies/${cs.slug}`} className="cs-card" style={{ cursor: 'pointer' }}>
      <div className="head">
        <span className="tag">{cs.industry}</span>
        <span style={{ fontFamily: 'var(--gb-font-mono)', fontSize: 11, color: 'var(--gb-ink-3)', letterSpacing: '0.08em' }}>
          / {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <div className="metric">
        <span className="accent">{cs.metric}</span> {cs.metricLabel}
      </div>
      <p className="summary">{cs.summary}</p>
      <div className="foot">
        <span className="client">{cs.timeframe}</span>
        <span className="read-link">
          Read case study
          <span className="arrow"><ArrowSmallIcon size={12} /></span>
        </span>
      </div>
    </Link>
  )
}
