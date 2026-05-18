'use client'

import { PANEL_WRAPPER, PLACEHOLDER_BOX } from './styles'

export default function LoadingPlaceholder() {
  return (
    <div style={PANEL_WRAPPER}>
      <div style={PLACEHOLDER_BOX}>
        <p style={{ color: '#888' }}>Loading...</p>
      </div>
    </div>
  )
}
