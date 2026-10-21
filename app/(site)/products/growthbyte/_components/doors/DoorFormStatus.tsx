import type { Door } from '@/lib/waitlist/constants'
import { DOOR_DOCUMENT_NAMES } from '@/lib/doors/options'

export type DoorNotice = 'verify_sent' | 'cooldown'

function describeNotice(notice: DoorNotice, door: Door): { title: string; body: string } {
  const documentName = DOOR_DOCUMENT_NAMES[door]
  if (notice === 'cooldown') {
    return {
      title: 'This website already has a document on the way',
      body: `We make one document per website every 7 days. If it was you, check your inbox — otherwise book a call and we will look at it together.`,
    }
  }
  return {
    title: 'Check your inbox',
    body: `We sent you a link. Click “Confirm my email” and we start your ${documentName} — it arrives within 24 hours. The link expires in 48 hours.`,
  }
}

export default function DoorFormStatus({ notice, door }: { notice: DoorNotice; door: Door }) {
  const { title, body } = describeNotice(notice, door)
  return (
    <div className="wl-status" role="status">
      <div className="wl-status-t">{title}</div>
      <p className="wl-status-b">{body}</p>
    </div>
  )
}
