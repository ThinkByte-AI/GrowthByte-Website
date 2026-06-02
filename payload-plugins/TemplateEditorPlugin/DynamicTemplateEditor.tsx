'use client'

import dynamic from 'next/dynamic'

const LOADING_BOX_STYLE = {
  height: '500px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: '#1a1a1a',
  borderRadius: '4px',
} as const

const DynamicTemplateEditor = dynamic(() => import('@/src/components/TemplateEditor'), {
  ssr: false,
  loading: () => (
    <div style={LOADING_BOX_STYLE}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ color: '#888' }}>Loading Template Editor...</p>
      </div>
    </div>
  ),
})

export default DynamicTemplateEditor
