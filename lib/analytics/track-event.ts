// Event names from the GrowthByte OS landing-page tracking spec. GA4 (gtag) is loaded in app/(site)/layout.tsx.
export type TrackedEvent =
  | 'door_selected'
  | 'doc_started'
  | 'doc_submitted'
  | 'email_verified'
  | 'share_clicked'
  | 'call_clicked'
  | 'referral_join'
  | 'agency_interest'

export type EventParams = Record<string, string | number | boolean>

type Gtag = (command: 'event', name: string, params: EventParams) => void

export function trackEvent(name: TrackedEvent, params: EventParams = {}): void {
  if (typeof window === 'undefined') return
  const { gtag } = window as unknown as { gtag?: Gtag }
  gtag?.('event', name, params)
}
