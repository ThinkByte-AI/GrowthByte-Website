'use client'

import { trackEvent } from '@/lib/analytics/track-event'
import { buildLinkedInShareUrl, buildWhatsAppShareUrl } from '@/lib/waitlist/links'

const SHARE_CHANNELS = [
  { channel: 'whatsapp', label: 'Share on WhatsApp', buildUrl: buildWhatsAppShareUrl },
  { channel: 'linkedin', label: 'Share on LinkedIn', buildUrl: buildLinkedInShareUrl },
]

export default function ShareButtons({ referralUrl }: { referralUrl: string }) {
  return (
    <>
      {SHARE_CHANNELS.map(({ channel, label, buildUrl }) => (
        <a
          key={channel}
          className="gb-btn gb-btn-teal"
          href={buildUrl(referralUrl)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent('share_clicked', { channel })}
        >
          {label}
        </a>
      ))}
    </>
  )
}
