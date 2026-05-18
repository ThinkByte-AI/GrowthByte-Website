import Link from 'next/link'
import { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Insights and strategies for growth-driven businesses',
  alternates: { canonical: '/blogs' },
}

async function getBlogPosts() {
  const apiUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  const endpoint = `${apiUrl}/api/blog-posts?limit=20&sort=-publishedAt`

  try {
    const res = await fetch(endpoint, {
      cache: 'no-store',
      next: { revalidate: 0 },
    })

    if (!res.ok) {
      console.error('[Blogs] API error:', res.status)
      return []
    }

    const data = await res.json()
    console.log('[Blogs] Found', data.docs?.length || 0, 'posts')
    return data.docs || []
  } catch (error) {
    console.error('[Blogs] Fetch error:', error)
    return []
  }
}

export default async function BlogsPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-semibold text-ink mb-4">Blogs</h1>
          <p className="text-lg text-ink-60">
            Insights, strategies, and actionable advice for growth-driven businesses.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-ink-60 text-lg">No blog posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {posts.map((post: any) => (
              <article
                key={post.id}
                className="bg-surface-2 rounded-lg overflow-hidden hover:shadow-card transition-shadow"
              >
                {post.featuredImage && (
                  <Link href={`/blogs/${post.slug}`}>
                    <div className="aspect-video relative bg-surface-3">
                      <Image
                        src={post.featuredImage.url}
                        alt={post.featuredImage.alt || post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  </Link>
                )}
                <div className="p-6">
                  {post.category && (
                    <span className="text-sm font-medium text-teal mb-2 block capitalize">
                      {post.category.replace('-', ' ')}
                    </span>
                  )}
                  <h2 className="text-xl font-semibold text-ink mb-2">
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="hover:text-teal transition-colors"
                    >
                      {post.title || 'Untitled'}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="text-ink-60 mb-4 line-clamp-3">{post.excerpt}</p>
                  )}
                  {post.publishedAt ? (
                    <time className="text-sm text-ink-40">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  ) : (
                    <span className="text-sm text-amber-600">Draft</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
