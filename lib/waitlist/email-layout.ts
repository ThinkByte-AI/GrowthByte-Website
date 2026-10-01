const BRAND_TEAL = '#009389'
const INK = '#0B0B0B'

export const escapeHtml = (text: string): string =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export interface EmailButton {
  label: string
  href: string
}

export interface EmailBody {
  heading: string
  paragraphs: string[]
  button: EmailButton
  footer?: string
}

const renderButton = ({ label, href }: EmailButton): string =>
  `<a href="${escapeHtml(href)}" style="display:inline-block;background:${BRAND_TEAL};color:#fff;` +
  `text-decoration:none;font-weight:600;padding:12px 22px;border-radius:8px">${escapeHtml(label)}</a>`

// Paragraphs are trusted template strings; callers escape any member-supplied values before passing them in.
export function renderWaitlistEmail({ heading, paragraphs, button, footer }: EmailBody): string {
  const body = paragraphs.map((p) => `<p style="margin:0 0 14px;line-height:1.6">${p}</p>`).join('')
  const foot = footer ? `<p style="margin:28px 0 0;font-size:12px;color:#566460">${footer}</p>` : ''
  return (
    `<div style="font-family:Arial,Helvetica,sans-serif;color:${INK};max-width:520px;margin:0 auto;padding:24px">` +
    `<h1 style="font-size:22px;margin:0 0 16px">${escapeHtml(heading)}</h1>${body}` +
    `<p style="margin:22px 0 0">${renderButton(button)}</p>${foot}` +
    `<p style="margin:28px 0 0;font-size:12px;color:#566460">GrowthByte · growthbyte.ai</p></div>`
  )
}
