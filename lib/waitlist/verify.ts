import type { Payload } from 'payload'
import { resolveAgencyIdentity } from './agency-identity'
import { REFERRAL_REWARD_THRESHOLD, type WaitlistMember } from './constants'
import { isSameAgencyDomain } from './email-domain'
import { buildReferralJoinedEmail, buildRewardReachedEmail, buildWelcomeEmail } from './emails'
import { buildMemberPageUrl, buildReferralUrl } from './links'
import { claimNextPosition, consumeVerifyToken, findMemberWhere, incrementReferralCount, updateMember } from './members'
import { sendWaitlistEmail } from './resend'
import { createMemberKey, createReferralCode, hashVerifyToken } from './tokens'

export type VerifyOutcome =
  | { status: 'verified'; memberKey: string }
  | { status: 'invalid' }
  | { status: 'expired' }
  | { status: 'full' }
  | { status: 'agency_taken' }

async function createUniqueReferralCode(payload: Payload, agencyName: string): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = createReferralCode(agencyName)
    if (!(await findMemberWhere(payload, { referralCode: { equals: code } }))) return code
  }
  throw new Error(`Could not find a free referral code for "${agencyName}" after 5 attempts`)
}

async function creditReferrer(payload: Payload, member: WaitlistMember, origin: string): Promise<void> {
  const referrerId = typeof member.referredBy === 'string' ? member.referredBy : member.referredBy?.id
  if (!referrerId) return
  const referrer = await findMemberWhere(payload, { id: { equals: referrerId } })
  if (!referrer?.memberKey || isSameAgencyDomain(referrer.email, member.email)) return

  const updated = await incrementReferralCount(payload, referrerId)
  if (!updated?.referralCount) return
  const memberPageUrl = buildMemberPageUrl(origin, referrer.memberKey)
  if (updated.referralCount === REFERRAL_REWARD_THRESHOLD && (updated.reward ?? 'none') === 'none') {
    await updateMember(payload, referrerId, { reward: '3_months' })
    await sendWaitlistEmail(buildRewardReachedEmail(referrer.email, memberPageUrl))
    return
  }
  await sendWaitlistEmail(
    buildReferralJoinedEmail({
      to: referrer.email,
      joinedAgency: member.agencyName || 'An agency',
      referralCount: updated.referralCount,
      memberPageUrl,
    }),
  )
}

async function sendFollowUps(payload: Payload, member: WaitlistMember, origin: string): Promise<void> {
  const results = await Promise.allSettled([
    creditReferrer(payload, member, origin),
    sendWaitlistEmail(
      buildWelcomeEmail({
        to: member.email,
        name: member.name,
        position: member.position ?? 0,
        referralUrl: buildReferralUrl(origin, member.referralCode ?? ''),
        memberPageUrl: buildMemberPageUrl(origin, member.memberKey ?? ''),
      }),
    ),
  ])
  // The member is already verified; a failed email must not undo that, but it must be visible in logs.
  for (const result of results) {
    if (result.status === 'rejected') console.error(`Waitlist follow-up failed for ${member.email}:`, result.reason)
  }
}

export async function verifyMember(payload: Payload, token: string, origin: string): Promise<VerifyOutcome> {
  const claimed = await consumeVerifyToken(payload, hashVerifyToken(token))
  if (!claimed) return { status: 'invalid' }
  if (!claimed.verifyExpiresAt || new Date(claimed.verifyExpiresAt).getTime() < Date.now()) return { status: 'expired' }

  const identity = await resolveAgencyIdentity(payload, claimed)
  if (identity.isDomainTaken) return { status: 'agency_taken' }

  const position = await claimNextPosition(payload)
  if (position === null) return { status: 'full' }

  const verified = await updateMember(payload, claimed.id, {
    verified: true,
    position,
    agencyDomain: identity.agencyDomain,
    agencyKey: identity.agencyKey,
    possibleDuplicate: identity.isPossibleDuplicate,
    referralCode: await createUniqueReferralCode(payload, claimed.agencyName ?? ''),
    memberKey: createMemberKey(),
    referralCount: claimed.referralCount ?? 0,
  })
  await sendFollowUps(payload, verified, origin)
  return { status: 'verified', memberKey: verified.memberKey ?? '' }
}
