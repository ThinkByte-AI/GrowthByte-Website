import Link from 'next/link'
import { GenerativeThumbnail, AuthorChip, ClockIcon } from '@/components/journal'
import type { JournalPost } from './types'
import { categoryLabel, formatPostDate } from './categories'

const ThumbImage = ({ url, alt }: { url: string; alt: string }) => (
  <img src={url} alt={alt} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
)

export default function PostCard({ post }: { post: JournalPost }) {
  const thumb = post.imageUrl || post.heroImageUrl
  return (
    <Link href={`/blogs/${post.slug}`} className="gbx-card" style={{ cursor: 'pointer' }}>
      <div className="card-thumb">
        {thumb
          ? <ThumbImage url={thumb} alt={post.imageAlt || post.title} />
          : <GenerativeThumbnail seed={post.slug} category={post.category} />}
      </div>
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="tag">{categoryLabel(post.category)}</span>
          {post.readTime ? (
            <span className="meta" style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <ClockIcon /> {post.readTime} min
            </span>
          ) : null}
        </div>
        <h3 className="h-card" style={{ margin: 0 }}>{post.title}</h3>
        {post.excerpt ? (
          <p style={{ fontSize: 14, color: 'var(--gb-ink-2)', margin: 0, lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {post.excerpt}
          </p>
        ) : null}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: 8, borderTop: '1px solid var(--gb-line)' }}>
          <AuthorChip name={post.author || 'GrowthByte'} imageUrl={post.authorImageUrl} />
          <span className="meta">{formatPostDate(post.publishedAt)}</span>
        </div>
      </div>
    </Link>
  )
}
