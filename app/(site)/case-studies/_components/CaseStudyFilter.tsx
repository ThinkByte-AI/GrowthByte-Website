interface IndustryOption {
  value: string
  count: number
}

interface CaseStudyFilterProps {
  industries: IndustryOption[]
  active: string
  onSelect: (value: string) => void
  resultCount: number
}

export default function CaseStudyFilter({ industries, active, onSelect, resultCount }: CaseStudyFilterProps) {
  return (
    <>
      <div style={{ marginTop: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <h2 className="h-section" style={{ margin: 0, fontSize: 28 }}>All case studies</h2>
        <div className="meta">
          <span style={{ fontFamily: 'var(--gb-font-mono)', fontSize: 12, letterSpacing: '0.04em' }}>
            {resultCount} {resultCount === 1 ? 'engagement' : 'engagements'}
          </span>
        </div>
      </div>
      <div className="filter-bar" style={{ marginTop: 20 }}>
        {industries.map((ind) => (
          <button
            key={ind.value}
            className={`chip ${active === ind.value ? 'is-active' : ''}`}
            onClick={() => onSelect(ind.value)}
          >
            {ind.value} <span className="count">{ind.count}</span>
          </button>
        ))}
      </div>
    </>
  )
}
