const AI_ITEMS = [
  'Bid optimisation across all platforms — 24/7',
  'Audience segmentation and lookalike modelling',
  'Real-time campaign adjustments and anomaly detection',
  'A/B and multivariate test orchestration',
  'Predictive performance forecasting',
  'Automated reporting and attribution',
]

const HUMAN_ITEMS = [
  'Channel strategy and budget architecture',
  'Creative direction and brand positioning',
  'Offer development and messaging hierarchy',
  'Strategic pivots based on market signals',
  'Client alignment and stakeholder communication',
  'Judgment calls that data alone cannot make',
]

export default function AIModelSection() {
  return (
    <section id="operating-model" className="section-padding bg-ink relative overflow-hidden scroll-mt-header">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />

      <div className="container-custom relative z-10">
        {/* Header */}
        <div className="section-header-center max-w-[40rem] mx-auto text-center">
          <p className="section-eyebrow-dark">Operating model</p>
          <h2 className="section-heading text-white">
            AI does the work. Humans own the strategy.
          </h2>
          <p className="section-subheading text-white/50 mx-auto">
            Neither alone is enough. AI without strategy chases the wrong goal. Strategy without AI is too slow. GrowthByte is both.
          </p>
        </div>

        {/* Two-column model */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-10">

          {/* AI column */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-7 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-teal/15 border border-teal/20 flex items-center justify-center text-teal-light">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-[1.0625rem]">AI Systems</h3>
                <p className="text-teal-light text-xs font-medium uppercase tracking-wider">Speed + scale</p>
              </div>
            </div>
            <ul className="space-y-3">
              {AI_ITEMS.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Human column */}
          <div className="bg-white/4 border border-white/8 rounded-2xl p-7 lg:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-amber/15 border border-amber/20 flex items-center justify-center text-amber-light">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-[1.0625rem]">Human Strategy</h3>
                <p className="text-amber-light text-xs font-medium uppercase tracking-wider">Judgment + creativity</p>
              </div>
            </div>
            <ul className="space-y-3">
              {HUMAN_ITEMS.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Outcome bar */}
        <div className="rounded-2xl border border-teal/20 bg-teal/8 px-7 py-5 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="w-8 h-8 rounded-full border border-teal/30 bg-teal/15 flex items-center justify-center flex-shrink-0 text-teal-light">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <div>
            <p className="text-white font-semibold text-[0.9375rem]">Together: faster execution, better decisions, lower CAC.</p>
            <p className="text-white/45 text-sm mt-0.5">The two systems reinforce each other. AI output informs human strategy. Human strategy configures AI systems.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
