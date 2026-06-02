import { SearchIcon } from '@/components/journal'

interface CategoryOption {
  value: string
  label: string
  count: number
}

interface FilterBarProps {
  categories: CategoryOption[]
  activeCategory: string
  onSelect: (value: string) => void
  query: string
  onQuery: (value: string) => void
}

export default function FilterBar({ categories, activeCategory, onSelect, query, onQuery }: FilterBarProps) {
  return (
    <>
      <div style={{ marginTop: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <h2 className="h-section" style={{ margin: 0, fontSize: 28 }}>Latest essays</h2>
        <div style={{ position: 'relative', minWidth: 260 }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--gb-ink-3)' }}>
            <SearchIcon />
          </span>
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Search articles…"
            style={{
              width: '100%', padding: '10px 14px 10px 38px',
              borderRadius: 999, border: '1px solid var(--gb-line-2)',
              background: 'var(--gb-white)', fontSize: 13, fontFamily: 'inherit', outline: 'none',
            }}
          />
        </div>
      </div>
      <div className="filter-bar" style={{ marginTop: 20 }}>
        {categories.map((c) => (
          <button
            key={c.value}
            className={`chip ${activeCategory === c.value ? 'is-active' : ''}`}
            onClick={() => onSelect(c.value)}
          >
            {c.label} <span className="count">{c.count}</span>
          </button>
        ))}
      </div>
    </>
  )
}
