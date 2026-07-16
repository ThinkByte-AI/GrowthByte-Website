import { notFound, permanentRedirect } from 'next/navigation'
import type { Metadata } from 'next'
import { blogCategorySlug, blogCategoryPath, blogPostPath } from '@/lib/blog/category'
import { toJournalPost } from '../_components/toJournalPost'
import CategoryListingView from './_components/CategoryListingView'
import { getCategoryBySlug, getPostsByCategory, findPostBySlug } from './_fetchers'
import '@/components/journal/journal.css'

interface Props {
  params: Promise<{ category: string }>
}

export const revalidate = 3600

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params
  const cat = await getCategoryBySlug(category)
  if (!cat) return { title: 'Category Not Found' }
  return {
    title: cat.metaTitle ? { absolute: cat.metaTitle } : `${cat.name} — GrowthByte Blog`,
    description: cat.metaDescription || cat.description,
    alternates: { canonical: blogCategoryPath(cat.slug) },
  }
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params
  const cat = await getCategoryBySlug(category)
  if (!cat) {
    const legacyPost = await findPostBySlug(category)
    if (legacyPost) {
      permanentRedirect(blogPostPath(blogCategorySlug(legacyPost.category), legacyPost.slug))
    }
    notFound()
  }

  const posts = await getPostsByCategory(cat.id)
  return (
    <div className="gbx">
      <CategoryListingView
        name={cat.name}
        description={cat.description}
        posts={posts.map((p) => toJournalPost(p as unknown as Record<string, unknown>))}
      />
    </div>
  )
}
