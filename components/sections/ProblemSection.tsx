const PAIN_POINTS = [
  {
    title: 'Multiple agencies, zero alignment',
    body:  'SEO agency, paid agency, design agency — each optimising their own slice, nobody owning the funnel.',
  },
  {
    title: 'Spend is going up, CAC is going up',
    body:  "You're scaling budgets but not outcomes. Rising CPMs, broad audiences, and no lifecycle engine mean every lead costs more than the last.",
  },
  {
    title: '90-day retainers with no accountability',
    body:  'Strategy resets every quarter. Nobody owns the full-year revenue target. Work happens; results are optional.',
  },
  {
    title: 'AI tools bought, never integrated',
    body:  "A stack of unconnected tools doesn't compound. It just creates noise. Integrating them requires someone who owns the outcome.",
  },
]

export default function ProblemSection() {
  return (
    <section id="problem" className="section-padding bg-surface scroll-mt-header">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left: framing */}
          <div className="lg:sticky lg:top-28">
            <p className="section-eyebrow">The problem</p>
            <h2 className="section-heading text-balance">
              Most growth efforts stall for the same reasons.
            </h2>
            <p className="text-body-lg text-ink-60 leading-relaxed mb-8">
              You have tried multiple agencies. You have hired in-house. You have tested channels. The problem is not effort — it is fragmentation. Marketing running in silos, tools not talking to each other, and strategy that resets every quarter.
            </p>
            <div className="inline-flex items-start gap-3 p-4 rounded-xl bg-teal-muted border border-teal/15">
              <div className="w-5 h-5 text-teal mt-0.5 flex-shrink-0">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-teal-dark font-medium leading-relaxed">
                GrowthByte is built as a single integrated system — not a collection of services. Every channel feeds the same revenue goal.
              </p>
            </div>
          </div>

          {/* Right: pain points */}
          <div className="space-y-4">
            {PAIN_POINTS.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl border border-surface-border bg-surface hover:border-teal/20 hover:bg-teal-muted/30 transition-all duration-250 group">
                <div className="w-7 h-7 rounded-full bg-surface-3 text-ink-40 text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-teal group-hover:text-white transition-colors duration-250 tabular-nums">
                  {i + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1.5 text-[1rem]">{item.title}</h4>
                  <p className="text-sm text-ink-60 leading-relaxed">{item.body}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
