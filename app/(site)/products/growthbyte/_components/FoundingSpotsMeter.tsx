import { WAITLIST_CAP } from '@/lib/waitlist/constants'

export default function FoundingSpotsMeter({ memberCount }: { memberCount: number }) {
  const taken = Math.min(memberCount, WAITLIST_CAP)
  return (
    <div className="wl-meter" aria-label={`${taken} of ${WAITLIST_CAP} founding spots taken`}>
      <div className="wl-meter-head">
        <span className="wl-meter-num">{WAITLIST_CAP - taken}</span>
        <span className="wl-meter-lbl">of {WAITLIST_CAP} founding spots left</span>
      </div>
      <div className="wl-meter-grid" aria-hidden="true">
        {Array.from({ length: WAITLIST_CAP }, (_, i) => (
          <i key={i} className={i < taken ? 'on' : undefined} />
        ))}
      </div>
    </div>
  )
}
