import { CONTACT_INFO } from '@/lib/constants'

const FAQS = [
  {
    q: 'What does AI-powered actually mean here?',
    a: 'AI runs the high-volume execution: bid management every hour, audience modelling, anomaly detection, and reporting. Senior strategists own the direction: channel strategy, creative, offers, and the calls data cannot make. You get the speed of automation with the judgment of experienced operators.',
  },
  {
    q: 'How long until we see results?',
    a: 'You are live in six weeks and see the first measurable results within 90 days. Paid channels move first. SEO and content compound over a longer horizon, usually showing clear momentum by months three to six.',
  },
  {
    q: 'What is the minimum investment?',
    a: 'We work with companies in the ₹5Cr to ₹100Cr revenue range and scope each engagement to the goal. Start with the channels that move the number first, then scale. There is no long-term lock-in, so you expand only when results justify it.',
  },
  {
    q: 'Do you work with our in-house team?',
    a: 'Yes. We plug in as an extension of your team, take the channels you want off your plate, and share one dashboard so everyone sees the same numbers. Your team stays focused on what it does best.',
  },
  {
    q: 'How do you report results?',
    a: 'A live dashboard from day one, weekly performance reports, a bi-weekly review call, a monthly strategy session, and quarterly planning. You are never left wondering what is happening with your budget.',
  },
]

export default function FaqSection() {
  return (
    <section className="light" id="faq" itemScope itemType="https://schema.org/FAQPage" aria-labelledby="faq-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">Common Questions</span>
          <h2 id="faq-h">Answers, no caveats.</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((faq) => (
            <details className="fq" key={faq.q} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <summary className="fq-q" itemProp="name">{faq.q}</summary>
              <div className="fq-a" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <p itemProp="text">{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
        <div className="faq-contact">
          More questions? Email <a href={CONTACT_INFO.emailHref}>{CONTACT_INFO.email}</a> or call <a href={CONTACT_INFO.phoneHref}>{CONTACT_INFO.phone}</a>.
        </div>
      </div>
    </section>
  )
}
