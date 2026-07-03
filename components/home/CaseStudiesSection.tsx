import Link from 'next/link'
import { ArrowIcon } from './icons'
import type { CaseStudiesData } from './types'

export default function CaseStudiesSection({ data }: { data: CaseStudiesData }) {
  const items = data.items ?? []
  return (
    <section className="light" id="cases" aria-labelledby="cases-h">
      <div className="wrap">
        <div className="sec-flex">
          <div>
            <span className="eyebrow">{data.eyebrow}</span>
            <h2 id="cases-h">{data.heading}</h2>
          </div>
          <Link href={data.allHref ?? '/case-studies'} className="gb-btn gb-btn-ot">{data.allLabel} <ArrowIcon /></Link>
        </div>
        <div className="cs-stack">
          {items.map((study, i) => (
            <article className="cs" key={i}>
              <div className="cs-l">
                <span className="cs-tag">{study.tag}</span>
                <div>
                  <div className="cs-num">{study.num}</div>
                  <div className="cs-num-s">{study.sub}</div>
                </div>
              </div>
              <div className="cs-r">
                <h3 className="cs-title">{study.title}</h3>
                <p className="cs-desc">{study.desc}</p>
                <Link href={study.href ?? '/case-studies'} className="cs-link">Read the case study →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
