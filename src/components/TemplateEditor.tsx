'use client'

import { useEffect, useRef, useState } from 'react'
import grapesjs from 'grapesjs'
import gjsBlocksBasic from 'grapesjs-blocks-basic'
import gjsPresetWebpage from 'grapesjs-preset-webpage'
import 'grapesjs/dist/css/grapes.min.css'

interface TemplateEditorProps {
  initialData?: any
  onSave: (html: string, css: string, components: any) => void
  onPreview?: (html: string, css: string) => void
}

// Generic blocks - no hardcoded branding, works for any website
const customBlocks = (editor: any) => {
  // Make text components editable by default
  editor.DomComponents.addType('editable-text', {
    isComponent: (el: HTMLElement) => el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'P' || el.tagName === 'SPAN',
    model: {
      defaults: {
        editable: true,
      },
    },
  })

  // Raw HTML Block - paste any HTML code (universal)
  editor.Blocks.add('raw-html', {
    label: 'Custom HTML',
    category: 'Basic',
    content: {
      type: 'raw-html',
      components: '<!-- Paste your custom HTML code here. Double-click to edit. -->',
    },
    attributes: { class: 'gjs-block-html' },
  })

  // Register Custom HTML component type
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
          {
            type: 'textarea',
            name: 'htmlCode',
            label: 'HTML Code',
            changeProp: 1,
          },
        ],
        style: {
          'min-height': '50px',
          'padding': '20px',
          'background': '#2a2a2a',
          'border': '1px dashed #555',
          'color': '#888',
          'text-align': 'center',
        },
      },
      init(this: any) {
        this.on('change:htmlCode', this.updateHtml)
      },
      updateHtml(this: any) {
        const code = this.get('htmlCode')
        if (code) {
          this.components(code)
        }
      },
    },
  })

  // Custom CSS block
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
      defaults: {
        tagName: 'style',
        name: 'Custom CSS',
        editable: true,
      },
    },
  })

  // Generic Section block (no branding)
  editor.Blocks.add('section-block', {
    label: 'Section',
    category: 'Layout',
    content: `
      <section style="padding: 60px 20px; background: #ffffff;">
        <div style="max-width: 1200px; margin: 0 auto;">
          <h2 style="font-size: 32px; margin-bottom: 20px;">Section Title</h2>
          <p style="font-size: 18px; line-height: 1.6; color: #666;">Section content goes here.</p>
        </div>
      </section>
    `,
    attributes: { class: 'gjs-block-section' },
  })

  // Generic Container block
  editor.Blocks.add('container-block', {
    label: 'Container',
    category: 'Layout',
    content: `
      <div style="max-width: 1200px; margin: 0 auto; padding: 20px;">
        <!-- Add content here -->
      </div>
    `,
    attributes: { class: 'gjs-block-container' },
  })

  // Generic Hero block (no branding, just structure)
  editor.Blocks.add('hero-section', {
    label: 'Hero Section',
    category: 'Layout',
    content: `
      <section style="padding: 100px 20px; background: #1a1a1a; text-align: center;">
        <div style="max-width: 800px; margin: 0 auto;">
          <h1 style="font-size: 48px; color: #ffffff; margin-bottom: 20px;">{{title}}</h1>
          <p style="font-size: 20px; color: #cccccc; margin-bottom: 30px;">{{excerpt}}</p>
          <a href="#" style="display: inline-block; padding: 16px 32px; background: #007bff; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Learn More</a>
        </div>
      </section>
    `,
    attributes: { class: 'gjs-block-hero' },
  })

  // Generic Content Area
  editor.Blocks.add('content-area', {
    label: 'Content Area',
    category: 'Layout',
    content: `
      <article style="max-width: 800px; margin: 0 auto; padding: 40px 20px;">
        {{content}}
      </article>
    `,
    attributes: { class: 'gjs-block-content' },
  })

  // Generic Card/Grid block
  editor.Blocks.add('card-grid', {
    label: 'Card Grid',
    category: 'Layout',
    content: `
      <section style="padding: 60px 20px;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
            <h3 style="margin-bottom: 10px;">Card Title</h3>
            <p style="color: #666;">Card description text.</p>
          </div>
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
            <h3 style="margin-bottom: 10px;">Card Title</h3>
            <p style="color: #666;">Card description text.</p>
          </div>
          <div style="border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
            <h3 style="margin-bottom: 10px;">Card Title</h3>
            <p style="color: #666;">Card description text.</p>
          </div>
        </div>
      </section>
    `,
    attributes: { class: 'gjs-block-grid' },
  })

  // Related Posts block (dynamic)
  editor.Blocks.add('related-posts-block', {
    label: 'Related Posts',
    category: 'Dynamic',
    content: `
      <section style="padding: 60px 20px; background: #f9f9f9;">
        <h2 style="font-size: 28px; margin-bottom: 30px;">Related Posts</h2>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px;">
          {{#relatedPosts}}
          <article style="border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="height: 160px; background: #e2e8f0; background-image: url({{featuredImage}}); background-size: cover;"></div>
            <div style="padding: 20px;">
              <h3 style="font-size: 16px; margin-bottom: 10px;">{{title}}</h3>
              <p style="font-size: 14px; color: #666;">{{excerpt}}</p>
            </div>
          </article>
          {{/relatedPosts}}
        </div>
      </section>
    `,
    attributes: { class: 'gjs-block-related' },
  })

  // Author Box block (dynamic)
  editor.Blocks.add('author-block', {
    label: 'Author Box',
    category: 'Dynamic',
    content: `
      <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin: 40px 0; display: flex; gap: 20px; align-items: center;">
        <img src="{{authorImage}}" alt="{{author}}" style="width: 64px; height: 64px; border-radius: 50%; object-fit: cover; background: #ddd;" />
        <div>
          <h3 style="font-size: 18px; margin-bottom: 5px;">Written by {{author}}</h3>
          <p style="font-size: 14px; color: #666; margin: 0;">{{authorBio}}</p>
        </div>
      </div>
    `,
    attributes: { class: 'gjs-block-author' },
  })

  // Image + Text block (generic)
  editor.Blocks.add('image-text-block', {
    label: 'Image + Text',
    category: 'Layout',
    content: `
      <section style="padding: 60px 20px;">
        <div style="max-width: 1200px; margin: 0 auto; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center;">
          <div style="background: #e2e8f0; height: 400px; border-radius: 12px; background-image: url({{featuredImage}}); background-size: cover;"></div>
          <div>
            <h2 style="font-size: 32px; margin-bottom: 20px;">Section Title</h2>
            <p style="font-size: 18px; line-height: 1.8; color: #666; margin-bottom: 20px;">
              Description text goes here. You can customize this section for any content.
            </p>
            <a href="#" style="color: #007bff; font-weight: 600; text-decoration: none;">Learn More</a>
          </div>
        </div>
      </section>
    `,
    attributes: { class: 'gjs-block-image-text' },
  })

  // Quote Block (generic)
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

  // CTA Block (generic, no branding)
  editor.Blocks.add('cta-block', {
    label: 'CTA Section',
    category: 'Layout',
    content: `
      <section style="background: #1a1a1a; padding: 60px 20px; text-align: center;">
        <h2 style="font-size: 36px; color: white; margin-bottom: 15px;">Ready to get started?</h2>
        <p style="font-size: 18px; color: #cccccc; margin-bottom: 30px; max-width: 500px; margin-left: auto; margin-right: auto;">
          Add your call-to-action description here.
        </p>
        <a href="/contact" style="display: inline-block; padding: 16px 32px; background: #007bff; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">
          Get Started
        </a>
      </section>
    `,
    attributes: { class: 'gjs-block-cta' },
  })
}

