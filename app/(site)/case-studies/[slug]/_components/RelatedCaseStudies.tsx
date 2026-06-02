import Link from 'next/link'
import { ArrowSmallIcon } from '@/components/journal'
import CaseStudyCard from '../../_components/CaseStudyCard'
import type { CaseStudy } from '../../_components/types'

export default function RelatedCaseStudies({ items }: { items: CaseStudy[] }) {
  if (items.length === 0) return null
  return (
    <section className="gbx-container" style={{ marginTop: 96 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 24 }}>
        <h2 className="h-section">More engagements</h2>
        <Link href="/case-studies" className="gbx-btn gbx-btn-ghost">
          All case studies <ArrowSmallIcon />
        </Link>
      </div>
      <div className="related-cs">
        {items.map((cs, i) => <CaseStudyCard key={cs.slug} cs={cs} index={i} />)}
      </div>
    </section>
  )
}
