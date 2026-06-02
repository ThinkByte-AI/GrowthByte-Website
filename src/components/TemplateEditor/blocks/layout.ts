import type { BlockRegistrar } from '../types'

export const registerSectionBlock: BlockRegistrar = (editor) => {
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
}

export const registerContainerBlock: BlockRegistrar = (editor) => {
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
}

export const registerHeroBlock: BlockRegistrar = (editor) => {
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
}

export const registerContentAreaBlock: BlockRegistrar = (editor) => {
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
}

export const registerCardGridBlock: BlockRegistrar = (editor) => {
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
}

export const registerImageTextBlock: BlockRegistrar = (editor) => {
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
}

export const registerCtaBlock: BlockRegistrar = (editor) => {
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
