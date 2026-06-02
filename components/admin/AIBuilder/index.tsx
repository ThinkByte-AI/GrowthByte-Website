import AIBuilderClient from './AIBuilderClient'

export default function AIBuilderView() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--theme-bg, #0f0f10)', color: 'var(--theme-text, #f5f5f5)' }}>
      <AIBuilderClient />
    </div>
  )
}
