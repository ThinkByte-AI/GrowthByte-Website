import { useEffect, useRef, useState } from 'react'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'

import type { TemplateEditorInitialData } from './types'
import { buildGrapesInitOptions } from './grapesConfig'
import { registerCustomBlocks } from './blocks'
import { registerExportCodeCommand } from './exportCodeCommand'
import {
  enableEditableTextOnAdd,
  registerDevicePanel,
  loadInitialData,
  applyCanvasFontStyle,
} from './editorSetup'

export const useGrapesEditor = (initialData?: TemplateEditorInitialData) => {
  const editorRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current || editorRef.current) return

    const editor = grapesjs.init(buildGrapesInitOptions(containerRef.current))
    registerCustomBlocks(editor)
    enableEditableTextOnAdd(editor)
    registerDevicePanel(editor)
    registerExportCodeCommand(editor)
    loadInitialData(editor, initialData)
    applyCanvasFontStyle(editor)

    editorRef.current = editor
    setIsReady(true)

    return () => {
      editorRef.current?.destroy()
      editorRef.current = null
    }
  }, [])

  const getOutput = () => {
    const editor = editorRef.current
    if (!editor) return null
    return { html: editor.getHtml(), css: editor.getCss(), components: editor.getComponents() }
  }

  return { containerRef, isReady, getOutput }
}
