export const WAITLIST_PRODUCT = 'GrowthByte'
export const WAITLIST_CAP = 50
export const REFERRAL_REWARD_THRESHOLD = 3
export const VERIFY_LINK_TTL_MS = 48 * 60 * 60 * 1000
// Launch-plan dates (PRD B §6–7); change here and every page and FAQ follows.
export const FOUNDING_OFFER_DATE = '31 October'
export const FOUNDING_CLAIM_WINDOW_DAYS = 7
export const REFERRAL_COOKIE = 'gb_ref'
export const REFERRAL_COOKIE_MAX_AGE_S = 60 * 60 * 24 * 30
export const WAITLIST_PAGE_PATH = '/products/growthbyte'
export const WELCOME_PAGE_PATH = '/products/growthbyte/welcome'
export const VERIFY_ISSUE_PAGE_PATH = '/products/growthbyte/verify-issue'

export type WaitlistReward = 'none' | '3_months' | '12_months'

export interface WaitlistMember {
  id: string
  email: string
  name?: string
  agencyName?: string
  website?: string
  whatsapp?: string
  verified?: boolean
  position?: number
  referralCode?: string
  referredBy?: string | { id: string } | null
  referralCount?: number
  agencyDomain?: string | null
  agencyKey?: string
  possibleDuplicate?: boolean
  reward?: WaitlistReward
  memberKey?: string
  verifyTokenHash?: string
  verifyExpiresAt?: string
}
