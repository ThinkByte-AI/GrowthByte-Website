import Link from 'next/link'

const SUB =
  'GrowthByte is the AI system our strategists run to lower CAC, lift ROAS, and build pipeline that compounds — bid management every hour, audience modelling, anomaly detection, and live reporting. Now opening to a first cohort.'

const TRUST = ['BITS Pilani founders', 'ex-MediBuddy, 15x growth', 'Amrita TBI backed', '20+ brands']

export default function ProductHero() {
  return (
    <section className="hero">
      <div className="wrap">
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
    </section>
  )
}
