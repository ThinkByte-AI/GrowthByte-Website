import type { Payload } from 'payload'
import { WAITLIST_CAP, WAITLIST_PRODUCT, type WaitlistMember } from './constants'

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
    data: { ...data, product: WAITLIST_PRODUCT, source: 'growthbyte-waitlist' },
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

export async function countVerifiedMembers(payload: Payload): Promise<number> {
  const { totalDocs } = await payload.count({
    collection: COLLECTION,
    where: { product: { equals: WAITLIST_PRODUCT }, verified: { equals: true } },
    overrideAccess: true,
  })
  return totalDocs
}

// Positions come from an atomic $inc so two people verifying at the same moment can never both become #50.
export async function claimNextPosition(payload: Payload): Promise<number | null> {
  const counters = payload.db.connection.collection<{ _id: string; seq: number }>(COUNTERS_COLLECTION)
  const filter = { _id: WAITLIST_PRODUCT }
  const counter = await counters.findOneAndUpdate(
    filter,
    { $inc: { seq: 1 } },
    { upsert: true, returnDocument: 'after' },
  )
  const position = counter?.seq ?? null
  if (position !== null && position <= WAITLIST_CAP) return position
  await counters.updateOne(filter, { $inc: { seq: -1 } })
  return null
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

// Consuming the token atomically means a double-clicked link cannot claim two positions.
export async function consumeVerifyToken(payload: Payload, tokenHash: string): Promise<WaitlistMember | null> {
  const claimed = await payload.db.collections[COLLECTION]
    .findOneAndUpdate(
      { verifyTokenHash: tokenHash, product: WAITLIST_PRODUCT, verified: { $ne: true } },
      { $unset: { verifyTokenHash: 1 } },
    )
    .lean()
  return toMember(claimed)
}
