import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About GrowthByte — AI-Powered Growth Partner',
  description: 'GrowthByte was built because fragmented agencies and disconnected tools were failing growth-stage companies. We built an integrated AI + human growth system instead.',
}

const VALUES = [
  {
    title: 'Outcomes over activity',
    body: 'We measure success in revenue metrics — CAC, ROAS, pipeline, LTV. Not impressions, followers, or reports delivered.',
  },
  {
    title: 'Integration over isolation',
    body: 'Every channel we run is connected to every other. SEO informs paid strategy. Email feeds retention. Data flows everywhere.',
  },
  {
    title: 'Speed without shortcuts',
    body: 'We move fast because we have systems, not because we skip thinking. A 6-week launch timeline does not mean a careless one.',
  },
  {
    title: 'Transparency by default',
    body: 'You get live dashboards, weekly updates, and direct access to your strategist. No black boxes, no monthly surprise reports.',
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-ink overflow-hidden">
        <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] pointer-events-none" aria-hidden="true"
          style={{ background: 'radial-gradient(circle at center, #009389, transparent 70%)', transform: 'translate(20%, -20%)' }} />
        <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <p className="section-eyebrow-dark">About</p>
              <h1 className="text-white text-balance mb-5">
                Built because fragmented agencies kept failing growth companies.
              </h1>
              <p className="text-white/55 text-body-lg max-w-[38rem] text-balance leading-relaxed">
                GrowthByte exists to give ambitious companies something they could not find anywhere else: a single partner that combines integrated AI systems with senior strategic judgment — and is accountable to revenue, not activity.
              </p>
            </div>
            {/* Right: company identity visual */}
            <div className="hidden lg:flex justify-end">
              <div className="w-[300px] space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { value: '3', label: 'Co-founders' },
                    { value: 'BITS', label: 'Pilani alumni' },
                  ].map((s) => (
                    <div key={s.label} className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-4 text-center">
                      <div className="text-2xl font-bold text-white tabular-nums" style={{ letterSpacing: '-0.02em' }}>{s.value}</div>
                      <div className="text-[0.6875rem] text-white/35 font-medium mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="bg-teal/[0.08] border border-teal/20 rounded-xl px-5 py-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                    <span className="text-[0.6875rem] text-teal font-semibold uppercase tracking-wider">Operating model</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-center">
                      <div className="text-sm font-bold text-white">AI Systems</div>
                      <div className="text-[0.625rem] text-white/35 mt-0.5">Execution</div>
                    </div>
                    <div className="text-teal text-lg font-bold">×</div>
                    <div className="text-center">
                      <div className="text-sm font-bold text-white">Human Strategy</div>
                      <div className="text-[0.625rem] text-white/35 mt-0.5">Direction</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white/[0.04] border border-white/[0.08] rounded-xl px-5 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-white tabular-nums" style={{ letterSpacing: '-0.02em' }}>20+</div>
                      <div className="text-[0.6875rem] text-white/35 font-medium">Brands served</div>
                    </div>
                    <div className="h-8 w-px bg-white/[0.07]" />
                    <div>
                      <div className="text-xl font-bold text-white tabular-nums" style={{ letterSpacing: '-0.02em' }}>₹50Cr+</div>
                      <div className="text-[0.6875rem] text-white/35 font-medium">Pipeline generated</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Origin story */}
      <section className="section-padding bg-surface">
        <div className="container-custom">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
            <div>
              <p className="section-eyebrow">Why we exist</p>
              <h2 className="section-heading text-balance">The same problems, at every company.</h2>
            </div>
            <div className="space-y-5 text-body-md text-ink-60 leading-relaxed">
              <p>
                The founders of GrowthByte spent years inside growth-stage companies — as heads of marketing, growth advisors, and operators. In every engagement, the same pattern appeared.
              </p>
              <p>
                Three to five agencies, each running a channel in isolation. A technology stack that cost more than it returned. No single person who owned the revenue number. Strategy that reset every 90 days because the previous agency did not work out.
              </p>
              <p>
                The problem was not a shortage of talent or tools. It was the absence of integration. Each part was optimised independently. Nobody optimised the system.
              </p>
              <p>
                GrowthByte was built to be that system. One team, one strategy, all channels aligned to the same outcome. AI that runs continuously across all execution. Human judgment that decides what the AI optimises toward.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-surface-2">
        <div className="container-custom">
          <div className="section-header-center">
            <p className="section-eyebrow">How we operate</p>
            <h2 className="section-heading">Four operating principles.</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v, i) => (
              <div key={i} className="bg-surface border border-surface-border rounded-xl p-6">
                <div className="w-7 h-7 rounded-full bg-teal text-white text-xs font-bold flex items-center justify-center mb-4 tabular-nums">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-semibold text-ink text-[1rem] mb-2">{v.title}</h3>
                <p className="text-sm text-ink-60 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding-sm bg-surface border-t border-surface-border">
        <div className="container-custom text-center">
          <h2 className="text-balance mb-4 max-w-[28rem] mx-auto">Want to work with a team that owns the outcome?</h2>
          <p className="text-ink-60 text-body-lg mb-8 max-w-[30rem] mx-auto">
            Book a strategy call. Thirty minutes. No decks. Just a real conversation about your growth.
          </p>
          <Link href="/contact" className="btn-primary btn-lg">Book a Strategy Call</Link>
        </div>
      </section>
    </>
  )
}
