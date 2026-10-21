import type { Payload } from 'payload'
import { WAITLIST_PRODUCT, type WaitlistMember } from './constants'

const COLLECTION = 'waitlist'
const COUNTERS_COLLECTION = 'waitlist_counters'

type MemberQuery = Partial<Record<keyof WaitlistMember | 'product', { equals: unknown }>>

export async function findMemberWhere(payload: Payload, where: MemberQuery): Promise<WaitlistMember | null> {
  const result = await payload.find({
    collection: COLLECTION,
    where: { ...where, product: { equals: WAITLIST_PRODUCT } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  return (result.docs[0] as unknown as WaitlistMember | undefined) ?? null
}

export async function createMember(payload: Payload, data: Omit<WaitlistMember, 'id'>): Promise<WaitlistMember> {
  const doc = await payload.create({
    collection: COLLECTION,
    data: { ...data, product: WAITLIST_PRODUCT, source: 'growthbyte-os-doors' },
    overrideAccess: true,
  })
  return doc as unknown as WaitlistMember
}

export async function updateMember(
  payload: Payload,
  id: string,
  data: Partial<Omit<WaitlistMember, 'id'>>,
): Promise<WaitlistMember> {
  const doc = await payload.update({ collection: COLLECTION, id, data, depth: 0, overrideAccess: true })
  return doc as unknown as WaitlistMember
}

// Founding slots count real claims (set by the team once a workspace is onboarded), never sign-ups.
export async function countFoundingClaims(payload: Payload): Promise<number> {
  const { totalDocs } = await payload.count({
    collection: COLLECTION,
    where: { product: { equals: WAITLIST_PRODUCT }, foundingClaimed: { equals: true } },
    overrideAccess: true,
  })
  return totalDocs
}

// Positions come from an atomic $inc so two people verifying at the same moment never share a number.
export async function claimNextPosition(payload: Payload): Promise<number> {
  const counters = payload.db.connection.collection<{ _id: string; seq: number }>(COUNTERS_COLLECTION)
  const counter = await counters.findOneAndUpdate(
    { _id: WAITLIST_PRODUCT },
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: 'after' },
  )
  if (!counter) throw new Error('Waitlist position counter returned no document')
  return counter.seq
}

function toMember(raw: unknown): WaitlistMember | null {
  if (!raw) return null
  const { _id, referredBy, ...rest } = raw as { _id: { toString(): string }; referredBy?: { toString(): string } | null } &
    Omit<WaitlistMember, 'id' | 'referredBy'>
  return { id: _id.toString(), referredBy: referredBy ? referredBy.toString() : null, ...rest }
}

export async function incrementReferralCount(payload: Payload, referrerId: string): Promise<WaitlistMember | null> {
  const updated = await payload.db.collections[COLLECTION]
    .findOneAndUpdate({ _id: referrerId }, { $inc: { referralCount: 1 } }, { new: true })
    .lean()
  return toMember(updated)
}
