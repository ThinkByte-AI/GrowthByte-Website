const STEPS = [
  {
    timeframe: 'Weeks 1 – 2',
    title: 'Audit & Discovery',
    description: 'We dissect your current setup — analytics, ad accounts, SEO, email, and CRM. We map your customer journey, benchmark against competitors, and identify the highest-leverage opportunities.',
    deliverable: 'Growth audit report + opportunity scorecard',
  },
  {
    timeframe: 'Weeks 3 – 4',
    title: 'Strategy & Architecture',
    description: 'We build your custom growth strategy — channel priorities, audience architecture, messaging hierarchy, and 90-day KPI targets. You approve before anything goes live.',
    deliverable: 'Full growth strategy doc + KPI dashboard setup',
  },
  {
    timeframe: 'Weeks 5 – 6',
    title: 'Build & Launch',
    description: 'Campaigns, automations, and content infrastructure go live. AI systems begin learning. We run controlled tests before scaling, and your team gets daily visibility into performance.',
    deliverable: 'Live campaigns + tracking infrastructure',
  },
  {
    timeframe: 'Ongoing',
    title: 'Optimise & Scale',
    description: 'AI runs daily optimisation across all channels. Our strategists review weekly, adjust monthly, and plan quarterly. You get a results dashboard and a standing bi-weekly review call.',
    deliverable: 'Weekly performance reports + monthly strategy review',
  },
]

export default function ProcessSection() {
  return (
    <section id="process" className="section-padding bg-surface-2 scroll-mt-header">
      <div className="container-custom">

        {/* Header */}
        <div className="section-header-center">
          <p className="section-eyebrow">How it works</p>
          <h2 className="section-heading">From audit to live in 6 weeks.</h2>
          <p className="section-subheading mx-auto">
            We move fast because we have a proven system. No onboarding limbo. No 90-day strategy-only engagements.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-[52rem] mx-auto">
          <div className="relative">
            {/* Connector line */}
            <div className="hidden md:block absolute left-[1.9rem] top-10 bottom-10 w-px bg-surface-border" aria-hidden="true" />

            <div className="space-y-5">
              {STEPS.map((step, i) => (
                <div key={i} className="relative flex gap-6 md:gap-8">
                  {/* Step number */}
                  <div className="flex-shrink-0 z-10">
                    <div className="w-[3.75rem] h-[3.75rem] rounded-full border-2 border-surface-border bg-surface flex items-center justify-center">
                      <span className="text-sm font-bold text-teal tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <span className="text-label-sm text-teal uppercase tracking-wider mb-1.5 block">{step.timeframe}</span>
                    <h3 className="font-semibold text-ink text-[1.0625rem] mb-2">{step.title}</h3>
                    <p className="text-sm text-ink-60 leading-relaxed mb-3">{step.description}</p>
                    <div className="inline-flex items-center gap-2 text-xs font-medium text-ink-40">
                      <svg className="w-3.5 h-3.5 text-teal" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {step.deliverable}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
