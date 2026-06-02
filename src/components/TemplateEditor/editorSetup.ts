import type { BlockRegistrar } from './types'
import type { TemplateEditorInitialData } from './types'

const EDITABLE_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button', 'li', 'blockquote']

export const enableEditableTextOnAdd: BlockRegistrar = (editor) => {
  editor.on('component:add', (component: any) => {
    const tagName = component.get('tagName')
    if (EDITABLE_TAGS.includes(tagName)) component.set('editable', true)
  })
}

export const registerDevicePanel: BlockRegistrar = (editor) => {
  editor.Panels.addPanel({
    id: 'panel-devices',
    el: '.panel__devices',
    buttons: [
      { id: 'device-desktop', command: 'set-device-desktop', active: true, label: 'Desktop' },
      { id: 'device-tablet', command: 'set-device-tablet', label: 'Tablet' },
      { id: 'device-mobile', command: 'set-device-mobile', label: 'Mobile' },
    ],
  })
}

export const loadInitialData = (editor: any, initialData?: TemplateEditorInitialData) => {
  if (!initialData) return
  if (initialData.html) editor.setComponents(initialData.html)
  if (initialData.css) editor.setStyle(initialData.css)
}

export const applyCanvasFontStyle: BlockRegistrar = (editor) => {
  const frame = editor.Canvas.getFrame()
  if (frame) frame.set('style', 'body { font-family: Inter, sans-serif; }')
}
