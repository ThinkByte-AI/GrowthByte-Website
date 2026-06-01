import Link from 'next/link'
import { GenerativeThumbnail, ArrowSmallIcon } from '@/components/journal'
import type { CaseStudyHighlight } from './types'

const lightTag = {
  background: 'rgba(255,255,255,0.06)',
  color: 'rgba(255,255,255,0.8)',
  borderColor: 'rgba(255,255,255,0.12)',
}

export default function FeaturedCaseStudy({ cs }: { cs: CaseStudyHighlight }) {
  return (
    <Link href={`/case-studies/${cs.slug}`} className="cs-featured" style={{ cursor: 'pointer' }}>
      <div className="left">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          <span className="tag" style={lightTag}>Featured · {cs.industry}</span>
        </div>
        <h2 className="metric">
          <span className="accent">{cs.metric}</span> {cs.metricLabel}<br />
          <span style={{ fontSize: '0.5em', fontWeight: 600, letterSpacing: '-0.015em', color: 'rgba(255,255,255,0.78)' }}>
            in {cs.timeframe}
          </span>
        </h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', margin: 0, lineHeight: 1.55, maxWidth: '40ch' }}>
          {cs.summary}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', flexWrap: 'wrap', gap: 16 }}>
          <span style={{ fontFamily: 'var(--gb-font-mono)', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)' }}>
            {cs.headline}
          </span>
          <span className="gbx-btn gbx-btn-accent">
            Read case study <ArrowSmallIcon />
          </span>
        </div>
      </div>
      <div className="right">
        <GenerativeThumbnail seed={cs.slug} variant={4} category={cs.industry} />
      </div>
    </Link>
  )
}
