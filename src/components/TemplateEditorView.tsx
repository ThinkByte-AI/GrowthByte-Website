'use client'

import { useState, useEffect } from 'react'
import TemplateEditor from './TemplateEditor'

interface TemplateEditorViewProps {
  templateId?: string
  initialData?: {
    html?: string
    css?: string
    components?: any
  }
  onSave: (data: { html: string; css: string; components: any }) => void
}

export default function TemplateEditorView({ templateId, initialData, onSave }: TemplateEditorViewProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const handleSave = async (html: string, css: string, components: any) => {
    setIsSaving(true)
    setSaveMessage(null)

    try {
      await onSave({ html, css, components })
      setSaveMessage('✅ Template saved successfully!')
      setTimeout(() => setSaveMessage(null), 3000)
    } catch (error) {
      setSaveMessage('❌ Failed to save template')
      console.error('Save error:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handlePreview = (html: string, css: string) => {
    // Create a preview in a new window/tab
    const previewHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Template Preview</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            line-height: 1.6;
            color: #0f172a;
          }
          img { max-width: 100%; height: auto; }
          a { color: #009389; }
        </style>
        <style>${css}</style>
      </head>
      <body>
        ${html}
      </body>
      </html>
    `

    const blob = new Blob([previewHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Save Message Toast */}
      {saveMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: saveMessage.includes('✅') ? '#10b981' : '#ef4444',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            zIndex: 9999,
            fontWeight: 600,
          }}
        >
          {saveMessage}
        </div>
      )}

      {/* Loading Overlay */}
      {isSaving && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: 'white',
              padding: '32px 48px',
              borderRadius: '12px',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                border: '4px solid #e2e8f0',
                borderTopColor: '#009389',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 16px',
              }}
            />
            <p style={{ color: '#0f172a', fontWeight: 600 }}>Saving template...</p>
          </div>
        </div>
      )}

      <TemplateEditor
        initialData={initialData}
        onSave={handleSave}
        onPreview={handlePreview}
      />
    </div>
  )
}
