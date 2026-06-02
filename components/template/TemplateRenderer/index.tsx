'use client'

import { TemplateHero } from '../TemplateHero'
import { TemplateSidebar } from '../TemplateSidebar'
import { TemplateContentArea } from '../TemplateContentArea'
import { TemplateFooter } from '../TemplateFooter'

import type { TemplateRendererProps } from './types'
import {
  buildContentConfig,
  buildFooterConfig,
  buildHeroConfig,
  buildSidebarConfig,
} from './configBuilders'
import { BACK_LINKS, THEME_CLASSES, type ThemeKey } from './constants'
import AdditionalBlocks from './AdditionalBlocks'

export function TemplateRenderer({
  content,
  template,
  contentType,
  relatedContent = [],
  sidebarData,
}: TemplateRendererProps) {
  const heroConfig = buildHeroConfig(template)
  const sidebarConfig = buildSidebarConfig(template)
  const contentConfig = buildContentConfig(template)
  const footerConfig = buildFooterConfig(template)

  const backLink = BACK_LINKS[contentType]
  const theme = (template.styling?.theme ?? 'default') as ThemeKey
  const customCSS = template.styling?.customCSS

  const sidebar = sidebarConfig.enabled ? (
    <TemplateSidebar
      content={content}
      relatedContent={relatedContent}
      popularContent={sidebarData?.popular}
      categories={sidebarData?.categories}
      config={sidebarConfig}
    />
  ) : null

  return (
    <>
      {customCSS && <style dangerouslySetInnerHTML={{ __html: customCSS }} />}

      <div className={`min-h-screen ${THEME_CLASSES[theme]}`}>
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

        <div className="container-custom py-12 md:py-16">
          <div className={`flex gap-8 ${sidebarConfig.enabled ? 'flex-col md:flex-row' : ''}`}>
            {sidebarConfig.position === 'left' && sidebar}

            <main className="flex-1 min-w-0">
              <TemplateContentArea
                content={content.content}
                config={contentConfig}
                title={content.title}
              />
              <AdditionalBlocks blocks={content.additionalBlocks} />
              <TemplateFooter
                content={content}
                relatedContent={relatedContent}
                config={footerConfig}
              />
            </main>

            {sidebarConfig.position === 'right' && sidebar}
          </div>
        </div>
      </div>
    </>
  )
}
