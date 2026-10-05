import Link from 'next/link'
import { REFERRAL_REWARD_THRESHOLD, WAITLIST_CAP } from '@/lib/waitlist/constants'
import FoundingSpotsMeter from './FoundingSpotsMeter'
import WaitlistForm from './WaitlistForm'

// Answers, in order: what the product is, what this page is, why join now.
const SUB =
  'GrowthByte plans, runs and reports SEO and marketing work for each of your clients — and nothing ships until your team approves it. We’re opening it to 50 founding agencies first.'

const OFFERS = [
  `Founding price for the first ${WAITLIST_CAP}`,
  'Early access before launch',
  `${REFERRAL_REWARD_THRESHOLD} referrals = 3 months free`,
]

export default function ProductHero({ memberCount }: { memberCount: number }) {
  return (
    <section className="hero wl-hero">
      <div className="wrap hero-in">
        <div>
          <span className="badge"><span className="badge-dot" />Founding waitlist · {WAITLIST_CAP} agencies</span>
          <h1>The AI platform that runs your agency’s client work. <em>Your team directs. The AI executes.</em></h1>
          <p className="hero-sub">{SUB}</p>
          <ul className="wl-offers">
            {OFFERS.map((offer) => <li key={offer}>{offer}</li>)}
          </ul>
          <Link href="#what-it-does" className="wl-watch-btn">See what it does →</Link>
        </div>
        <div id="waitlist" className="cta-card wl-hero-card">
          <FoundingSpotsMeter memberCount={memberCount} />
          <WaitlistForm isFull={memberCount >= WAITLIST_CAP} />
        </div>
      </div>
    </section>
  )
}
