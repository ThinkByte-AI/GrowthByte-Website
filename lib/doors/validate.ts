import { isDisposableEmail, isFreeMailEmail } from '@/lib/waitlist/email-domain'
import { COUNTRY_OPTIONS, GOAL_OPTIONS, isKnownOption } from './options'
import type { DocRequestInput } from './types'
import { websiteDomainOf } from './website-domain'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmail(email: string): string | null {
  if (!EMAIL_RE.test(email)) return 'Enter a valid work email.'
  if (isFreeMailEmail(email) || isDisposableEmail(email)) {
    return 'Use your work email — personal and temporary inboxes cannot request a document.'
  }
  return null
}

function validateBusiness(input: DocRequestInput): string | null {
  if (!websiteDomainOf(input.website)) return 'Enter the website, for example example.com.'
  if (!input.offer) return 'Tell us what the business sells.'
  if (!input.audience) return 'Tell us who the business sells to.'
  if (!isKnownOption(GOAL_OPTIONS, input.goal)) return 'Pick a primary goal.'
  return null
}

function validateContact(input: DocRequestInput): string | null {
  if (!input.name) return 'Enter your name.'
  if (input.door === 'agency' && !input.agencyName) return 'Enter your agency name.'
  if (!isKnownOption(COUNTRY_OPTIONS, input.country)) return 'Pick your country.'
  return validateEmail(input.email)
}

export function validateDocRequest(input: DocRequestInput): string | null {
  return validateBusiness(input) ?? validateContact(input)
}
