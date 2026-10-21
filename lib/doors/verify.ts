import type { Payload } from 'payload'
import type { WaitlistMember } from '@/lib/waitlist/constants'
import { enrollMember } from '@/lib/waitlist/enroll'
import { buildReferralUrl } from '@/lib/waitlist/links'
import { hashVerifyToken } from '@/lib/waitlist/tokens'
import { hasRecentDocForDomain } from './guardrails'
import { consumeDocVerifyToken, updateDocRequest } from './requests'
import { pushDocRequestToSheet } from './sheet'
import type { DocRequest } from './types'

export type DocVerifyOutcome =
  | { status: 'verified'; confirmKey: string }
  | { status: 'invalid' }
  | { status: 'expired' }
  | { status: 'cooldown' }

const isExpired = (request: DocRequest): boolean =>
  !request.verifyExpiresAt || new Date(request.verifyExpiresAt).getTime() < Date.now()

// The visitor is already confirmed when this runs, so a Sheet failure is recorded on the request
// (visible in the admin) instead of failing their confirmation.
async function queueInSheet(payload: Payload, request: DocRequest, member: WaitlistMember | null, origin: string) {
  try {
    const inviteUrl = member?.referralCode ? buildReferralUrl(origin, member.referralCode) : ''
    const sheetRow = await pushDocRequestToSheet({ request, member, inviteUrl })
    await updateDocRequest(payload, request.id, { sheetRow, sheetError: '' })
  } catch (err) {
    console.error(`Could not queue document request ${request.id} in the sheet:`, err)
    await updateDocRequest(payload, request.id, { sheetError: err instanceof Error ? err.message : String(err) })
  }
}

export async function verifyDocRequest(payload: Payload, token: string, origin: string): Promise<DocVerifyOutcome> {
  const request = await consumeDocVerifyToken(payload, hashVerifyToken(token))
  if (!request) return { status: 'invalid' }
  if (isExpired(request)) return { status: 'expired' }
  if (await hasRecentDocForDomain(payload, request.websiteDomain)) return { status: 'cooldown' }

  const { member } = await enrollMember(
    payload,
    {
      email: request.email,
      name: request.name,
      door: request.door,
      agencyName: request.agencyName,
      website: request.website,
      whatsapp: request.whatsapp,
      country: request.country,
      referralCode: request.referralCode,
    },
    origin,
  )
  const verified = await updateDocRequest(payload, request.id, {
    status: 'verified',
    verifiedAt: new Date().toISOString(),
    member: member?.id ?? null,
  })
  await queueInSheet(payload, verified, member, origin)
  return { status: 'verified', confirmKey: verified.confirmKey }
}
