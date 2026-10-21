import type { Payload } from 'payload'
import { VERIFY_LINK_TTL_MS } from '@/lib/waitlist/constants'
import { sendWaitlistEmail } from '@/lib/waitlist/resend'
import { createMemberKey, createVerifyToken } from '@/lib/waitlist/tokens'
import { buildDocVerifyEmail } from './emails'
import { hasRecentDocForDomain, isIpOverLimit } from './guardrails'
import { createDocRequest } from './requests'
import type { DocRequestInput } from './types'
import { validateDocRequest } from './validate'
import { websiteDomainOf } from './website-domain'

export interface SubmitContext {
  ipHash: string
  referralCode?: string
  origin: string
}

export type DocSubmitOutcome =
  | { status: 'verify_sent' }
  | { status: 'cooldown' }
  | { status: 'rate_limited' }
  | { status: 'rejected'; error: string }

// Nothing is generated until the visitor clicks the emailed link; this only records the request.
export async function submitDocRequest(
  payload: Payload,
  input: DocRequestInput,
  context: SubmitContext,
): Promise<DocSubmitOutcome> {
  const error = validateDocRequest(input)
  const websiteDomain = websiteDomainOf(input.website)
  if (error || !websiteDomain) return { status: 'rejected', error: error ?? 'Enter the website.' }
  if (await isIpOverLimit(payload, context.ipHash)) return { status: 'rate_limited' }
  if (await hasRecentDocForDomain(payload, websiteDomain)) return { status: 'cooldown' }

  const { token, tokenHash } = createVerifyToken()
  await createDocRequest(payload, {
    ...input,
    channels: input.channels.join(','),
    websiteDomain,
    status: 'pending',
    source: input.utmSource ?? 'direct',
    referralCode: context.referralCode,
    ipHash: context.ipHash,
    confirmKey: createMemberKey(),
    verifyTokenHash: tokenHash,
    verifyExpiresAt: new Date(Date.now() + VERIFY_LINK_TTL_MS).toISOString(),
  })
  const verifyUrl = `${context.origin}/api/doors/verify?token=${encodeURIComponent(token)}`
  await sendWaitlistEmail(buildDocVerifyEmail({ to: input.email, name: input.name, door: input.door, verifyUrl }))
  return { status: 'verify_sent' }
}
