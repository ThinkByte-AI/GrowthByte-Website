'use client'

import { useState } from 'react'

export default function CopyLinkButton({ value }: { value: string }) {
  const [hasCopied, setHasCopied] = useState(false)

  const copyReferralLink = async () => {
    try {
      await navigator.clipboard.writeText(value)
      setHasCopied(true)
    } catch {
      setHasCopied(false)
    }
  }

  return (
    <button type="button" className="gb-btn gb-btn-ghost wl-copy" onClick={copyReferralLink}>
      {hasCopied ? 'Copied ✓' : 'Copy'}
    </button>
  )
}
