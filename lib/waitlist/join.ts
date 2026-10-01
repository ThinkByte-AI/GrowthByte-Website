import type { Payload } from 'payload'
import { VERIFY_LINK_TTL_MS, WAITLIST_CAP, type WaitlistMember } from './constants'
import { agencyDomainOf, isDisposableEmail } from './email-domain'
import { buildVerifyEmail, buildWelcomeEmail } from './emails'
import { buildMemberPageUrl, buildReferralUrl } from './links'
import { countVerifiedMembers, createMember, findMemberWhere, updateMember } from './members'
import { sendWaitlistEmail } from './resend'
import { createVerifyToken } from './tokens'

export interface JoinInput {
  name: string
  email: string
  agencyName: string
  website?: string
  whatsapp?: string
  referralCode?: string
}

export type JoinOutcome =
  | { status: 'verify_sent' }
  | { status: 'already_in' }
  | { status: 'full' }
  | { status: 'agency_taken' }
  | { status: 'rejected'; error: string }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateJoinInput(input: JoinInput): string | null {
  if (!input.name) return 'Enter your name.'
  if (!EMAIL_RE.test(input.email)) return 'Enter a valid email address.'
  if (isDisposableEmail(input.email)) return 'Please use your work email — temporary inboxes cannot join.'
  if (!input.agencyName) return 'Enter your agency name.'
  return null
}

async function sendVerifyLink(payload: Payload, member: WaitlistMember, origin: string): Promise<void> {
  const { token, tokenHash } = createVerifyToken()
  const verifyExpiresAt = new Date(Date.now() + VERIFY_LINK_TTL_MS).toISOString()
  await updateMember(payload, member.id, { verifyTokenHash: tokenHash, verifyExpiresAt })
  const verifyUrl = `${origin}/api/waitlist/verify?token=${encodeURIComponent(token)}`
  await sendWaitlistEmail(buildVerifyEmail(member.email, member.name ?? '', verifyUrl))
}

async function resendWelcome(member: WaitlistMember, origin: string): Promise<void> {
  if (!member.position || !member.referralCode || !member.memberKey) return
  await sendWaitlistEmail(
    buildWelcomeEmail({
      to: member.email,
      name: member.name,
      position: member.position,
      referralUrl: buildReferralUrl(origin, member.referralCode),
      memberPageUrl: buildMemberPageUrl(origin, member.memberKey),
    }),
  )
}

// Only verified holders block, so an unverified sign-up can never lock the real agency owner out.
async function isAgencyDomainTaken(payload: Payload, email: string): Promise<boolean> {
  const agencyDomain = agencyDomainOf(email)
  if (!agencyDomain) return false
  return (await findMemberWhere(payload, { agencyDomain: { equals: agencyDomain }, verified: { equals: true } })) !== null
}

async function resolveReferrerId(payload: Payload, referralCode?: string): Promise<string | undefined> {
  if (!referralCode) return undefined
  const referrer = await findMemberWhere(payload, { referralCode: { equals: referralCode }, verified: { equals: true } })
  return referrer?.id
}

export async function joinWaitlist(payload: Payload, input: JoinInput, origin: string): Promise<JoinOutcome> {
  const error = validateJoinInput(input)
  if (error) return { status: 'rejected', error }

  const existing = await findMemberWhere(payload, { email: { equals: input.email } })
  if (existing?.verified) {
    await resendWelcome(existing, origin)
    return { status: 'already_in' }
  }
  if (await isAgencyDomainTaken(payload, input.email)) return { status: 'agency_taken' }
  if ((await countVerifiedMembers(payload)) >= WAITLIST_CAP) return { status: 'full' }

  const details = { name: input.name, agencyName: input.agencyName, website: input.website, whatsapp: input.whatsapp }
  const member = existing
    ? await updateMember(payload, existing.id, details)
    : await createMember(payload, {
        email: input.email,
        ...details,
        referredBy: await resolveReferrerId(payload, input.referralCode),
      })
  await sendVerifyLink(payload, member, origin)
  return { status: 'verify_sent' }
}
