'use client'

import { STARTER_PROMPTS } from './templates'

interface Props {
  prompt: string
  setPrompt: (v: string) => void
  isGenerating: boolean
  onGenerate: () => void
  thinking: string[]
  meta: { name: string; description: string; templateType: string } | null
  onSave: () => void
  saveStatus: 'idle' | 'saving' | 'saved' | 'error'
  savedId: string | null
}

export default function PromptPanel(props: Props) {
  const { prompt, setPrompt, isGenerating, onGenerate, thinking, meta, onSave, saveStatus, savedId } = props
  return (
    <div style={{ padding: 24, borderRight: '1px solid #2a2a2c', display: 'flex', flexDirection: 'column', gap: 20, overflow: 'auto' }}>
      <a href="/admin"
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#a3a3a3', textDecoration: 'none', padding: '6px 10px', marginLeft: -10, marginBottom: -4, borderRadius: 6, alignSelf: 'flex-start', transition: 'background .15s' }}
        onMouseEnter={(e) => (e.currentTarget.style.background = '#1c1c1e')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
        <span aria-hidden>←</span>
        <span>Back to admin</span>
      </a>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
          <img src="/logo.jpeg" alt="GrowthByte" width={32} height={32} style={{ borderRadius: 6, display: 'block' }} />
          <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 8 }}>
            <span style={{ display: 'inline-flex', alignItems: 'baseline', gap: 1, fontSize: 18, fontWeight: 700, letterSpacing: '-0.025em' }}>
              <span style={{ color: '#f5f5f5' }}>Growth</span>
              <span style={{ color: '#2dd4bf' }}>Byte</span>
            </span>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#737373' }}>Agent</span>
          </span>
        </div>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.01em' }}>Describe what you want to build</h1>
        <p style={{ fontSize: 13, color: '#a3a3a3', marginTop: 6, lineHeight: 1.5 }}>The GrowthByte agent generates a Payload page-template you can save and reuse.</p>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {STARTER_PROMPTS.map((s) => (
          <button key={s.key} type="button" onClick={() => setPrompt(s.prompt)} disabled={isGenerating}
            style={{ padding: '6px 12px', background: '#1c1c1e', border: '1px solid #2a2a2c', color: '#e5e5e5', borderRadius: 999, fontSize: 12, cursor: isGenerating ? 'not-allowed' : 'pointer' }}>
            {s.label}
          </button>
        ))}
      </div>

      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} disabled={isGenerating}
        placeholder="e.g. Build me a B2B SaaS landing page with hero, features, and CTA."
        style={{ minHeight: 120, padding: 14, background: '#1c1c1e', border: '1px solid #2a2a2c', borderRadius: 10, color: '#f5f5f5', fontSize: 14, fontFamily: 'inherit', resize: 'vertical' }} />

      <button type="button" onClick={onGenerate} disabled={isGenerating || !prompt.trim()}
        style={{ padding: '12px 18px', background: isGenerating ? '#1c1c1e' : '#2dd4bf', color: '#0a0a0a', border: 'none', borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: isGenerating || !prompt.trim() ? 'not-allowed' : 'pointer' }}>
        {isGenerating ? 'Generating…' : 'Generate template'}
      </button>

      {thinking.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 14, background: '#161618', borderRadius: 10, border: '1px solid #2a2a2c' }}>
          {thinking.map((t, i) => (
            <div key={i} style={{ fontSize: 12, color: i === thinking.length - 1 && isGenerating ? '#2dd4bf' : '#737373', display: 'flex', gap: 8 }}>
              <span>{i === thinking.length - 1 && isGenerating ? '◐' : '✓'}</span>
              <span>{t}</span>
            </div>
          ))}
        </div>
      )}

      {meta && (
        <div style={{ padding: 16, background: '#161618', borderRadius: 12, border: '1px solid #2a2a2c', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 700 }}>{meta.name}</span>
            <span style={{ fontSize: 10, padding: '3px 8px', background: '#0d3d36', color: '#2dd4bf', borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{meta.templateType}</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: '#a3a3a3', lineHeight: 1.5 }}>{meta.description}</p>
          <button type="button" onClick={onSave} disabled={saveStatus === 'saving' || saveStatus === 'saved'}
            style={{ marginTop: 6, padding: '10px 14px', background: saveStatus === 'saved' ? '#0d3d36' : '#f5f5f5', color: saveStatus === 'saved' ? '#2dd4bf' : '#0a0a0a', border: 'none', borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: saveStatus === 'saving' ? 'wait' : 'pointer' }}>
            {saveStatus === 'idle' && 'Save as Payload template'}
            {saveStatus === 'saving' && 'Saving…'}
            {saveStatus === 'saved' && '✓ Saved to page-templates'}
            {saveStatus === 'error' && 'Save failed — retry'}
          </button>
          {savedId && saveStatus === 'saved' && (
            <a href={`/admin/collections/page-templates/${savedId}`} style={{ fontSize: 12, color: '#2dd4bf', textDecoration: 'none' }}>Open in admin →</a>
          )}
        </div>
      )}
    </div>
  )
}
