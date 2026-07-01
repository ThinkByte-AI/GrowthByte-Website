import Link from 'next/link'
import { ArrowIcon } from './icons'

const CASES = [
  {
    tag: 'SaaS / Performance', num: '44%', sub: 'CAC reduction • 90 days',
    title: 'Series B SaaS cuts CAC 44% in 90 days',
    desc: 'We rebuilt paid acquisition from scratch: new audience architecture, tighter creative testing, and daily AI bid management across Google and Meta.',
    href: '/case-studies/saas-cac-reduction',
  },
  {
    tag: 'D2C / Meta Ads', num: '3.8x', sub: 'ROAS on Meta • 60 days',
    title: 'D2C brand hits 3.8x ROAS on Meta in 60 days',
    desc: 'Restructured Meta campaigns with AI-generated creative variants, tightened attribution, and a lifecycle email overhaul that recovered a large share of abandoned carts. The testing system still runs itself.',
    href: '/case-studies/d2c-roas-growth',
  },
  {
    tag: 'B2B SaaS / SEO', num: '12x', sub: 'Organic pipeline • 8 months',
    title: 'B2B SaaS grows organic pipeline 12x in 8 months',
    desc: 'Built a content engine targeting high-intent queries. Technical SEO fixes unlocked crawlability across the site. Organic became the top channel.',
    href: '/case-studies/b2b-organic-growth',
  },
]

export default function CaseStudiesSection() {
  return (
    <section className="light" id="cases" aria-labelledby="cases-h">
      <div className="wrap">
        <div className="sec-flex">
          <div>
            <span className="eyebrow">Case Studies</span>
            <h2 id="cases-h">Real companies. Real numbers.</h2>
          </div>
          <Link href="/case-studies" className="gb-btn gb-btn-ot">All Case Studies <ArrowIcon /></Link>
        </div>
        <div className="cs-stack">
          {CASES.map((study) => (
            <article className="cs" key={study.title}>
              <div className="cs-l">
                <span className="cs-tag">{study.tag}</span>
                <div>
                  <div className="cs-num">{study.num}</div>
                  <div className="cs-num-s">{study.sub}</div>
                </div>
              </div>
              <div className="cs-r">
                <h3 className="cs-title">{study.title}</h3>
                <p className="cs-desc">{study.desc}</p>
                <Link href={study.href} className="cs-link">Read the case study →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
