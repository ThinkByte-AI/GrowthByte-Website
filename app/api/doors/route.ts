import { cookies, headers } from 'next/headers'
import { getPayloadClient } from '@/src/get-payload'
import { hashIp } from '@/lib/doors/guardrails'
import { readDocRequestInput } from '@/lib/doors/input'
import { submitDocRequest } from '@/lib/doors/submit'
import { REFERRAL_COOKIE } from '@/lib/waitlist/constants'

export const runtime = 'nodejs'

// Vercel puts the client first in x-forwarded-for; anything after it is proxies.
async function readClientIp(): Promise<string> {
  const headerList = await headers()
  return headerList.get('x-forwarded-for')?.split(',')[0]?.trim() || headerList.get('x-real-ip') || 'unknown'
}

export async function POST(request: Request) {
  const input = readDocRequestInput(await request.json().catch(() => null))
  if (!input) return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 })

  try {
    const payload = await getPayloadClient()
    const outcome = await submitDocRequest(payload, input, {
      ipHash: hashIp(await readClientIp()),
      referralCode: (await cookies()).get(REFERRAL_COOKIE)?.value || undefined,
      origin: new URL(request.url).origin,
    })
    if (outcome.status === 'rejected') return Response.json({ ok: false, error: outcome.error }, { status: 400 })
    if (outcome.status === 'cooldown') return Response.json({ ok: false, status: outcome.status }, { status: 409 })
    if (outcome.status === 'rate_limited') return Response.json({ ok: false, status: outcome.status }, { status: 429 })
    return Response.json({ ok: true, status: outcome.status })
  } catch (err) {
    console.error('Document request failed:', err)
    return Response.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
