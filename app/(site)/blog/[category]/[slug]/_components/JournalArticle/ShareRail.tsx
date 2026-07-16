'use client'

import { useState } from 'react'
import { XIcon, LinkedInIcon, LinkIcon, ShareIcon } from '@/components/journal'

export default function ShareRail({ title }: { title: string }) {
  const [copied, setCopied] = useState(false)

  const currentUrl = () => (typeof window === 'undefined' ? '' : window.location.href)

  const openShare = (build: (url: string) => string) => {
    const target = build(encodeURIComponent(currentUrl()))
    window.open(target, '_blank', 'noopener,noreferrer')
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl())
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  const encodedTitle = encodeURIComponent(title)

  return (
    <aside className="share-col">
      <div className="share">
        <div className="meta" style={{ fontFamily: 'var(--gb-font-mono)', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', writingMode: 'vertical-rl', transform: 'rotate(180deg)', marginBottom: 8, height: 64 }}>
          {copied ? 'Copied' : 'Share'}
        </div>
        <button className="share-btn" onClick={() => openShare((u) => `https://twitter.com/intent/tweet?url=${u}&text=${encodedTitle}`)} aria-label="Share on X">
          <XIcon />
        </button>
        <button className="share-btn" onClick={() => openShare((u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}`)} aria-label="Share on LinkedIn">
          <LinkedInIcon />
        </button>
        <button className="share-btn" onClick={copyLink} aria-label="Copy link">
          {copied ? <ShareIcon /> : <LinkIcon />}
        </button>
      </div>
    </aside>
  )
}
