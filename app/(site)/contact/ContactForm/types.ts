export type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export interface ContactPayload {
  name: string
  email: string
  phone: string
  company: string
  revenue: string
  industry: string
  message: string
}
