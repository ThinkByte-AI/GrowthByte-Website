'use client'

import { TwitterIcon, LinkedInIcon, CopyIcon } from './ShareIcons'

type ShareType = 'twitter' | 'linkedin' | 'copy'

interface ShareBarProps {
  title?: string
}

const buildShareUrl = (type: ShareType, pageUrl: string, title: string): string | null => {
  if (type === 'twitter') {
    return `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`
  }
  if (type === 'linkedin') {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`
  }
  return null
}

const ShareButton = ({ type, title }: { type: ShareType; title: string }) => {
  const handleShare = () => {
    const pageUrl = typeof window !== 'undefined' ? window.location.href : ''

    if (type === 'copy') {
      navigator.clipboard.writeText(pageUrl)
      alert('Link copied to clipboard!')
      return
    }

    const shareUrl = buildShareUrl(type, pageUrl, title)
    if (shareUrl) window.open(shareUrl, '_blank', 'width=550,height=420')
  }

  return (
    <button
      onClick={handleShare}
      className="p-2 rounded-lg bg-ink-5 hover:bg-ink-10 text-ink-60 hover:text-ink transition-colors"
      aria-label={`Share on ${type}`}
    >
      {type === 'twitter' && <TwitterIcon />}
      {type === 'linkedin' && <LinkedInIcon />}
      {type === 'copy' && <CopyIcon />}
    </button>
  )
}

export default function ShareBar({ title }: ShareBarProps) {
  return (
    <div className="flex items-center gap-3 mb-8 pb-6 border-b border-ink-10">
      <span className="text-sm text-ink-50">Share:</span>
      <div className="flex gap-2">
        <ShareButton type="twitter" title={title || ''} />
        <ShareButton type="linkedin" title={title || ''} />
        <ShareButton type="copy" title={title || ''} />
      </div>
    </div>
  )
}
