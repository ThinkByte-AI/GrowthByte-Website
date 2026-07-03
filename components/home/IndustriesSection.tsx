import Link from 'next/link'
import { ArrowIcon } from './icons'
import { INDUSTRY_ICONS } from './industryIcons'
import type { IndustriesData } from './types'

export default function IndustriesSection({ data }: { data: IndustriesData }) {
  const items = data.items ?? []
  return (
    <section className="dark" id="industries" aria-labelledby="ind-h">
      <div className="wrap">
        <div className="sec-flex">
          <div>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 id="ind-h">{data.heading}</h2>
          </div>
          <Link href={data.allHref ?? '/industries'} className="gb-btn gb-btn-ow">{data.allLabel} <ArrowIcon /></Link>
        </div>
        <div className="ind-grid">
          {items.map((industry, i) => (
            <Link href={industry.href ?? '/industries'} className="icard" key={i}>
              <span className="ic-ico">{INDUSTRY_ICONS[industry.iconKey ?? '']}</span>
              <div className="ic-name">{industry.name}</div>
              <div className="ic-desc">{industry.desc}</div>
              {industry.proof && <div className="ic-proof">{industry.proof}</div>}
              <div className="ic-link">See results →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
