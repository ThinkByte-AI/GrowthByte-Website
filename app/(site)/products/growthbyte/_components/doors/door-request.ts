import { captureUtmParams } from '@/lib/analytics/utm'
import type { DocRequestInput } from '@/lib/doors/types'
import type { Door } from '@/lib/waitlist/constants'
import type { DoorNotice } from './DoorFormStatus'

export type SubmitState = 'idle' | 'submitting' | 'error' | DoorNotice

export interface DoorResponse {
  ok?: boolean
  status?: string
  error?: string
}

export const GENERIC_ERROR = 'Something went wrong. Please try again.'
const RATE_LIMIT_ERROR = 'Too many requests from this connection. Please try again in an hour.'

const readField = (data: FormData, name: string): string => String(data.get(name) ?? '').trim()

export function buildRequestBody(door: Door, data: FormData): DocRequestInput {
  return {
    door,
    website: readField(data, 'website'),
    offer: readField(data, 'offer'),
    audience: readField(data, 'audience'),
    goal: readField(data, 'goal'),
    channels: data.getAll('channels').map(String),
    name: readField(data, 'name'),
    agencyName: readField(data, 'agencyName') || undefined,
    email: readField(data, 'email'),
    whatsapp: readField(data, 'whatsapp') || undefined,
    country: readField(data, 'country'),
    wantsAgency: data.get('wantsAgency') === 'on',
    ...captureUtmParams(),
  }
}

export function toSubmitState(res: Response, body: DoorResponse | null): SubmitState {
  if (body?.status === 'cooldown') return 'cooldown'
  if (!res.ok || !body?.ok) return 'error'
  return 'verify_sent'
}

export function toErrorMessage(body: DoorResponse | null): string {
  return body?.status === 'rate_limited' ? RATE_LIMIT_ERROR : body?.error ?? GENERIC_ERROR
}
