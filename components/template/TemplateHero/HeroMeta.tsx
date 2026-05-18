import type { HeroConfig, HeroImageData } from './types'

interface HeroMetaProps {
  config: HeroConfig
  author?: string
  authorImage?: HeroImageData
  publishedAt?: string
  readTime?: number
  onImageBg: boolean
}

const formatPublishDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const ClockIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

export default function HeroMeta({
  config,
  author,
  authorImage,
  publishedAt,
  readTime,
  onImageBg,
}: HeroMetaProps) {
  const colorClass = onImageBg ? 'text-white/70' : 'text-ink-50'
  return (
    <div className={`flex flex-wrap items-center gap-4 text-sm ${colorClass}`}>
      {config.showAuthor && author && (
        <div className="flex items-center gap-2">
          {authorImage && (
            <img src={authorImage.url} alt={author} className="w-8 h-8 rounded-full object-cover" />
          )}
          <span>{author}</span>
        </div>
      )}
      {config.showDate && publishedAt && <time>{formatPublishDate(publishedAt)}</time>}
      {config.showReadTime && readTime && (
        <span className="flex items-center gap-1">
          <ClockIcon />
          {readTime} min read
        </span>
      )}
    </div>
  )
}
