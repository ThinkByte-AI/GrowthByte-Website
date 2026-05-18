export interface ContentAreaConfig {
  width: 'prose' | 'medium' | 'wide' | 'full'
  showTableOfContents: boolean
  showShareButtons: boolean
}

export interface TemplateContentAreaProps {
  content: any
  config: ContentAreaConfig
  title?: string
}

export interface Heading {
  id: string
  text: string
  level: number
}
