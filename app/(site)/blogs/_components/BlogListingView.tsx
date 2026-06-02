'use client'

import { useMemo, useState } from 'react'
import type { JournalPost } from './types'
import { BLOG_CATEGORY_LABELS, categoryLabel } from './categories'
import FeaturedPost from './FeaturedPost'
import PostCard from './PostCard'
import FilterBar from './FilterBar'
import Pagination from './Pagination'

const PAGE_SIZE = 9

const buildCategoryOptions = (posts: JournalPost[]) => {
  const present = Object.keys(BLOG_CATEGORY_LABELS).filter((value) =>
    posts.some((p) => p.category === value),
  )
  return [
    { value: 'All', label: 'All', count: posts.length },
    ...present.map((value) => ({
      value,
      label: categoryLabel(value),
      count: posts.filter((p) => p.category === value).length,
    })),
  ]
}

const matchesQuery = (post: JournalPost, query: string) => {
  if (!query) return true
  const q = query.toLowerCase()
  return post.title.toLowerCase().includes(q) || (post.excerpt || '').toLowerCase().includes(q)
}

export default function BlogListingView({ posts }: { posts: JournalPost[] }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const featured = posts[0]
  const rest = useMemo(() => posts.slice(1), [posts])
  const categories = useMemo(() => buildCategoryOptions(rest), [rest])

  const filtered = useMemo(
    () => rest.filter((p) => (activeCategory === 'All' || p.category === activeCategory) && matchesQuery(p, query)),
    [rest, activeCategory, query],
  )
  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const selectCategory = (value: string) => { setActiveCategory(value); setPage(1) }
  const search = (value: string) => { setQuery(value); setPage(1) }

  return (
    <>
      <section className="page-head">
        <div className="gbx-container">
          <span className="eyebrow">The GrowthByte Journal</span>
          <h1 className="h-page">Operator-grade thinking on growth, performance &amp; AI.</h1>
          <p className="lede">
            Field notes from the campaigns, audits, and rebuilds we run for B2B and D2C teams.
            No frameworks. No filler. Things we actually learned this week.
          </p>
        </div>
      </section>

      <div className="gbx-container">
        {featured && <FeaturedPost post={featured} />}
        <FilterBar
          categories={categories}
          activeCategory={activeCategory}
          onSelect={selectCategory}
          query={query}
          onQuery={search}
        />
        <div className="blog-grid">
          {paged.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
    </>
  )
}
