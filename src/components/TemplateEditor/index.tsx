'use client'

import type { TemplateEditorProps } from './types'
import { useGrapesEditor } from './useGrapesEditor'
import TemplateEditorToolbar from './Toolbar'

const WRAPPER_STYLE: React.CSSProperties = {
  height: '600px',
  display: 'flex',
  flexDirection: 'column',
}

export default function TemplateEditor({ initialData, onSave, onPreview }: TemplateEditorProps) {
  const { containerRef, getOutput } = useGrapesEditor(initialData)

  const handleSave = () => {
    const output = getOutput()
    if (!output) return
    onSave(output.html, output.css, output.components)
  }

  const handlePreview = () => {
    if (!onPreview) return
    const output = getOutput()
    if (!output) return
    onPreview(output.html, output.css)
  }

  return (
    <div className="template-editor-wrapper" style={WRAPPER_STYLE}>
      <TemplateEditorToolbar onSave={handleSave} onPreview={onPreview ? handlePreview : undefined} />
      <div ref={containerRef} className="grapesjs-container" style={{ flex: 1 }} />
    </div>
  )
}
