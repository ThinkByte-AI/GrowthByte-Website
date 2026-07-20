import { getPayloadClient } from '@/src/get-payload'

export const runtime = 'nodejs'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type WaitlistBody = { email?: string; name?: string; product?: string; source?: string }

export async function POST(request: Request) {
  let body: WaitlistBody
  try {
    body = (await request.json()) as WaitlistBody
  } catch {
    return Response.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  const email = (body.email ?? '').trim().toLowerCase()
  if (!EMAIL_RE.test(email)) {
    return Response.json({ ok: false, error: 'Enter a valid email address.' }, { status: 400 })
  }
  const product = (body.product ?? 'GrowthByte').trim()

  try {
    const payload = await getPayloadClient()
    const existing = await payload.find({
      collection: 'waitlist',
      where: { email: { equals: email }, product: { equals: product } },
      limit: 1,
      overrideAccess: true,
    })
    if (existing.docs.length === 0) {
      await payload.create({
        collection: 'waitlist',
        data: { email, name: body.name?.trim() || undefined, product, source: body.source?.trim() || 'waitlist' },
        overrideAccess: true,
      })
    }
    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
