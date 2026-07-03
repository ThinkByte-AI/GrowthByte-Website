import type { MetricBarData } from './types'

export default function MetricBar({ data }: { data: MetricBarData }) {
  const items = data.items ?? []
  return (
    <div className="mbar" aria-label="Trust metrics">
      <div className="mbar-track">
        {[...items, ...items].map((metric, i) => (
          <div className="mitem" key={i} aria-hidden={i >= items.length}>
            <span className="mv">{metric.value}</span>
            <span className="ml">{metric.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
