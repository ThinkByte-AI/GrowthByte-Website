import { FOUNDING_SLOTS } from '@/lib/waitlist/constants'

// Driven by claimed slots (ticked by the team at onboarding), never by sign-ups.
export default function FoundingSpotsMeter({ claimedCount }: { claimedCount: number }) {
  const taken = Math.min(claimedCount, FOUNDING_SLOTS)
  const left = FOUNDING_SLOTS - taken
  return (
    <div className="dr-slots" aria-label={`${left} of ${FOUNDING_SLOTS} founding slots left`}>
      <div className="dr-slots-row">
        <span className="dr-slots-title">{FOUNDING_SLOTS} founding agencies</span>
        <span className="dr-slots-left"><b>{left}</b> left</span>
      </div>
      <div className="dr-slots-bar" aria-hidden="true">
        <i style={{ width: `${(taken / FOUNDING_SLOTS) * 100}%` }} />
      </div>
    </div>
  )
}
