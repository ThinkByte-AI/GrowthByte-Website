'use client'

interface TemplateEditorToolbarProps {
  onSave: () => void
  onPreview?: () => void
}

const TOOLBAR_STYLE: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '12px 16px',
  background: '#1a1a1a',
  borderBottom: '1px solid #333',
}

const SAVE_BUTTON_STYLE: React.CSSProperties = {
  background: '#009389',
  color: 'white',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: '14px',
}

const PREVIEW_BUTTON_STYLE: React.CSSProperties = {
  background: '#333',
  color: '#ccc',
  border: '1px solid #444',
  padding: '8px 16px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: '14px',
}

const HINT_CODE_STYLE: React.CSSProperties = {
  background: '#333',
  padding: '2px 6px',
  borderRadius: '2px',
}

export default function TemplateEditorToolbar({ onSave, onPreview }: TemplateEditorToolbarProps) {
  return (
    <div className="editor-toolbar" style={TOOLBAR_STYLE}>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button onClick={onSave} style={SAVE_BUTTON_STYLE}>Save Template</button>
        {onPreview && (
          <button onClick={onPreview} style={PREVIEW_BUTTON_STYLE}>Preview</button>
        )}
      </div>
      <div style={{ color: '#888', fontSize: '12px' }}>
        Drag blocks from the left panel • Use <code style={HINT_CODE_STYLE}>{'{{placeholder}}'}</code> for dynamic content
      </div>
    </div>
  )
}
