export interface TemplateEditorInitialData {
  html?: string
  css?: string
  components?: any
}

export interface TemplateEditorProps {
  initialData?: TemplateEditorInitialData
  onSave: (html: string, css: string, components: any) => void
  onPreview?: (html: string, css: string) => void
}

export type BlockRegistrar = (editor: any) => void
