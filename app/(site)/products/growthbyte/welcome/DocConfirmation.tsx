import { DOOR_DOCUMENT_NAMES } from '@/lib/doors/options'
import type { DocRequest } from '@/lib/doors/types'
import type { WaitlistMember } from '@/lib/waitlist/constants'
import FoundingCallLink from '../_components/FoundingCallLink'
import ConfirmationEvents, { type ConfirmationEvent } from './ConfirmationEvents'
import ReferralShareCard from './ReferralShareCard'

interface DocConfirmationProps {
  request: DocRequest
  member: WaitlistMember | null
  origin: string
  callUrl: string
}

function buildConfirmationEvents(request: DocRequest, member: WaitlistMember | null): ConfirmationEvent[] {
  const events: ConfirmationEvent[] = [
    { name: 'email_verified', params: { door: request.door, position: member?.position ?? 0 } },
  ]
  if (request.referralCode) {
    events.push({ name: 'referral_join', params: { referrer_id: request.referralCode, door: request.door } })
  }
  if (request.wantsAgency) {
    events.push({ name: 'agency_interest', params: { business_domain: request.websiteDomain, country: request.country } })
  }
  return events
}

export default function DocConfirmation({ request, member, origin, callUrl }: DocConfirmationProps) {
  return (
    <div className="wl-member">
      <ConfirmationEvents onceKey={request.confirmKey} events={buildConfirmationEvents(request, member)} />
      <h1>Done. <em>Your {DOOR_DOCUMENT_NAMES[request.door]} arrives within 24 hours.</em></h1>
      {member ? (
        <>
          <p className="hero-sub">You’re #{member.position} on the GrowthByte OS list.</p>
          <ReferralShareCard member={member} origin={origin} callUrl={callUrl} />
        </>
      ) : (
        <>
          <p className="hero-sub">Your company is already on the GrowthByte OS list. A colleague holds its place.</p>
          <FoundingCallLink href={callUrl} placement="confirmation" className="gb-btn gb-btn-white" />
        </>
      )}
    </div>
  )
}
