export const WAITLIST_PRODUCT = 'GrowthByte'
export const FOUNDING_SLOTS = 50
export const FOUNDING_WINDOW_WEEKS = 6
export const REFERRAL_REWARD_THRESHOLD = 3
export const VERIFY_LINK_TTL_MS = 48 * 60 * 60 * 1000
export const REFERRAL_COOKIE = 'gb_ref'
export const REFERRAL_COOKIE_MAX_AGE_S = 60 * 60 * 24 * 30
export const WAITLIST_PAGE_PATH = '/products/growthbyte'
export const WELCOME_PAGE_PATH = '/products/growthbyte/welcome'
export const VERIFY_ISSUE_PAGE_PATH = '/products/growthbyte/verify-issue'
export const DOORS_ANCHOR = 'doors'
export const FALLBACK_CALL_URL = '/contact'

export type Door = 'agency' | 'business'

export type WaitlistReward = 'none' | '3_months' | '12_months'

export interface WaitlistMember {
  id: string
  email: string
  name?: string
  agencyName?: string
  website?: string
  whatsapp?: string
  country?: string
  door?: Door
  verified?: boolean
  position?: number
  referralCode?: string
  referredBy?: string | { id: string } | null
  referralCount?: number
  agencyDomain?: string | null
  agencyKey?: string
  possibleDuplicate?: boolean
  foundingClaimed?: boolean
  reward?: WaitlistReward
  memberKey?: string
}
