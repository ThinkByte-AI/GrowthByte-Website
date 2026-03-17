import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative bg-ink overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />
      {/* Teal ambient glow */}
      <div
        className="absolute top-0 right-0 w-[700px] h-[700px] opacity-[0.06] pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle at center, #009389, transparent 70%)', transform: 'translate(20%, -25%)' }}
      />

      <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-32 lg:pt-32 lg:pb-36">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div>
            {/* Eyebrow */}
            <div className="mb-7">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[0.8rem] font-semibold uppercase tracking-[0.09em] text-teal-light bg-teal/10 border border-teal/20">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-light animate-pulse inline-block" />
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
            <p className="text-white/55 text-body-lg mb-10 max-w-[38rem] leading-relaxed text-balance">
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

            {/* Micro proof */}
            <p className="mt-8 text-[0.8125rem] text-white/30 tracking-wide">
              Trusted by SaaS, D2C, FinTech, and Healthcare companies — ₹5Cr to ₹100Cr revenue range
            </p>
          </div>

          {/* ── Right: AI Growth Dashboard visual ── */}
          <div className="hidden lg:block">
            <div className="relative">

              {/* Main dashboard card */}
              <div className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 shadow-2xl">

                {/* Card header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-[0.6875rem] font-semibold text-white/30 uppercase tracking-wider">Growth Dashboard</p>
                    <p className="text-xs text-white/50 mt-0.5">AI-monitored · Updated continuously</p>
                  </div>
                  <div className="flex items-center gap-1.5 bg-teal/10 border border-teal/20 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                    <span className="text-[0.6875rem] text-teal font-semibold">Live</span>
                  </div>
                </div>

                {/* Metric rows */}
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                        <span className="text-xs text-white/50">CAC Reduction</span>
                      </div>
                      <span className="text-sm font-bold text-teal tabular-nums">−42%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal to-teal-light rounded-full" style={{ width: '42%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0" />
                        <span className="text-xs text-white/50">ROAS Improvement</span>
                      </div>
                      <span className="text-sm font-bold text-teal tabular-nums">3.1×</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-teal to-teal-light rounded-full" style={{ width: '77%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-light/70 flex-shrink-0" />
                        <span className="text-xs text-white/50">Organic Pipeline</span>
                      </div>
                      <span className="text-sm font-bold text-teal-light tabular-nums">+68%</span>
                    </div>
                    <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full bg-teal-light/50 rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>
                </div>

                {/* Sparkline chart */}
                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[0.6875rem] text-white/30 uppercase tracking-wider font-medium">Revenue trend</span>
                    <span className="text-[0.6875rem] text-teal font-semibold">↑ Compounding</span>
                  </div>
                  <svg viewBox="0 0 240 60" className="w-full h-12" fill="none" aria-hidden="true">
                    <defs>
                      <linearGradient id="heroChartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#009389" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#009389" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,55 C30,50 50,44 70,36 C90,28 110,20 130,13 C150,7 170,3 200,1 L240,0 L240,60 L0,60 Z"
                      fill="url(#heroChartGrad)"
                    />
                    <path
                      d="M0,55 C30,50 50,44 70,36 C90,28 110,20 130,13 C150,7 170,3 200,1 L240,0"
                      stroke="#009389"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="70" cy="36" r="2.5" fill="#009389" />
                    <circle cx="130" cy="13" r="2.5" fill="#009389" />
                    <circle cx="220" cy="0.5" r="3" fill="#00b5aa" />
                  </svg>
                  <div className="flex justify-between mt-1">
                    <span className="text-[0.625rem] text-white/20">Month 1</span>
                    <span className="text-[0.625rem] text-white/20">Month 6</span>
                  </div>
                </div>
              </div>

              {/* Floating badge — top right */}
              <div className="absolute -top-3 -right-3 bg-teal text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-teal/30">
                90-day results
              </div>

              {/* Floating metric — bottom left */}
              <div className="absolute -bottom-4 -left-4 bg-ink-80 border border-white/[0.08] rounded-xl px-4 py-3 shadow-2xl">
                <span className="block text-[0.625rem] text-white/40 uppercase tracking-wider mb-0.5">Pipeline generated</span>
                <span className="text-white font-bold text-sm tabular-nums">₹50Cr+</span>
              </div>

              {/* Ambient card glow */}
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-[0.07] rounded-3xl"
                style={{ background: '#009389' }}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
