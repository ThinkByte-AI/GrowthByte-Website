import Link from 'next/link'
import Image from 'next/image'
import { GenerativeThumbnail, AuthorChip, CalendarIcon, ClockIcon, ArrowSmallIcon } from '@/components/journal'
import type { JournalPost } from './types'
import { formatPostDate } from './categories'
import { blogPostPath } from '@/lib/blog/category'

const Dot = () => <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--gb-line-2)' }} />

export default function FeaturedPost({ post }: { post: JournalPost }) {
  const thumb = post.imageUrl || post.heroImageUrl
  return (
    <Link href={blogPostPath(post.categorySlug, post.slug)} className="featured" style={{ cursor: 'pointer' }} aria-label={`Featured: ${post.title}`}>
      <div className="featured-image">
        {thumb
          ? <Image src={thumb} alt={post.imageAlt || post.title} fill priority sizes="(max-width: 860px) 100vw, 560px" style={{ objectFit: 'cover' }} />
          : <GenerativeThumbnail seed={post.slug} variant={1} category={post.categorySlug} />}
      </div>
      <div className="featured-body">
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <span className="tag tag-accent">Featured · {post.categoryName || 'Article'}</span>
        </div>
        <h2 className="h-section" style={{ margin: 0 }}>{post.title}</h2>
        {post.excerpt ? (
          <p style={{ fontSize: 16, color: 'var(--gb-ink-2)', margin: 0, lineHeight: 1.55 }}>{post.excerpt}</p>
        ) : null}
        <div style={{ display: 'flex', gap: 18, alignItems: 'center', flexWrap: 'wrap', marginTop: 8 }}>
          <AuthorChip name={post.author || 'GrowthByte'} imageUrl={post.authorImageUrl} />
          {post.publishedAt ? (
            <>
              <Dot />
              <span className="meta" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CalendarIcon /> {formatPostDate(post.publishedAt)}
              </span>
            </>
          ) : null}
          {post.readTime ? (
            <>
              <Dot />
              <span className="meta" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <ClockIcon /> {post.readTime} min read
              </span>
            </>
          ) : null}
        </div>
        <span className="gbx-btn gbx-btn-primary" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
          Read the essay <ArrowSmallIcon />
        </span>
      </div>
    </Link>
  )
}
