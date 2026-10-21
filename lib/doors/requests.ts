import type { Payload, Where } from 'payload'
import type { DocRequest } from './types'

const COLLECTION = 'doc-requests'

export async function createDocRequest(payload: Payload, data: Omit<DocRequest, 'id'>): Promise<DocRequest> {
  const doc = await payload.create({ collection: COLLECTION, data, overrideAccess: true })
  return doc as unknown as DocRequest
}

export async function updateDocRequest(
  payload: Payload,
  id: string,
  data: Partial<Omit<DocRequest, 'id'>>,
): Promise<DocRequest> {
  const doc = await payload.update({ collection: COLLECTION, id, data, depth: 0, overrideAccess: true })
  return doc as unknown as DocRequest
}

export async function findDocRequestByConfirmKey(payload: Payload, confirmKey: string): Promise<DocRequest | null> {
  const { docs } = await payload.find({
    collection: COLLECTION,
    where: { confirmKey: { equals: confirmKey }, status: { equals: 'verified' } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
  })
  return (docs[0] as unknown as DocRequest | undefined) ?? null
}

export async function countDocRequests(payload: Payload, where: Where): Promise<number> {
  const { totalDocs } = await payload.count({ collection: COLLECTION, where, overrideAccess: true })
  return totalDocs
}

// Consuming the token atomically means a double-clicked link cannot queue the same document twice.
export async function consumeDocVerifyToken(payload: Payload, tokenHash: string): Promise<DocRequest | null> {
  const claimed = await payload.db.collections[COLLECTION]
    .findOneAndUpdate({ verifyTokenHash: tokenHash, status: 'pending' }, { $unset: { verifyTokenHash: 1 } })
    .lean()
  if (!claimed) return null
  const { _id, ...rest } = claimed as unknown as { _id: { toString(): string } } & Omit<DocRequest, 'id'>
  return { id: _id.toString(), ...rest }
}
