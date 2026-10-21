'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics/track-event'

export default function CopyLinkButton({ value }: { value: string }) {
  const [hasCopied, setHasCopied] = useState(false)

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setHasCopied(true)
      trackEvent('share_clicked', { channel: 'copy' })
    } catch {
      setHasCopied(false)
    }
  }

  return (
    <button type="button" className="gb-btn gb-btn-ghost wl-copy" onClick={copyReferralLink}>
      {hasCopied ? 'Copied ✓' : 'Copy link'}
    </button>
  )
}
