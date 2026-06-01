import Link from 'next/link'
import { ArrowSmallIcon } from '@/components/journal'
import type { CaseStudy } from '../../_components/types'

const MetaItem = ({ k, v }: { k: string; v: string }) => (
  <div className="item">
    <div className="k">{k}</div>
    <div className="v">{v}</div>
  </div>
)

export default function CaseStudyHero({ cs }: { cs: CaseStudy }) {
  return (
    <section className="cs-hero">
      <div className="gbx-container">
        <div className="breadcrumb">
          <Link href="/case-studies">
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><ArrowSmallIcon size={12} /></span>
              All case studies
            </span>
          </Link>
          <span style={{ opacity: 0.4 }}>/</span>
          <span style={{ color: 'var(--gb-black)' }}>{cs.industry}</span>
        </div>

        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          <span className="tag tag-accent">{cs.industry}</span>
        </div>

        <h1 className="headline">
          <span className="accent">{cs.metric}</span> {cs.metricLabel}
        </h1>

        <p className="lede" style={{ marginTop: 32, maxWidth: '56ch' }}>{cs.summary}</p>

        <div className="meta-row">
          <MetaItem k="Industry" v={cs.industry} />
          <MetaItem k="Duration" v={cs.timeframe} />
          <MetaItem k="Focus" v={cs.metricLabel} />
          <MetaItem k="Result" v={cs.metric} />
        </div>
      </div>
    </section>
  )
}
