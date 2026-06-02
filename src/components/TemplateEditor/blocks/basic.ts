import type { BlockRegistrar } from '../types'

export const registerEditableTextType: BlockRegistrar = (editor) => {
  editor.DomComponents.addType('editable-text', {
    isComponent: (el: HTMLElement) =>
      el.tagName === 'H1' ||
      el.tagName === 'H2' ||
      el.tagName === 'H3' ||
      el.tagName === 'P' ||
      el.tagName === 'SPAN',
    model: { defaults: { editable: true } },
  })
}

export const registerRawHtmlBlock: BlockRegistrar = (editor) => {
  editor.Blocks.add('raw-html', {
    label: 'Custom HTML',
    category: 'Basic',
    content: {
      type: 'raw-html',
      components: '<!-- Paste your custom HTML code here. Double-click to edit. -->',
    },
    attributes: { class: 'gjs-block-html' },
  })

  editor.DomComponents.addType('raw-html', {
    isComponent: (el: HTMLElement) => el.dataset?.gjsType === 'raw-html',
    model: {
      defaults: {
        tagName: 'div',
        name: 'Custom HTML',
        editable: true,
        'custom-code': true,
        attributes: { 'data-gjs-type': 'raw-html' },
        traits: [
          { type: 'textarea', name: 'htmlCode', label: 'HTML Code', changeProp: 1 },
        ],
        style: {
          'min-height': '50px',
          padding: '20px',
          background: '#2a2a2a',
          border: '1px dashed #555',
          color: '#888',
          'text-align': 'center',
        },
      },
      init(this: any) {
        this.on('change:htmlCode', this.updateHtml)
      },
      updateHtml(this: any) {
        const code = this.get('htmlCode')
        if (code) this.components(code)
      },
    },
  })
}

export const registerCustomCssBlock: BlockRegistrar = (editor) => {
  editor.Blocks.add('custom-css', {
    label: 'Custom CSS',
    category: 'Basic',
    content: {
      type: 'custom-css',
      components: '<style>\n/* Add your custom CSS here */\n\n</style>',
    },
    attributes: { class: 'gjs-block-css' },
  })

  editor.DomComponents.addType('custom-css', {
    isComponent: (el: HTMLElement) => el.tagName === 'STYLE',
    model: {
      defaults: { tagName: 'style', name: 'Custom CSS', editable: true },
    },
  })
}

export const registerQuoteBlock: BlockRegistrar = (editor) => {
  editor.Blocks.add('quote-block', {
    label: 'Pull Quote',
    category: 'Basic',
    content: `
      <blockquote style="background: #f5f5f5; border-left: 4px solid #333; padding: 24px 32px; margin: 30px 0; font-size: 24px; font-style: italic; color: #666;">
        "Add your quote text here"
      </blockquote>
    `,
    attributes: { class: 'gjs-block-quote' },
  })
}
