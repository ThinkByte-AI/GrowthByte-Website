'use client'

import Link from 'next/link'
import { TemplateContent } from '@/lib/templates'

interface TemplateFooterProps {
  content: TemplateContent
  relatedContent?: TemplateContent[]
  config: {
    showAuthorBox: boolean
    showRelatedPosts: boolean
    showCTA: boolean
    ctaText?: string
    ctaButtonText?: string
    ctaButtonLink?: string
  }
}

export function TemplateFooter({
  content,
  relatedContent = [],
  config,
}: TemplateFooterProps) {
  return (
    <>
      {/* Author Box */}
      {config.showAuthorBox && content.author && (
        <div className="border-t border-ink-10 pt-12 mt-12">
          <div className="bg-surface border border-ink-10 rounded-lg p-6 md:p-8">
            <div className="flex items-start gap-4">
              {content.authorImage && (
                <img
                  src={content.authorImage.url}
                  alt={content.author}
                  className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                />
              )}
              <div>
                <h3 className="text-lg font-semibold text-ink mb-1">Written by {content.author}</h3>
                {content.authorBio && (
                  <p className="text-ink-60">{content.authorBio}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Related Posts Section */}
      {config.showRelatedPosts && relatedContent.length > 0 && (
        <div className="border-t border-ink-10 pt-12 mt-12">
          <h2 className="text-2xl font-semibold text-ink mb-6">Related Posts</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedContent.slice(0, 3).map((item) => (
              <Link
                key={item.id}
                href={`/blogs/${item.slug}`}
                className="group block"
              >
                {item.featuredImage && (
                  <div className="aspect-video rounded-lg overflow-hidden mb-3">
                    <img
                      src={item.featuredImage.url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <h3 className="text-lg font-medium text-ink group-hover:text-teal transition-colors">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="text-sm text-ink-50 mt-1 line-clamp-2">{item.excerpt}</p>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* CTA Section */}
      {config.showCTA && (
        <div className="border-t border-ink-10 pt-12 mt-12">
          <div className="bg-ink text-white rounded-lg p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">
              {config.ctaText || 'Ready to grow?'}
            </h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              Let&apos;s discuss how we can help you achieve your growth goals.
            </p>
            <Link
              href={config.ctaButtonLink || '/contact'}
              className="inline-flex items-center gap-2 bg-teal hover:bg-teal-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              {config.ctaButtonText || 'Get Started'}
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
