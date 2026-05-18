import Link from 'next/link'
import type { CaseStudy } from './types'

const buildTimelineSteps = (cs: CaseStudy) => [
  { phase: 'Audit', weeks: 'Weeks 1–2', note: 'Funnel mapping + CAC drivers' },
  { phase: 'Strategy', weeks: 'Weeks 3–4', note: 'Prioritised roadmap built' },
  { phase: 'Execution', weeks: 'Week 5+', note: 'AI systems deployed' },
  { phase: 'Results', weeks: cs.timeframe, note: cs.metricLabel },
]

const TimelineStep = ({ step, index, isLast }: { step: ReturnType<typeof buildTimelineSteps>[number]; index: number; isLast: boolean }) => (
  <div className="flex items-start gap-3">
    <div className="flex flex-col items-center flex-shrink-0">
      <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isLast ? 'bg-teal border-teal' : 'border-white/20 bg-white/[0.04]'}`}>
        {isLast ? (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <span className="text-[0.5rem] text-white/40 font-bold">{index + 1}</span>
        )}
      </div>
      {!isLast && <div className="w-px h-4 bg-white/[0.06] mt-1" />}
    </div>
    <div className="pb-1">
      <div className="flex items-center gap-2">
        <p className="text-[0.8125rem] font-semibold text-white/70">{step.phase}</p>
        <span className="text-[0.625rem] text-white/25 font-medium">{step.weeks}</span>
      </div>
      <p className="text-[0.6875rem] text-white/35 mt-0.5 leading-snug">{step.note}</p>
    </div>
  </div>
)

const EngagementTimeline = ({ cs }: { cs: CaseStudy }) => {
  const steps = buildTimelineSteps(cs)
  return (
    <div className="hidden lg:flex justify-end">
      <div className="w-[280px]">
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
          <p className="text-[0.6875rem] text-white/30 uppercase tracking-wider font-semibold mb-5">How it happened</p>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <TimelineStep key={i} step={step} index={i} isLast={i === steps.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const HeroCopy = ({ cs }: { cs: CaseStudy }) => (
  <div>
    <Link href="/case-studies" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors mb-6">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      All case studies
    </Link>
    <span className="tag tag-dark mb-4 inline-block">{cs.industry}</span>
    <h1 className="text-white text-balance mb-6">{cs.headline}</h1>
    <div className="flex items-baseline gap-3">
      <span className="text-teal-light font-bold tabular-nums" style={{ fontSize: 'clamp(2.5rem, 4vw + 1rem, 4rem)', lineHeight: '1', letterSpacing: '-0.03em' }}>
        {cs.metric}
      </span>
      <span className="text-white/50 text-body-lg font-medium">{cs.metricLabel}</span>
    </div>
    <p className="text-white/40 text-sm font-medium mt-3 uppercase tracking-wider">Timeframe: {cs.timeframe}</p>
  </div>
)

export default function Hero({ cs }: { cs: CaseStudy }) {
  return (
    <section className="relative bg-ink overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-[0.05] pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(circle at center, #009389, transparent 70%)', transform: 'translate(20%, -20%)' }} />
      <div className="container-custom relative z-10 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <HeroCopy cs={cs} />
          <EngagementTimeline cs={cs} />
        </div>
      </div>
    </section>
  )
}
