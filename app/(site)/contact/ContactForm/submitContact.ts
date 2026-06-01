import type { ContactSubmission } from './types'

interface SubmitResult {
  ok: boolean
  error?: string
}

const extractFormData = (form: HTMLFormElement): ContactSubmission => {
  const fd = new FormData(form)
  const get = (key: string) => String(fd.get(key) ?? '').trim()
  return {
    name: get('name'),
    email: get('email'),
    phone: get('phone'),
    company: get('company'),
    revenue: get('revenue'),
    industry: get('industry'),
    message: get('message'),
  }
}

export const submitContact = async (form: HTMLFormElement): Promise<SubmitResult> => {
  const submission = extractFormData(form)
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission),
    })
    const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null
    if (!res.ok || !data?.ok) {
      return { ok: false, error: data?.error || 'Something went wrong. Please try again.' }
    }
    return { ok: true }
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Something went wrong. Please try again.',
    }
  }
}
