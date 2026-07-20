'use client'

import { useState } from 'react'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

interface WaitlistFormProps {
  product?: string
  source?: string
}

const buttonLabel = (state: SubmitState): string => {
  if (state === 'submitting') return 'Joining…'
  if (state === 'success') return "You're on the list ✓"
  return 'Join the waitlist'
}

export default function WaitlistForm({ product = 'GrowthByte', source = 'growthbyte-waitlist' }: WaitlistFormProps) {
  const [state, setState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)
  const locked = state === 'submitting' || state === 'success'

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const email = String(new FormData(form).get('email') ?? '').trim()
    setState('submitting')
    setError(null)
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, product, source }),
      })
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
      if (!res.ok || !data?.ok) {
        setState('error')
        setError(data?.error ?? 'Something went wrong. Please try again.')
        return
      }
      setState('success')
      form.reset()
    } catch {
      setState('error')
      setError('Something went wrong. Please try again.')
    }
  }

  return (
    <form className="cf-row" onSubmit={onSubmit}>
      <input className="cf-inp" name="email" type="email" required placeholder="you@company.com" disabled={locked} aria-label="Work email" />
      <div className="cf-btns">
        <button type="submit" className="gb-btn gb-btn-teal" disabled={locked} style={{ justifyContent: 'center' }}>
          {buttonLabel(state)}
        </button>
      </div>
      {state === 'error' && <div className="cf-status err">{error}</div>}
      {state === 'success' && <div className="cf-status ok">Thanks — we&apos;ll email you when your spot opens.</div>}
      <p className="cf-micro">No spam. We only email about early access.</p>
    </form>
  )
}
