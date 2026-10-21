import { REFERRAL_REWARD_THRESHOLD } from './constants'
import { escapeHtml, renderWaitlistEmail } from './email-layout'
import type { OutgoingEmail } from './resend'

const statusLine = (count: number): string =>
  `You: ${count}/${REFERRAL_REWARD_THRESHOLD} referrals toward 3 months free.`

export const greeting = (name?: string): string => (name ? `Hi ${escapeHtml(name)},` : 'Hi,')

interface WelcomeEmailArgs {
  to: string
  name?: string
  position: number
  referralUrl: string
  memberPageUrl: string
  isRewardEligible: boolean
}

export const buildWelcomeEmail = ({
  to,
  name,
  position,
  referralUrl,
  memberPageUrl,
  isRewardEligible,
}: WelcomeEmailArgs): OutgoingEmail => ({
  to,
  subject: `You are #${position} on the GrowthByte OS list`,
  html: renderWaitlistEmail({
    heading: `You are #${position} on the GrowthByte OS list.`,
    paragraphs: [
      greeting(name),
      'Founding offers go out when workspaces open — list members hear first, in position order.',
      `Your link: <a href="${escapeHtml(referralUrl)}">${escapeHtml(referralUrl)}</a>`,
      isRewardEligible
        ? `Know other agency owners? When ${REFERRAL_REWARD_THRESHOLD} agencies join from your link, you get 3 months free on any paid plan — applied at launch.`
        : 'Work with an agency? Send them your link when your Growth Strategy arrives.',
    ],
    button: { label: 'Share my link', href: memberPageUrl },
    footer: isRewardEligible ? statusLine(0) : undefined,
  }),
})

interface ReferralJoinedEmailArgs {
  to: string
  referralCount: number
  memberPageUrl: string
  isRewardEligible: boolean
}

export const buildReferralJoinedEmail = ({
  to,
  referralCount,
  memberPageUrl,
  isRewardEligible,
}: ReferralJoinedEmailArgs): OutgoingEmail => ({
  to,
  subject: isRewardEligible
    ? `An agency just joined from your link — you are ${referralCount}/${REFERRAL_REWARD_THRESHOLD}`
    : 'An agency just joined from your link',
  html: renderWaitlistEmail({
    heading: 'An agency just joined from your link',
    paragraphs: [
      isRewardEligible
        ? `You are at ${referralCount}/${REFERRAL_REWARD_THRESHOLD}. Keep sharing to unlock 3 months free.`
        : 'Thanks for sending GrowthByte OS their way.',
    ],
    button: { label: 'Share again', href: memberPageUrl },
    footer: isRewardEligible ? statusLine(referralCount) : undefined,
  }),
})

export const buildRewardReachedEmail = (to: string, memberPageUrl: string): OutgoingEmail => ({
  to,
  subject: '3 months free is yours at launch',
  html: renderWaitlistEmail({
    heading: '3 months free is yours',
    paragraphs: [
      `${REFERRAL_REWARD_THRESHOLD} agencies joined from your link. Your reward is saved and applies automatically when you pick a paid plan at launch.`,
    ],
    button: { label: 'See my status', href: memberPageUrl },
  }),
})
