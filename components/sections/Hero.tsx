import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-ink overflow-hidden">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />

      {/* Teal glow — far background, very subtle */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.07] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle at center, #009389, transparent 70%)', transform: 'translate(30%, -30%)' }}
      />

      <div className="container-custom relative z-10 pt-24 pb-28 md:pt-32 md:pb-36 lg:pt-40 lg:pb-44">
        <div className="max-w-hero mx-auto">

          {/* Eyebrow */}
          <div className="mb-7">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.8rem] font-semibold uppercase tracking-[0.09em] text-teal-light bg-teal/10 border border-teal/20">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-light inline-block" />
              AI-Powered Growth Partner
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-white mb-6 text-balance">
            The growth engine your{' '}
            <span className="text-teal">revenue targets</span>{' '}
            actually need.
          </h1>

          {/* Subhead */}
          <p className="text-hero text-white/55 mb-10 max-w-[40rem] text-balance">
            GrowthByte deploys integrated AI systems — across paid media, SEO, content, and lifecycle — guided by senior strategists with one mandate: measurable revenue growth.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <Link href="/contact" className="btn-primary btn-lg">
              Book a Strategy Call
            </Link>
            <Link href="/case-studies" className="btn-ghost-dark btn-lg">
              See Case Studies
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Social proof micro-line */}
          <p className="mt-8 text-[0.8125rem] text-white/30 tracking-wide">
            Trusted by SaaS, D2C, FinTech, and Healthcare companies — ₹5Cr to ₹100Cr revenue range
          </p>
        </div>
      </div>
    </section>
  )
}
