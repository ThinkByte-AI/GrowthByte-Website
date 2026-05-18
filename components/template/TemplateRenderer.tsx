'use client'

import { PageTemplate, TemplateContent, TemplateContentType } from '@/lib/templates'
import { TemplateHero } from './TemplateHero'
import { TemplateSidebar } from './TemplateSidebar'
import { TemplateContentArea } from './TemplateContentArea'
import { TemplateFooter } from './TemplateFooter'

interface TemplateRendererProps {
  content: TemplateContent
  template: Partial<PageTemplate>
  contentType: TemplateContentType
  relatedContent?: TemplateContent[]
  sidebarData?: {
    popular?: TemplateContent[]
    categories?: string[]
  }
}

export function TemplateRenderer({
  content,
  template,
  contentType,
  relatedContent = [],
  sidebarData,
}: TemplateRendererProps) {
  // Merge with defaults for missing template fields
  const heroConfig = {
    enabled: template.hero?.enabled ?? true,
    layout: template.hero?.layout ?? 'centered',
    showCategory: template.hero?.showCategory ?? true,
    showAuthor: template.hero?.showAuthor ?? true,
    showDate: template.hero?.showDate ?? true,
    showReadTime: template.hero?.showReadTime ?? true,
  }

  const sidebarConfig = {
    enabled: template.sidebar?.enabled ?? false,
    position: template.sidebar?.position ?? 'right',
    widgets: template.sidebar?.widgets ?? [],
  }

  const contentConfig = {
    width: template.contentArea?.width ?? 'prose',
    showTableOfContents: template.contentArea?.showTableOfContents ?? false,
    showShareButtons: template.contentArea?.showShareButtons ?? true,
  }

  const footerConfig = {
    showAuthorBox: template.footer?.showAuthorBox ?? false,
    showRelatedPosts: template.footer?.showRelatedPosts ?? true,
    showCTA: template.footer?.showCTA ?? true,
    ctaText: template.footer?.ctaText,
    ctaButtonText: template.footer?.ctaButtonText,
    ctaButtonLink: template.footer?.ctaButtonLink,
  }

  // Back link based on content type
  const backLinks: Record<TemplateContentType, { href: string; label: string }> = {
    blog: { href: '/blogs', label: 'Back to Blogs' },
    service: { href: '/services', label: 'Back to Services' },
    'case-study': { href: '/case-studies', label: 'Back to Case Studies' },
    landing: { href: '/', label: 'Back to Home' },
  }

  const backLink = backLinks[contentType]

  // Theme classes
  const themeClasses = {
    default: 'bg-surface',
    dark: 'bg-ink text-white',
    brand: 'bg-gradient-to-b from-teal/5 to-surface',
  }

  const theme = template.styling?.theme ?? 'default'

  // Custom CSS injection
  const customCSS = template.styling?.customCSS

  return (
    <>
      {/* Custom CSS */}
      {customCSS && (
        <style dangerouslySetInnerHTML={{ __html: customCSS }} />
      )}

      <div className={`min-h-screen ${themeClasses[theme]}`}>
        {/* Hero Section */}
        <TemplateHero
          title={content.title}
          subtitle={content.heroSection?.heroSubtitle}
          category={content.category}
          author={content.author}
          authorImage={content.authorImage}
          publishedAt={content.publishedAt}
          readTime={content.readTime}
          heroImage={content.heroSection?.heroImage || content.featuredImage}
          heroOverlay={content.heroSection?.heroOverlay}
          config={heroConfig}
          backLink={backLink}
        />

        {/* Main Content Area with Optional Sidebar */}
        <div className="container-custom py-12 md:py-16">
          <div className={`flex gap-8 ${sidebarConfig.enabled ? 'flex-col md:flex-row' : ''}`}>
            {/* Sidebar (if enabled and positioned left) */}
            {sidebarConfig.enabled && sidebarConfig.position === 'left' && (
              <TemplateSidebar
                content={content}
                relatedContent={relatedContent}
                popularContent={sidebarData?.popular}
                categories={sidebarData?.categories}
                config={sidebarConfig}
              />
            )}

            {/* Main Content */}
            <main className="flex-1 min-w-0">
              <TemplateContentArea
                content={content.content}
                config={contentConfig}
                title={content.title}
              />

              {/* Additional Blocks */}
              {content.additionalBlocks && (
                <div className="mt-12 space-y-8">
                  {/* Pull Quote */}
                  {content.additionalBlocks.pullQuote && (
                    <blockquote className="text-2xl italic text-center text-ink-70 border-l-4 border-teal pl-6 py-4 bg-teal/5 rounded-r-lg">
                      "{content.additionalBlocks.pullQuote}"
                    </blockquote>
                  )}

                  {/* Video Embed */}
                  {content.additionalBlocks.videoEmbed && (
                    <div className="aspect-video rounded-lg overflow-hidden">
                      <iframe
                        src={content.additionalBlocks.videoEmbed}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}

                  {/* Gallery */}
                  {content.additionalBlocks.gallery && content.additionalBlocks.gallery.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {content.additionalBlocks.gallery.map((item, i) => (
                        <figure key={i} className="relative">
                          <img
                            src={item.image.url}
                            alt={item.caption || ''}
                            className="w-full rounded-lg"
                          />
                          {item.caption && (
                            <figcaption className="text-sm text-ink-50 mt-2 text-center">
                              {item.caption}
                            </figcaption>
                          )}
                        </figure>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Footer Section */}
              <TemplateFooter
                content={content}
                relatedContent={relatedContent}
                config={footerConfig}
              />
            </main>

            {/* Sidebar (if enabled and positioned right) */}
            {sidebarConfig.enabled && sidebarConfig.position === 'right' && (
              <TemplateSidebar
                content={content}
                relatedContent={relatedContent}
                popularContent={sidebarData?.popular}
                categories={sidebarData?.categories}
                config={sidebarConfig}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
