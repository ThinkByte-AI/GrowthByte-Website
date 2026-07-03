import { CONTACT_INFO } from '@/lib/constants'
import type { FaqData } from './types'

export default function FaqSection({ data }: { data: FaqData }) {
  const items = data.items ?? []
  return (
    <section className="light" id="faq" itemScope itemType="https://schema.org/FAQPage" aria-labelledby="faq-h">
      <div className="wrap">
        <div className="sec-head">
          <span className="eyebrow">{data.eyebrow}</span>
          <h2 id="faq-h">{data.heading}</h2>
        </div>
        <div className="faq-list">
          {items.map((faq, i) => (
            <details className="fq" key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
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
