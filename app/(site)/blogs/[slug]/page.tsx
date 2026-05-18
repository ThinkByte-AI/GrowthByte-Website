import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { renderTemplate, type DynamicData } from '@/lib/templateRenderer'

import { getBlogPost, getRelatedBlogPosts, resolveBlogTemplate } from './_fetchers'
import FallbackArticle from './_components/FallbackArticle'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return { title: 'Post Not Found' }
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  const template = await resolveBlogTemplate(post)
  const relatedPosts = await getRelatedBlogPosts(slug, 3)

  if (template?.customLayout?.html) {
    const dynamicData: DynamicData = { relatedPosts: relatedPosts.slice(0, 3) }
    const { html, css } = renderTemplate(
      { html: template.customLayout.html, css: template.customLayout.css },
      post,
      { contentType: 'blog', dynamicData },
    )
    return (
      <>
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <article dangerouslySetInnerHTML={{ __html: html }} />
      </>
    )
  }

  return <FallbackArticle post={post} />
}
