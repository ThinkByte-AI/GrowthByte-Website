'use client'

interface Props {
  html: string
  css: string
  previewUrl: string | null
  activeTab: 'preview' | 'code'
  setActiveTab: (t: 'preview' | 'code') => void
  isGenerating: boolean
}

const buildDoc = (html: string, css: string) => `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}${css}</style></head><body>${html}</body></html>`

const tabStyle = (active: boolean): React.CSSProperties => ({
  padding: '10px 18px',
  background: active ? '#1c1c1e' : 'transparent',
  color: active ? '#f5f5f5' : '#737373',
  border: 'none',
  borderBottom: active ? '2px solid #2dd4bf' : '2px solid transparent',
  fontSize: 13,
  fontWeight: 600,
  cursor: 'pointer',
})

export default function PreviewPanel({ html, css, previewUrl, activeTab, setActiveTab, isGenerating }: Props) {
  const isEmpty = !html && !previewUrl
  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid #2a2a2c', background: '#161618' }}>
        <button type="button" onClick={() => setActiveTab('preview')} style={tabStyle(activeTab === 'preview')}>Preview</button>
        <button type="button" onClick={() => setActiveTab('code')} style={tabStyle(activeTab === 'code')}>Code</button>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', padding: '0 16px', gap: 6, fontSize: 11, color: '#737373' }}>
          {isGenerating && <><span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2dd4bf', animation: 'pulse 1s infinite' }} /> streaming</>}
          {!isGenerating && html && <span>{html.length.toLocaleString()} chars</span>}
        </div>
      </div>

      {isEmpty ? (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#525252', fontSize: 14, padding: 40, textAlign: 'center' }}>
          Your generated template will appear here.<br />
          <span style={{ fontSize: 12, color: '#404040', marginTop: 8 }}>Pick a starter prompt or describe what you want on the left.</span>
        </div>
      ) : activeTab === 'preview' ? (
        previewUrl ? (
          <iframe title="Template preview" src={previewUrl} sandbox="allow-same-origin allow-scripts"
            style={{ flex: 1, width: '100%', border: 'none', background: '#fff' }} />
        ) : (
          <iframe title="Template preview" srcDoc={buildDoc(html, css)} sandbox="allow-same-origin"
            style={{ flex: 1, width: '100%', border: 'none', background: '#fff' }} />
        )
      ) : (
        <pre style={{ flex: 1, margin: 0, padding: 20, background: '#0a0a0c', color: '#d4d4d4', fontSize: 12, lineHeight: 1.55, fontFamily: 'ui-monospace,Menlo,Consolas,monospace', overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {html}
          {css && `\n\n/* --- CSS --- */\n${css}`}
        </pre>
      )}

      <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}`}</style>
    </div>
  )
}
