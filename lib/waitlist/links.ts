import { WELCOME_PAGE_PATH } from './constants'

export const buildReferralUrl = (origin: string, referralCode: string): string => `${origin}/w/${referralCode}`

export const buildMemberPageUrl = (origin: string, memberKey: string): string =>
  `${origin}${WELCOME_PAGE_PATH}?m=${encodeURIComponent(memberKey)}`

export function buildShareMessage(referralUrl: string): string {
  return (
    'GrowthByte OS runs an agency’s client work. The team directs, the AI executes. ' +
    `Get a Growth Proposal for one of your clients in 24 hours: ${referralUrl}`
  )
}

export const buildWhatsAppShareUrl = (referralUrl: string): string =>
  `https://wa.me/?text=${encodeURIComponent(buildShareMessage(referralUrl))}`

export const buildLinkedInShareUrl = (referralUrl: string): string =>
  `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(buildShareMessage(referralUrl))}`
