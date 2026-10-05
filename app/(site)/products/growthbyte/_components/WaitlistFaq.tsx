import {
  FOUNDING_CLAIM_WINDOW_DAYS,
  FOUNDING_OFFER_DATE,
  REFERRAL_REWARD_THRESHOLD,
  WAITLIST_CAP,
} from '@/lib/waitlist/constants'
import SectionCta from './SectionCta'

const FAQS = [
  {
    q: `How do the ${WAITLIST_CAP} founding slots work?`,
    a: `The first ${WAITLIST_CAP} agencies to join and verify their email get them, in the order they verify. There is no application or selection — your position is fixed the moment you click the verify link.`,
  },
  {
    q: 'How will I know if I got a slot?',
    a: `Straight away. After you verify, your page shows your number. #1 to #${WAITLIST_CAP} are founding agencies.`,
  },
  {
    q: 'When is it announced?',
    a: `Founding offers go out by email on ${FOUNDING_OFFER_DATE}. You then have ${FOUNDING_CLAIM_WINDOW_DAYS} days to claim yours; unclaimed slots pass to the next agency in line.`,
  },
  {
    q: 'Can more than one person from my agency join?',
    a: 'One slot per agency, matched by company email domain. Once your agency has a slot, add your team to the workspace at launch.',
  },
  {
    q: 'How does the referral reward work?',
    a: `Share your personal link. When ${REFERRAL_REWARD_THRESHOLD} other agencies join from it and verify, you get 3 months free on any paid plan, applied automatically when you subscribe.`,
  },
  {
    q: `What happens once all ${WAITLIST_CAP} slots are taken?`,
    a: 'The founding waitlist closes. Everyone else can sign up when GrowthByte OS opens to the public after launch.',
  },
  {
    q: 'Do I need a card or a long setup?',
    a: 'No card and no password to join. At launch, creating your workspace takes a couple of minutes, and we help you bring your first client on.',
  },
]

export default function WaitlistFaq() {
  return (
    <section id="faq" className="light">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">FAQ</span>
          <h2>Questions agency owners ask.</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((item) => (
            <details key={item.q} className="fq">
              <summary className="fq-q">{item.q}</summary>
              <div className="fq-a"><p>{item.a}</p></div>
            </details>
          ))}
        </div>
        <p className="faq-contact">Something else? <a href="mailto:agent@growthbyte.ai">agent@growthbyte.ai</a></p>
        <SectionCta line={`Only ${WAITLIST_CAP} founding slots — and they go in the order agencies verify.`} />
      </div>
    </section>
  )
}
