interface TocHeading {
  id: string
  text: string
  level: 2 | 3
}

const collectHeadings = (content: any): TocHeading[] => {
  if (!content?.root?.children) return []
  const result: TocHeading[] = []
  let counter = 0
  for (const node of content.root.children) {
    if (node.type !== 'heading') continue
    if (node.tag !== 'h2' && node.tag !== 'h3') continue
    const text = node.children?.map((c: any) => c.text || '').join('') || ''
    result.push({
      id: `heading-${counter++}`,
      text,
      level: node.tag === 'h2' ? 2 : 3,
    })
  }
  return result
}

const linkClass = (level: 2 | 3) => {
  const indent = level === 3 ? 'pl-7' : 'pl-3'
  return `toc-link block text-sm py-1 border-l-2 ${indent} border-ink-10 text-ink-50 hover:text-ink transition-colors`
}

const renderItem = (h: TocHeading): string =>
  `<li><a href="#${h.id}" class="${linkClass(h.level)}" data-toc-link="${h.id}">${h.text}</a></li>`

export const buildTocHtml = (content: any): string => {
  const headings = collectHeadings(content)
  if (headings.length === 0) return ''
  const items = headings.map(renderItem).join('')
  return `<nav class="toc sticky top-24"><h4 class="text-xs font-semibold text-ink-40 uppercase tracking-wide mb-3">On this page</h4><ul class="space-y-2">${items}</ul></nav>`
}
