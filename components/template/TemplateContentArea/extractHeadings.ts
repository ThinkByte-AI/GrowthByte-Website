import type { Heading } from './types'

const HEADING_TAGS = ['h2', 'h3']

export const extractHeadings = (content: any): Heading[] => {
  if (!content?.root?.children) return []

  const headings: Heading[] = []
  let counter = 0

  content.root.children.forEach((node: any) => {
    if (node.type !== 'heading' || !HEADING_TAGS.includes(node.tag)) return
    const text = node.children?.map((c: any) => c.text || '').join('') || ''
    headings.push({
      id: `heading-${counter++}`,
      text,
      level: node.tag === 'h2' ? 2 : 3,
    })
  })

  return headings
}
