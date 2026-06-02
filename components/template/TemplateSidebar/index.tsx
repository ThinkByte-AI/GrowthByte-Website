'use client'

import type { TemplateSidebarProps } from './types'
import { renderRichText } from './renderRichText'
import AuthorWidget from './widgets/AuthorWidget'
import RelatedWidget from './widgets/RelatedWidget'
import CategoriesWidget from './widgets/CategoriesWidget'
import TagsWidget from './widgets/TagsWidget'
import PopularWidget from './widgets/PopularWidget'
import NewsletterWidget from './widgets/NewsletterWidget'

const asideClass = (position: 'left' | 'right') =>
  `w-full md:w-80 lg:w-96 flex-shrink-0 ${position === 'left' ? 'md:order-first' : 'md:order-last'}`

export function TemplateSidebar({
  content,
  relatedContent = [],
  popularContent = [],
  categories = [],
  config,
}: TemplateSidebarProps) {
  if (!config.enabled) return null

  const showWidgets = !content.sidebarContent?.hideDefaultWidgets
  const widgets = config.widgets

  return (
    <aside className={asideClass(config.position)}>
      <div className="sticky top-24 space-y-8">
        {content.sidebarContent?.customWidget && (
          <div className="bg-surface border border-ink-10 rounded-lg p-6">
            {renderRichText(content.sidebarContent.customWidget)}
          </div>
        )}

        {showWidgets && (
          <>
            {widgets.includes('author') && content.author && (
              <AuthorWidget
                author={content.author}
                authorImage={content.authorImage}
                authorBio={content.authorBio}
              />
            )}
            {widgets.includes('related') && relatedContent.length > 0 && (
              <RelatedWidget items={relatedContent} />
            )}
            {widgets.includes('categories') && categories.length > 0 && (
              <CategoriesWidget categories={categories} />
            )}
            {widgets.includes('tags') && content.tags && content.tags.length > 0 && (
              <TagsWidget tags={content.tags} />
            )}
            {widgets.includes('popular') && popularContent.length > 0 && (
              <PopularWidget items={popularContent} />
            )}
            {widgets.includes('newsletter') && <NewsletterWidget />}
          </>
        )}
      </div>
    </aside>
  )
}
