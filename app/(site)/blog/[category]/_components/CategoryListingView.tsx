import type { JournalPost } from '../../_components/types'
import PostCard from '../../_components/PostCard'

interface CategoryListingViewProps {
  name: string
  description?: string
  posts: JournalPost[]
}

export default function CategoryListingView({ name, description, posts }: CategoryListingViewProps) {
  return (
    <>
      <section className="page-head">
        <div className="gbx-container">
          <span className="eyebrow">Category</span>
          <h1 className="h-page">{name}</h1>
          {description ? <p className="lede">{description}</p> : null}
        </div>
      </section>
      <div className="gbx-container">
        {posts.length === 0 ? (
          <p className="lede" style={{ marginTop: 32 }}>No posts in this category yet.</p>
        ) : (
          <div className="blog-grid" style={{ marginTop: 32 }}>
            {posts.map((post) => <PostCard key={post.id} post={post} />)}
          </div>
        )}
      </div>
    </>
  )
}
