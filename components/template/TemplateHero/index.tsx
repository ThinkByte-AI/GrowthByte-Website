'use client'

import type { TemplateHeroProps } from './types'
import HeroBackground from './HeroBackground'
import BackLink from './BackLink'
import HeroMeta from './HeroMeta'
import HeroSplitImage from './HeroSplitImage'

const sectionClass = (isImageBg: boolean, isCentered: boolean) => `
  relative overflow-hidden
  ${isImageBg ? 'min-h-[400px] md:min-h-[500px]' : 'py-12 md:py-16'}
  ${isCentered ? 'text-center' : ''}
`

const titleClass = (onImageBg: boolean) =>
  `text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 ${onImageBg ? 'text-white' : 'text-ink'}`

const subtitleClass = (onImageBg: boolean) =>
  `text-lg mb-6 ${onImageBg ? 'text-white/80' : 'text-ink-60'}`

const categoryClass = (onImageBg: boolean) =>
  `inline-block text-sm font-medium mb-4 capitalize ${onImageBg ? 'text-teal-light' : 'text-teal'}`

export function TemplateHero({
  title,
  subtitle,
  category,
  author,
  authorImage,
  publishedAt,
  readTime,
  heroImage,
  heroOverlay = 'none',
  config,
  backLink,
}: TemplateHeroProps) {
  if (!config.enabled) return null

  const isImageBg = config.layout === 'image-bg' && Boolean(heroImage?.url)
  const isSplit = config.layout === 'split'
  const isCentered = config.layout === 'centered'

  return (
    <section className={sectionClass(isImageBg, isCentered)}>
      {isImageBg && heroImage && (
        <HeroBackground image={heroImage} overlay={heroOverlay} fallbackAlt={title} />
      )}

      <div className={`relative z-10 container-custom ${isImageBg ? 'py-16 md:py-24' : ''}`}>
        {backLink && <BackLink link={backLink} onImageBg={isImageBg} />}

        <div className={isSplit ? 'grid md:grid-cols-2 gap-8 items-center' : ''}>
          <div className={isSplit && heroImage ? 'order-2 md:order-1' : ''}>
            {config.showCategory && category && (
              <span className={categoryClass(isImageBg)}>{category.replace('-', ' ')}</span>
            )}
            <h1 className={titleClass(isImageBg)}>{title}</h1>
            {subtitle && <p className={subtitleClass(isImageBg)}>{subtitle}</p>}
            <HeroMeta
              config={config}
              author={author}
              authorImage={authorImage}
              publishedAt={publishedAt}
              readTime={readTime}
              onImageBg={isImageBg}
            />
          </div>

          {isSplit && heroImage && <HeroSplitImage image={heroImage} fallbackAlt={title} />}
        </div>
      </div>
    </section>
  )
}
