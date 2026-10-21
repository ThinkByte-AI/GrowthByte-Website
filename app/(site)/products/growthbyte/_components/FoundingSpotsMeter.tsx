import { FOUNDING_SLOTS } from '@/lib/waitlist/constants'

// Driven by claimed slots (ticked by the team at onboarding), never by sign-ups.
export default function FoundingSpotsMeter({ claimedCount }: { claimedCount: number }) {
  const taken = Math.min(claimedCount, FOUNDING_SLOTS)
  return (
    <div className="wl-slots" aria-label={`${taken} of ${FOUNDING_SLOTS} founding slots claimed`}>
      <div className="wl-slots-head">
        <div>
          <div className="wl-slots-title">{FOUNDING_SLOTS} founding agencies</div>
          <div className="wl-slots-sub">Offers go out when workspaces open · in list order</div>
        </div>
        <div className="wl-slots-count">
          <span className="wl-slots-left">{FOUNDING_SLOTS - taken}</span>
          <span className="wl-slots-lbl">left</span>
        </div>
      </div>
      <div className="wl-meter-grid" aria-hidden="true">
        {Array.from({ length: FOUNDING_SLOTS }, (_, i) => (
          <i key={i} className={i < taken ? 'on' : undefined} />
        ))}
      </div>
    </div>
  )
}
