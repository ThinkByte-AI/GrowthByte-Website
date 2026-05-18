import type { Metadata } from 'next'
import Hero from './_components/Hero'
import CategoryFilter from './_components/CategoryFilter'
import PostsGrid from './_components/PostsGrid'

export const metadata: Metadata = {
  title: 'Insights — GrowthByte | Growth Strategy, Paid Media, SEO',
  description: 'Practical insights on growth strategy, performance marketing, SEO, and marketing automation for SaaS, D2C, and B2B companies.',
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
