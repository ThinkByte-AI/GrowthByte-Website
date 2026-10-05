'use client'

import { useState } from 'react'
import WaitlistField from './WaitlistField'
import WaitlistFormStatus, { type SubmitState } from './WaitlistFormStatus'

interface WaitlistFormProps {
  isFull: boolean
}

interface JoinResponse {
  ok?: boolean
  status?: string
  error?: string
}

const readField = (data: FormData, name: string): string => String(data.get(name) ?? '').trim()

function toSubmitState(res: Response, data: JoinResponse | null): SubmitState {
  if (data?.status === 'full' || data?.status === 'agency_taken') return data.status
  if (!res.ok || !data?.ok) return 'error'
  return data.status === 'already_in' ? 'already_in' : 'verify_sent'
}

export default function WaitlistForm({ isFull }: WaitlistFormProps) {
  const [state, setState] = useState<SubmitState>(isFull ? 'full' : 'idle')
  const [error, setError] = useState<string | null>(null)
  const isSubmitting = state === 'submitting'

  const submitJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    setState('submitting')
    setError(null)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: readField(data, 'name'),
          email: readField(data, 'email'),
          agencyName: readField(data, 'agencyName'),
          website: readField(data, 'website'),
          whatsapp: readField(data, 'whatsapp'),
        }),
      })
      const body = (await res.json().catch(() => null)) as JoinResponse | null
      setState(toSubmitState(res, body))
      setError(body?.error ?? null)
    } catch {
      setState('error')
      setError('Something went wrong. Please try again.')
    }
  }

  if (state === 'full' || state === 'verify_sent' || state === 'already_in' || state === 'agency_taken') {
    return <WaitlistFormStatus state={state} />
  }

  return (
    <form className="cf-row wl-form" onSubmit={submitJoin}>
      <div className="wl-form-grid">
        <WaitlistField name="name" label="Your name" placeholder="Full name" isRequired isDisabled={isSubmitting} />
        <WaitlistField name="agencyName" label="Agency name" placeholder="Your agency" isRequired isDisabled={isSubmitting} />
      </div>
      <WaitlistField name="email" label="Work email" placeholder="you@agency.com" type="email" isRequired isDisabled={isSubmitting} />
      <details className="wl-optional">
        <summary>+ Add website &amp; WhatsApp (optional)</summary>
        <div className="wl-form-grid">
          <WaitlistField name="website" label="Website" placeholder="agency.com" isDisabled={isSubmitting} />
          <WaitlistField name="whatsapp" label="WhatsApp for updates" placeholder="+91 98765 43210" type="tel" isDisabled={isSubmitting} />
        </div>
      </details>
      <button type="submit" className="gb-btn gb-btn-teal" disabled={isSubmitting} style={{ justifyContent: 'center' }}>
        {isSubmitting ? 'Joining…' : 'Claim my founding slot'}
      </button>
      {state === 'error' && <div className="cf-status err">{error ?? 'Something went wrong. Please try again.'}</div>}
      <p className="cf-micro"><b className="wl-req">*</b> required · No card, no password · We only message you about early access.</p>
    </form>
  )
}
