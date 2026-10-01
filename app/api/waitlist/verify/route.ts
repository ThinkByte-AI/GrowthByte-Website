import { getPayloadClient } from '@/src/get-payload'
import { VERIFY_ISSUE_PAGE_PATH } from '@/lib/waitlist/constants'
import { buildMemberPageUrl } from '@/lib/waitlist/links'
import { verifyMember } from '@/lib/waitlist/verify'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const token = url.searchParams.get('token') ?? ''
  if (!token) return Response.redirect(`${url.origin}${VERIFY_ISSUE_PAGE_PATH}?reason=invalid`, 303)

  try {
    const payload = await getPayloadClient()
    const outcome = await verifyMember(payload, token, url.origin)
    if (outcome.status === 'verified') return Response.redirect(buildMemberPageUrl(url.origin, outcome.memberKey), 303)
    return Response.redirect(`${url.origin}${VERIFY_ISSUE_PAGE_PATH}?reason=${outcome.status}`, 303)
  } catch (err) {
    console.error('Waitlist verification failed:', err)
    return Response.redirect(`${url.origin}${VERIFY_ISSUE_PAGE_PATH}?reason=error`, 303)
  }
}
