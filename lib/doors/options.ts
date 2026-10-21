import type { Door } from '@/lib/waitlist/constants'

export interface FieldOption {
  value: string
  label: string
}

export const DOOR_DOCUMENT_NAMES: Record<Door, string> = {
  agency: 'Growth Proposal',
  business: 'Growth Strategy',
}

export const GOAL_OPTIONS: FieldOption[] = [
  { value: 'leads', label: 'Leads' },
  { value: 'revenue', label: 'Revenue' },
  { value: 'rankings', label: 'Rankings' },
  { value: 'ai-search', label: 'AI-search visibility' },
  { value: 'brand', label: 'Brand' },
]

export const CHANNEL_OPTIONS: FieldOption[] = [
  { value: 'seo', label: 'SEO' },
  { value: 'content', label: 'Content' },
  { value: 'paid-search', label: 'Paid search' },
  { value: 'paid-social', label: 'Paid social' },
  { value: 'organic-social', label: 'Organic social' },
  { value: 'email', label: 'Email / WhatsApp' },
  { value: 'ai-search', label: 'AI search' },
]

export const COUNTRY_OPTIONS: FieldOption[] = [
  { value: 'IN', label: 'India' },
  { value: 'US', label: 'United States' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'SG', label: 'Singapore' },
  { value: 'AU', label: 'Australia' },
  { value: 'CA', label: 'Canada' },
  { value: 'other', label: 'Other' },
]

export const isKnownOption = (options: FieldOption[], value: string): boolean =>
  options.some((option) => option.value === value)

export const labelOf = (options: FieldOption[], value: string): string =>
  options.find((option) => option.value === value)?.label ?? value
