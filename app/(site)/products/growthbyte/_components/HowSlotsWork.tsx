import { FOUNDING_CLAIM_WINDOW_DAYS, FOUNDING_OFFER_DATE, WAITLIST_CAP } from '@/lib/waitlist/constants'
import SectionCta from './SectionCta'

const STEPS = [
  {
    when: 'Today · 30 seconds',
    name: 'Join with your work email',
    desc: 'Your name, email and agency. No card, no password.',
  },
  {
    when: 'Right after',
    name: 'Verify to lock your number',
    desc: 'Click the link we email you. Your position is fixed in join order and never changes.',
  },
  {
    when: `#1 – #${WAITLIST_CAP}`,
    name: 'The first 50 get founding slots',
    desc: 'One slot per agency. Your page shows your number, so you know straight away.',
  },
  {
    when: FOUNDING_OFFER_DATE,
    name: 'Founding offers go out',
    desc: `The ${WAITLIST_CAP} receive their founding offer by email, with ${FOUNDING_CLAIM_WINDOW_DAYS} days to claim it.`,
  },
]

export default function HowSlotsWork() {
  return (
    <section id="how-it-works" className="light">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">How it works</span>
          <h2>How to get one of the {WAITLIST_CAP} founding slots.</h2>
          <p className="lead">First come, first served — by the time you verify, not by who you know.</p>
        </div>
        <div className="steps">
          {STEPS.map((step, i) => (
            <div key={step.name} className="step">
              <div className="step-bn" aria-hidden="true">{i + 1}</div>
              <div className="step-idx">0{i + 1}</div>
              <div className="step-when">{step.when}</div>
              <div className="step-name">{step.name}</div>
              <div className="step-desc">{step.desc}</div>
            </div>
          ))}
        </div>
        <SectionCta line="Slots go in the order agencies verify. Lock your number now." />
      </div>
    </section>
  )
}
