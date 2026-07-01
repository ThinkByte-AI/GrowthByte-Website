import Link from 'next/link'
import { ArrowIcon } from './icons'

const INDUSTRIES = [
  {
    href: '/industries/saas', name: 'SaaS',
    desc: 'Lower CAC, better trial-to-paid, longer LTV. Full funnel from acquisition to expansion.',
    proof: '44% CAC reduction, 90 days',
    icon: <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
  },
  {
    href: '/industries/d2c-ecommerce', name: 'D2C and E-Commerce',
    desc: 'Lower ROAS targets, higher AOV, stronger retention across every channel and lifecycle stage.',
    icon: <svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>,
  },
  {
    href: '/industries/healthcare', name: 'Healthcare',
    desc: 'Patient acquisition within compliance limits. Trust-first campaigns for clinics and healthtech.',
    icon: <svg viewBox="0 0 24 24"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>,
  },
  {
    href: '/industries/fintech', name: 'FinTech',
    desc: 'Qualified lead generation with trust and regulatory awareness. Payments, lending, and wealth.',
    icon: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>,
  },
  {
    href: '/industries/professional-services', name: 'Professional Services',
    desc: 'Enterprise positioning, shorter sales cycles, and pipeline that grows month over month.',
    icon: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>,
  },
  {
    href: '/industries/ai-companies', name: 'AI Companies',
    desc: 'Category education and trust-led funnels for AI startups and product companies.',
    icon: <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="2" /><path d="M7 12h10M12 7v10" /></svg>,
  },
]

export default function IndustriesSection() {
  return (
    <section className="dark" id="industries" aria-labelledby="ind-h">
      <div className="wrap">
        <div className="sec-flex">
          <div>
            <span className="eyebrow">Industries</span>
            <h2 id="ind-h">We learn your buyer first.</h2>
          </div>
          <Link href="/industries" className="gb-btn gb-btn-ow">All Industries <ArrowIcon /></Link>
        </div>
        <div className="ind-grid">
          {INDUSTRIES.map((industry) => (
            <Link href={industry.href} className="icard" key={industry.name}>
              <span className="ic-ico">{industry.icon}</span>
              <div className="ic-name">{industry.name}</div>
              <div className="ic-desc">{industry.desc}</div>
              {industry.proof && <div className="ic-proof">{industry.proof}</div>}
              <div className="ic-link">See results →</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
