'use client'

import { useMemo, useState } from 'react'

import type { SubmitState } from './types'
import { submitContact } from './submitContact'
import TextField from './TextField'
import SelectField from './SelectField'
import TextareaField from './TextareaField'
import StatusMessage from './StatusMessage'
import { INDUSTRY_OPTIONS, REVENUE_OPTIONS } from './fieldOptions'

const resolveButtonLabel = (state: SubmitState) => {
  if (state === 'submitting') return 'Sending...'
  if (state === 'success') return 'Request sent'
  return 'Request Strategy Call'
}

export function ContactForm() {
  const [state, setState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)
  const isSubmitting = state === 'submitting'
  const buttonLabel = useMemo(() => resolveButtonLabel(state), [state])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setState('submitting')

    const form = e.currentTarget
    const result = await submitContact(form)
    if (!result.ok) {
      setState('error')
      setError(result.error || null)
      return
    }
    setState('success')
    form.reset()
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid sm:grid-cols-2 gap-4">
        <TextField id="name" name="name" label="Full name" required placeholder="Your name" disabled={isSubmitting} />
        <TextField id="email" name="email" type="email" label="Work email" required placeholder="you@company.com" disabled={isSubmitting} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <TextField id="company" name="company" label="Company" placeholder="Company name" disabled={isSubmitting} />
        <SelectField id="revenue" name="revenue" label="Annual revenue" placeholder="Select range" options={REVENUE_OPTIONS} disabled={isSubmitting} />
      </div>

      <TextField id="phone" name="phone" type="tel" label="Contact number(Optional)" placeholder="+91 9876543210" disabled={isSubmitting} />

      <SelectField id="industry" name="industry" label="Industry" placeholder="Select industry" options={INDUSTRY_OPTIONS} disabled={isSubmitting} />

      <TextareaField
        id="message"
        name="message"
        label="What is your biggest growth challenge right now?"
        required
        placeholder="Where are you stuck? What have you tried? What does success look like in 12 months?"
        disabled={isSubmitting}
      />

      <StatusMessage state={state} errorText={error} />

      <button type="submit" className="btn-primary w-full btn-lg" disabled={isSubmitting}>
        {buttonLabel}
      </button>

      <p className="text-xs text-ink-40 text-center leading-relaxed">
        We respond within 24 hours. No spam. No pitch decks. Just a real conversation.
      </p>
    </form>
  )
}
