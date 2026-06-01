import { PROOF_STATS } from '@/lib/constants'

export default function MetricStrip() {
  return (
    <div className="metric-strip">
      {PROOF_STATS.map((stat) => (
        <div key={stat.label} className="cell">
          <div className="num">{stat.value}</div>
          <span className="lbl">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
