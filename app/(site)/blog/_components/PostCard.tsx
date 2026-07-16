import Link from 'next/link'
import Image from 'next/image'
import { GenerativeThumbnail, AuthorChip, ClockIcon } from '@/components/journal'
import type { JournalPost } from './types'
import { formatPostDate } from './categories'
import { blogPostPath } from '@/lib/blog/category'

const ThumbImage = ({ url, alt }: { url: string; alt: string }) => (
  <Image
    src={url}
    alt={alt}
    fill
    sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 360px"
    style={{ objectFit: 'cover' }}
  />
)

export default function PostCard({ post }: { post: JournalPost }) {
  const thumb = post.imageUrl || post.heroImageUrl
  return (
    <Link href={blogPostPath(post.categorySlug, post.slug)} className="gbx-card" style={{ cursor: 'pointer' }}>
      <div className="card-thumb">
        {thumb
          ? <ThumbImage url={thumb} alt={post.imageAlt || post.title} />
          : <GenerativeThumbnail seed={post.slug} category={post.categorySlug} />}
      </div>
      <div className="card-body">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="tag">{post.categoryName || 'Article'}</span>
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
