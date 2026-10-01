import { getPayloadClient } from '@/src/get-payload'
import { buildWaitlistCsv } from '@/lib/waitlist/export'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Admin-only: the Payload session cookie must belong to a logged-in CMS user.
export async function GET(request: Request) {
  try {
    const payload = await getPayloadClient()
    const { user } = await payload.auth({ headers: request.headers })
    if (!user) return Response.json({ ok: false, error: 'Log in to the admin to export.' }, { status: 401 })

    const csv = await buildWaitlistCsv(payload)
    const filename = `growthbyte-waitlist-${new Date().toISOString().slice(0, 10)}.csv`
    return new Response(`﻿${csv}`, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('Waitlist export failed:', err)
    return Response.json({ ok: false, error: 'Export failed.' }, { status: 500 })
  }
}
