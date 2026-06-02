const FOUNDER_STATS = [
  { value: '3', label: 'Co-founders' },
  { value: 'BITS', label: 'Pilani alumni' },
]

export default function IdentityPanel() {
  return (
    <div className="hidden lg:flex justify-end">
      <div className="w-[300px] space-y-3">
        <div className="grid grid-cols-2 gap-3">
          {FOUNDER_STATS.map((s) => (
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
  )
}
