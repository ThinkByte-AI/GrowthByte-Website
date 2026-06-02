export type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export interface ContactSubmission {
  name: string
  email: string
  phone: string
  company: string
  revenue: string
  industry: string
  message: string
}
