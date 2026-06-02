export const runtime = 'nodejs'

const GOOGLE_APPS_SCRIPT_URL =
  'https://script.google.com/macros/s/AKfycbwoFhZRaQAMxbm3MSQQLbiSqB9WtQ5aAFo7fhtn-LFvX3FAXcXkzZ318-rAj4uSeLXO/exec'

type ContactSubmission = {
  name: string
  email: string
  phone?: string
  company?: string
  revenue?: string
  industry?: string
  message: string
}

export async function POST(request: Request) {
  let submission: ContactSubmission
  try {
    submission = (await request.json()) as ContactSubmission
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  if (!submission?.name || !submission?.email || !submission?.message) {
    return Response.json({ ok: false, error: 'Missing required fields' }, { status: 400 })
  }

  const body = new URLSearchParams()
  body.set('name', submission.name)
  body.set('email', submission.email)
  body.set('phone', submission.phone ?? '')
  body.set('company', submission.company ?? '')
  body.set('revenue', submission.revenue ?? '')
  body.set('industry', submission.industry ?? '')
  body.set('message', submission.message)

  try {
    const upstreamRes = await fetch(GOOGLE_APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body,
      // Avoid caching form submissions
      cache: 'no-store',
    })

    const text = await upstreamRes.text().catch(() => '')

    if (!upstreamRes.ok) {
      return Response.json(
        { ok: false, error: 'Upstream error', detail: text || upstreamRes.statusText },
        { status: 502 },
      )
    }

    return Response.json({ ok: true, upstream: text })
  } catch (err) {
    return Response.json(
      { ok: false, error: 'Failed to reach Apps Script', detail: err instanceof Error ? err.message : String(err) },
      { status: 502 },
    )
  }
}

