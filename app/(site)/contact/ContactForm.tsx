'use client'

import { useMemo, useState } from 'react'

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [state, setState] = useState<SubmitState>('idle')
  const [error, setError] = useState<string | null>(null)

  const isSubmitting = state === 'submitting'

  const buttonLabel = useMemo(() => {
    if (state === 'submitting') return 'Sending...'
    if (state === 'success') return 'Request sent'
    return 'Request Strategy Call'
  }, [state])

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setState('submitting')

    const form = e.currentTarget
    const fd = new FormData(form)

    const payload = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      phone: String(fd.get('phone') ?? '').trim(),
      company: String(fd.get('company') ?? '').trim(),
      revenue: String(fd.get('revenue') ?? '').trim(),
      industry: String(fd.get('industry') ?? '').trim(),
      message: String(fd.get('message') ?? '').trim(),
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null

      if (!res.ok || !data?.ok) {
        setState('error')
        setError(data?.error || 'Something went wrong. Please try again.')
        return
      }

      setState('success')
      form.reset()
    } catch (err) {
      setState('error')
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-ink mb-2">
            Full name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-4 py-3 border border-surface-border rounded-lg text-ink bg-surface placeholder-ink-20 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm"
            placeholder="Your name"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink mb-2">
            Work email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-3 border border-surface-border rounded-lg text-ink bg-surface placeholder-ink-20 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm"
            placeholder="you@company.com"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="company" className="block text-sm font-semibold text-ink mb-2">
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            className="w-full px-4 py-3 border border-surface-border rounded-lg text-ink bg-surface placeholder-ink-20 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm"
            placeholder="Company name"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="revenue" className="block text-sm font-semibold text-ink mb-2">
            Annual revenue
          </label>
          <select
            id="revenue"
            name="revenue"
            className="w-full px-4 py-3 border border-surface-border rounded-lg text-ink bg-surface focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm"
            disabled={isSubmitting}
          >
            <option value="">Select range</option>
            <option value="under-5cr">Under ₹5Cr</option>
            <option value="5-20cr">₹5Cr – ₹20Cr</option>
            <option value="20-50cr">₹20Cr – ₹50Cr</option>
            <option value="50-100cr">₹50Cr – ₹100Cr</option>
            <option value="over-100cr">Over ₹100Cr</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-semibold text-ink mb-2">
          Contact number(Optional)
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          className="w-full px-4 py-3 border border-surface-border rounded-lg text-ink bg-surface placeholder-ink-20 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm"
          placeholder="+91 9876543210"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label htmlFor="industry" className="block text-sm font-semibold text-ink mb-2">
          Industry
        </label>
        <select
          id="industry"
          name="industry"
          className="w-full px-4 py-3 border border-surface-border rounded-lg text-ink bg-surface focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm"
          disabled={isSubmitting}
        >
          <option value="">Select industry</option>
          <option value="saas">SaaS</option>
          <option value="d2c">D2C / E-Commerce</option>
          <option value="healthcare">Healthcare</option>
          <option value="fintech">FinTech</option>
          <option value="professional-services">Professional Services</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-semibold text-ink mb-2">
          What is your biggest growth challenge right now? *
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className="w-full px-4 py-3 border border-surface-border rounded-lg text-ink bg-surface placeholder-ink-20 focus:border-teal focus:ring-1 focus:ring-teal outline-none transition-all text-sm resize-none"
          placeholder="Where are you stuck? What have you tried? What does success look like in 12 months?"
          disabled={isSubmitting}
        />
      </div>

      {state === 'success' ? (
        <div className="rounded-lg border border-teal/20 bg-teal/5 px-4 py-3 text-sm text-ink">
          Thanks — we’ve received your request. We’ll respond within 24 hours.
        </div>
      ) : null}

      {state === 'error' ? (
        <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-ink">
          {error || 'Something went wrong. Please try again.'}
        </div>
      ) : null}

      <button type="submit" className="btn-primary w-full btn-lg" disabled={isSubmitting}>
        {buttonLabel}
      </button>

      <p className="text-xs text-ink-40 text-center leading-relaxed">
        We respond within 24 hours. No spam. No pitch decks. Just a real conversation.
      </p>
    </form>
  )
}

