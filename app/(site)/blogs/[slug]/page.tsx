import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

async function getBlogPost(slug: string) {
  const apiUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'

  const endpoint = `${apiUrl}/api/blog-posts?where[slug][equals]=${slug}&limit=1`

  console.log('[BlogPost] Fetching:', endpoint)
  console.log('[BlogPost] Slug:', slug)

  try {
    const res = await fetch(endpoint, {
      cache: 'no-store',
      next: { revalidate: 0 },
    })

    console.log('[BlogPost] Response status:', res.status)

    if (!res.ok) {
      console.error('[BlogPost] API error:', res.status)
      return null
    }

    const data = await res.json()
    console.log('[BlogPost] Docs found:', data.docs?.length || 0)

    if (data.docs?.[0]) {
      console.log('[BlogPost] Post title:', data.docs[0].title)
    }

    return data.docs?.[0] || null
  } catch (error) {
    console.error('[BlogPost] Fetch error:', error)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.meta?.title || post.metaTitle || post.title,
    description: post.meta?.description || post.metaDescription || post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  console.log('[BlogPost] Rendering page for slug:', slug)

  const post = await getBlogPost(slug)

  if (!post) {
    console.log('[BlogPost] Post not found, triggering 404')
    notFound()
  }

  console.log('[BlogPost] Rendering post:', post.title)

  return (
    <div className="min-h-screen bg-surface">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href="/blogs"
          className="text-teal hover:text-teal-dark transition-colors mb-8 inline-block"
        >
          ← Back to Blogs
        </Link>

        <header className="mb-8">
          {post.category && (
            <span className="text-sm font-medium text-teal mb-2 block capitalize">
              {post.category.replace('-', ' ')}
            </span>
          )}
          <h1 className="text-4xl font-semibold text-ink mb-4">{post.title}</h1>
          {post.publishedAt && (
            <time className="text-ink-40">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {post.author && (
            <span className="text-ink-40 ml-4">by {post.author}</span>
          )}
        </header>

        {post.excerpt && (
          <p className="text-xl text-ink-60 mb-8 border-l-4 border-teal pl-4">
            {post.excerpt}
          </p>
        )}

        {post.content && (
          <div className="prose prose-lg max-w-none prose-headings:text-ink prose-a:text-teal">
            {typeof post.content === 'object' ? (
              <div dangerouslySetInnerHTML={{ __html: serializeLexical(post.content) }} />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            )}
          </div>
        )}

        {post.featuredImage && (
          <div className="mt-8">
            <img
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              className="w-full rounded-lg"
            />
          </div>
        )}
      </article>
    </div>
  )
}

// Simple Lexical to HTML serializer
function serializeLexical(content: any): string {
  if (!content || !content.root?.children) return ''

  return content.root.children.map((node: any) => {
    if (node.type === 'paragraph') {
      const text = node.children?.map((child: any) => child.text || '').join('') || ''
      return `<p>${text}</p>`
    }
    if (node.type === 'heading') {
      const tag = `h${node.tag || 'h2'}`
      const text = node.children?.map((child: any) => child.text || '').join('') || ''
      return `<${tag}>${text}</${tag}>`
    }
    if (node.type === 'list') {
      const tag = node.listType === 'number' ? 'ol' : 'ul'
      const items = node.children?.map((item: any) => {
        const text = item.children?.map((child: any) => child.text || '').join('') || ''
        return `<li>${text}</li>`
      }).join('') || ''
      return `<${tag}>${items}</${tag}>`
    }
    if (node.type === 'quote') {
      const text = node.children?.map((child: any) => child.text || '').join('') || ''
      return `<blockquote>${text}</blockquote>`
    }
    if (node.type === 'upload') {
      // Handle inline images
      const url = node.value?.url || ''
      const alt = node.value?.alt || ''
      return `<img src="${url}" alt="${alt}" />`
    }
    return ''
  }).join('')
}
