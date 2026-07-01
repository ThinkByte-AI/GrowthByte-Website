import AuditForm from './AuditForm'
import { CheckIcon } from './icons'

const CHECKS = [
  '30 minutes with a senior strategist, not a sales rep',
  'We audit your current setup live on the call',
  'Your top 3 opportunities, clearly identified',
  'Zero obligation',
]

export default function FinalCtaSection() {
  return (
    <section className="final" id="contact" aria-labelledby="cta-h">
      <div className="wrap cta-in">
        <div>
          <span className="eyebrow">Ready to Grow?</span>
          <h2 id="cta-h">Book a 30-minute audit. <em>Keep the plan.</em></h2>
          <p className="cta-body">
            We walk your current setup, find the biggest opportunities in your funnel, and tell you exactly what we would fix in the first 90 days. The audit is yours whether you work with us or not.
          </p>
          <ul className="cta-checks">
            {CHECKS.map((check) => (
              <li key={check}><span className="cta-chk"><CheckIcon /></span>{check}</li>
            ))}
          </ul>
          <p className="cta-proof">Joining 20+ SaaS, D2C, FinTech, and Healthcare companies.</p>
        </div>
        <AuditForm />
      </div>
    </section>
  )
}
