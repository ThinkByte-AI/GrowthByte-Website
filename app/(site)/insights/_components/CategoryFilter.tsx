import { CATEGORIES } from './data'

const pillClass = (active: boolean) =>
  `px-3.5 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
    active ? 'bg-ink text-white' : 'text-ink-60 hover:text-ink hover:bg-surface-3'
  }`

export default function CategoryFilter() {
  return (
    <div className="border-b border-surface-border bg-surface sticky top-[72px] z-20">
      <div className="container-custom py-4 flex gap-2 overflow-x-auto scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button key={cat} type="button" className={pillClass(cat === 'All')}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  )
}
