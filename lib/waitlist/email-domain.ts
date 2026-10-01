// Short list of the throwaway providers seen most often; extend when junk sign-ups show up.
const DISPOSABLE_DOMAINS = new Set([
  '10minutemail.com',
  'dispostable.com',
  'emailondeck.com',
  'fakeinbox.com',
  'getnada.com',
  'guerrillamail.com',
  'maildrop.cc',
  'mailinator.com',
  'mailnesia.com',
  'mintemail.com',
  'mohmal.com',
  'sharklasers.com',
  'temp-mail.org',
  'tempmail.com',
  'throwawaymail.com',
  'trashmail.com',
  'yopmail.com',
])

// Two people on gmail.com are not the same agency, so shared inboxes never count as "same domain".
const FREE_MAIL_DOMAINS = new Set([
  'gmail.com',
  'googlemail.com',
  'outlook.com',
  'hotmail.com',
  'live.com',
  'yahoo.com',
  'yahoo.co.in',
  'icloud.com',
  'proton.me',
  'protonmail.com',
  'rediffmail.com',
  'zoho.com',
])

export const emailDomain = (email: string): string => email.split('@')[1]?.toLowerCase() ?? ''

export const isDisposableEmail = (email: string): boolean => DISPOSABLE_DOMAINS.has(emailDomain(email))

export function agencyDomainOf(email: string): string | null {
  const domain = emailDomain(email)
  return domain === '' || FREE_MAIL_DOMAINS.has(domain) ? null : domain
}

export function isSameAgencyDomain(emailA: string, emailB: string): boolean {
  const domain = agencyDomainOf(emailA)
  return domain !== null && domain === emailDomain(emailB)
}
