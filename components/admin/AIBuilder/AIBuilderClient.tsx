'use client'

import { useState } from 'react'
import PromptPanel from './PromptPanel'
import PreviewPanel from './PreviewPanel'

interface Meta { name: string; description: string; templateType: string }

type StreamEvent =
  | { type: 'thinking'; message: string }
  | { type: 'meta'; name: string; templateType: string; description: string; previewUrl: string | null }
  | { type: 'html_chunk'; chunk: string }
  | { type: 'css'; css: string }
  | { type: 'done' }

export default function AIBuilderClient() {
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [thinking, setThinking] = useState<string[]>([])
  const [meta, setMeta] = useState<Meta | null>(null)
  const [html, setHtml] = useState('')
  const [css, setCss] = useState('')
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [savedId, setSavedId] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const handleGenerate = async () => {
    setIsGenerating(true)
    setThinking([])
    setMeta(null)
    setHtml('')
    setCss('')
    setSaveStatus('idle')
    setSavedId(null)
    setPreviewUrl(null)
    setActiveTab('preview')

    const res = await fetch('/api/ai-builder/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    })
    if (!res.body) { setIsGenerating(false); return }
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buf = ''
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buf += decoder.decode(value, { stream: true })
      const lines = buf.split('\n')
      buf = lines.pop() || ''
      for (const line of lines) {
        if (!line.trim()) continue
        const ev = JSON.parse(line) as StreamEvent
        if (ev.type === 'thinking') setThinking((p) => [...p, ev.message])
        else if (ev.type === 'meta') {
          setMeta({ name: ev.name, templateType: ev.templateType, description: ev.description })
          setPreviewUrl(ev.previewUrl)
        }
        else if (ev.type === 'html_chunk') setHtml((p) => p + ev.chunk)
        else if (ev.type === 'css') setCss(ev.css)
      }
    }
    setThinking((p) => [...p, 'Generation complete.'])
    setIsGenerating(false)
  }

  const handleSave = async () => {
    if (!meta) return
    setSaveStatus('saving')
    const res = await fetch('/api/ai-builder/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: meta.name,
        type: meta.templateType,
        description: meta.description,
        html, css, prompt,
      }),
    })
    if (!res.ok) { setSaveStatus('error'); return }
    const data = await res.json()
    setSavedId(String(data.id))
    setSaveStatus('saved')
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '420px 1fr', height: '100vh' }}>
      <PromptPanel
        prompt={prompt}
        setPrompt={setPrompt}
        isGenerating={isGenerating}
        onGenerate={handleGenerate}
        thinking={thinking}
        meta={meta}
        onSave={handleSave}
        saveStatus={saveStatus}
        savedId={savedId}
      />
      <PreviewPanel html={html} css={css} previewUrl={previewUrl} activeTab={activeTab} setActiveTab={setActiveTab} isGenerating={isGenerating} />
    </div>
  )
}
