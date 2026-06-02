import type { BlockRegistrar } from '../types'

export const registerRelatedPostsBlock: BlockRegistrar = (editor) => {
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
}

export const registerAuthorBlock: BlockRegistrar = (editor) => {
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
}
