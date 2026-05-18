// Convert Payload Lexical JSON to HTML

interface LexicalUploadValue {
  url?: string
  alt?: string
}

interface LexicalNode {
  type: string
  children?: LexicalNode[]
  text?: string
  tag?: string
  format?: number
  listType?: string
  url?: string
  direction?: string
  indent?: number
  value?: LexicalUploadValue
  root?: { children?: LexicalNode[] }
}

// Format flags
const FORMAT_BOLD = 1
const FORMAT_ITALIC = 2
const FORMAT_UNDERLINE = 8
const FORMAT_STRIKETHROUGH = 4

function formatText(text: string, format?: number): string {
  if (!format) return text

  let result = text

  if (format & FORMAT_BOLD) {
    result = `<strong>${result}</strong>`
  }
  if (format & FORMAT_ITALIC) {
    result = `<em>${result}</em>`
  }
  if (format & FORMAT_UNDERLINE) {
    result = `<u>${result}</u>`
  }
  if (format & FORMAT_STRIKETHROUGH) {
    result = `<s>${result}</s>`
  }

  return result
}

function nodeToHtml(node: LexicalNode): string {
  switch (node.type) {
    case 'text':
      return formatText(node.text || '', node.format)

    case 'paragraph':
      return `<p>${nodesToHtml(node.children || [])}</p>`

    case 'heading':
      return `<${node.tag || 'h2'}>${nodesToHtml(node.children || [])}</${node.tag || 'h2'}>`

    case 'list':
      const listTag = node.listType === 'number' ? 'ol' : 'ul'
      return `<${listTag}>${nodesToHtml(node.children || [])}</${listTag}>`

    case 'listitem':
      return `<li>${nodesToHtml(node.children || [])}</li>`

    case 'link':
      return `<a href="${node.url || '#'}">${nodesToHtml(node.children || [])}</a>`

    case 'quote':
      return `<blockquote>${nodesToHtml(node.children || [])}</blockquote>`

    case 'linebreak':
      return '<br>'

    case 'upload':
      // Image upload
      if (node.value?.url) {
        return `<img src="${node.value.url}" alt="${node.value.alt || ''}" />`
      }
      return ''

    case 'relationship':
      // Internal link - just show text for now
      return nodesToHtml(node.children || [])

    case 'autolink':
      return `<a href="${node.url || '#'}">${node.text || ''}</a>`

    default:
      // For unknown types, try to render children
      if (node.children) {
        return nodesToHtml(node.children)
      }
      return ''
  }
}

function nodesToHtml(nodes: LexicalNode[]): string {
  return nodes.map(nodeToHtml).join('')
}

export function lexicalToHtml(lexicalContent: any): string {
  if (!lexicalContent) return ''

  // Handle string (JSON) or object
  let content: LexicalNode
  try {
    content = typeof lexicalContent === 'string'
      ? JSON.parse(lexicalContent)
      : lexicalContent
  } catch {
    return ''
  }

  // Check if it's a root document
  if (content.root?.children) {
    return nodesToHtml(content.root.children)
  }

  // Direct children array
  if (Array.isArray(content)) {
    return nodesToHtml(content)
  }

  // Single node with children
  if (content.children) {
    return nodesToHtml(content.children)
  }

  return ''
}
