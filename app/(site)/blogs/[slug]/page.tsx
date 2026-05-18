import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { renderTemplate, TemplateContent, DynamicData } from '@/lib/templateRenderer'
import { lexicalToHtml } from '@/lib/lexicalToHtml'

const API_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

interface Props {
  params: Promise<{ slug: string }>
}

async function getBlogPost(slug: string): Promise<TemplateContent | null> {
  const res = await fetch(
    `${API_URL}/api/blog-posts?where[slug][equals]=${slug}&depth=2&limit=1`,
    { cache: 'no-store' }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] || null
}

async function getTemplate(templateId: string) {
  const res = await fetch(
    `${API_URL}/api/page-templates/${templateId}?depth=0`,
    { cache: 'no-store' }
  )
  if (!res.ok) return null
  return res.json()
}

async function getDefaultTemplate() {
  const res = await fetch(
    `${API_URL}/api/page-templates?where[type][equals]=blog&where[isDefault][equals]=true&limit=1`,
    { cache: 'no-store' }
  )
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] || null
}

async function getRelatedPosts(currentSlug: string, limit: number = 3): Promise<TemplateContent[]> {
  const res = await fetch(
    `${API_URL}/api/blog-posts?where[slug][not_equals]=${currentSlug}&limit=${limit}&sort=-publishedAt&depth=1`,
    { cache: 'no-store' }
  )
  if (!res.ok) return []
  const data = await res.json()
  return data.docs || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  // Get template - from post, or default
  let template = null
  if (post.template) {
    template = typeof post.template === 'string'
      ? await getTemplate(post.template)
      : post.template
  }

  if (!template?.customLayout?.html) {
    template = await getDefaultTemplate()
  }

  // Get related posts for dynamic content
  const relatedPosts = await getRelatedPosts(slug, 3)

  // If we have a visual builder template, use it
  if (template?.customLayout?.html) {
    const dynamicData: DynamicData = {
      relatedPosts: relatedPosts.slice(0, 3),
    }

    const { html, css } = renderTemplate(
      {
        html: template.customLayout.html,
        css: template.customLayout.css,
      },
      post,
      { contentType: 'blog', dynamicData }
    )

    return (
      <>
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </>
    )
  }

  // Fallback: simple rendering if no template
  return (
    <div className="min-h-screen bg-white">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{post.title}</h1>
          {post.excerpt && (
            <p className="text-xl text-gray-600">{post.excerpt}</p>
          )}
          <div className="flex gap-4 mt-4 text-sm text-gray-500">
            {post.author && <span>By {post.author}</span>}
            {post.publishedAt && (
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            )}
            {post.readTime && <span>{post.readTime} min read</span>}
          </div>
        </header>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: lexicalToHtml(post.content) }}
        />
      </article>
    </div>
  )
}
