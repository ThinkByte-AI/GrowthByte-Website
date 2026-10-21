import type { Door } from '@/lib/waitlist/constants'
import { renderWaitlistEmail } from '@/lib/waitlist/email-layout'
import { greeting } from '@/lib/waitlist/emails'
import type { OutgoingEmail } from '@/lib/waitlist/resend'
import { DOOR_DOCUMENT_NAMES } from './options'

interface DocVerifyEmailArgs {
  to: string
  name: string
  door: Door
  verifyUrl: string
}

export function buildDocVerifyEmail({ to, name, door, verifyUrl }: DocVerifyEmailArgs): OutgoingEmail {
  const documentName = DOOR_DOCUMENT_NAMES[door]
  return {
    to,
    subject: `Confirm your email to get your ${documentName}`,
    html: renderWaitlistEmail({
      heading: `One click and we start your ${documentName}`,
      paragraphs: [
        greeting(name),
        `Confirm this is your work email and GrowthByte OS starts on your ${documentName}. It arrives within 24 hours of confirming.`,
        'This link expires in 48 hours.',
      ],
      button: { label: 'Confirm my email', href: verifyUrl },
      footer: 'Did not ask for this? Ignore this email and nothing happens.',
    }),
  }
}
