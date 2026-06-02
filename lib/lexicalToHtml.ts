interface LexicalUploadValue {
  url?: string
  alt?: string
}

interface LexicalLinkFields {
  url?: string
  newTab?: boolean
  linkType?: 'custom' | 'internal'
  rel?: string[]
}

interface LexicalNode {
  type: string
  children?: LexicalNode[]
  text?: string
  tag?: string
  format?: number
  listType?: string
  url?: string
  fields?: LexicalLinkFields
  direction?: string
  indent?: number
  value?: LexicalUploadValue
  root?: { children?: LexicalNode[] }
}

interface RenderState {
  headingIndex: number
}

const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_STRIKETHROUGH = 4
const FORMAT_UNDERLINE = 8

const formatText = (text: string, format?: number): string => {
  if (!format) return text
  let result = text
  if (format & FORMAT_BOLD) result = `<strong>${result}</strong>`
  if (format & FORMAT_ITALIC) result = `<em>${result}</em>`
  if (format & FORMAT_UNDERLINE) result = `<u>${result}</u>`
  if (format & FORMAT_STRIKETHROUGH) result = `<s>${result}</s>`
  return result
}

const renderHeading = (node: LexicalNode, state: RenderState): string => {
  const tag = node.tag || 'h2'
  const inner = nodesToHtml(node.children || [], state)
  if (tag === 'h2' || tag === 'h3') {
    const id = `heading-${state.headingIndex++}`
    return `<${tag} id="${id}">${inner}</${tag}>`
  }
  return `<${tag}>${inner}</${tag}>`
}

const renderUpload = (node: LexicalNode): string => {
  if (!node.value?.url) return ''
  return `<img src="${node.value.url}" alt="${node.value.alt || ''}" />`
}

const escapeHref = (raw: string): string =>
  raw.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const renderLink = (node: LexicalNode, state: RenderState): string => {
  const url = node.fields?.url || node.url || '#'
  const newTab = Boolean(node.fields?.newTab)
  const relValues = node.fields?.rel ?? (newTab ? ['noopener', 'noreferrer'] : [])
  const inner = nodesToHtml(node.children || [], state)
  const attrs = [
    `href="${escapeHref(url)}"`,
    newTab ? 'target="_blank"' : '',
    relValues.length > 0 ? `rel="${relValues.join(' ')}"` : '',
  ]
    .filter(Boolean)
    .join(' ')
  return `<a ${attrs}>${inner}</a>`
}

const nodeToHtml = (node: LexicalNode, state: RenderState): string => {
  switch (node.type) {
    case 'text':
      return formatText(node.text || '', node.format)
    case 'paragraph':
      return `<p>${nodesToHtml(node.children || [], state)}</p>`
    case 'heading':
      return renderHeading(node, state)
    case 'list': {
      const listTag = node.listType === 'number' ? 'ol' : 'ul'
      return `<${listTag}>${nodesToHtml(node.children || [], state)}</${listTag}>`
    }
    case 'listitem':
      return `<li>${nodesToHtml(node.children || [], state)}</li>`
    case 'link':
      return renderLink(node, state)
    case 'quote':
      return `<blockquote>${nodesToHtml(node.children || [], state)}</blockquote>`
    case 'linebreak':
      return '<br>'
    case 'upload':
      return renderUpload(node)
    case 'relationship':
      return nodesToHtml(node.children || [], state)
    case 'autolink':
      return `<a href="${node.url || '#'}">${node.text || ''}</a>`
    default:
      if (node.children) return nodesToHtml(node.children, state)
      return ''
  }
}

const nodesToHtml = (nodes: LexicalNode[], state: RenderState): string =>
  nodes.map((n) => nodeToHtml(n, state)).join('')

const parseLexicalInput = (input: any): LexicalNode | null => {
  if (!input) return null
  try {
    return typeof input === 'string' ? JSON.parse(input) : input
  } catch {
    return null
  }
}

export function lexicalToHtml(lexicalContent: any): string {
  const content = parseLexicalInput(lexicalContent)
  if (!content) return ''

  const state: RenderState = { headingIndex: 0 }

  if (content.root?.children) return nodesToHtml(content.root.children, state)
  if (Array.isArray(content)) return nodesToHtml(content, state)
  if (content.children) return nodesToHtml(content.children, state)
  return ''
}
