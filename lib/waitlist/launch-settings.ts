import type { Payload } from 'payload'
import { FALLBACK_CALL_URL, FOUNDING_WINDOW_WEEKS } from './constants'

export interface LaunchSettings {
  firstLoginsAt: Date | null
  foundingWindowClosesAt: Date | null
  foundingCallUrl: string
}

interface LaunchGlobal {
  firstLoginsAt?: string | null
  foundingCallUrl?: string | null
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000

export async function getLaunchSettings(payload: Payload): Promise<LaunchSettings> {
  const launch = (await payload.findGlobal({ slug: 'growthbyte-os-launch', depth: 0 })) as unknown as LaunchGlobal
  const firstLoginsAt = launch.firstLoginsAt ? new Date(launch.firstLoginsAt) : null
  return {
    firstLoginsAt,
    foundingWindowClosesAt: firstLoginsAt ? new Date(firstLoginsAt.getTime() + FOUNDING_WINDOW_WEEKS * WEEK_MS) : null,
    foundingCallUrl: launch.foundingCallUrl?.trim() || FALLBACK_CALL_URL,
  }
}

export const formatLaunchDate = (date: Date): string =>
  date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' })

export function describeFirstLogins(settings: LaunchSettings): string {
  return settings.firstLoginsAt ? `First logins ${formatLaunchDate(settings.firstLoginsAt)}` : 'When workspaces open'
}

export function describeFoundingWindow(settings: LaunchSettings): string {
  return settings.foundingWindowClosesAt
    ? `The founding window closes ${formatLaunchDate(settings.foundingWindowClosesAt)}.`
    : `The founding window closes ${FOUNDING_WINDOW_WEEKS} weeks after first logins.`
}
