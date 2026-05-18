'use client'

import type { TemplateContentAreaProps } from './types'
import { extractHeadings } from './extractHeadings'
import { useActiveHeading } from './useActiveHeading'
import TableOfContents from './TableOfContents'
import ShareBar from './ShareBar'
import ContentRenderer from './ContentRenderer'

const PROSE_CLASSES = `
  prose prose-lg max-w-none
  prose-headings:text-ink prose-headings:scroll-mt-24
  prose-h1:text-3xl prose-h1:mt-10 prose-h1:mb-5
  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
  prose-p:text-ink-70 prose-p:leading-relaxed
  prose-a:text-teal prose-a:no-underline hover:prose-a:underline
  prose-img:rounded-lg prose-img:shadow-lg
  prose-blockquote:border-l-teal prose-blockquote:bg-teal/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
`

export function TemplateContentArea({ content, config, title }: TemplateContentAreaProps) {
  const headings = extractHeadings(content)
  const activeHeadingId = useActiveHeading(headings, config.showTableOfContents)

  return (
    <div className="relative">
      {config.showTableOfContents && headings.length > 0 && (
        <TableOfContents headings={headings} activeId={activeHeadingId} />
      )}

      {config.showShareButtons && <ShareBar title={title} />}

      <div className={PROSE_CLASSES}>
        <ContentRenderer content={content} headings={headings} />
      </div>
    </div>
  )
}
