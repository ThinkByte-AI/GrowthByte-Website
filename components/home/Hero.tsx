import Link from 'next/link'
import CounterValue from './CounterValue'
import { ArrowIcon } from './icons'
import type { HeroData } from './types'

export default function Hero({ data }: { data: HeroData }) {
  const trustPoints = data.trustPoints ?? []
  const counters = data.counters ?? []

  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="wrap hero-in">
        <div>
          <span className="badge"><span className="badge-dot" />{data.badge}</span>
          <h1 id="hero-h">{data.headingBefore}<em>{data.headingEmphasis}</em></h1>
          <p className="hero-sub">{data.sub}</p>
          <div className="hero-ctas">
            <Link href={data.primaryCtaHref ?? '/contact'} className="gb-btn gb-btn-white">
              {data.primaryCtaLabel} <ArrowIcon />
            </Link>
            <Link href={data.secondaryCtaHref ?? '/case-studies'} className="gb-btn gb-btn-ghost">
              {data.secondaryCtaLabel} <ArrowIcon />
            </Link>
          </div>
          <div className="hero-trust">
            {trustPoints.map((point, i) => <span key={i} className="ht">{point.value}</span>)}
          </div>
        </div>
        <div className="hero-counters" aria-label="Key results">
          {counters.map((counter, i) => (
            <div key={i} className="hc">
              <CounterValue
                target={counter.target}
                prefix={counter.prefix ?? ''}
                suffix={counter.suffix ?? ''}
                decimals={counter.decimals ?? 0}
              />
              <div className="hc-lbl">{counter.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
