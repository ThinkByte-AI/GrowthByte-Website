import { REFERRAL_REWARD_THRESHOLD } from './constants'
import { escapeHtml, renderWaitlistEmail } from './email-layout'
import type { OutgoingEmail } from './resend'

const statusLine = (count: number): string =>
  `You: ${count}/${REFERRAL_REWARD_THRESHOLD} referrals toward 3 months free.`

const greeting = (name?: string): string => (name ? `Hi ${escapeHtml(name)},` : 'Hi,')

export const buildVerifyEmail = (to: string, name: string, verifyUrl: string): OutgoingEmail => ({
  to,
  subject: 'Verify your email to lock your spot',
  html: renderWaitlistEmail({
    heading: 'One click to lock your spot',
    paragraphs: [
      greeting(name),
      'Thanks for joining the GrowthByte waitlist. Confirm your email and your place is saved in join order.',
      'This link expires in 48 hours.',
    ],
    button: { label: 'Verify my spot', href: verifyUrl },
    footer: 'Did not sign up? Ignore this email and nothing happens.',
  }),
})

interface WelcomeEmailArgs {
  to: string
  name?: string
  position: number
  referralUrl: string
  memberPageUrl: string
}

export const buildWelcomeEmail = ({ to, name, position, referralUrl, memberPageUrl }: WelcomeEmailArgs): OutgoingEmail => ({
  to,
  subject: `You are #${position}. Here is your link.`,
  html: renderWaitlistEmail({
    heading: `You are in. You are #${position}.`,
    paragraphs: [
      greeting(name),
      'Early access before public launch, and the founding price for the founding 50.',
      `Your link: <a href="${escapeHtml(referralUrl)}">${escapeHtml(referralUrl)}</a>`,
      `Know other agency owners? When ${REFERRAL_REWARD_THRESHOLD} agencies join from your link, you get 3 months free on any paid plan.`,
    ],
    button: { label: 'Share my link', href: memberPageUrl },
    footer: statusLine(0),
  }),
})

interface ReferralJoinedEmailArgs {
  to: string
  joinedAgency: string
  referralCount: number
  memberPageUrl: string
}

export const buildReferralJoinedEmail = ({
  to,
  joinedAgency,
  referralCount,
  memberPageUrl,
}: ReferralJoinedEmailArgs): OutgoingEmail => ({
  to,
  subject: `${joinedAgency} just joined from your link — you are ${referralCount}/${REFERRAL_REWARD_THRESHOLD}`,
  html: renderWaitlistEmail({
    heading: `${joinedAgency} just joined from your link`,
    paragraphs: [`You are at ${referralCount}/${REFERRAL_REWARD_THRESHOLD}. Keep sharing to unlock 3 months free.`],
    button: { label: 'Share again', href: memberPageUrl },
    footer: statusLine(referralCount),
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
