import type { Metadata } from 'next'
import CaseStudyListingView from './_components/CaseStudyListingView'
import { getAllCaseStudies } from './[slug]/_fetchers'
import { toCaseStudy } from './_components/toCaseStudy'
import '@/components/journal/journal.css'

// Listing reads from Payload; opt out of the full route cache so new/deleted
// case studies appear immediately. Matches the blog listing behaviour.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: { absolute: 'Marketing Case Studies | Real Results | GrowthByte' },
  description: '68% lower CPA, 4x D2C revenue, 3080% organic growth, 5x SaaS leads, 212% ROI on ad spend. Every result tied to a real client and a real timeline you can check.',
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
