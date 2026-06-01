import type { Metadata } from 'next'
import CaseStudyListingView from './_components/CaseStudyListingView'
import '@/components/journal/journal.css'

export const metadata: Metadata = {
  title: 'Case Studies — GrowthByte | Measurable Growth Results',
  description: 'Real results from real growth programmes. CAC reductions, ROAS improvements, and organic pipeline growth across SaaS, D2C, and B2B verticals.',
  alternates: { canonical: '/case-studies' },
}

export default function CaseStudiesPage() {
  return (
    <div className="gbx">
      <CaseStudyListingView />
    </div>
  )
}
