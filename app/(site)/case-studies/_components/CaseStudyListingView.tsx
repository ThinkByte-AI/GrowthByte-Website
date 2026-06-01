'use client'

import { useMemo, useState } from 'react'
import MetricStrip from './MetricStrip'
import FeaturedCaseStudy from './FeaturedCaseStudy'
import CaseStudyFilter from './CaseStudyFilter'
import CaseStudyCard from './CaseStudyCard'
import ListingCta from './ListingCta'
import type { CaseStudy } from './types'

interface Props {
  posts: CaseStudy[]
}

const buildIndustryOptions = (rest: CaseStudy[]) => {
  const present = Array.from(new Set(rest.map((c) => c.industry)))
  return [
    { value: 'All', count: rest.length },
    ...present.map((value) => ({ value, count: rest.filter((c) => c.industry === value).length })),
  ]
}

export default function CaseStudyListingView({ posts }: Props) {
  const [active, setActive] = useState('All')
  const featured = posts[0]
  const rest = useMemo(() => posts.slice(1), [posts])
  const industries = useMemo(() => buildIndustryOptions(rest), [rest])
  const filtered = active === 'All' ? rest : rest.filter((c) => c.industry === active)

  return (
    <>
      <section className="page-head">
        <div className="gbx-container">
          <span className="eyebrow">Case Studies</span>
          <h1 className="h-page">Numbers we can name. Receipts we can show.</h1>
          <p className="lede">
            A look at the engagements we have run for B2B and D2C teams — what we walked into,
            what we changed, and what it returned.
          </p>
        </div>
      </section>

      <div className="gbx-container">
        <MetricStrip />
        {featured && <FeaturedCaseStudy cs={featured} />}
        <CaseStudyFilter industries={industries} active={active} onSelect={setActive} resultCount={filtered.length} />
        <div className="cs-grid">
          {filtered.map((cs, i) => <CaseStudyCard key={cs.slug} cs={cs} index={i} />)}
        </div>
      </div>

      <ListingCta />
    </>
  )
}
