'use client'

import { useState } from 'react'
import { trackEvent } from '@/lib/analytics/track-event'
import type { Door } from '@/lib/waitlist/constants'
import DoorForm from './DoorForm'

const DOORS: { door: Door; tab: string; heading: string; sub: string; footnote?: string }[] = [
  {
    door: 'agency',
    tab: 'I run an agency',
    heading: 'Get a Growth Proposal for one of your clients.',
    sub: 'Enter a client’s website and goal. GrowthByte OS builds their plan and sends you a proposal you can put your name on — in 24 hours.',
  },
  {
    door: 'business',
    tab: 'I run a business',
    heading: 'See what’s holding your growth back.',
    sub: 'Enter your website and goal. You get a Growth Strategy showing the gaps and what to fix first — in 24 hours.',
    footnote: 'Already work with an agency? Send them the strategy when it arrives.',
  },
]

export default function DoorPicker() {
  const [activeDoor, setActiveDoor] = useState<Door>('agency')
  const active = DOORS.find((d) => d.door === activeDoor) ?? DOORS[0]

  const openDoor = (door: Door) => {
    if (door === activeDoor) return
    setActiveDoor(door)
    trackEvent('door_selected', { door })
  }

  return (
    <div>
      <div className="dr-tabs" role="tablist" aria-label="Who are you?">
        {DOORS.map(({ door, tab }) => (
          <button
            key={door}
            type="button"
            role="tab"
            aria-selected={door === activeDoor}
            className={door === activeDoor ? 'dr-tab on' : 'dr-tab'}
            onClick={() => openDoor(door)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div role="tabpanel">
        <div className="cta-card-h">{active.heading}</div>
        <p className="cta-card-sub">{active.sub}</p>
        <DoorForm key={active.door} door={active.door} />
        {active.footnote && <p className="cf-micro dr-footnote">{active.footnote}</p>}
      </div>
    </div>
  )
}
