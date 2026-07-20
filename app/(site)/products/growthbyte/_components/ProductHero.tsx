import Link from 'next/link'

const SUB =
  'GrowthByte is the AI system our strategists run to lower CAC, lift ROAS, and build pipeline that compounds — bid management every hour, audience modelling, anomaly detection, and live reporting. Now opening to a first cohort.'

const METRICS = [
  { v: '42%', l: 'Average CAC reduction within 90 days' },
  { v: '3.1x', l: 'Average ROAS improvement' },
  { v: '₹50Cr+', l: 'Pipeline built across brands' },
  { v: '92%', l: 'Client retention after 6 months' },
]

const TRUST = ['BITS Pilani founders', 'ex-MediBuddy, 15x growth', 'Amrita TBI backed', '20+ brands']

export default function ProductHero() {
  return (
    <section className="hero">
      <div className="wrap hero-in">
        <div>
          <span className="badge"><span className="badge-dot" />Early access · Now on the waitlist</span>
          <h1>The AI growth engine behind <em>every number.</em></h1>
          <p className="hero-sub">{SUB}</p>
          <div className="hero-ctas">
            <Link href="#waitlist" className="gb-btn gb-btn-white">Join the waitlist</Link>
            <Link href="#features" className="gb-btn gb-btn-ghost">See what it does</Link>
          </div>
          <div className="hero-trust">
            {TRUST.map((t) => <span key={t} className="ht">{t}</span>)}
          </div>
        </div>
        <div className="hero-counters">
          {METRICS.map((m) => (
            <div key={m.l} className="hc">
              <div className="hc-val">{m.v}</div>
              <div className="hc-lbl">{m.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
