'use client'

import { useEffect, useState } from 'react'

import type { CustomLayout, EditorTab, TemplateEditorFieldProps } from './types'
import { FOOTER_HINT, PANEL_BODY, PANEL_WRAPPER } from './styles'
import { openPreviewInNewTab } from './previewWindow'
import DynamicTemplateEditor from './DynamicTemplateEditor'
import TabBar from './TabBar'
import CodeTab from './CodeTab'
import ReadOnlyPlaceholder from './ReadOnlyPlaceholder'
import LoadingPlaceholder from './LoadingPlaceholder'

const useCustomLayoutSync = (
  customLayout: CustomLayout | undefined,
  setHtmlCode: (v: string) => void,
  setCssCode: (v: string) => void,
) => {
  useEffect(() => {
    if (!customLayout) return
    setHtmlCode(customLayout.html || '')
    setCssCode(customLayout.css || '')
  }, [customLayout, setHtmlCode, setCssCode])
}

export const TemplateEditorField = ({ readOnly, formData, updateFormData }: TemplateEditorFieldProps) => {
  const [isClient, setIsClient] = useState(false)
  const [activeTab, setActiveTab] = useState<EditorTab>('code')
  const [htmlCode, setHtmlCode] = useState('')
  const [cssCode, setCssCode] = useState('')

  useEffect(() => setIsClient(true), [])

  const customLayout = formData?.customLayout as CustomLayout | undefined
  useCustomLayoutSync(customLayout, setHtmlCode, setCssCode)

  const handleSaveFromVisual = (html: string, css: string, components: any) => {
    setHtmlCode(html)
    setCssCode(css)
    updateFormData?.({
      'customLayout.html': html,
      'customLayout.css': css,
      'customLayout.components': components,
    })
  }

  const handleSaveCode = () => {
    updateFormData?.({
      'customLayout.html': htmlCode,
      'customLayout.css': cssCode,
    })
  }

  const handlePreview = () => openPreviewInNewTab(htmlCode, cssCode)

  if (!isClient) return <LoadingPlaceholder />
  if (readOnly) return <ReadOnlyPlaceholder />

  return (
    <div style={PANEL_WRAPPER}>
      <TabBar active={activeTab} onChange={setActiveTab} />
      <div style={PANEL_BODY}>
        {activeTab === 'code' ? (
          <CodeTab
            htmlCode={htmlCode}
            cssCode={cssCode}
            onHtmlChange={setHtmlCode}
            onCssChange={setCssCode}
            onSave={handleSaveCode}
            onPreview={handlePreview}
          />
        ) : (
          <DynamicTemplateEditor
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
      <p style={FOOTER_HINT}>
        Use the Code tab to paste HTML/CSS directly, or Visual Builder for drag-and-drop editing.
      </p>
    </div>
  )
}
