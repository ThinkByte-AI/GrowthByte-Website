export interface GeneratedTemplate {
  name: string
  type: 'blog' | 'service' | 'landing' | 'case-study'
  description: string
  html: string
  css: string
  previewUrl?: string
}
