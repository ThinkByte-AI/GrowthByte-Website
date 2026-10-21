'use client'

import { useEffect } from 'react'
import { trackEvent, type EventParams, type TrackedEvent } from '@/lib/analytics/track-event'

export interface ConfirmationEvent {
  name: TrackedEvent
  params: EventParams
}

// The confirmation page can be reloaded or bookmarked; the per-request key keeps each event to one hit.
export default function ConfirmationEvents({ onceKey, events }: { onceKey: string; events: ConfirmationEvent[] }) {
  useEffect(() => {
    const storageKey = `gb_confirmed_${onceKey}`
    let isAlreadySent = false
    try {
      isAlreadySent = window.localStorage.getItem(storageKey) !== null
      window.localStorage.setItem(storageKey, '1')
    } catch {
      // Storage blocked (private mode): send anyway and accept a possible repeat on reload.
    }
    if (isAlreadySent) return
    for (const event of events) trackEvent(event.name, event.params)
  }, [onceKey, events])

  return null
}
