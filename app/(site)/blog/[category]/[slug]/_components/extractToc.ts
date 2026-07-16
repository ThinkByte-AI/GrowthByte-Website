export interface TocItem {
  id: string
  label: string
  depth: 2 | 3
}

const HEADING_RE = /<(h2|h3)\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/gi

const stripTags = (html: string): string => html.replace(/<[^>]+>/g, '').trim()

export const extractToc = (html: string): TocItem[] => {
  const items: TocItem[] = []
  let match: RegExpExecArray | null
  while ((match = HEADING_RE.exec(html)) !== null) {
    const label = stripTags(match[3])
    if (label) items.push({ id: match[2], label, depth: match[1].toLowerCase() === 'h3' ? 3 : 2 })
  }
  return items
}
