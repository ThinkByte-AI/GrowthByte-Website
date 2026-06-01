import type { Metadata } from 'next'
import CaseStudyListingView from './_components/CaseStudyListingView'
import { getAllCaseStudies } from './[slug]/_fetchers'
import { toCaseStudy } from './_components/toCaseStudy'
import '@/components/journal/journal.css'

// Listing reads from Payload; opt out of the full route cache so new/deleted
// case studies appear immediately. Matches the blog listing behaviour.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Case Studies — GrowthByte | Measurable Growth Results',
  description: 'Real results from real growth programmes. CAC reductions, ROAS improvements, and organic pipeline growth across SaaS, D2C, and B2B verticals.',
  alternates: { canonical: '/case-studies' },
}

export default async function CaseStudiesPage() {
  const docs = await getAllCaseStudies(30)
  const posts = docs.map(toCaseStudy)
  return (
    <div className="gbx">
      <CaseStudyListingView posts={posts} />
    </div>
  )
}
