'use client'

import { PANEL_WRAPPER } from './styles'

const READONLY_BOX_STYLE = {
  border: '1px solid #333',
  borderRadius: '4px',
  padding: '40px',
  background: '#1a1a1a',
  textAlign: 'center',
} as const

export default function ReadOnlyPlaceholder() {
  return (
    <div style={PANEL_WRAPPER}>
      <div style={READONLY_BOX_STYLE}>
        <p style={{ color: '#888' }}>Template preview is available in edit mode</p>
      </div>
    </div>
  )
}
