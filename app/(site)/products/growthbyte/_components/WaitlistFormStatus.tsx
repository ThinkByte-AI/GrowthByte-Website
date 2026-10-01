export type SubmitState = 'idle' | 'submitting' | 'verify_sent' | 'already_in' | 'full' | 'agency_taken' | 'error'

const MESSAGES: Record<'verify_sent' | 'already_in' | 'full' | 'agency_taken', { title: string; body: string }> = {
  verify_sent: {
    title: 'Check your inbox',
    body: 'We sent you a link. Click "Verify my spot" to lock your place — it expires in 48 hours.',
  },
  already_in: {
    title: 'You are already in',
    body: 'We just emailed you the link to your page with your position and referral link.',
  },
  agency_taken: {
    title: 'Your agency already has a spot',
    body: 'Someone from your company domain already holds your agency’s place. They can add you to the workspace at launch.',
  },
  full: {
    title: 'All 50 spots are taken',
    body: 'The founding cohort is full. We will open the next wave soon.',
  },
}

export default function WaitlistFormStatus({ state }: { state: keyof typeof MESSAGES }) {
  const { title, body } = MESSAGES[state]
  return (
    <div className="wl-status" role="status">
      <div className="wl-status-t">{title}</div>
      <p className="wl-status-b">{body}</p>
    </div>
  )
}
