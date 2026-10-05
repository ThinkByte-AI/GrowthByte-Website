import { FOUNDING_OFFER_DATE, WAITLIST_CAP } from '@/lib/waitlist/constants'

// Sits at the top of the form card, so the scarcity and the sign-up read as one thing.
export default function FoundingSpotsMeter({ memberCount }: { memberCount: number }) {
  const taken = Math.min(memberCount, WAITLIST_CAP)
  return (
    <div className="wl-slots" aria-label={`${taken} of ${WAITLIST_CAP} founding slots taken`}>
      <div className="wl-slots-head">
        <div>
          <div className="wl-slots-title">Claim 1 of {WAITLIST_CAP} founding slots</div>
          <div className="wl-slots-sub">One per agency · first come, first served · offers out {FOUNDING_OFFER_DATE}</div>
        </div>
        <div className="wl-slots-count">
          <span className="wl-slots-left">{WAITLIST_CAP - taken}</span>
          <span className="wl-slots-lbl">left</span>
        </div>
      </div>
      <div className="wl-meter-grid" aria-hidden="true">
        {Array.from({ length: WAITLIST_CAP }, (_, i) => (
          <i key={i} className={i < taken ? 'on' : undefined} />
        ))}
      </div>
    </div>
  )
}
