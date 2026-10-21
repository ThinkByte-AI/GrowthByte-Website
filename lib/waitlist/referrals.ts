import type { Payload } from 'payload'
import { REFERRAL_REWARD_THRESHOLD, type WaitlistMember } from './constants'
import { isSameAgencyDomain } from './email-domain'
import { buildReferralJoinedEmail, buildRewardReachedEmail } from './emails'
import { buildMemberPageUrl } from './links'
import { findMemberWhere, incrementReferralCount, updateMember } from './members'
import { sendWaitlistEmail } from './resend'

export async function resolveReferrerId(payload: Payload, referralCode?: string): Promise<string | undefined> {
  if (!referralCode) return undefined
  const referrer = await findMemberWhere(payload, { referralCode: { equals: referralCode }, verified: { equals: true } })
  return referrer?.id
}

const referrerIdOf = (member: WaitlistMember): string | undefined =>
  typeof member.referredBy === 'string' ? member.referredBy : member.referredBy?.id

// Only agencies joining count: the reward is "3 agencies join from your link". Business owners who refer
// get priority on the agency-interest list instead of free months, so they never receive the reward.
export async function creditReferrer(payload: Payload, member: WaitlistMember, origin: string): Promise<void> {
  const referrerId = referrerIdOf(member)
  if (!referrerId || member.door !== 'agency') return
  const referrer = await findMemberWhere(payload, { id: { equals: referrerId } })
  if (!referrer?.memberKey || isSameAgencyDomain(referrer.email, member.email)) return

  const updated = await incrementReferralCount(payload, referrerId)
  if (!updated?.referralCount) return
  const memberPageUrl = buildMemberPageUrl(origin, referrer.memberKey)
  const isRewardEarned =
    referrer.door !== 'business' &&
    updated.referralCount === REFERRAL_REWARD_THRESHOLD &&
    (updated.reward ?? 'none') === 'none'
  if (isRewardEarned) {
    await updateMember(payload, referrerId, { reward: '3_months' })
    await sendWaitlistEmail(buildRewardReachedEmail(referrer.email, memberPageUrl))
    return
  }
  await sendWaitlistEmail(
    buildReferralJoinedEmail({
      to: referrer.email,
      referralCount: updated.referralCount,
      memberPageUrl,
      isRewardEligible: referrer.door !== 'business',
    }),
  )
}
