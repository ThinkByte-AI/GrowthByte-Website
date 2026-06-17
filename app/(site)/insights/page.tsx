import type { Metadata } from 'next'
import Hero from './_components/Hero'
import CategoryFilter from './_components/CategoryFilter'
import PostsGrid from './_components/PostsGrid'

export const metadata: Metadata = {
  title: { absolute: 'Marketing Insights and Growth Guides India | GrowthByte' },
  description: 'Growth, SEO and performance frameworks written by the operators running live campaigns, not a content team. Real lessons from real work, not theory.',
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
