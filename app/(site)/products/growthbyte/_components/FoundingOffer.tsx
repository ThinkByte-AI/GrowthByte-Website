import Link from 'next/link'
import { DOORS_ANCHOR, FOUNDING_SLOTS, REFERRAL_REWARD_THRESHOLD } from '@/lib/waitlist/constants'
import { describeFoundingWindow, type LaunchSettings } from '@/lib/waitlist/launch-settings'

const CHECKS = [
  'A 6- or 12-month plan, pricing locked for as long as you stay',
  'Nothing is charged until your workspace is open',
  'Onboarding and migration done with our team',
  `${REFERRAL_REWARD_THRESHOLD} agencies join from your link = 3 months free`,
]

const CheckMark = () => (
  <span className="cta-chk">
    <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
  </span>
)

export default function FoundingOffer({ settings }: { settings: LaunchSettings }) {
  return (
    <section id="founding" className="final">
      <div className="wrap cta-in wl-rewards-in">
        <div>
          <span className="eyebrow">The founding offer</span>
          <h2>{FOUNDING_SLOTS} founding agencies. <em>Pricing locked while you stay.</em></h2>
          <p className="cta-body">
            Founding agencies choose a 6- or 12-month plan with pricing locked for as long as they stay. Nothing is
            charged until your workspace is open. Onboarding and migration are done with our team. Founding offers go
            out when workspaces open — list members hear first, in position order. {describeFoundingWindow(settings)}
          </p>
          <ul className="cta-checks">
            {CHECKS.map((c) => <li key={c}><CheckMark />{c}</li>)}
          </ul>
        </div>
        <div className="cta-card">
          <div className="cta-card-h">{REFERRAL_REWARD_THRESHOLD} agencies join from your link</div>
          <div className="cta-card-sub">→ 3 months free on any paid plan, applied at launch</div>
          <Link href={`#${DOORS_ANCHOR}`} className="gb-btn gb-btn-teal" style={{ justifyContent: 'center', width: '100%' }}>
            Get a Growth Proposal
          </Link>
        </div>
      </div>
    </section>
  )
}
