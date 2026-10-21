import { createHash } from 'crypto'
import type { Payload } from 'payload'
import { countDocRequests } from './requests'

const DOMAIN_COOLDOWN_MS = 7 * 24 * 60 * 60 * 1000
const IP_WINDOW_MS = 60 * 60 * 1000
const MAX_REQUESTS_PER_IP_WINDOW = 5

const since = (ms: number): string => new Date(Date.now() - ms).toISOString()

// IPs are stored only as a salted hash: enough to rate-limit, not enough to identify a visitor.
export function hashIp(ip: string): string {
  const salt = process.env.PAYLOAD_SECRET
  if (!salt) throw new Error('PAYLOAD_SECRET must be set to hash visitor IPs')
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex')
}

export async function hasRecentDocForDomain(payload: Payload, websiteDomain: string): Promise<boolean> {
  const count = await countDocRequests(payload, {
    websiteDomain: { equals: websiteDomain },
    status: { equals: 'verified' },
    verifiedAt: { greater_than: since(DOMAIN_COOLDOWN_MS) },
  })
  return count > 0
}

export async function isIpOverLimit(payload: Payload, ipHash: string): Promise<boolean> {
  const count = await countDocRequests(payload, {
    ipHash: { equals: ipHash },
    createdAt: { greater_than: since(IP_WINDOW_MS) },
  })
  return count >= MAX_REQUESTS_PER_IP_WINDOW
}
