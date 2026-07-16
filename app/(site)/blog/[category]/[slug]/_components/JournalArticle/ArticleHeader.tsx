import Link from 'next/link'
import { Avatar, CalendarIcon, ClockIcon, ArrowSmallIcon } from '@/components/journal'
import type { JournalPost } from '../../../../_components/types'
import { formatPostDate } from '../../../../_components/categories'
import { blogCategoryPath } from '@/lib/blog/category'

export default function ArticleHeader({ post }: { post: JournalPost }) {
  return (
    <header style={{ paddingTop: 56, paddingBottom: 32 }}>
      <div className="gbx-container-narrow">
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, fontSize: 13, color: 'var(--gb-ink-3)' }}>
          <Link href="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ transform: 'rotate(180deg)', display: 'inline-flex' }}><ArrowSmallIcon size={12} /></span>
            All essays
          </Link>
          <span>/</span>
          <Link href={blogCategoryPath(post.categorySlug)}>{post.categoryName || 'Article'}</Link>
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 24 }}>
          <span className="tag tag-accent">{post.categoryName || 'Article'}</span>
        </div>
        <h1 style={{ fontSize: 'clamp(38px, 4.5vw, 64px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.04, margin: 0, color: 'var(--gb-black)', textWrap: 'balance' }}>
          {post.title}
        </h1>
        {post.excerpt ? <p className="lede" style={{ marginTop: 24 }}>{post.excerpt}</p> : null}
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--gb-line)' }}>
          <span style={{ display: 'inline-flex', gap: 12, alignItems: 'center' }}>
            <Avatar name={post.author || 'GrowthByte'} size={44} imageUrl={post.authorImageUrl} />
            <span style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--gb-black)' }}>{post.author || 'GrowthByte'}</span>
              <span className="meta" style={{ fontSize: 12 }}>GrowthByte</span>
            </span>
          </span>
          {post.publishedAt ? (
            <>
              <span style={{ width: 1, height: 28, background: 'var(--gb-line)' }} />
              <span className="meta" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                <CalendarIcon /> {formatPostDate(post.publishedAt)}
              </span>
            </>
          ) : null}
          {post.readTime ? (
            <span className="meta" style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <ClockIcon /> {post.readTime} min read
            </span>
          ) : null}
        </div>
      </div>
    </header>
  )
}
