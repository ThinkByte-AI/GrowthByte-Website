'use client'

import { useEffect, useState } from 'react'
import { ClockIcon } from '@/components/journal'
import type { TocItem } from '../extractToc'

interface ArticleTocProps {
  items: TocItem[]
  readTime?: number
}

export default function ArticleToc({ items, readTime = 0 }: ArticleTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const article = document.getElementById('gbx-article-body')
    const onScroll = () => {
      if (article) {
        const rect = article.getBoundingClientRect()
        const total = rect.height - window.innerHeight
        setProgress(total > 0 ? Math.max(0, Math.min(1, -rect.top / total)) : 0)
      }
      let current = items[0]?.id ?? ''
      for (const item of items) {
        const el = document.getElementById(item.id)
        if (el && el.getBoundingClientRect().top < 140) current = item.id
      }
      setActiveId(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [items])

  if (items.length === 0) return null
  const pct = Math.round(progress * 100)

  return (
    <aside className="toc-col">
      <nav className="toc" aria-label="Table of contents">
        <div className="title">On this page</div>
        <div style={{ position: 'relative' }}>
          <span className="progress" style={{ transform: `scaleY(${progress})` }} />
          {items.map((t) => (
            <a key={t.id} href={`#${t.id}`} className={`${activeId === t.id ? 'is-active' : ''} ${t.depth === 3 ? 'depth-3' : ''}`}>
              {t.label}
            </a>
          ))}
        </div>
        {readTime > 0 && (
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--gb-line)' }}>
            <div className="meta" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
              <ClockIcon /> Reading progress
            </div>
            <div style={{ height: 6, borderRadius: 999, background: 'var(--gb-line)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${pct}%`, background: 'var(--gb-accent)' }} />
            </div>
            <div style={{ marginTop: 8, fontFamily: 'var(--gb-font-mono)', fontSize: 11, color: 'var(--gb-ink-3)' }}>
              {pct}% · {Math.max(0, Math.round(readTime * (1 - progress)))} min left
            </div>
          </div>
        )}
      </nav>
    </aside>
  )
}
