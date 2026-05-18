'use client'

import type { Heading } from './types'

interface TableOfContentsProps {
  headings: Heading[]
  activeId: string
}

const linkClassName = (active: boolean) =>
  `block text-sm py-1 border-l-2 pl-3 transition-colors ${
    active ? 'border-teal text-teal' : 'border-ink-10 text-ink-50 hover:text-ink'
  }`

export default function TableOfContents({ headings, activeId }: TableOfContentsProps) {
  return (
    <div className="hidden lg:block absolute left-0 top-0 -translate-x-full pr-8 w-56">
      <nav className="sticky top-24">
        <h4 className="text-xs font-semibold text-ink-40 uppercase tracking-wide mb-3">
          On this page
        </h4>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a href={`#heading-${heading.id}`} className={linkClassName(activeId === heading.id)}>
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
