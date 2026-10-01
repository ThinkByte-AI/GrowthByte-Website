// Shares the product's Resend account and sender: RESEND_FROM must be on the verified growthbyte.ai domain.
export interface OutgoingEmail {
  to: string
  subject: string
  html: string
}

export async function sendWaitlistEmail({ to, subject, html }: OutgoingEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM
  if (!apiKey || !from) throw new Error('RESEND_API_KEY and RESEND_FROM must be set to send waitlist email')

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, html }),
    cache: 'no-store',
  })
  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    throw new Error(`Resend ${res.status}: ${detail.slice(0, 300)}`)
  }
}
