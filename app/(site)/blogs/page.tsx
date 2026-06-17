import { Metadata } from 'next'
import { getPayloadClient } from '@/src/get-payload'
import BlogListingView from './_components/BlogListingView'
import type { JournalPost } from './_components/types'
import { toJournalPost } from './_components/toJournalPost'
import '@/components/journal/journal.css'

// Listing reads from Payload (not a tracked fetch), so opt out of the full route
// cache — otherwise deleted/added posts won't show until the next build.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'Digital Marketing Blog, Growth and AI | GrowthByte' },
  description: 'Honest notes from the campaigns we run. Growth, SEO, paid media and AI for founders and marketers who want the real story, not a polished one.',
  alternates: { canonical: '/blogs' },
}

async function getBlogPosts(): Promise<JournalPost[]> {
  const payload = await getPayloadClient()
  const { docs } = await payload.find({
    collection: 'blog-posts',
    limit: 30,
    sort: '-publishedAt',
    depth: 1,
    draft: false,
    overrideAccess: false,
  })
  return docs.map((doc) => toJournalPost(doc as Record<string, unknown>))
}

export default async function BlogsPage() {
  const posts = await getBlogPosts()
  return (
    <div className="gbx">
      <BlogListingView posts={posts} />
    </div>
  )
}
