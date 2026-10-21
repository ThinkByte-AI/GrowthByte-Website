import { getPayloadClient } from '@/src/get-payload'
import { verifyDocRequest } from '@/lib/doors/verify'
import { VERIFY_ISSUE_PAGE_PATH, WELCOME_PAGE_PATH } from '@/lib/waitlist/constants'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token') ?? ''
  if (!token) return Response.redirect(`${url.origin}${VERIFY_ISSUE_PAGE_PATH}?reason=invalid`, 303)

  try {
    const outcome = await verifyDocRequest(await getPayloadClient(), token, url.origin)
    if (outcome.status === 'verified') {
      return Response.redirect(`${url.origin}${WELCOME_PAGE_PATH}?r=${encodeURIComponent(outcome.confirmKey)}`, 303)
    }
    return Response.redirect(`${url.origin}${VERIFY_ISSUE_PAGE_PATH}?reason=${outcome.status}`, 303)
  } catch (err) {
    console.error('Document request verification failed:', err)
    return Response.redirect(`${url.origin}${VERIFY_ISSUE_PAGE_PATH}?reason=error`, 303)
  }
}
