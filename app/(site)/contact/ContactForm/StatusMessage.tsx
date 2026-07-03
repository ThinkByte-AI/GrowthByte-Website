import type { SubmitState } from './types'

interface StatusMessageProps {
  state: SubmitState
  errorText: string | null
}

const SUCCESS_TEXT = 'Thanks, we’ve received your request. We’ll respond within 24 hours.'
const DEFAULT_ERROR = 'Something went wrong. Please try again.'

export default function StatusMessage({ state, errorText }: StatusMessageProps) {
  if (state === 'success') {
    return (
      <div className="rounded-lg border border-teal/20 bg-teal/5 px-4 py-3 text-sm text-ink">
        {SUCCESS_TEXT}
      </div>
    )
  }
  if (state === 'error') {
    return (
      <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-ink">
        {errorText || DEFAULT_ERROR}
      </div>
    )
  }
  return null
}
