import Link from 'next/link'

export default function ContactSection() {
  const WHAT_HAPPENS = [
    '30-minute call with a senior strategist',
    'We audit your current growth setup live',
    'Identify your 2–3 highest-leverage opportunities',
    'You leave with a clear picture — no obligation',
  ]

  return (
    <section id="contact" className="section-padding bg-teal relative overflow-hidden scroll-mt-header">
      {/* Subtle texture */}
      <div className="absolute inset-0 bg-grid-dark opacity-40 pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <div className="max-w-[52rem] mx-auto text-center">

          {/* Eyebrow */}
          <p className="inline-flex items-center gap-2 text-label-sm text-white/60 uppercase tracking-[0.1em] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white/60 inline-block" />
            Get started
          </p>

          {/* Headline */}
          <h2 className="text-white mb-5 text-balance">
            Ready to build a growth system that actually works?
          </h2>

          {/* Subhead */}
          <p className="text-white/70 text-body-lg mb-10 max-w-[34rem] mx-auto">
            Book a 30-minute strategy call. We will audit your current setup and show you exactly what we would do in the first 90 days.
          </p>

          {/* What happens */}
          <ul className="grid sm:grid-cols-2 gap-3 max-w-[38rem] mx-auto mb-10 text-left">
            {WHAT_HAPPENS.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                <svg className="w-4 h-4 text-white mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </li>
            ))}
          </ul>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-semibold rounded-lg bg-ink text-white px-8 py-4 text-[0.9375rem] hover:bg-ink-90 transition-colors duration-250"
              style={{ minHeight: '56px' }}
            >
              Book a Strategy Call
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/case-studies" className="btn-ghost-dark">
              See our results first
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
