import { notFound, permanentRedirect } from 'next/navigation'
import { getPayloadClient } from '@/src/get-payload'
import { blogCategorySlug, blogPostPath } from '@/lib/blog/category'

interface Props {
  params: Promise<{ slug: string }>
}

// Legacy flat URL /blogs/<slug> (indexed by Google before the category move).
// 301 to the canonical /blog/<category>/<slug> so ranking authority transfers.
export default async function LegacyBlogPostRedirect({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
    draft: false,
    overrideAccess: false,
  })
  const post = docs[0] as unknown as { slug?: string; category?: unknown } | undefined
  if (!post?.slug) notFound()
  permanentRedirect(blogPostPath(blogCategorySlug(post.category), post.slug))
}
