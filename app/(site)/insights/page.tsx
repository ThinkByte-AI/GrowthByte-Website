import type { Metadata } from 'next'
import Hero from './_components/Hero'
import CategoryFilter from './_components/CategoryFilter'
import PostsGrid from './_components/PostsGrid'

export const metadata: Metadata = {
  title: { absolute: 'Marketing Insights for SaaS D2C FinTech | GrowthByte.ai' },
  description: 'GrowthByte.ai publishes growth strategy, SEO and performance marketing insights for SaaS, D2C, FinTech and B2B teams. From live campaigns. No trend pieces. Real work.',
  alternates: { canonical: '/insights' },
}

export default function InsightsPage() {
  return (
    <>
      <Hero />
      <CategoryFilter />
      <PostsGrid />
    </>
  )
}
