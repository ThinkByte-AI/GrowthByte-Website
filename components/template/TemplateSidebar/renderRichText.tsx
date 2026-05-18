export const renderRichText = (content: any): React.ReactNode => {
  if (!content) return null
  if (typeof content === 'string') return <p>{content}</p>

  if (content.root?.children) {
    return content.root.children.map((node: any, i: number) => {
      if (node.type !== 'paragraph') return null
      const text = node.children?.map((c: any) => c.text || '').join('') || ''
      return <p key={i}>{text}</p>
    })
  }

  return null
}
