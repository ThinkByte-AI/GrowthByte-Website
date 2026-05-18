'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import GrapesJS editor to avoid SSR issues
const TemplateEditor = dynamic(
  () => import('@/src/components/TemplateEditor'),
  {
    ssr: false,
    loading: () => (
      <div style={{
        height: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a1a1a',
        borderRadius: '4px',
      }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#888' }}>Loading Template Editor...</p>
        </div>
      </div>
    ),
  }
)

type TemplateEditorFieldProps = {
  path?: string
  readOnly?: boolean
  formData?: Record<string, unknown>
  updateFormData?: (data: Record<string, unknown>) => void
}

export const TemplateEditorField = ({ readOnly, formData, updateFormData }: TemplateEditorFieldProps) => {
  const [isClient, setIsClient] = useState(false)
  const [activeTab, setActiveTab] = useState<'visual' | 'code'>('code')
  const [htmlCode, setHtmlCode] = useState('')
  const [cssCode, setCssCode] = useState('')

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Get current values from form data
  const customLayout = formData?.customLayout as Record<string, unknown> | undefined

  useEffect(() => {
    if (customLayout) {
      setHtmlCode((customLayout.html as string) || '')
      setCssCode((customLayout.css as string) || '')
    }
  }, [customLayout])

  const handleSaveFromVisual = (html: string, css: string, components: any) => {
    setHtmlCode(html)
    setCssCode(css)
    if (updateFormData) {
      updateFormData({
        'customLayout.html': html,
        'customLayout.css': css,
        'customLayout.components': components,
      } as Record<string, unknown>)
    }
  }

  const handleSaveCode = () => {
    if (updateFormData) {
      updateFormData({
        'customLayout.html': htmlCode,
        'customLayout.css': cssCode,
      } as Record<string, unknown>)
    }
  }

  const handlePreview = () => {
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
          body { font-family: 'Inter', sans-serif; }
          img { max-width: 100%; height: auto; }
        </style>
        <style>${cssCode}</style>
      </head>
      <body>
        ${htmlCode}
      </body>
      </html>
    `

    const blob = new Blob([previewHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  if (!isClient) {
    return (
      <div style={{ marginTop: '20px' }}>
        <div style={{
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1a1a1a',
          borderRadius: '4px',
          border: '1px solid #333',
        }}>
          <p style={{ color: '#888' }}>Loading...</p>
        </div>
      </div>
    )
  }

  if (readOnly) {
    return (
      <div style={{ marginTop: '20px' }}>
        <div style={{
          border: '1px solid #333',
          borderRadius: '4px',
          padding: '40px',
          background: '#1a1a1a',
          textAlign: 'center',
        }}>
          <p style={{ color: '#888' }}>Template preview is available in edit mode</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ marginTop: '20px' }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: '4px', marginBottom: '12px' }}>
        <button
          onClick={() => setActiveTab('code')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'code' ? '#009389' : '#333',
            color: activeTab === 'code' ? '#fff' : '#ccc',
            border: 'none',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px',
          }}
        >
          HTML / CSS Code
        </button>
        <button
          onClick={() => setActiveTab('visual')}
          style={{
            padding: '10px 20px',
            background: activeTab === 'visual' ? '#009389' : '#333',
            color: activeTab === 'visual' ? '#fff' : '#ccc',
            border: 'none',
            borderRadius: '4px 4px 0 0',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px',
          }}
        >
          Visual Builder
        </button>
      </div>

      {/* Tab Content */}
      <div style={{
        border: '1px solid #333',
        borderRadius: '0 4px 4px 4px',
        overflow: 'hidden',
        background: '#1a1a1a',
      }}>
        {activeTab === 'code' ? (
          <div>
            {/* HTML Editor */}
            <div style={{ borderBottom: '1px solid #333' }}>
              <div style={{
                padding: '10px 16px',
                background: '#262626',
                borderBottom: '1px solid #333',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ color: '#ccc', fontWeight: 500, fontSize: '13px' }}>HTML</span>
              </div>
              <textarea
                value={htmlCode}
                onChange={(e) => setHtmlCode(e.target.value)}
                placeholder="Paste or write your HTML code here..."
                style={{
                  width: '100%',
                  minHeight: '300px',
                  padding: '16px',
                  background: '#1a1a1a',
                  color: '#00b5aa',
                  border: 'none',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* CSS Editor */}
            <div>
              <div style={{
                padding: '10px 16px',
                background: '#262626',
                borderBottom: '1px solid #333',
              }}>
                <span style={{ color: '#ccc', fontWeight: 500, fontSize: '13px' }}>CSS</span>
              </div>
              <textarea
                value={cssCode}
                onChange={(e) => setCssCode(e.target.value)}
                placeholder="Paste or write your CSS styles here..."
                style={{
                  width: '100%',
                  minHeight: '200px',
                  padding: '16px',
                  background: '#1a1a1a',
                  color: '#f59e0b',
                  border: 'none',
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  resize: 'vertical',
                }}
              />
            </div>

            {/* Actions */}
            <div style={{
              padding: '12px 16px',
              background: '#262626',
              display: 'flex',
              gap: '8px',
            }}>
              <button
                onClick={handleSaveCode}
                style={{
                  padding: '8px 20px',
                  background: '#009389',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px',
                }}
              >
                Save
              </button>
              <button
                onClick={handlePreview}
                style={{
                  padding: '8px 20px',
                  background: '#444',
                  color: '#ccc',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 500,
                  fontSize: '14px',
                }}
              >
                Preview
              </button>
            </div>
          </div>
        ) : (
          <TemplateEditor
            initialData={{
              html: htmlCode,
              css: cssCode,
              components: customLayout?.components || null,
            }}
            onSave={handleSaveFromVisual}
            onPreview={() => {}}
          />
        )}
      </div>

      <p style={{
        fontSize: '12px',
        color: '#888',
        marginTop: '8px',
      }}>
        Use the Code tab to paste HTML/CSS directly, or Visual Builder for drag-and-drop editing.
      </p>
    </div>
  )
}
