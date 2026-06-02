export type TemplateEditorFieldProps = {
  path?: string
  readOnly?: boolean
  formData?: Record<string, unknown>
  updateFormData?: (data: Record<string, unknown>) => void
}

export type EditorTab = 'visual' | 'code'

export interface CustomLayout {
  html?: string
  css?: string
  components?: unknown
}
