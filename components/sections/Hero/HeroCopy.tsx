import Link from 'next/link'

export default function HeroCopy() {
  return (
    <div>
      <div className="mb-7">
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.8rem] font-semibold uppercase tracking-[0.09em] text-teal-light bg-teal/10 border border-teal/20">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-light animate-pulse inline-block" />
          AI-Powered Growth Partner
        </span>
      </div>

      <h1 className="text-white mb-6 text-balance">
        The growth engine your <span className="text-teal">revenue targets</span> actually need.
      </h1>

      <p className="text-white/55 text-body-lg mb-10 max-w-[38rem] leading-relaxed text-balance">
        GrowthByte deploys integrated AI systems — across paid media, SEO, content, and lifecycle — guided by senior strategists with one mandate: measurable revenue growth.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <Link href="/contact" className="btn-primary btn-lg">Book a Strategy Call</Link>
        <Link href="/case-studies" className="btn-ghost-dark btn-lg">
          See Case Studies
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      <p className="mt-8 text-[0.8125rem] text-white/30 tracking-wide">
        Trusted by SaaS, D2C, FinTech, and Healthcare companies — ₹5Cr to ₹100Cr revenue range
      </p>
    </div>
  )
}
