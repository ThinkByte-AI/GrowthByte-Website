import { REFERRAL_COOKIE, REFERRAL_COOKIE_MAX_AGE_S, WAITLIST_PAGE_PATH } from '@/lib/waitlist/constants'

export const runtime = 'nodejs'

// The link only remembers who shared it; the referral is credited later, when the new member verifies.
export async function GET(request: Request, { params }: { params: Promise<{ code: string }> }) {
  const { code } = await params
  const origin = new URL(request.url).origin
  const headers = new Headers({ Location: `${origin}${WAITLIST_PAGE_PATH}#waitlist` })
  const safeCode = code.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 20)
  if (safeCode) {
    headers.append(
      'Set-Cookie',
      `${REFERRAL_COOKIE}=${safeCode}; Path=/; Max-Age=${REFERRAL_COOKIE_MAX_AGE_S}; SameSite=Lax; HttpOnly; Secure`,
    )
  }
  return new Response(null, { status: 307, headers })
}
