import type { WaitlistMember } from '@/lib/waitlist/constants'
import { CHANNEL_OPTIONS, COUNTRY_OPTIONS, GOAL_OPTIONS, labelOf } from './options'
import type { DocRequest } from './types'

// Standalone Apps Script that appends to the "GrowthByte-OS-Doors" tab and emails the alert.
// Contract: form-urlencoded POST, always HTTP 200, success only when the JSON body has ok: true.
const DOORS_SHEET_URL =
  'https://script.google.com/macros/s/AKfycbxiq-CUyK1QJbiy4Md1GXc_g8ybfksLmcSEzCBemQ9FpXfIGt16BiLMw4tWoxSpHvFfOg/exec'

interface SheetResponse {
  ok?: boolean
  row?: number
  error?: string
  mailError?: string
}

const channelLabels = (channels: string): string =>
  channels
    .split(',')
    .filter(Boolean)
    .map((channel) => labelOf(CHANNEL_OPTIONS, channel))
    .join(', ')

export interface SheetEntry {
  request: DocRequest
  member: WaitlistMember | null
  inviteUrl: string
}

function buildSheetFields({ request, member, inviteUrl }: SheetEntry, secret: string): Record<string, string> {
  return {
    secret,
    requestId: request.id,
    door: request.door,
    website: request.website,
    offer: request.offer,
    audience: request.audience,
    goal: labelOf(GOAL_OPTIONS, request.goal),
    channels: channelLabels(request.channels),
    name: request.name,
    agencyName: request.agencyName ?? '',
    email: request.email,
    whatsapp: request.whatsapp ?? '',
    country: labelOf(COUNTRY_OPTIONS, request.country),
    wantsAgency: request.door === 'business' ? (request.wantsAgency ? 'yes' : 'no') : '',
    position: member?.position ? String(member.position) : 'company already listed',
    source: request.referralCode ? `referral:${request.referralCode}` : request.source,
    referralCode: inviteUrl,
    utmSource: request.utmSource ?? '',
    utmMedium: request.utmMedium ?? '',
    utmCampaign: request.utmCampaign ?? '',
    utmTerm: request.utmTerm ?? '',
    utmContent: request.utmContent ?? '',
  }
}

export async function pushDocRequestToSheet(entry: SheetEntry): Promise<number> {
  const secret = process.env.OS_DOORS_SHEET_SECRET
  if (!secret) throw new Error('OS_DOORS_SHEET_SECRET must be set to queue document requests')

  const res = await fetch(DOORS_SHEET_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    body: new URLSearchParams(buildSheetFields(entry, secret)),
    cache: 'no-store',
  })
  const data = (await res.json().catch(() => null)) as SheetResponse | null
  if (!res.ok || !data?.ok) throw new Error(`Doors sheet rejected ${entry.request.id}: ${data?.error ?? `HTTP ${res.status}`}`)
  if (data.mailError) console.error(`Doors sheet row ${data.row} saved but the alert email failed: ${data.mailError}`)
  return data.row ?? 0
}
