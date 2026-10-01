import type { Payload } from 'payload'
import { WAITLIST_PRODUCT, type WaitlistMember } from './constants'
import { buildCsv } from './csv'

type ExportedMember = WaitlistMember & { createdAt?: string }

const HEADER = [
  'Position',
  'Name',
  'Email',
  'Agency',
  'Website',
  'WhatsApp',
  'Verified',
  'Referrals',
  'Reward',
  'Possible duplicate',
  'Agency domain',
  'Joined at',
]

const toRow = (m: ExportedMember) => [
  m.position,
  m.name,
  m.email,
  m.agencyName,
  m.website,
  m.whatsapp,
  m.verified ? 'yes' : 'no',
  m.referralCount ?? 0,
  m.reward ?? 'none',
  m.possibleDuplicate ? 'yes' : 'no',
  m.agencyDomain,
  m.createdAt,
]

// Verified members in join order first, then unverified sign-ups oldest first.
function compareForExport(a: ExportedMember, b: ExportedMember): number {
  if (a.position && b.position) return a.position - b.position
  if (a.position || b.position) return a.position ? -1 : 1
  return (a.createdAt ?? '').localeCompare(b.createdAt ?? '')
}

export async function buildWaitlistCsv(payload: Payload): Promise<string> {
  const { docs } = await payload.find({
    collection: 'waitlist',
    where: { product: { equals: WAITLIST_PRODUCT } },
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })
  const members = (docs as unknown as ExportedMember[]).sort(compareForExport)
  return buildCsv(HEADER, members.map(toRow))
}
