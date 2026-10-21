'use client'

import { useRef, useState } from 'react'
import { trackEvent } from '@/lib/analytics/track-event'
import { DOOR_DOCUMENT_NAMES } from '@/lib/doors/options'
import type { Door } from '@/lib/waitlist/constants'
import { DOOR_STEPS } from './DoorFormFields'
import DoorFormStatus from './DoorFormStatus'
import DoorStepProgress from './DoorStepProgress'
import { GENERIC_ERROR, buildRequestBody, toErrorMessage, toSubmitState, type DoorResponse, type SubmitState } from './door-request'
import { useDoorSteps } from './useDoorSteps'

interface DoorFormProps {
  door: Door
  intro: string
  footnote?: string
}

const STEP_TITLES = DOOR_STEPS.map((s) => s.title)

export default function DoorForm({ door, intro, footnote }: DoorFormProps) {
  const [state, setState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)
  const hasStartedRef = useRef(false)
  const { step, isLastStep, isCurrentStepValid, goNext, goBack, registerStep } = useDoorSteps(DOOR_STEPS.length)
  const isSubmitting = state === 'submitting'

  const trackFirstInput = () => {
    if (hasStartedRef.current) return
    hasStartedRef.current = true
    trackEvent('doc_started', { door })
  }

  const sendDocRequest = async (form: HTMLFormElement) => {
    const body = buildRequestBody(door, new FormData(form))
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

  // Enter on an early step moves forward instead of submitting a half-filled form.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!isLastStep) goNext()
    else if (isCurrentStepValid()) void sendDocRequest(e.currentTarget)
  }

  if (state === 'verify_sent' || state === 'cooldown') return <DoorFormStatus notice={state} door={door} />

  return (
    <form className="cf-row wl-form" onSubmit={handleSubmit} onInput={trackFirstInput} noValidate>
      {step === 0 && <p className="cta-card-sub dr-intro">{intro}</p>}
      <DoorStepProgress step={step} titles={STEP_TITLES} />
      {DOOR_STEPS.map(({ title, Fields }, i) => (
        <fieldset key={title} ref={registerStep(i)} hidden={i !== step} className="dr-step">
          <Fields door={door} isDisabled={isSubmitting} />
        </fieldset>
      ))}
      <div className="dr-step-nav">
        {step > 0 && <button type="button" className="gb-btn gb-btn-ghost dr-back" onClick={goBack} disabled={isSubmitting}>← Back</button>}
        <button type="submit" className="gb-btn gb-btn-teal dr-next" disabled={isSubmitting}>
          {isLastStep ? (isSubmitting ? 'Sending…' : `Get my ${DOOR_DOCUMENT_NAMES[door]}`) : 'Next →'}
        </button>
      </div>
      {state === 'error' && <div className="cf-status err">{error ?? GENERIC_ERROR}</div>}
      {isLastStep && <p className="cf-micro"><b className="wl-req">*</b> required · Work email only · We email you a link to confirm before we start.</p>}
      {isLastStep && footnote && <p className="cf-micro">{footnote}</p>}
    </form>
  )
}
