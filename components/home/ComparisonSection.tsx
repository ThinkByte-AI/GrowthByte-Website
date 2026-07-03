import Link from 'next/link'
import { ArrowIcon } from './icons'
import type { ComparisonData } from './types'

export default function ComparisonSection({ data }: { data: ComparisonData }) {
  const columns = data.columns ?? []
  const rows = data.rows ?? []
  return (
    <section className="light" id="why" aria-labelledby="why-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="why-h">{data.heading}</h2>
          <p className="lead">{data.lead}</p>
        </div>
        <div className="cmp-wrap">
          <table className="cmp">
            <thead>
              <tr>{columns.map((col, i) => <th key={i} scope="col">{col.value}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td>{row.label}</td><td>{row.agency}</td><td>{row.tools}</td><td>{row.growthbyte}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sec-cta">
          <span className="sec-cta-t">{data.ctaText}</span>
          <Link href={data.ctaHref ?? '/services'} className="gb-btn gb-btn-ob">{data.ctaLabel} <ArrowIcon /></Link>
        </div>
      </div>
    </section>
  )
}
