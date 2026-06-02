'use client'

import type { Heading } from './types'

const TEXT_FORMAT_BOLD = 1
const TEXT_FORMAT_ITALIC = 2
const TEXT_FORMAT_CODE = 8

const renderTextNode = (child: any): React.ReactNode => {
  let text: React.ReactNode = child.text
  if (child.format === TEXT_FORMAT_BOLD) text = <strong>{text}</strong>
  if (child.format === TEXT_FORMAT_ITALIC) text = <em>{text}</em>
  if (child.format === TEXT_FORMAT_CODE) text = <code>{text}</code>
  return text
}

const renderLinkNode = (child: any): React.ReactNode => (
  <a key={child.url} href={child.url} target={child.newTab ? '_blank' : undefined}>
    {child.children?.map((c: any) => c.text || '').join('')}
  </a>
)

const renderParagraphChildren = (node: any): React.ReactNode =>
  node.children?.map((child: any) => {
    if (child.type === 'text') return renderTextNode(child)
    if (child.type === 'link') return renderLinkNode(child)
    return null
  })

const renderHeading = (node: any, key: number, headingId?: string): React.ReactNode => {
  const Tag = (node.tag || 'h2') as 'h2' | 'h3'
  const text = node.children?.map((c: any) => c.text || '').join('') || ''
  return <Tag key={key} id={headingId}>{text}</Tag>
}

const renderList = (node: any, key: number): React.ReactNode => {
  const ListTag = node.listType === 'number' ? 'ol' : 'ul'
  return (
    <ListTag key={key}>
      {node.children?.map((item: any, j: number) => (
        <li key={j}>{item.children?.map((c: any) => c.text || '').join('')}</li>
      ))}
    </ListTag>
  )
}

const renderQuote = (node: any, key: number): React.ReactNode => {
  const text = node.children?.map((c: any) => c.text || '').join('') || ''
  return <blockquote key={key}>{text}</blockquote>
}

const renderUpload = (node: any, key: number): React.ReactNode => (
  <img key={key} src={node.value?.url || ''} alt={node.value?.alt || ''} />
)

interface ContentRendererProps {
  content: any
  headings: Heading[]
}

export default function ContentRenderer({ content, headings }: ContentRendererProps) {
  if (!content) return null
  if (typeof content === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: content }} />
  }
  if (!content.root?.children) return null

  let headingIndex = 0
  return (
    <>
      {content.root.children.map((node: any, i: number) => {
        if (node.type === 'paragraph') return <p key={i}>{renderParagraphChildren(node)}</p>
        if (node.type === 'heading') {
          const id = headings[headingIndex]?.id
          if (node.tag === 'h2' || node.tag === 'h3') headingIndex++
          return renderHeading(node, i, id)
        }
        if (node.type === 'list') return renderList(node, i)
        if (node.type === 'quote') return renderQuote(node, i)
        if (node.type === 'upload') return renderUpload(node, i)
        return null
      })}
    </>
  )
}
