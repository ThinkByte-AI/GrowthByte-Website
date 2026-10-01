import type { Payload } from 'payload'
import type { WaitlistMember } from './constants'
import { agencyDomainOf } from './email-domain'
import { findMemberWhere } from './members'

const LEGAL_SUFFIXES = new Set(['pvt', 'private', 'ltd', 'limited', 'llp', 'llc', 'inc', 'co', 'corp', 'company'])

// "Alpha Agency Pvt. Ltd." and "alpha agency" collapse to the same key so an admin can spot the pair.
export function normalizeAgencyName(agencyName: string): string {
  return agencyName
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((word) => word !== '' && !LEGAL_SUFFIXES.has(word))
    .join('')
}

export interface AgencyIdentity {
  agencyDomain: string | null
  agencyKey: string
  isDomainTaken: boolean
  isPossibleDuplicate: boolean
}

// One place per agency: a company email domain that already holds a verified spot cannot take a second.
// Free-mail users cannot be matched by domain, so a repeated agency name is only flagged for manual review.
export async function resolveAgencyIdentity(payload: Payload, member: WaitlistMember): Promise<AgencyIdentity> {
  const agencyDomain = agencyDomainOf(member.email)
  const agencyKey = normalizeAgencyName(member.agencyName ?? '')
  const [domainHolder, nameTwin] = await Promise.all([
    agencyDomain
      ? findMemberWhere(payload, { agencyDomain: { equals: agencyDomain }, verified: { equals: true } })
      : null,
    agencyKey ? findMemberWhere(payload, { agencyKey: { equals: agencyKey }, verified: { equals: true } }) : null,
  ])
  return {
    agencyDomain,
    agencyKey,
    isDomainTaken: domainHolder !== null && domainHolder.id !== member.id,
    isPossibleDuplicate: nameTwin !== null && nameTwin.id !== member.id,
  }
}
