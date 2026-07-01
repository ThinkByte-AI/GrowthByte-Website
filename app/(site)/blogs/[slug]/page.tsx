import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { buildTypographyCss, renderTemplate, type DynamicData } from '@/lib/templateRenderer'
import { lexicalToHtml } from '@/lib/lexicalToHtml'
import TocActiveSpy from '@/components/TocActiveSpy'

import { getBlogPost, getRelatedBlogPosts, getTemplate } from './_fetchers'
import JournalArticle from './_components/JournalArticle'
import PostJsonLdScripts from './_components/PostJsonLdScripts'
import { toJournalPost } from '../_components/toJournalPost'
import '@/components/journal/journal.css'

interface Props {
  params: Promise<{ slug: string }>
}

// Cached as static (ISR) for fast prod serving; a Payload afterChange/afterDelete
// hook calls revalidatePath on edit/delete so changes still reflect immediately.
// The window below is just the fallback refresh when no hook fires.
export const revalidate = 3600

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return { title: 'Post Not Found' }
  const title = post.metaTitle ? { absolute: post.metaTitle } : post.title
  return {
    title,
    description: post.metaDescription || post.excerpt,
    alternates: { canonical: `/blogs/${slug}` },
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolveExplicitTemplate = async (template: any) => {
  if (!template) return null
  return typeof template === 'string' ? await getTemplate(template) : template
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  const relatedRaw = await getRelatedBlogPosts(slug, 3)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const explicitTemplate = await resolveExplicitTemplate((post as any).template)

  if (explicitTemplate?.customLayout?.html) {
    const dynamicData: DynamicData = { relatedPosts: relatedRaw.slice(0, 3) }
    const { html, css } = renderTemplate(
      { html: explicitTemplate.customLayout.html, css: explicitTemplate.customLayout.css },
      post,
      { contentType: 'blog', dynamicData },
    )
    const typographyCss = buildTypographyCss(explicitTemplate.styling)
    return (
      <>
        <PostJsonLdScripts post={post} />
        {typographyCss && <style dangerouslySetInnerHTML={{ __html: typographyCss }} />}
        {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
        <article dangerouslySetInnerHTML={{ __html: html }} />
        <TocActiveSpy />
      </>
    )
  }

  return (
    <>
      <PostJsonLdScripts post={post} />
      <JournalArticle
        post={toJournalPost(post as unknown as Record<string, unknown>)}
        contentHtml={lexicalToHtml(post.content)}
        relatedPosts={relatedRaw.map((p) => toJournalPost(p as unknown as Record<string, unknown>))}
      />
    </>
  )
}
