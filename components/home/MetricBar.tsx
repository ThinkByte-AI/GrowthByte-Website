const METRICS = [
  { value: '42%', label: 'Avg CAC reduction' },
  { value: '3.1×', label: 'Avg ROAS' },
  { value: '₹50Cr+', label: 'Pipeline built' },
  { value: '92%', label: 'Client retention' },
  { value: '4.8/5', label: 'Client satisfaction' },
  { value: '20+', label: 'Brands trusted' },
  { value: '6 weeks', label: 'Audit to live' },
  { value: '90 days', label: 'To first results' },
]

export default function MetricBar() {
  return (
    <div className="mbar" aria-label="Trust metrics">
      <div className="mbar-track">
        {[...METRICS, ...METRICS].map((metric, i) => (
          <div className="mitem" key={i} aria-hidden={i >= METRICS.length}>
            <span className="mv">{metric.value}</span>
            <span className="ml">{metric.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
