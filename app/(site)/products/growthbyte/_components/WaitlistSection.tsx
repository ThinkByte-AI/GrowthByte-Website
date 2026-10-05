import Link from 'next/link'
import { REFERRAL_REWARD_THRESHOLD } from '@/lib/waitlist/constants'

const CHECKS = [
  'Early access before public launch',
  'Founding price for the founding 50',
  'Onboarding with the team building it',
  'No card, no password to join',
]

const CheckMark = () => (
  <span className="cta-chk">
    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
  </span>
)

export default function WaitlistSection() {
  return (
    <section id="rewards" className="final">
      <div className="wrap cta-in">
        <div>
          <span className="eyebrow">Bring other agency owners</span>
          <h2>Know other agency owners? <em>Share your link.</em></h2>
          <p className="cta-body">
            After you join you get a personal link. When {REFERRAL_REWARD_THRESHOLD} agencies join from it, you get
            3 months free on any paid plan — applied automatically at launch.
          </p>
          <ul className="cta-checks">
            {CHECKS.map((c) => <li key={c}><CheckMark />{c}</li>)}
          </ul>
        </div>
        <div className="cta-card">
          <div className="cta-card-h">{REFERRAL_REWARD_THRESHOLD} agencies join from your link</div>
          <div className="cta-card-sub">→ 3 months free on any paid plan</div>
          <Link href="#waitlist" className="gb-btn gb-btn-teal" style={{ justifyContent: 'center', width: '100%' }}>
            Claim my founding slot
          </Link>
        </div>
      </div>
    </section>
  )
}
