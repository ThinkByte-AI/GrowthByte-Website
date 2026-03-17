import type { Metadata } from 'next'
import { CONTACT_INFO } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'Book a Strategy Call — GrowthByte',
  description: 'Book a 30-minute strategy call with GrowthByte. We will audit your growth setup, identify the highest-leverage opportunities, and tell you exactly what we would do.',
}

export default function ContactPage() {
  const BENEFITS = [
    'A senior strategist — not a salesperson',
    'Live audit of your current growth setup',
    'Your top 3 highest-leverage opportunities',
    'A clear 90-day action plan — no obligation',
  ]

  return (
    <>
      {/* Hero */}
      <section className="section-padding bg-surface border-b border-surface-border">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left — framing */}
            <div className="lg:sticky lg:top-28">
              <p className="section-eyebrow">Strategy call</p>
              <h1 className="mb-5 text-balance">
                Book a 30-minute strategy call.
              </h1>
              <p className="text-body-lg text-ink-60 leading-relaxed mb-8">
                This is a working session. We will look at your current marketing setup, identify what is underperforming, and map out a clear starting point — at no cost, no obligation.
              </p>

              <ul className="space-y-3 mb-8">
                {BENEFITS.map((b, i) => (
                  <li key={i} className="flex items-center gap-3 text-[0.9375rem] text-ink">
                    <span className="w-5 h-5 rounded-full bg-teal-muted text-teal flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col gap-2">
                <a
                  href={CONTACT_INFO.emailHref}
                  className="inline-flex items-center gap-2 text-sm text-ink-60 hover:text-ink transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  {CONTACT_INFO.email}
                </a>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="inline-flex items-center gap-2 text-sm text-ink-60 hover:text-ink transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {CONTACT_INFO.phone}
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-surface rounded-2xl border border-surface-border p-7 lg:p-8">
              <h2 className="text-[1.25rem] font-bold text-ink mb-6">Tell us about your situation</h2>
              <form className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-ink mb-2">Full name *</label>
                    <input
                      type="text" id="name" name="name" required
                      className="w-full px-4 py-3 border border-surface-border rounded-lg text-ink bg-surface placeholder-ink-20 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-ink mb-2">Work email *</label>
                    <input
                      type="email" id="email" name="email" required
                      className="w-full px-4 py-3 border border-surface-border rounded-lg text-ink bg-surface placeholder-ink-20 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-ink mb-2">Company</label>
                    <input
                      type="text" id="company" name="company"
                      className="w-full px-4 py-3 border border-surface-border rounded-lg text-ink bg-surface placeholder-ink-20 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm"
                      placeholder="Company name"
                    />
                  </div>
                  <div>
                    <label htmlFor="revenue" className="block text-sm font-semibold text-ink mb-2">Annual revenue</label>
                    <select
                      id="revenue" name="revenue"
                      className="w-full px-4 py-3 border border-surface-border rounded-lg text-ink bg-surface focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm"
                    >
                      <option value="">Select range</option>
                      <option value="under-5cr">Under ₹5Cr</option>
                      <option value="5-20cr">₹5Cr – ₹20Cr</option>
                      <option value="20-50cr">₹20Cr – ₹50Cr</option>
                      <option value="50-100cr">₹50Cr – ₹100Cr</option>
                      <option value="over-100cr">Over ₹100Cr</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="industry" className="block text-sm font-semibold text-ink mb-2">Industry</label>
                  <select
                    id="industry" name="industry"
                    className="w-full px-4 py-3 border border-surface-border rounded-lg text-ink bg-surface focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm"
                  >
                    <option value="">Select industry</option>
                    <option value="saas">SaaS</option>
                    <option value="d2c">D2C / E-Commerce</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="fintech">FinTech</option>
                    <option value="professional-services">Professional Services</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-ink mb-2">What is your biggest growth challenge right now? *</label>
                  <textarea
                    id="message" name="message" rows={4} required
                    className="w-full px-4 py-3 border border-surface-border rounded-lg text-ink bg-surface placeholder-ink-20 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm resize-none"
                    placeholder="Where are you stuck? What have you tried? What does success look like in 12 months?"
                  />
                </div>

                <button type="submit" className="btn-primary w-full btn-lg">
                  Request Strategy Call
                </button>

                <p className="text-xs text-ink-40 text-center leading-relaxed">
                  We respond within 24 hours. No spam. No pitch decks. Just a real conversation.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
