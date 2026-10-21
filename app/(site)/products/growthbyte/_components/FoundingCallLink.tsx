'use client'

import { trackEvent } from '@/lib/analytics/track-event'

interface FoundingCallLinkProps {
  href: string
  placement: string
  className: string
}

// Until the Cal.com link is set in the admin this points at /contact, so it opens in the same tab.
export default function FoundingCallLink({ href, placement, className }: FoundingCallLinkProps) {
  const isExternal = href.startsWith('http')
  return (
    <a
      href={href}
      className={className}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={() => trackEvent('call_clicked', { placement })}
    >
      Book a 20-min founding call
    </a>
  )
}
