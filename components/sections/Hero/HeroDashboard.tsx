import MetricRow from './MetricRow'
import RevenueSparkline from './RevenueSparkline'

const DashboardHeader = () => (
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
)

const FloatingBadges = () => (
  <>
    <div className="absolute -top-3 -right-3 bg-teal text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-teal/30">
      90-day results
    </div>
    <div className="absolute -bottom-4 -left-4 bg-ink-80 border border-white/[0.08] rounded-xl px-4 py-3 shadow-2xl">
      <span className="block text-[0.625rem] text-white/40 uppercase tracking-wider mb-0.5">Pipeline generated</span>
      <span className="text-white font-bold text-sm tabular-nums">₹50Cr+</span>
    </div>
  </>
)

export default function HeroDashboard() {
  return (
    <div className="hidden lg:block">
      <div className="relative">
        <div className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-6 shadow-2xl">
          <DashboardHeader />
          <div className="space-y-5">
            <MetricRow label="CAC Reduction" value="−42%" percentWidth={42} highlight />
            <MetricRow label="ROAS Improvement" value="3.1×" percentWidth={77} highlight />
            <MetricRow label="Organic Pipeline" value="+68%" percentWidth={68} />
          </div>
          <RevenueSparkline />
        </div>
        <FloatingBadges />
        <div className="absolute inset-0 -z-10 blur-3xl opacity-[0.07] rounded-3xl" style={{ background: '#009389' }} />
      </div>
    </div>
  )
}
