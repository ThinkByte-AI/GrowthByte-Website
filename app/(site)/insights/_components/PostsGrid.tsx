import Link from 'next/link'
import { INSIGHTS, type InsightPost } from './data'

const PostCard = ({ post }: { post: InsightPost }) => (
  <Link
    href={`/insights/${post.slug}`}
    className="group flex flex-col bg-surface border border-surface-border rounded-xl overflow-hidden hover:border-teal/30 hover:shadow-card-hover transition-all duration-250"
  >
    <div className="h-[7rem] bg-surface-3 border-b border-surface-border" />
    <div className="p-6 flex flex-col flex-1">
      <div className="flex items-center gap-3 mb-3">
        <span className="tag tag-teal text-xs">{post.category}</span>
        <span className="text-xs text-ink-40">{post.date}</span>
      </div>
      <h2 className="font-bold text-ink text-[1rem] leading-snug mb-2 group-hover:text-teal transition-colors flex-1">
        {post.title}
      </h2>
      <p className="text-sm text-ink-60 leading-relaxed mt-2">{post.summary}</p>
      <div className="flex items-center gap-1 mt-4 text-xs text-ink-40 font-medium">
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {post.readTime} read
      </div>
    </div>
  </Link>
)

export default function PostsGrid() {
  return (
    <section className="section-padding bg-surface">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {INSIGHTS.map((post) => <PostCard key={post.slug} post={post} />)}
        </div>
      </div>
    </section>
  )
}
