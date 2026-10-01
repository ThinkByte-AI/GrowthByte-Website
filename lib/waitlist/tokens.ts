import { createHash, randomBytes, randomInt } from 'crypto'

export const hashVerifyToken = (token: string): string =>
  createHash('sha256').update(token).digest('hex')

// Only the hash is stored, so a leaked database row cannot be replayed as a verify link.
export function createVerifyToken(): { token: string; tokenHash: string } {
  const token = randomBytes(32).toString('base64url')
  return { token, tokenHash: hashVerifyToken(token) }
}

export const createMemberKey = (): string => randomBytes(24).toString('base64url')

export function createReferralCode(agencyName: string): string {
  const stem = agencyName.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10) || 'agency'
  return `${stem}${randomInt(10, 1000)}`
}
