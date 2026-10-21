import type { Metadata } from 'next'
import '../../../gb-home.css'
import '../waitlist.css'
import WaitlistNotice from '../_components/WaitlistNotice'

export const metadata: Metadata = {
  title: { absolute: 'Confirm your email | GrowthByte OS' },
  robots: { index: false, follow: false },
}

const NOTICES: Record<string, { title: string; body: string; showJoinLink: boolean }> = {
  expired: {
    title: 'This link has expired',
    body: 'Confirmation links last 48 hours. Request your document again with the same work email and we will send a fresh one.',
    showJoinLink: true,
  },
  cooldown: {
    title: 'This website already has a document on the way',
    body: 'We make one document per website every 7 days, and one was confirmed for this site already. Check your inbox. It arrives within 24 hours of that confirmation.',
    showJoinLink: false,
  },
  invalid: {
    title: 'This link has already been used',
    body: 'If you confirmed already, your document is on its way. Check your inbox for your personal page. Otherwise, request it again.',
    showJoinLink: true,
  },
  error: {
    title: 'Something went wrong',
    body: 'We could not confirm your email just now. Please click the link in your email again in a minute.',
    showJoinLink: false,
  },
}

export default async function WaitlistVerifyIssuePage({ searchParams }: { searchParams: Promise<{ reason?: string }> }) {
  const { reason } = await searchParams
  const notice = NOTICES[reason ?? ''] ?? NOTICES.invalid
  return (
    <div className="gb-home">
      <section className="hero">
        <div className="wrap">
          <WaitlistNotice {...notice} />
        </div>
      </section>
    </div>
  )
}
