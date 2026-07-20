import WaitlistForm from './WaitlistForm'

const CHECKS = [
  'Priority onboarding with a senior strategist',
  'A direct line to the team building it',
  'Early influence on the roadmap',
  'No spam, no lock-in',
]

const CheckMark = () => (
  <span className="cta-chk">
    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
  </span>
)

export default function WaitlistSection() {
  return (
    <section id="waitlist" className="final">
      <div className="wrap cta-in">
        <div>
          <span className="eyebrow">Join the waitlist</span>
          <h2>Get early access. <em>Shape what it becomes.</em></h2>
          <p className="cta-body">
            We are onboarding a first cohort of companies in the ₹5Cr–₹100Cr range. Add your email and
            we will reach out when your spot opens.
          </p>
          <ul className="cta-checks">
            {CHECKS.map((c) => <li key={c}><CheckMark />{c}</li>)}
          </ul>
          <p className="cta-proof">Joining 20+ SaaS, D2C, FinTech, and Healthcare brands.</p>
        </div>
        <div className="cta-card">
          <div className="cta-card-h">Join the GrowthByte waitlist</div>
          <div className="cta-card-sub">One field. We email you when early access opens.</div>
          <WaitlistForm product="GrowthByte" source="growthbyte-waitlist" />
        </div>
      </div>
    </section>
  )
}
