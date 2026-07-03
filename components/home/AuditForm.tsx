'use client'

import { useState } from 'react'
import { CONTACT_INFO } from '@/lib/constants'
import { ArrowIcon, MailIcon, PhoneIcon } from './icons'

// Google Apps Script web app: appends to the GrowthByte-Homepage-Form sheet and
// emails harsha@growthbyte.ai. Opaque (no-cors) response, so we treat a resolved
// request as success and only surface network failures.
const APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbw0SryJLYJ3jxwGbInWH28K-3GKjYv54eUSs3W4XngYU9NHYzBE8vIeOOXliVUdyuGW/exec'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

const sendLead = (fields: Record<string, string>) =>
  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: new URLSearchParams({ ...fields, source: 'homepage-audit' }),
  })

interface AuditFormProps {
  heading?: string | null
  sub?: string | null
  submitLabel?: string | null
  secondaryLabel?: string | null
  micro?: string | null
}

const buttonLabel = (state: SubmitState, submitLabel: string) =>
  state === 'submitting' ? 'Sending…' : state === 'success' ? 'Request sent' : submitLabel

export default function AuditForm({ heading, sub, submitLabel, secondaryLabel, micro }: AuditFormProps) {
  const [fields, setFields] = useState({ name: '', email: '', company: '' })
  const [state, setState] = useState<SubmitState>('idle')

  const onChange = (key: keyof typeof fields) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields((prev) => ({ ...prev, [key]: e.target.value }))

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setState('submitting')
    try {
      await sendLead(fields)
      setState('success')
      setFields({ name: '', email: '', company: '' })
    } catch {
      setState('error')
    }
  }

  const busy = state === 'submitting' || state === 'success'

  return (
    <form className="cta-card" onSubmit={onSubmit}>
      <div className="cta-card-h">{heading}</div>
      <div className="cta-card-sub">{sub}</div>
      <div className="cf-row">
        <input className="cf-inp" type="text" placeholder="Your name" aria-label="Your name" required value={fields.name} onChange={onChange('name')} disabled={busy} />
        <input className="cf-inp" type="email" placeholder="Work email address" aria-label="Work email" required value={fields.email} onChange={onChange('email')} disabled={busy} />
        <input className="cf-inp" type="text" placeholder="Company name" aria-label="Company name" value={fields.company} onChange={onChange('company')} disabled={busy} />
      </div>
      <div className="cf-btns">
        <button type="submit" className="gb-btn gb-btn-teal" style={{ justifyContent: 'center' }} disabled={busy}>
          {buttonLabel(state, submitLabel ?? 'Book My Free Audit')} <ArrowIcon />
        </button>
        <a href="#cases" className="gb-btn gb-btn-dark" style={{ justifyContent: 'center' }}>{secondaryLabel}</a>
      </div>
      {state === 'success' && <p className="cf-status ok">Thanks — we’ll be in touch within 24 hours.</p>}
      {state === 'error' && <p className="cf-status err">Something went wrong. Please email us instead.</p>}
      <p className="cf-micro">{micro}</p>
      <div className="cf-contact">
        <a href={CONTACT_INFO.emailHref}><MailIcon />{CONTACT_INFO.email}</a>
        <a href={CONTACT_INFO.phoneHref}><PhoneIcon />{CONTACT_INFO.phone}</a>
      </div>
    </form>
  )
}
