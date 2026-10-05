import type { Metadata } from 'next'
import '../../../gb-home.css'
import '../waitlist.css'
import WaitlistNotice from '../_components/WaitlistNotice'

export const metadata: Metadata = {
  title: { absolute: 'Verify your spot — GrowthByte OS waitlist' },
  robots: { index: false, follow: false },
}

const NOTICES: Record<string, { title: string; body: string; showJoinLink: boolean }> = {
  expired: {
    title: 'This link has expired',
    body: 'Verification links last 48 hours. Join again with the same email and we will send a fresh one.',
    showJoinLink: true,
  },
  full: {
    title: 'All 50 spots are taken',
    body: 'The founding cohort filled up before you verified. We will email you when the next wave opens.',
    showJoinLink: false,
  },
  agency_taken: {
    title: 'Your agency already has a spot',
    body: 'Someone from your company domain already holds your agency’s place. They can add you to the workspace at launch.',
    showJoinLink: false,
  },
  invalid: {
    title: 'This link has already been used',
    body: 'If you verified already, check your inbox for your personal page. Otherwise, join again with the same email.',
    showJoinLink: true,
  },
  error: {
    title: 'Something went wrong',
    body: 'We could not verify your spot just now. Please click the link in your email again in a minute.',
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
