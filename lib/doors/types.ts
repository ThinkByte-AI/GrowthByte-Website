import type { Door } from '@/lib/waitlist/constants'

export interface UtmParams {
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
}

export interface DocRequestInput extends UtmParams {
  door: Door
  website: string
  offer: string
  audience: string
  goal: string
  channels: string[]
  name: string
  agencyName?: string
  email: string
  whatsapp?: string
  country: string
  wantsAgency: boolean
}

export type DocRequestStatus = 'pending' | 'verified'

export interface DocRequest extends Omit<DocRequestInput, 'channels'> {
  id: string
  channels: string
  websiteDomain: string
  status: DocRequestStatus
  source: string
  referralCode?: string
  ipHash: string
  confirmKey: string
  verifyTokenHash?: string
  verifyExpiresAt?: string
  verifiedAt?: string
  member?: string | { id: string } | null
  sheetRow?: number
  sheetError?: string
}
