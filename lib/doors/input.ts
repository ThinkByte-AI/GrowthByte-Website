import { CHANNEL_OPTIONS, isKnownOption } from './options'
import type { DocRequestInput } from './types'

const cleanText = (value: unknown, maxLength: number): string =>
  typeof value === 'string' ? value.trim().slice(0, maxLength) : ''

const optionalText = (value: unknown, maxLength: number): string | undefined => cleanText(value, maxLength) || undefined

function cleanChannels(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.filter((channel): channel is string => typeof channel === 'string' && isKnownOption(CHANNEL_OPTIONS, channel))
}

// Shapes an untrusted request body; validateDocRequest then decides whether it is acceptable.
export function readDocRequestInput(body: unknown): DocRequestInput | null {
  if (!body || typeof body !== 'object') return null
  const raw = body as Record<string, unknown>
  if (raw.door !== 'agency' && raw.door !== 'business') return null
  return {
    door: raw.door,
    website: cleanText(raw.website, 200),
    offer: cleanText(raw.offer, 300),
    audience: cleanText(raw.audience, 300),
    goal: cleanText(raw.goal, 40),
    channels: cleanChannels(raw.channels),
    name: cleanText(raw.name, 80),
    agencyName: optionalText(raw.agencyName, 120),
    email: cleanText(raw.email, 254).toLowerCase(),
    whatsapp: optionalText(raw.whatsapp, 30),
    country: cleanText(raw.country, 10),
    wantsAgency: raw.door === 'business' && raw.wantsAgency === true,
    utmSource: optionalText(raw.utmSource, 100),
    utmMedium: optionalText(raw.utmMedium, 100),
    utmCampaign: optionalText(raw.utmCampaign, 100),
    utmTerm: optionalText(raw.utmTerm, 100),
    utmContent: optionalText(raw.utmContent, 100),
  }
}
