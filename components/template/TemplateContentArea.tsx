'use client'

import { useState, useEffect } from 'react'

interface TemplateContentAreaProps {
  content: any
  config: {
    width: 'prose' | 'medium' | 'wide' | 'full'
    showTableOfContents: boolean
    showShareButtons: boolean
  }
  title?: string
}

export function TemplateContentArea({ content, config, title }: TemplateContentAreaProps) {
  const [activeHeading, setActiveHeading] = useState<string>('')

  // Content width classes
  const widthClasses = {
    prose: 'max-w-3xl',
    medium: 'max-w-4xl',
    wide: 'max-w-5xl',
    full: 'max-w-none',
  }

  // Extract headings for TOC
  const headings = extractHeadings(content)

  // Track active heading on scroll
  useEffect(() => {
    if (!config.showTableOfContents || headings.length === 0) return

    const handleScroll = () => {
      const headingElements = headings.map((h) =>
        document.getElementById(`heading-${h.id}`)
      ).filter(Boolean)

      const scrollPosition = window.scrollY + 150

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i]
        if (el && el.offsetTop <= scrollPosition) {
          setActiveHeading(headings[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [config.showTableOfContents, headings])

  return (
    <div className="relative">
      {/* Table of Contents */}
      {config.showTableOfContents && headings.length > 0 && (
        <div className="hidden lg:block absolute left-0 top-0 -translate-x-full pr-8 w-56">
          <nav className="sticky top-24">
            <h4 className="text-xs font-semibold text-ink-40 uppercase tracking-wide mb-3">
              On this page
            </h4>
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#heading-${heading.id}`}
                    className={`
                      block text-sm py-1 border-l-2 pl-3 transition-colors
                      ${activeHeading === heading.id
                        ? 'border-teal text-teal'
                        : 'border-ink-10 text-ink-50 hover:text-ink'}
                    `}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {/* Share Buttons */}
      {config.showShareButtons && (
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-ink-10">
          <span className="text-sm text-ink-50">Share:</span>
          <div className="flex gap-2">
            <ShareButton
              type="twitter"
              title={title}
            />
            <ShareButton
              type="linkedin"
              title={title}
            />
            <ShareButton
              type="copy"
              title={title}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div
        className={`
          prose prose-lg max-w-none
          prose-headings:text-ink prose-headings:scroll-mt-24
          prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-ink-70 prose-p:leading-relaxed
          prose-a:text-teal prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-lg prose-img:shadow-lg
          prose-blockquote:border-l-teal prose-blockquote:bg-teal/5 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
        `}
      >
        {renderContent(content, headings)}
      </div>
    </div>
  )
}

// Extract headings from content for TOC
function extractHeadings(content: any): Array<{ id: string; text: string; level: number }> {
  if (!content?.root?.children) return []

  const headings: Array<{ id: string; text: string; level: number }> = []
  let counter = 0

  content.root.children.forEach((node: any) => {
    if (node.type === 'heading' && ['h2', 'h3'].includes(node.tag)) {
      const text = node.children?.map((c: any) => c.text || '').join('') || ''
      const id = `heading-${counter++}`
      headings.push({
        id,
        text,
        level: node.tag === 'h2' ? 2 : 3,
      })
    }
  })

  return headings
}

// Render content with heading IDs for TOC
function renderContent(content: any, headings: Array<{ id: string }>): React.ReactNode {
  if (!content) return null

  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }

  if (content.root?.children) {
    let headingIndex = 0

    return content.root.children.map((node: any, i: number) => {
      if (node.type === 'paragraph') {
        return <p key={i}>{renderParagraph(node)}</p>
      }

      if (node.type === 'heading') {
        const Tag = node.tag || 'h2'
        const text = node.children?.map((c: any) => c.text || '').join('') || ''
        const id = headings[headingIndex]?.id

        if (Tag === 'h2' || Tag === 'h3') {
          headingIndex++
        }

        return (
          <Tag key={i} id={id}>
            {text}
          </Tag>
        )
      }

      if (node.type === 'list') {
        const ListTag = node.listType === 'number' ? 'ol' : 'ul'
        return (
          <ListTag key={i}>
            {node.children?.map((item: any, j: number) => (
              <li key={j}>{item.children?.map((c: any) => c.text || '').join('')}</li>
            ))}
          </ListTag>
        )
      }

      if (node.type === 'quote') {
        const text = node.children?.map((c: any) => c.text || '').join('') || ''
        return <blockquote key={i}>{text}</blockquote>
      }

      if (node.type === 'upload') {
        const url = node.value?.url || ''
        const alt = node.value?.alt || ''
        return <img key={i} src={url} alt={alt} />
      }

      return null
    })
  }

  return null
}

function renderParagraph(node: any): React.ReactNode {
  return node.children?.map((child: any) => {
    if (child.type === 'text') {
      let text: React.ReactNode = child.text

      if (child.format === 1) text = <strong>{text}</strong> // bold
      if (child.format === 2) text = <em>{text}</em> // italic
      if (child.format === 8) text = <code>{text}</code> // inline code

      return text
    }

    if (child.type === 'link') {
      return (
        <a key={child.url} href={child.url} target={child.newTab ? '_blank' : undefined}>
          {child.children?.map((c: any) => c.text || '').join('')}
        </a>
      )
    }

    return null
  })
}

// Share button component
function ShareButton({ type, title }: { type: 'twitter' | 'linkedin' | 'copy'; title?: string }) {
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const handleShare = () => {
    let shareUrl = ''

    switch (type) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title || '')}`
        window.open(shareUrl, '_blank', 'width=550,height=420')
        break
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        window.open(shareUrl, '_blank', 'width=550,height=420')
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        alert('Link copied to clipboard!')
        break
    }
  }

  return (
    <button
      onClick={handleShare}
      className="p-2 rounded-lg bg-ink-5 hover:bg-ink-10 text-ink-60 hover:text-ink transition-colors"
      aria-label={`Share on ${type}`}
    >
      {type === 'twitter' && (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )}
      {type === 'linkedin' && (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      )}
      {type === 'copy' && (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
        </svg>
      )}
    </button>
  )
}
