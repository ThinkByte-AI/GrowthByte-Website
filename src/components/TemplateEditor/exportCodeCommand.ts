import type { BlockRegistrar } from './types'

const CODE_TEXTAREA_STYLE =
  'width: 100%; background: #1a1a1a; color: #00b5aa; border: 1px solid #333; padding: 10px; font-family: monospace; font-size: 12px; resize: vertical;'

const buildExportModalContent = (html: string, css: string) => `
  <div style="padding: 20px;">
    <h4 style="margin-bottom: 10px; color: #ccc;">HTML</h4>
    <textarea style="${CODE_TEXTAREA_STYLE} height: 200px;">${html}</textarea>
    <h4 style="margin: 20px 0 10px; color: #ccc;">CSS</h4>
    <textarea style="${CODE_TEXTAREA_STYLE} height: 150px;">${css}</textarea>
  </div>
`

export const registerExportCodeCommand: BlockRegistrar = (editor) => {
  editor.Panels.addButton('options', {
    id: 'view-code',
    className: 'fa fa-code',
    command: 'export-code',
    attributes: { title: 'View Code' },
  })

  editor.Commands.add('export-code', {
    run: (instance: any) => {
      const html = instance.getHtml()
      const css = instance.getCss()
      const modal = instance.Modal
      modal.setTitle('Export Code')
      modal.setContent(buildExportModalContent(html, css))
      modal.open()
    },
  })
}
