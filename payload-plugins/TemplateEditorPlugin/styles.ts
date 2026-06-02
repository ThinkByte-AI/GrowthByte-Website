import type { CSSProperties } from 'react'

export const PANEL_WRAPPER: CSSProperties = { marginTop: '20px' }

export const PANEL_BODY: CSSProperties = {
  border: '1px solid #333',
  borderRadius: '0 4px 4px 4px',
  overflow: 'hidden',
  background: '#1a1a1a',
}

export const PLACEHOLDER_BOX: CSSProperties = {
  height: '400px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1a1a1a',
  borderRadius: '4px',
  border: '1px solid #333',
}

export const TAB_ROW: CSSProperties = {
  display: 'flex',
  gap: '4px',
  marginBottom: '12px',
}

export const tabButton = (active: boolean): CSSProperties => ({
  padding: '10px 20px',
  background: active ? '#009389' : '#333',
  color: active ? '#fff' : '#ccc',
  border: 'none',
  borderRadius: '4px 4px 0 0',
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: '14px',
})

export const CODE_HEADER: CSSProperties = {
  padding: '10px 16px',
  background: '#262626',
  borderBottom: '1px solid #333',
}

export const codeTextarea = (color: string, minHeight: string): CSSProperties => ({
  width: '100%',
  minHeight,
  padding: '16px',
  background: '#1a1a1a',
  color,
  border: 'none',
  fontFamily: 'monospace',
  fontSize: '13px',
  lineHeight: '1.6',
  resize: 'vertical',
})

export const ACTIONS_ROW: CSSProperties = {
  padding: '12px 16px',
  background: '#262626',
  display: 'flex',
  gap: '8px',
}

export const actionButton = (primary: boolean): CSSProperties => ({
  padding: '8px 20px',
  background: primary ? '#009389' : '#444',
  color: primary ? '#fff' : '#ccc',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 500,
  fontSize: '14px',
})

export const FOOTER_HINT: CSSProperties = {
  fontSize: '12px',
  color: '#888',
  marginTop: '8px',
}
