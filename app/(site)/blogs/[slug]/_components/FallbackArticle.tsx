import type { TemplateContent } from '@/lib/templateRenderer'
import { lexicalToHtml } from '@/lib/lexicalToHtml'

const PROSE_CLASSES = 'prose prose-lg max-w-none'

const Meta = ({ post }: { post: TemplateContent }) => (
  <div className="flex gap-4 mt-4 text-sm text-gray-500">
    {post.author && <span>By {post.author}</span>}
    {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString()}</span>}
    {post.readTime && <span>{post.readTime} min read</span>}
  </div>
)

export default function FallbackArticle({ post }: { post: TemplateContent }) {
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          {post.excerpt && <p className="text-xl text-gray-600">{post.excerpt}</p>}
          <Meta post={post} />
        </header>
        <div
          className={PROSE_CLASSES}
          dangerouslySetInnerHTML={{ __html: lexicalToHtml(post.content) }}
        />
      </article>
    </div>
  )
}
