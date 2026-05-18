'use client'

import { ACTIONS_ROW, CODE_HEADER, actionButton, codeTextarea } from './styles'

interface CodeTabProps {
  htmlCode: string
  cssCode: string
  onHtmlChange: (value: string) => void
  onCssChange: (value: string) => void
  onSave: () => void
  onPreview: () => void
}

const SECTION_LABEL_STYLE = { color: '#ccc', fontWeight: 500, fontSize: '13px' } as const

export default function CodeTab({
  htmlCode,
  cssCode,
  onHtmlChange,
  onCssChange,
  onSave,
  onPreview,
}: CodeTabProps) {
  return (
    <div>
      <div style={{ borderBottom: '1px solid #333' }}>
        <div style={CODE_HEADER}>
          <span style={SECTION_LABEL_STYLE}>HTML</span>
        </div>
        <textarea
          value={htmlCode}
          onChange={(e) => onHtmlChange(e.target.value)}
          placeholder="Paste or write your HTML code here..."
          style={codeTextarea('#00b5aa', '300px')}
        />
      </div>

      <div>
        <div style={CODE_HEADER}>
          <span style={SECTION_LABEL_STYLE}>CSS</span>
        </div>
        <textarea
          value={cssCode}
          onChange={(e) => onCssChange(e.target.value)}
          placeholder="Paste or write your CSS styles here..."
          style={codeTextarea('#f59e0b', '200px')}
        />
      </div>

      <div style={ACTIONS_ROW}>
        <button onClick={onSave} style={actionButton(true)}>Save</button>
        <button onClick={onPreview} style={actionButton(false)}>Preview</button>
      </div>
    </div>
  )
}
