import Link from 'next/link'
import { ArrowSmallIcon } from '@/components/journal'
import PostCard from '../../../../_components/PostCard'
import type { JournalPost } from '../../../../_components/types'

export default function RelatedPosts({ posts }: { posts: JournalPost[] }) {
  if (posts.length === 0) return null
  return (
    <section className="gbx-container" style={{ marginTop: 96 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
        <h2 className="h-section">Keep reading</h2>
        <Link href="/blog" className="gbx-btn gbx-btn-ghost">
          All essays <ArrowSmallIcon />
        </Link>
      </div>
      <div className="related-grid">
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </section>
  )
}
