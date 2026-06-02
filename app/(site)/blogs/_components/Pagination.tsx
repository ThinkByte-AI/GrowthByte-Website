import { ArrowSmallIcon } from '@/components/journal'

interface PaginationProps {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

const pageNumbers = (totalPages: number): Array<number | 'gap'> => {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
  return [1, 2, 3, 4, 'gap', totalPages]
}

export default function Pagination({ page, totalPages, onChange }: PaginationProps) {
  if (totalPages <= 1) return null
  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => onChange(Math.max(1, page - 1))}>
        <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><ArrowSmallIcon /></span> Prev
      </button>
      {pageNumbers(totalPages).map((n, i) =>
        n === 'gap' ? (
          <span key={`gap-${i}`} style={{ color: 'var(--gb-ink-3)', padding: '0 6px', fontFamily: 'var(--gb-font-mono)', fontSize: 12 }}>…</span>
        ) : (
          <button key={n} className={page === n ? 'is-active' : ''} onClick={() => onChange(n)}>{n}</button>
        ),
      )}
      <button disabled={page === totalPages} onClick={() => onChange(Math.min(totalPages, page + 1))}>
        Next <ArrowSmallIcon />
      </button>
    </div>
  )
}
