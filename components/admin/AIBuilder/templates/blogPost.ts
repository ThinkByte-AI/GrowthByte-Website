import type { GeneratedTemplate } from './types'

const html = `<article class="post">
  <header class="post-header">
    <div class="container-narrow">
      <div class="crumb"><a href="/blog">← All essays</a><span class="dot">/</span><span>{{category}}</span></div>
      <span class="tag">{{category}}</span>
      <h1 class="post-title">{{title}}</h1>
      <p class="post-lede">{{excerpt}}</p>
      <div class="byline">
        <img class="avatar" src="{{authorImage}}" alt="{{author}}" onerror="this.style.display='none'" />
        <div class="byline-meta">
          <span class="byline-name">{{author}}</span>
          <span class="byline-sub">{{publishedAt}} · {{readTime}} min read</span>
        </div>
      </div>
    </div>
  </header>
  <div class="hero-image-wrap">
    <div class="container-narrow">
      <div class="hero-image">
        <img src="{{featuredImage}}" alt="{{featuredImageAlt}}" />
      </div>
    </div>
  </div>
  <section class="post-body-wrap">
    <div class="container-narrow">
      <div class="post-body">{{content}}</div>
      <div class="author-bio">
        <img class="avatar lg" src="{{authorImage}}" alt="{{author}}" onerror="this.style.display='none'" />
        <div>
          <div class="bio-name">{{author}}</div>
          <p class="bio-text">{{authorBio}}</p>
        </div>
      </div>
    </div>
  </section>
  <section class="related">
    <div class="container-narrow">
      <h2>Keep reading</h2>
      <div class="related-grid">
        {{#relatedPosts}}
          <a class="related-card" href="/blog/{{categorySlug}}/{{slug}}">
            <span class="related-tag">{{category}}</span>
            <h3>{{title}}</h3>
            <p>{{excerpt}}</p>
          </a>
        {{/relatedPosts}}
      </div>
    </div>
  </section>
</article>`

const css = `*{box-sizing:border-box}
.container-narrow{max-width:760px;margin:0 auto;padding:0 24px}
.post-header{padding:80px 0 32px;background:#fff}
.crumb{display:flex;gap:10px;align-items:center;font-size:13px;color:#737373;margin-bottom:24px}
.crumb a{color:#525252;text-decoration:none}
.crumb .dot{opacity:.5}
.tag{display:inline-block;padding:6px 12px;background:#ccfbf1;color:#0d9488;border-radius:999px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-bottom:28px}
.post-title{font-size:clamp(36px,4.4vw,60px);font-weight:700;letter-spacing:-.025em;line-height:1.05;margin:0;color:#0a0a0a;text-wrap:balance}
.post-lede{font-size:20px;line-height:1.55;color:#525252;margin:24px 0 32px}
.byline{display:flex;align-items:center;gap:12px;padding-top:24px;border-top:1px solid #e5e5e5}
.avatar{width:44px;height:44px;border-radius:50%;object-fit:cover;background:#e5e5e5}
.avatar.lg{width:64px;height:64px}
.byline-meta{display:flex;flex-direction:column;gap:2px}
.byline-name{font-size:14px;font-weight:600;color:#0a0a0a}
.byline-sub{font-size:12px;color:#737373}
.hero-image-wrap{padding:16px 0 48px;background:#fff}
.hero-image{aspect-ratio:21/9;border-radius:20px;overflow:hidden;background:#fafaf9}
.hero-image img{width:100%;height:100%;object-fit:cover;display:block}
.post-body-wrap{padding:48px 0 80px;background:#fff}
.post-body{font-size:18px;line-height:1.75;color:#262626}
.post-body h2{font-size:30px;font-weight:700;letter-spacing:-.02em;margin:48px 0 16px;color:#0a0a0a}
.post-body h3{font-size:22px;font-weight:700;margin:32px 0 12px;color:#0a0a0a}
.post-body p{margin:0 0 20px}
.post-body a{color:#0d9488;text-decoration:underline;text-decoration-thickness:1px;text-underline-offset:3px}
.post-body blockquote{margin:32px 0;padding:0 0 0 24px;border-left:3px solid #2dd4bf;font-size:20px;color:#404040;font-style:italic}
.post-body ul,.post-body ol{padding-left:24px;margin:0 0 20px}
.post-body li{margin-bottom:8px}
.author-bio{margin-top:64px;padding:32px;background:#fafaf9;border-radius:16px;display:flex;gap:20px;align-items:flex-start}
.bio-name{font-size:16px;font-weight:700;color:#0a0a0a;margin-bottom:6px}
.bio-text{font-size:14px;line-height:1.6;color:#525252;margin:0}
.related{padding:80px 0;background:#fafaf9;border-top:1px solid #e5e5e5}
.related h2{font-size:28px;font-weight:700;letter-spacing:-.02em;margin:0 0 32px;color:#0a0a0a}
.related-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.related-card{padding:24px;background:#fff;border:1px solid #e5e5e5;border-radius:14px;text-decoration:none;color:inherit;display:flex;flex-direction:column;gap:10px;transition:border-color .2s}
.related-card:hover{border-color:#0d9488}
.related-tag{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#0d9488}
.related-card h3{font-size:16px;font-weight:700;margin:0;color:#0a0a0a;line-height:1.3}
.related-card p{font-size:13px;line-height:1.55;color:#525252;margin:0;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
@media(max-width:768px){.related-grid{grid-template-columns:1fr}.author-bio{flex-direction:column}}`

export const blogPost: GeneratedTemplate = {
  name: 'Blog Post Page',
  type: 'blog',
  description: 'Long-form essay layout with byline, hero image, related posts, and author bio. Uses live Payload placeholders.',
  html,
  css,
  previewUrl: '/blogs/indian-companies-gcc-health-benefits-insights',
}
