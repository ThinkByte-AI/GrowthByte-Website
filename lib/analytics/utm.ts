import type { UtmParams } from '@/lib/doors/types'

const STORAGE_KEY = 'gb_utm'

const UTM_FIELDS: Record<string, keyof UtmParams> = {
  utm_source: 'utmSource',
  utm_medium: 'utmMedium',
  utm_campaign: 'utmCampaign',
  utm_term: 'utmTerm',
  utm_content: 'utmContent',
}

function readUtmFromUrl(search: string): UtmParams {
  const query = new URLSearchParams(search)
  const utm: UtmParams = {}
  for (const [param, field] of Object.entries(UTM_FIELDS)) {
    const value = query.get(param)
    if (value) utm[field] = value
  }
  return utm
}

// First touch in the session wins, so a visitor who lands from a campaign and then browses keeps that campaign.
// Storage can be blocked (private mode); then only the current URL's tags are used.
export function captureUtmParams(): UtmParams {
  const fromUrl = readUtmFromUrl(window.location.search)
  try {
    const stored = window.sessionStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored) as UtmParams
    if (Object.keys(fromUrl).length > 0) window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl))
  } catch {
    return fromUrl
  }
  return fromUrl
}
