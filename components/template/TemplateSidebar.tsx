'use client'

import Link from 'next/link'
import { TemplateContent } from '@/lib/templates'

interface TemplateSidebarProps {
  content: TemplateContent
  relatedContent?: TemplateContent[]
  popularContent?: TemplateContent[]
  categories?: string[]
  config: {
    enabled: boolean
    position: 'left' | 'right'
    widgets: ('author' | 'related' | 'categories' | 'newsletter' | 'popular' | 'tags')[]
  }
}

export function TemplateSidebar({
  content,
  relatedContent = [],
  popularContent = [],
  categories = [],
  config,
}: TemplateSidebarProps) {
  if (!config.enabled) return null

  // Check if custom sidebar overrides exist
  const hideWidgets = content.sidebarContent?.hideDefaultWidgets
  const showWidgets = !hideWidgets

  return (
    <aside
      className={`
        w-full md:w-80 lg:w-96 flex-shrink-0
        ${config.position === 'left' ? 'md:order-first' : 'md:order-last'}
      `}
    >
      <div className="sticky top-24 space-y-8">
        {/* Custom Widget (if exists) */}
        {content.sidebarContent?.customWidget && (
          <div className="bg-surface border border-ink-10 rounded-lg p-6">
            {renderContent(content.sidebarContent.customWidget)}
          </div>
        )}

        {showWidgets && (
          <>
            {/* Author Widget */}
            {config.widgets.includes('author') && content.author && (
              <div className="bg-surface border border-ink-10 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wide mb-4">
                  Written By
                </h3>
                <div className="flex items-center gap-3">
                  {content.authorImage && (
                    <img
                      src={content.authorImage.url}
                      alt={content.author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-medium text-ink">{content.author}</p>
                    {content.authorBio && (
                      <p className="text-sm text-ink-50 mt-1">{content.authorBio}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Related Posts Widget */}
            {config.widgets.includes('related') && relatedContent.length > 0 && (
              <div className="bg-surface border border-ink-10 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wide mb-4">
                  Related Posts
                </h3>
                <ul className="space-y-3">
                  {relatedContent.slice(0, 3).map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/blogs/${item.slug}`}
                        className="text-ink-60 hover:text-teal transition-colors block"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Categories Widget */}
            {config.widgets.includes('categories') && categories.length > 0 && (
              <div className="bg-surface border border-ink-10 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wide mb-4">
                  Categories
                </h3>
                <ul className="space-y-2">
                  {categories.map((cat) => (
                    <li key={cat}>
                      <Link
                        href={`/blogs?category=${cat}`}
                        className="text-ink-60 hover:text-teal transition-colors capitalize"
                      >
                        {cat.replace('-', ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tags Widget */}
            {config.widgets.includes('tags') && content.tags && content.tags.length > 0 && (
              <div className="bg-surface border border-ink-10 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wide mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {content.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/blogs?tag=${tag}`}
                      className="px-3 py-1 text-sm bg-ink-5 hover:bg-teal/10 text-ink-60 hover:text-teal rounded-full transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Posts Widget */}
            {config.widgets.includes('popular') && popularContent.length > 0 && (
              <div className="bg-surface border border-ink-10 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wide mb-4">
                  Popular Posts
                </h3>
                <ul className="space-y-3">
                  {popularContent.slice(0, 5).map((item) => (
                    <li key={item.id}>
                      <Link
                        href={`/blogs/${item.slug}`}
                        className="text-ink-60 hover:text-teal transition-colors block text-sm"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Newsletter Widget */}
            {config.widgets.includes('newsletter') && (
              <div className="bg-teal/5 border border-teal/20 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-ink uppercase tracking-wide mb-2">
                  Stay Updated
                </h3>
                <p className="text-sm text-ink-60 mb-4">
                  Get the latest insights delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 border border-ink-10 rounded-lg focus:border-teal focus:ring-1 focus:ring-teal"
                  />
                  <button
                    type="submit"
                    className="w-full bg-teal text-white py-2 rounded-lg hover:bg-teal-dark transition-colors"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  )
}

// Helper to render rich text content
function renderContent(content: any): React.ReactNode {
  if (!content) return null

  if (typeof content === 'string') return <p>{content}</p>

  if (content.root?.children) {
    return content.root.children.map((node: any, i: number) => {
      if (node.type === 'paragraph') {
        const text = node.children?.map((c: any) => c.text || '').join('') || ''
        return <p key={i}>{text}</p>
      }
      return null
    })
  }

  return null
}
