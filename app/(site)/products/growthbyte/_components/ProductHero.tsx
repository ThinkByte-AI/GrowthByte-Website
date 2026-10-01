import Link from 'next/link'
import { REFERRAL_REWARD_THRESHOLD, WAITLIST_CAP } from '@/lib/waitlist/constants'
import FoundingSpotsMeter from './FoundingSpotsMeter'
import HeroVideo, { hasHeroVideo } from './HeroVideo'
import WaitlistForm from './WaitlistForm'

// Ordered by what moves an agency owner: the deal, then the threat, then being early.
const SUB =
  'Your clients are starting to bring marketing in-house with AI. Get there first: GrowthByte runs audits, strategy, execution and reporting for every client, in one place.'

const OFFERS = [
  `Founding price for the founding ${WAITLIST_CAP}`,
  'Early access before public launch',
  `${REFERRAL_REWARD_THRESHOLD} referrals = 3 months free`,
]

const HeroPixels = () => (
  <div className="hero-pix" aria-hidden="true">
    <div className="pix">{Array.from({ length: 35 }, (_, i) => <i key={i} />)}</div>
  </div>
)

export default function ProductHero({ memberCount }: { memberCount: number }) {
  return (
    <section className="hero wl-hero">
      <HeroPixels />
      <div className="wrap hero-in">
        <div>
          <h1>Run every client on one AI platform. <em>Your team directs. The AI executes.</em></h1>
          <p className="hero-sub">{SUB}</p>
          <ul className="wl-offers">
            {OFFERS.map((offer) => <li key={offer}>{offer}</li>)}
          </ul>
          {hasHeroVideo && <Link href="#watch" className="wl-watch-btn">▶ Watch it run · 60 sec</Link>}
          <FoundingSpotsMeter memberCount={memberCount} />
        </div>
        <div id="waitlist" className="cta-card wl-hero-card">
          <div className="cta-card-h">Claim your founding spot</div>
          <div className="cta-card-sub">No card, no password. <b className="wl-req">*</b> required</div>
          <WaitlistForm isFull={memberCount >= WAITLIST_CAP} />
        </div>
      </div>
      <HeroVideo />
    </section>
  )
}
