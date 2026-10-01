import { cookies } from 'next/headers'
import { getPayloadClient } from '@/src/get-payload'
import { REFERRAL_COOKIE } from '@/lib/waitlist/constants'
import { joinWaitlist, type JoinInput } from '@/lib/waitlist/join'

export const runtime = 'nodejs'

type WaitlistBody = { name?: unknown; email?: unknown; agencyName?: unknown; website?: unknown; whatsapp?: unknown }

const cleanText = (value: unknown, maxLength: number): string =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

async function readJoinInput(request: Request): Promise<JoinInput | null> {
  const body = (await request.json().catch(() => null)) as WaitlistBody | null
  if (!body) return null
  const referralCode = (await cookies()).get(REFERRAL_COOKIE)?.value
  return {
    name: cleanText(body.name, 80),
    email: cleanText(body.email, 254).toLowerCase(),
    agencyName: cleanText(body.agencyName, 120),
    website: cleanText(body.website, 200) || undefined,
    whatsapp: cleanText(body.whatsapp, 30) || undefined,
    referralCode: referralCode || undefined,
  }
}

export async function POST(request: Request) {
  const input = await readJoinInput(request)
  if (!input) return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 })

  try {
    const payload = await getPayloadClient()
    const outcome = await joinWaitlist(payload, input, new URL(request.url).origin)
    if (outcome.status === 'rejected') return Response.json({ ok: false, error: outcome.error }, { status: 400 })
    if (outcome.status === 'full' || outcome.status === 'agency_taken') {
      return Response.json({ ok: false, status: outcome.status }, { status: 409 })
    }
    return Response.json({ ok: true, status: outcome.status })
  } catch (err) {
    console.error('Waitlist join failed:', err)
    return Response.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
