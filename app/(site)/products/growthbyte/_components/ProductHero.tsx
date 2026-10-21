import Link from 'next/link'
import { DOORS_ANCHOR, REFERRAL_REWARD_THRESHOLD } from '@/lib/waitlist/constants'
import FoundingCallLink from './FoundingCallLink'
import FoundingSpotsMeter from './FoundingSpotsMeter'
import DoorPicker from './doors/DoorPicker'

// Answers, in order: what the product is, what this page is, why join now.
const SUB =
  'GrowthByte OS plans, runs and reports SEO and marketing work for each of your clients — and nothing ships until your team approves it. We’re opening it to 50 founding agencies first.'

const OFFERS = [
  'A Growth Proposal or Growth Strategy in 24 hours',
  'Founding pricing locked for as long as you stay',
  `${REFERRAL_REWARD_THRESHOLD} referrals = 3 months free`,
]

interface ProductHeroProps {
  claimedCount: number
  callUrl: string
}

export default function ProductHero({ claimedCount, callUrl }: ProductHeroProps) {
  return (
    <section className="hero wl-hero">
      <div className="wrap hero-in">
        <div>
          <h1>GrowthByte OS runs your agency’s client work. <em>Your team directs. The AI executes.</em></h1>
          <p className="hero-sub">{SUB}</p>
          <ul className="wl-offers">
            {OFFERS.map((offer) => <li key={offer}>{offer}</li>)}
          </ul>
          <div className="dr-hero-links">
            <FoundingCallLink href={callUrl} placement="hero" className="gb-btn gb-btn-ghost dr-call" />
            <Link href="#what-it-does" className="wl-watch-btn">See what it does →</Link>
          </div>
        </div>
        <div id={DOORS_ANCHOR} className="cta-card wl-hero-card">
          <FoundingSpotsMeter claimedCount={claimedCount} />
          <DoorPicker />
        </div>
      </div>
    </section>
  )
}
