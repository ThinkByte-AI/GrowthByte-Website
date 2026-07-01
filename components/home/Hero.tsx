import Link from 'next/link'
import CounterValue from './CounterValue'
import { ArrowIcon } from './icons'

const TRUST_POINTS = ['BITS Pilani founders', 'ex-MediBuddy, 15x growth', 'Amrita TBI backed', '20+ brands']

const COUNTERS = [
  { node: <CounterValue target={42} suffix="%" duration={1200} />, label: 'Average CAC reduction within 90 days' },
  { node: <CounterValue target={3.1} suffix="x" decimals={1} duration={1200} />, label: 'Average ROAS improvement' },
  { node: <CounterValue target={50} prefix="₹" suffix="Cr+" duration={1000} />, label: 'Pipeline built across all clients' },
  { node: <CounterValue target={92} suffix="%" duration={1400} />, label: 'Client retention after 6 months' },
]

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-h">
      <div className="wrap hero-in">
        <div>
          <span className="badge"><span className="badge-dot" />AI-Powered Growth Partner</span>
          <h1 id="hero-h">Revenue that grows every month. <em>Measurably.</em></h1>
          <p className="hero-sub">
            Senior strategists and AI systems on one mandate: your revenue number. We lower CAC, lift ROAS, and build pipeline that compounds, for companies in the ₹5Cr to ₹100Cr range.
          </p>
          <div className="hero-ctas">
            <Link href="/contact" className="gb-btn gb-btn-white">Book a Strategy Call <ArrowIcon /></Link>
            <Link href="/case-studies" className="gb-btn gb-btn-ghost">See our work <ArrowIcon /></Link>
          </div>
          <div className="hero-trust">
            {TRUST_POINTS.map((point) => <span key={point} className="ht">{point}</span>)}
          </div>
        </div>
        <div className="hero-counters" aria-label="Key results">
          {COUNTERS.map((counter) => (
            <div key={counter.label} className="hc">
              {counter.node}
              <div className="hc-lbl">{counter.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
