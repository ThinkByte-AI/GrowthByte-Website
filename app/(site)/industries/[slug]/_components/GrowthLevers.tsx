import type { Industry } from './types'

const LEVERS = [
  { label: 'Acquisition', desc: 'CAC reduction via AI bid management' },
  { label: 'Conversion', desc: 'Funnel optimisation + CRO' },
  { label: 'Retention', desc: 'LTV improvement + lifecycle' },
  { label: 'Revenue ops', desc: 'Attribution + pipeline reporting' },
]

export default function GrowthLevers({ industry }: { industry: Industry }) {
  return (
    <div className="hidden lg:flex justify-end">
      <div className="w-[300px]">
        <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-5">
          <p className="text-[0.6875rem] text-white/30 uppercase tracking-wider font-semibold mb-4">Growth levers we activate</p>
          <div className="space-y-3">
            {LEVERS.map((lever, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-teal/15 border border-teal/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-teal text-[0.5625rem] font-bold tabular-nums">{i + 1}</span>
                </div>
                <div>
                  <p className="text-[0.8125rem] font-semibold text-white/70 leading-none">{lever.label}</p>
                  <p className="text-[0.6875rem] text-white/35 mt-0.5 leading-snug">{lever.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 pt-4 border-t border-white/[0.06]">
            <div className="flex items-center gap-2">
              <span className="text-[0.6875rem] font-semibold text-teal uppercase tracking-wider">Proven playbook</span>
              <span className="text-teal">✓</span>
            </div>
            <p className="text-[0.6875rem] text-white/30 mt-1">Adapted specifically for {industry.name}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
