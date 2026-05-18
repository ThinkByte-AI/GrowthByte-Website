import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { buildTypographyCss, renderTemplate, type DynamicData } from '@/lib/templateRenderer'
import TocActiveSpy from '@/components/TocActiveSpy'

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
    alternates: { canonical: `/blogs/${slug}` },
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
    const typographyCss = buildTypographyCss(template.styling)
    return (
      <>
        {typographyCss && <style dangerouslySetInnerHTML={{ __html: typographyCss }} />}
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <article dangerouslySetInnerHTML={{ __html: html }} />
        <TocActiveSpy />
      </>
    )
  }

  return <FallbackArticle post={post} />
}
