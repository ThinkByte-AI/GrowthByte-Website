'use client'

import Link from 'next/link'
import Image from 'next/image'

interface TemplateHeroProps {
  title: string
  subtitle?: string
  category?: string
  author?: string
  authorImage?: { url: string; alt?: string }
  publishedAt?: string
  readTime?: number
  heroImage?: { url: string; alt?: string }
  heroOverlay?: 'none' | 'dark' | 'light' | 'gradient'
  config: {
    enabled: boolean
    layout: 'centered' | 'left' | 'image-bg' | 'split'
    showCategory: boolean
    showAuthor: boolean
    showDate: boolean
    showReadTime: boolean
  }
  backLink?: { href: string; label: string }
}

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

  const isImageBg = config.layout === 'image-bg' && heroImage?.url
  const isSplit = config.layout === 'split'
  const isCentered = config.layout === 'centered'

  // Overlay classes
  const overlayClasses = {
    none: '',
    dark: 'bg-black/50',
    light: 'bg-white/30',
    gradient: 'bg-gradient-to-b from-black/60 to-transparent',
  }

  return (
    <section
      className={`
        relative overflow-hidden
        ${isImageBg ? 'min-h-[400px] md:min-h-[500px]' : 'py-12 md:py-16'}
        ${isCentered ? 'text-center' : ''}
      `}
    >
      {/* Background Image */}
      {isImageBg && heroImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage.url}
            alt={heroImage.alt || title}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 ${overlayClasses[heroOverlay]}`} />
        </div>
      )}

      <div className={`relative z-10 container-custom ${isImageBg ? 'py-16 md:py-24' : ''}`}>
        {/* Back Link */}
        {backLink && (
          <Link
            href={backLink.href}
            className={`
              text-teal hover:text-teal-dark transition-colors mb-6 inline-flex items-center gap-1
              ${isImageBg ? 'text-white/80 hover:text-white' : ''}
            `}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {backLink.label}
          </Link>
        )}

        <div className={isSplit ? 'grid md:grid-cols-2 gap-8 items-center' : ''}>
          {/* Content */}
          <div className={isSplit && heroImage ? 'order-2 md:order-1' : ''}>
            {/* Category Badge */}
            {config.showCategory && category && (
              <span
                className={`
                  inline-block text-sm font-medium mb-4 capitalize
                  ${isImageBg ? 'text-teal-light' : 'text-teal'}
                `}
              >
                {category.replace('-', ' ')}
              </span>
            )}

            {/* Title */}
            <h1
              className={`
                text-3xl md:text-4xl lg:text-5xl font-semibold mb-4
                ${isImageBg ? 'text-white' : 'text-ink'}
              `}
            >
              {title}
            </h1>

            {/* Subtitle */}
            {subtitle && (
              <p
                className={`
                  text-lg mb-6
                  ${isImageBg ? 'text-white/80' : 'text-ink-60'}
                `}
              >
                {subtitle}
              </p>
            )}

            {/* Meta: Author, Date, Read Time */}
            <div
              className={`
                flex flex-wrap items-center gap-4 text-sm
                ${isImageBg ? 'text-white/70' : 'text-ink-50'}
              `}
            >
              {config.showAuthor && author && (
                <div className="flex items-center gap-2">
                  {authorImage && (
                    <img
                      src={authorImage.url}
                      alt={author}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span>{author}</span>
                </div>
              )}

              {config.showDate && publishedAt && (
                <time>
                  {new Date(publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              )}

              {config.showReadTime && readTime && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {readTime} min read
                </span>
              )}
            </div>
          </div>

          {/* Split Layout Image */}
          {isSplit && heroImage && (
            <div className="order-1 md:order-2">
              <img
                src={heroImage.url}
                alt={heroImage.alt || title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
