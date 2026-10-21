import type { Payload } from 'payload'
import { resolveAgencyIdentity } from './agency-identity'
import type { Door, WaitlistMember } from './constants'
import { buildWelcomeEmail } from './emails'
import { buildMemberPageUrl, buildReferralUrl } from './links'
import { claimNextPosition, createMember, findMemberWhere, updateMember } from './members'
import { creditReferrer, resolveReferrerId } from './referrals'
import { sendWaitlistEmail } from './resend'
import { createMemberKey, createReferralCode } from './tokens'

export interface MemberDetails {
  email: string
  name: string
  door: Door
  agencyName?: string
  website?: string
  whatsapp?: string
  country?: string
  referralCode?: string
}

// `member` is null when a colleague on the same company domain already holds the place.
export interface Enrollment {
  member: WaitlistMember | null
  isNew: boolean
}

async function createUniqueReferralCode(payload: Payload, stem: string): Promise<string> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const code = createReferralCode(stem)
    if (!(await findMemberWhere(payload, { referralCode: { equals: code } }))) return code
  }
  throw new Error(`Could not find a free referral code for "${stem}" after 5 attempts`)
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
        isRewardEligible: member.door !== 'business',
      }),
    ),
  ])
  // The member is already on the list; a failed email must not undo that, but it must be visible in logs.
  for (const result of results) {
    if (result.status === 'rejected') console.error(`Waitlist follow-up failed for ${member.email}:`, result.reason)
  }
}

async function saveNewMember(payload: Payload, details: MemberDetails, existingId?: string): Promise<WaitlistMember | null> {
  const identity = await resolveAgencyIdentity(payload, { id: existingId, ...details })
  if (identity.isDomainTaken) return null

  const data = {
    email: details.email,
    name: details.name,
    door: details.door,
    agencyName: details.agencyName,
    website: details.website,
    whatsapp: details.whatsapp,
    country: details.country,
    verified: true,
    position: await claimNextPosition(payload),
    agencyDomain: identity.agencyDomain,
    agencyKey: identity.agencyKey,
    possibleDuplicate: identity.isPossibleDuplicate,
    referralCode: await createUniqueReferralCode(payload, details.agencyName || details.name),
    referredBy: await resolveReferrerId(payload, details.referralCode),
    memberKey: createMemberKey(),
    referralCount: 0,
  }
  return existingId ? updateMember(payload, existingId, data) : createMember(payload, data)
}

// Called once a visitor has proved their email: an existing member keeps their position,
// a new one gets the next position, a referral link and the welcome email.
export async function enrollMember(payload: Payload, details: MemberDetails, origin: string): Promise<Enrollment> {
  const existing = await findMemberWhere(payload, { email: { equals: details.email } })
  if (existing?.verified) return { member: existing, isNew: false }

  const member = await saveNewMember(payload, details, existing?.id)
  if (member) await sendFollowUps(payload, member, origin)
  return { member, isNew: member !== null }
}
