import { WELCOME_PAGE_PATH } from './constants'

export const buildReferralUrl = (origin: string, referralCode: string): string => `${origin}/w/${referralCode}`

export const buildMemberPageUrl = (origin: string, memberKey: string): string =>
  `${origin}${WELCOME_PAGE_PATH}?m=${encodeURIComponent(memberKey)}`

export function buildShareMessage(referralUrl: string): string {
  return (
    'We are moving our clients onto GrowthByte — one AI platform where the team directs and the AI executes. ' +
    `Early access + founding pricing for the first 50 agencies: ${referralUrl}`
  )
}

export const buildWhatsAppShareUrl = (referralUrl: string): string =>
  `https://wa.me/?text=${encodeURIComponent(buildShareMessage(referralUrl))}`

export const buildLinkedInShareUrl = (referralUrl: string): string =>
  `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(buildShareMessage(referralUrl))}`