export default function TemplateEditor({ initialData, onSave, onPreview }: TemplateEditorProps) {
  const editorRef = useRef<any>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!containerRef.current || editorRef.current) return

    // Initialize GrapesJS
    const editor = grapesjs.init({
      container: containerRef.current,
      height: '100%',
      width: 'auto',
      storageManager: false,
      fromElement: false,
      plugins: [gjsBlocksBasic, gjsPresetWebpage],
      pluginsOpts: {
        [gjsBlocksBasic as any]: {
          blocks: ['column1', 'column2', 'column3', 'text', 'link', 'image', 'video'],
          flexGrid: true,
        },
        [gjsPresetWebpage as any]: {
          blocksBasicOpts: {
            flexGrid: true,
          },
          navbarOpts: false,
          countdownOpts: false,
          formsOpts: false,
        },
      },
      canvas: {
        styles: [
          'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        ],
      },
      deviceManager: {
        devices: [
          {
            id: 'desktop',
            name: 'Desktop',
            width: '',
          },
          {
            id: 'tablet',
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px',
          },
          {
            id: 'mobile',
            name: 'Mobile',
            width: '375px',
            widthMedia: '576px',
          },
        ],
      },
      selectorManager: {
        componentFirst: true,
      },
      styleManager: {
        sectors: [
          {
            name: 'Dimension',
            open: true,
            properties: ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height', 'padding', 'margin'],
          },
          {
            name: 'Typography',
            open: false,
            properties: ['font-size', 'font-weight', 'font-family', 'color', 'line-height', 'text-align', 'letter-spacing'],
          },
          {
            name: 'Background',
            open: false,
            properties: ['background', 'background-color', 'background-image', 'background-size', 'background-repeat'],
          },
          {
            name: 'Border',
            open: false,
            properties: ['border', 'border-radius', 'border-color', 'border-width', 'border-style'],
          },
          {
            name: 'Extra',
            open: false,
            properties: ['display', 'flex-direction', 'justify-content', 'align-items', 'gap', 'opacity', 'box-shadow'],
          },
        ],
      },
    })

    // Add custom blocks (generic, no branding)
    customBlocks(editor)

    // Make all text elements editable by default
    editor.on('component:add', (component: any) => {
      const tagName = component.get('tagName')
      if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'button', 'li', 'blockquote'].includes(tagName)) {
        component.set('editable', true)
      }
    })

    // Add device buttons
    editor.Panels.addPanel({
      id: 'panel-devices',
      el: '.panel__devices',
      buttons: [
        {
          id: 'device-desktop',
          command: 'set-device-desktop',
          active: true,
          label: 'Desktop',
        },
        {
          id: 'device-tablet',
          command: 'set-device-tablet',
          label: 'Tablet',
        },
        {
          id: 'device-mobile',
          command: 'set-device-mobile',
          label: 'Mobile',
        },
      ],
    })

    // Add View Code button
    editor.Panels.addButton('options', {
      id: 'view-code',
      className: 'fa fa-code',
      command: 'export-code',
      attributes: { title: 'View Code' },
    })

    // Export code command
    editor.Commands.add('export-code', {
      run: (editor: any) => {
        const html = editor.getHtml()
        const css = editor.getCss()

        const modal = editor.Modal
        modal.setTitle('Export Code')
        modal.setContent(`
          <div style="padding: 20px;">
            <h4 style="margin-bottom: 10px; color: #ccc;">HTML</h4>
            <textarea style="width: 100%; height: 200px; background: #1a1a1a; color: #00b5aa; border: 1px solid #333; padding: 10px; font-family: monospace; font-size: 12px; resize: vertical;">${html}</textarea>
            <h4 style="margin: 20px 0 10px; color: #ccc;">CSS</h4>
            <textarea style="width: 100%; height: 150px; background: #1a1a1a; color: #00b5aa; border: 1px solid #333; padding: 10px; font-family: monospace; font-size: 12px; resize: vertical;">${css}</textarea>
          </div>
        `)
        modal.open()
      },
    })

    // Load initial data if exists
    if (initialData) {
      if (initialData.html) {
        editor.setComponents(initialData.html)
      }
      if (initialData.css) {
        editor.setStyle(initialData.css)
      }
    }

    // Style the canvas
    const frame = editor.Canvas.getFrame()
    if (frame) {
      frame.set('style', 'body { font-family: Inter, sans-serif; }')
    }

    editorRef.current = editor
    setIsReady(true)

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy()
        editorRef.current = null
      }
    }
  }, [])

  const handleSave = () => {
    if (!editorRef.current) return

    const html = editorRef.current.getHtml()
    const css = editorRef.current.getCss()
    const components = editorRef.current.getComponents()

    onSave(html, css, components)
  }

  const handlePreview = () => {
    if (!editorRef.current || !onPreview) return

    const html = editorRef.current.getHtml()
    const css = editorRef.current.getCss()

    onPreview(html, css)
  }

  return (
    <div className="template-editor-wrapper" style={{ height: '600px', display: 'flex', flexDirection: 'column' }}>
      {/* Editor Toolbar */}
      <div className="editor-toolbar" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '12px 16px',
        background: '#1a1a1a',
        borderBottom: '1px solid #333',
      }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleSave}
            style={{
              background: '#009389',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 500,
              fontSize: '14px',
            }}
          >
            Save Template
          </button>
          {onPreview && (
            <button
              onClick={handlePreview}
              style={{
                background: '#333',
                color: '#ccc',
                border: '1px solid #444',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontWeight: 500,
                fontSize: '14px',
              }}
            >
              Preview
            </button>
          )}
        </div>
        <div style={{ color: '#888', fontSize: '12px' }}>
          Drag blocks from the left panel • Use <code style={{ background: '#333', padding: '2px 6px', borderRadius: '2px' }}>{"{{placeholder}}"}</code> for dynamic content
        </div>
      </div>

      {/* GrapesJS Container */}
      <div ref={containerRef} className="grapesjs-container" style={{ flex: 1 }} />
    </div>
  )
}
