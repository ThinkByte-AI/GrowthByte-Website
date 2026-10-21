'use client'

import { useRef, useState } from 'react'
import { trackEvent } from '@/lib/analytics/track-event'
import { captureUtmParams } from '@/lib/analytics/utm'
import { DOOR_DOCUMENT_NAMES } from '@/lib/doors/options'
import type { DocRequestInput } from '@/lib/doors/types'
import type { Door } from '@/lib/waitlist/constants'
import DoorFormFields from './DoorFormFields'
import DoorFormStatus, { type DoorNotice } from './DoorFormStatus'

type SubmitState = 'idle' | 'submitting' | 'error' | DoorNotice

interface DoorResponse {
  ok?: boolean
  status?: string
  error?: string
}

const GENERIC_ERROR = 'Something went wrong. Please try again.'
const RATE_LIMIT_ERROR = 'Too many requests from this connection. Please try again in an hour.'

const readField = (data: FormData, name: string): string => String(data.get(name) ?? '').trim()

function buildRequestBody(door: Door, data: FormData): DocRequestInput {
  return {
    door,
    website: readField(data, 'website'),
    offer: readField(data, 'offer'),
    audience: readField(data, 'audience'),
    goal: readField(data, 'goal'),
    channels: data.getAll('channels').map(String),
    name: readField(data, 'name'),
    agencyName: readField(data, 'agencyName') || undefined,
    email: readField(data, 'email'),
    whatsapp: readField(data, 'whatsapp') || undefined,
    country: readField(data, 'country'),
    wantsAgency: data.get('wantsAgency') === 'on',
    ...captureUtmParams(),
  }
}

function toSubmitState(res: Response, body: DoorResponse | null): SubmitState {
  if (body?.status === 'cooldown') return 'cooldown'
  if (!res.ok || !body?.ok) return 'error'
  return 'verify_sent'
}

function toErrorMessage(body: DoorResponse | null): string {
  return body?.status === 'rate_limited' ? RATE_LIMIT_ERROR : body?.error ?? GENERIC_ERROR
}

export default function DoorForm({ door }: { door: Door }) {
  const [state, setState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)
  const hasStartedRef = useRef(false)
  const isSubmitting = state === 'submitting'

  const trackFirstInput = () => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true
    trackEvent('doc_started', { door })
  }

  const sendDocRequest = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const body = buildRequestBody(door, new FormData(e.currentTarget))
    setState('submitting')
    setError(null)
    try {
      const res = await fetch('/api/doors', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      const result = (await res.json().catch(() => null)) as DoorResponse | null
      const next = toSubmitState(res, result)
      setState(next)
      if (next === 'error') setError(toErrorMessage(result))
      if (next === 'verify_sent') {
        trackEvent('doc_submitted', { door, goal: body.goal, country: body.country, has_whatsapp: Boolean(body.whatsapp) })
      }
    } catch {
      setState('error')
      setError(GENERIC_ERROR)
    }
  }

  if (state === 'verify_sent' || state === 'cooldown') return <DoorFormStatus notice={state} door={door} />

  return (
    <form className="cf-row wl-form" onSubmit={sendDocRequest} onInput={trackFirstInput}>
      <DoorFormFields door={door} isDisabled={isSubmitting} />
      <button type="submit" className="gb-btn gb-btn-teal" disabled={isSubmitting} style={{ justifyContent: 'center' }}>
        {isSubmitting ? 'Sending…' : `Get my ${DOOR_DOCUMENT_NAMES[door]}`}
      </button>
      {state === 'error' && <div className="cf-status err">{error ?? GENERIC_ERROR}</div>}
      <p className="cf-micro"><b className="wl-req">*</b> required · Work email only · We email you a link to confirm before we start.</p>
    </form>
  )
}
