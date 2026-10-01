import Link from 'next/link'
import { WAITLIST_PAGE_PATH } from '@/lib/waitlist/constants'

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
        <Link href={`${WAITLIST_PAGE_PATH}#waitlist`} className="gb-btn gb-btn-white">
          Back to the waitlist
        </Link>
      )}
    </div>
  )
}
