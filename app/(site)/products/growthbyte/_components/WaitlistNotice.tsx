import Link from 'next/link'
import { DOORS_ANCHOR, WAITLIST_PAGE_PATH } from '@/lib/waitlist/constants'

interface WaitlistNoticeProps {
  title: string
  body: string
  showJoinLink?: boolean
}

export default function WaitlistNotice({ title, body, showJoinLink = true }: WaitlistNoticeProps) {
  return (
    <div className="wl-member">
      <h1>{title}</h1>
      <p className="hero-sub">{body}</p>
      {showJoinLink && (
        <Link href={`${WAITLIST_PAGE_PATH}#${DOORS_ANCHOR}`} className="gb-btn gb-btn-white">
          Back to GrowthByte OS
        </Link>
      )}
    </div>
  )
}
